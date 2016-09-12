const TEMPLATE = `
<div class="scroller-component" data-role="component">
  <div class="scroller-component-mask" data-role="mask"></div>
  <div class="scroller-component-indicator" data-role="indicator"></div>
  <div class="scroller-component-content" data-role="content"></div>
</div>
`
import Animate from './animate'
import { getElement, getComputedStyle, easeInOutCubic, easeOutCubic } from './util'

// 不能使用箭头函数，使用箭头函数会产生 this 为 undefined 的问题
const Scroller = function (container, options) {
  const self = this
  options = options || {}
  self.options = {
    itemClass: 'scroller-item',
    onSelect () {},
    defaultValue: 0,
    data: []
  }

  for (let key in options) {
    if (options[key] !== undefined) {
      self.options[key] = options[key]
    }
  }

  self.__container = getElement(container)

  let tempContainer = document.createElement('div')
  tempContainer.innerHTML = options.template || TEMPLATE

  let component = self.__component = tempContainer.querySelector('[data-role=component]')
  let content = self.__content = component.querySelector('[data-role=content]')
  let indicator = component.querySelector('[data-role=indicator]')

  let data = self.options.data
  let html = ''
  // 对传过来的数据做容错处理，可以是 object 或者 str
  if (data.length && data[0].constructor === Object) {
    data.forEach((row) => {
      html += `<div class='${self.options.itemClass}' data-value='${row.value}'>${row.name}</div>`
    })
  } else {
    data.forEach((val) => {
      html += `<div class='${self.options.itemClass}' data-value='${val}'>${val}</div>`
    })
  }
  content.innerHTML = html
  self.__container.appendChild(component)
  self.__itemHeight = parseInt(getComputedStyle(indicator, 'height'), 10)
  self.__callback = options.callback || function (top) {
    content.style.webkitTransform = `translate3d(0, ${-top}px, 0)`
  }

  // 获取元素相对于页面左上角的位置
  let rect = component.getBoundingClientRect()

  self.__clientTop = (rect.top + component.clientTop) || 0
  self.__setDimensions(component.clientHeight, content.offsetHeight)

  if (component.clientHeight === 0) {
    self.__setDimensions(parseInt(getComputedStyle(component, 'height'), 10), 204)
  }

  self.select(self.options.defaultValue, false)

  component.addEventListener('touchstart', function (e) {
    // 容错处理，防止表单元素
    if (e.target.tagName.match(/input|textarea|select/i)) {
      return
    }
    e.preventDefault()
    self.__doTouchStart(e.touches, e.timeStamp)
  }, false)

  component.addEventListener('touchmove', function (e) {
    self.__doTouchMove(e.touches, e.timeStamp)
  }, false)

  component.addEventListener('touchend', function (e) {
    self.__doTouchEnd(e.timeStamp)
  }, false)
}
const members = {
  value: null,
  __prevValue: null,  // 记录上一次选中的值
  __isSingleTouch: false,
  __isTracking: false,
  __didDecelerationComplete: false,
  __isGesturing: false,
  __isDragging: false,
  __isDecelerating: false, // 标识是否在滚动减速的过程中
  __clientTop: 0,
  __clientHeight: 0,
  __contentHeight: 0,
  __interruptedAnimation: false,
  __isAnimating: false,
  __scheduledTop: 0,
  __itemHeight: 0,
  __scrollTop: 0,
  __minScrollTop: 0,
  __maxScrollTop: 0,
  __lastTouchTop: null,
  __lastTouchMove: null,
  __positions: null,
  __minDecelerationScrollTop: null,
  __maxDecelerationScrollTop: null,
  __decelerationVelocityY: null,

  __setDimensions(clientHeight, contentHeight) {
    const self = this

    self.__clientHeight = clientHeight
    self.__contentHeight = contentHeight

    let totalItemCount = self.options.data.length
    let clientItemCount = Math.round(self.__clientHeight / self.__itemHeight)
    // 根据元素高度计算能够滚动的最大最小值，不明白滚动的最大值为什么要 -0.1
    self.__minScrollTop = -self.__itemHeight * (clientItemCount / 2)
    self.__maxScrollTop = self.__minScrollTop + totalItemCount * self.__itemHeight - 0.1
  },
  /**
   * 利用index来确定所选中的项
   * @param  {Number} index
   * @param  {bool} animate 是否调用动画
   * @return {[type]}         [description]
   */
  selectByIndex(index, animate) {
    const self = this
    // 如果index不在范围内则终止执行
    if (index < 0 || index > self.__content.childElementCount - 1) {
      return
    }
    // set scrollTop
    self.__scrollTop = self.__minScrollTop + index * self.__itemHeight

    self.scrollTo(self.__scrollTop, animate)

    self.__selectItem(self.__content.children[index])
  },
  /**
   * 选中picker所选中的项
   * @param  {String} value  所选中的值
   * @param  {bool} animate  是否调用动画
   * @return
   */
  select(value, animate) {
    const self = this
    let children = self.__content.children
    let [i, len] = [0, children.length]
    for (; i < len; i++) {
      if (children[i].dataset.value === value) {
        self.selectByIndex(i, animate)
        return
      }
    }

    self.selectByIndex(0, animate)
  },
  getValue() {
    return this.value
  },
  /**
   * scroll to the top
   * @param  {Number} top     所需要滚动到的top值
   * @param  {Boolean} animate 滚动时是否调用动画
   */
  scrollTo(top, animate) {
    const self = this

    animate = (animate === undefined) ? true : animate
    if (self.__isDecelerating) {
      Animate.stop(self.__isDecelerating)
      self.__isDecelerating = false
    }
    // 判断 top 值是否在之前计算的最大以及最小滚动值范围内
    // 如果不在，则将 top 值设置为最大或者最小滚动值
    top = Math.round(top / self.__itemHeight) * self.__itemHeight
    top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop)

    // 滚动值初始化时
    if (top === self.__scrollTop || !animate) {
      self.__publish(top)
      self.__scrollingComplete()
      return
    }
    self.__publish(top, 250)
  },
  destroy() {
    this.__component.parentNode && this.__component.parentNode.removeChild(this.__component)
  },
  /**
   * 给所选中的那一项增加'XX-selected'类名,并记录上一次选中的那一项以及上一次选中的值
   * @param selectedItem 所选中的那一项
   */
  __selectItem(selectedItem) {
    const self = this
    const selectedItemClass = self.options.itemClass + '-selected'
    let lastSelectedElem = self.__content.querySelector('.' + selectedItemClass)
    if (lastSelectedElem) {
      lastSelectedElem.classList.remove(selectedItemClass)
    }
    selectedItem.classList.add(selectedItemClass)

    if (self.value !== null) {
      self.__prevValue = self.value
    }

    self.value = selectedItem.dataset.value
  },
  __scrollingComplete() {
    const self = this
    // decide which one was chosen according to the scrollTop
    const index = Math.round((self.__scrollTop - self.__minScrollTop - self.__itemHeight / 2) / self.__itemHeight)

    if (self.__prevValue !== null && self.__prevValue !== self.value) {
      self.options.onSelect(self.value)
    }
  },
  __doTouchStart(touches, timeStamp) {
    const self = this

    if (touches.length == null) {
      throw new Error(`Invalid touch list: ${touches}`)
    }

    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }

    if (typeof timeStamp !== 'number') {
      throw new Error(`Invalid timeStamp value: ${timeStamp}`)
    }

    self.__interruptedAnimation = true

    if (self.__isDecelerating) {
      Animate.stop(self.__isDecelerating)
      self.__isDecelerating = false
      self.__interruptedAnimation = true
    }

    if (self.__isAnimating) {
      Animate.stop(self.__isAnimating)
      self.__isAnimating = false
      self.__interruptedAnimation = true
    }

    // use center point when dealing with two fingers
    let currentTouchTop
    let isSingleTouch = touches.length === 1
    if (isSingleTouch) {
      currentTouchTop = touches[0].pageY
    } else {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
    }

    self.__initialTouchTop = currentTouchTop
    self.__lastTouchTop = currentTouchTop
    self.__lastTouchMove = timeStamp
    self.__lastScale = 1
    self.__enableScrollY = !isSingleTouch
    self.__isTracking = true
    self.__didDecelerationComplete = false
    self.__isDragging = !isSingleTouch
    self.__isSingleTouch = isSingleTouch
    self.__positions = []
  },
  __doTouchMove(touches, timeStamp, scale) {
    const self = this

    if (touches.length === null) {
      throw new Error(`Invalid touch list: ${touches}`)
    }

    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }

    if (typeof timeStamp !== 'number') {
      throw new Error(`Invalid timeStamp value: ${timeStamp}`)
    }

    // Ignore event when tracking is not enabled (event might be outside of element)
    if (!self.__isTracking) {
      return
    }

    let currentTouchTop

    // compute move based around of center of fingers
    if (touches.length === 2) {
      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
    } else {
      currentTouchTop = touches[0].pageY
    }

    let positions = self.__positions
    // judge if it is in the dragging module(超过一根指头在拖动)
    if (self.__isDragging) {
      let moveY = currentTouchTop - self.__lastTouchTop
      let scrollTop = self.__scrollTop
      if (self.__enableScrollY) {
        // moveY 为正值代表向上滑，为负值代表向下划
        scrollTop -= moveY
        let minScrollTop = self.__minScrollTop
        let maxScrollTop = self.__maxScrollTop

        if (scrollTop > maxScrollTop || scrollTop < minScrollTop) {
          // slow down on the edges
          if (scrollTop > maxScrollTop) {
            scrollTop = maxScrollTop
          } else {
            scrollTop = minScrollTop
          }
        }
      }

      // keep list from growing infinitely (holding min 10, max 20 measure points)
      if (positions.length > 40) {
        positions.splice(0, 20)
      }

      // track scroll movement for decleration
      positions.push(scrollTop, timeStamp)

      // sync scroll position
      self.__publish(scrollTop)

      // otherwise figure out whether we are switching into dragging mode now
    } else {
      let minimumTrackingForScroll = 0
      let minimumTrackingForDrag = 5

      let distanceY = Math.abs(currentTouchTop - self.__initialTouchTop)
      self.__enableScrollY = distanceY >= minimumTrackingForScroll

      positions.push(self.__scrollTop, timeStamp)

      self.__isDragging = self.__enableScrollY && (distanceY >= minimumTrackingForDrag)

      if (self.__isDragging) {
        self.__interruptedAnimation = false
      }
    }

    // update last touch positions and time stamp for next event
    self.__lastTouchTop = currentTouchTop
    self.__lastTouchMove = timeStamp
    self.__lastScale = scale
  },

  __doTouchEnd(timeStamp) {
    const self = this

    if (timeStamp instanceof Date) {
      timeStamp = timeStamp.valueOf()
    }
    if (typeof timeStamp !== 'number') {
      throw new Error(`Invalid timeStamp value: ${timeStamp}`)
    }

    // Ignore event whne tracking is not enabled (no touchstart event on element)
    // This is required as this listener ('touchmove') sits on the document and not on the element itself
    if (!self.__isTracking) {
      return
    }

    // not touching anymore (when two finger hit the screen there are two touch and events)
    self.__isTracking = false

    // be sure to reset the dragging flag now. Here we also detect whether
    // the finger has moved fast enough to switch into a deceleration animation.
    if (self.__isDragging) {
      // reset dragging flag
      self.__isDragging = false
      // start deceleration
      // verify that the last move detected was in some relevant time frame
      if (self.__isSingleTouch && (timeStamp - self.__lastTouchMove) <= 100) {
        // then figure out what the scroll position was about 100ms ago
        let positions = self.__positions
        let endPos = positions.length - 1
        let startPos = endPos
        // move pointer to position measured 100ms ago
        for (let i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 2) {
          startPos = i
        }
        // if start ans stop position is identical in a 100ms timeStamp
        // we cannot compute any useful deceleration
        if (startPos !== endPos) {
          // compute relative movement between these two points
          let timeOffset = positions[endPos] - positions[startPos]
          let movedTop = self.__scrollTop - positions[startPos - 1]
          // based on 50ms compute the movement to apply for each render step
          self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60)

          // how much velocity is required to start the deceleration
          let minVelocityToStartDeceleration = 4

          // verify that we have enough velocity to start deceleration
          if (Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {
            self.__startDeceleration(timeStamp)
          }
        }
      }
    }

    if (!self.__isDecelerating) {
      self.scrollTo(self.__scrollTop)
    }

    // fully cleanuo list
    self.__positions.length = 0
  },
  // Applies the scroll position to the content element
  __publish(top, animationDuration) {
    const self = this

    // Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
    let wasAnimating = self.__isAnimating
    if (wasAnimating) {
      Animate.stop(wasAnimating)
      self.__isAnimating = false
    }
    // animation duration has been setted
    if (animationDuration) {
      // Keep scheduled positions for scrollBy functionality
      self.__scheduledTop = top

      let oldTop = self.__scrollTop
      let diffTop = top - oldTop

      const step = (percent, now, render) => {
        self.__scrollTop = oldTop + (diffTop * percent)
        // push values out
        if (self.__callback) {
          self.__callback(self.__scrollTop)
        }
      }

      const verify = (id) => {
        return self.__isAnimating === id
      }

      const completed = (renderedFramesPerSecond, animationId, wasFinished) => {
        if (animationId === self.__isAnimating) {
          self.__isAnimating = false
        }
        if (self.__didDecelerationComplete || wasFinished) {
          self.__scrollingComplete()
        }
      }
      // When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
      self.__isAnimating = Animate.start(step, verify, completed, animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic)
    } else {
      self.__scheduledTop = self.__scrollTop = top
      if (self.__callback) {
        self.__callback(top)
      }
    }
  },

  // called when a touch sequence end and the speed of the finger was high enough to switch into deceleration mode
  __startDeceleration(timeStamp) {
    const self = this

    self.__minDecelerationScrollTop = self.__minScrollTop
    self.__maxDecelerationScrollTop = self.__maxScrollTop

    // wrap class method
    let step = function (percent, now, render) {
      self.__stepThroughDeceleration(render)
    }

    // how much velocity is required to keep the deceleration running
    let minVelocityToKeepDecelerating = 0.5

    // detect whether it's still worth to continue animating steps
    // if we are already slow enough to not being user perceivable anymore, wo stop the whole process Here
    let verify = function () {
      let shouldContinue = Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating
      if (!shouldContinue) {
        self.__didDecelerationComplete = true
      }
      return shouldContinue
    }

    let completed = function (renderedFramesPerSecond, animationId, wasFinished) {
      self.__isDecelerating = false
      if (self.__scrollTop <= self.__minScrollTop || self.__scrollTop >= self.__maxScrollTop) {
        self.scrollTo(self.__scrollTop)
        return
      }
      if (self.__didDecelerationComplete) {
        self.__scrollingComplete()
      }
    }

    // start animation and switch on flag
    self.__isDecelerating = Animate.start(step, verify, completed)
  },
  __stepThroughDeceleration(render) {
    const self = this

    let scrollTop = self.__scrollTop + self.__decelerationVelocityY

    let scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop)

    if (scrollTopFixed !== scrollTop) {
      scrollTop = scrollTopFixed
      self.__decelerationVelocityY = 0
    }

    if (Math.abs(self.__decelerationVelocityY) <= 1) {
      if (Math.abs(scrollTop % self.__itemHeight) < 1) {
        self.__decelerationVelocityY = 0
      }
    } else {
      self.__decelerationVelocityY *= 0.5
    }

    self.__publish(scrollTop)
  }
}

// copy over memebers to prototype
for (var key in members) {
  Scroller.prototype[key] = members[key]
}
module.exports = Scroller

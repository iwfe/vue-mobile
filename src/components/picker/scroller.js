const TEMPLATE = `
<div class="scroller-component" data-role="component">
  <div class="scroller-component-mask" data-role="mask"></div>
  <div class="scroller-component-indicator" data-role="indicator"></div>
  <div class="scroller-component-content" data-role="content"></div>
</div>
`
import Animate from './animate'
import { getElement, getComputedStyle, easeInOutCubic, easeOutCubic } from './util'

const Scroller = (container, options) => {
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
}
const members = {
  value: null,
  __clientHeight: 0,
  __contentHeight: 0,
  __isAnimating: false,
  __isDecelerating: false,
  __scheduledTop: 0,
  __scrollTop: 0,
  __didDecelerationComplete: false,

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
    self.__minScrollTop = self.__minScrollTop + index * self.__itemHeight

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

    let children = self._content.children
    for (let [i, len] = [0, children.length]; i < len; i++) {
      if (children[i].dataset.value === value) {
        self.selectByIndex(i, animate)
        return
      }
    }

    self.selectByIndex(0, animate)
  },
  scrollTo(top, animate) {
    const self = this

    animate = (animate === undefined) ? true : animate
    if (self.__isDecelerating) {
      Animate.stop(self.__isDecelerating)
      self.__isDecelerating = false
    }

    top = Math.round(top / self.__itemHeight) * self.__itemHeight
    top = Math.max(Math.min(self.__maxScrollTop, top), self.__minScrollTop)

    if (top === self.__scrollTop || !animate) {
      self.__publish(top)
      self.__scrollingComplete()
      return
    }
    self.__publish(top, 250)
  },
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
  __publish(top, animationDuration) {
    const self = this

    let wasAnimating = self.__isAnimating
    if (wasAnimating) {
      Animate.stop(wasAnimating)
      self.__isAnimating = false
    }

    if (animationDuration) {
      self.__scheduledTop = top

      let oldTop = self.__scrollTop
      let diffTop = top - oldTop

      const step = (percent, now, render) => {
        self.__scrollTop = oldTop + (diffTop * percent)
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
      self.__isAnimating = Animate.start(step, verify, completed, animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic)
    } else {
      self.__scheduledTop = self.__scrollTop = top
      if (self.__callback) {
        self.__callback(top)
      }
    }
  }
}

module.exports = Scroller

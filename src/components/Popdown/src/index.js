require('./style.css')
const loadingtpl2 =
  '<svg class="circular" viewBox="25 25 50 50">' +
  '<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>' +
  '</svg>'

const loadMore = {
  handleEvent: function (e) {
    const type = e.type
    if (type === 'touchstart') {
      this.touchStart(e)
    } else if (type === 'touchmove') {
      this.touchMove(e)
    } else if (type === 'touchend') {
      this.touchEnd()
    }
  },

  render: function (opt) {
    this.conf = Object.assign({
      // 最小高度 防止初次load只有2-3条数据，撑不满全屏，导致下拉过程中，下面数据被遮住，滚动条 top = 0
      minheight: '',
      // 最外层的父类
      container: '',
      // 下拉过程中距离顶部距离
      offsettop: 70,
      // 是否需要下拉刷新
      pushevent: true,
      // 是否需要上拉加载
      pullevent: true,
      toppulltext: '下拉刷新',
      topdroptext: '松开刷新',
      toploadingtext: loadingtpl2 + '<span class="loadmore-text">正在加载</span>',
      bottompulltext: '上拉刷新',
      bottomdroptext: '释放更新',
      bottomloadingtext: loadingtpl2 + '<span class="loadmore-text">努力加载中</span>',
      scrollevent: document.body, // 滚动条对象
      pullcallback: function () {},
      pushcallback: function () {}
    }, opt)
    if (this.conf.scrollevent === 'window') {
      this.conf.scrollevent = document.body
    }
    this.create()
  },

  create: function (e) {
    const conf = this.conf
    this.timer = null
    if (typeof conf.container === 'string') {
      this.container = document.querySelector(conf.container)
    } else {
      this.container = conf.container
    }
    const slide = this.container.querySelector('.loadmore-content')
    if (slide) { // 兼容vue模板
      this.slide = slide
    } else {
      this.slide = document.createElement('div')
      this.slide.className = 'loadmore-content is-transition'
      this.slide.innerHTML = '<div class="load-main"></div>'
    }
    this.main = this.slide.firstElementChild
    if (conf.minheight) {
      this.main.style.minHeight = parseInt(conf.minheight) + 'px'
    }
    this.topText = this.tpl('loadmore-pull', 'afterbegin')
    this.bottomText = this.tpl('loadmore-push', 'beforeend')
    this.topText.innerHTML = conf.toppulltext
    this.bottomText.innerHTML = conf.bottompulltext
    this.container.appendChild(this.slide)
    this.startY = null
    this.moveY = null
    this.top = null
    this.bottom = null
    this.lastTop = false
    this.pullEvent = conf.pullevent
    this.pushEvent = conf.pushevent
    this.container.addEventListener('touchstart', this, false)
  },

  reset: function () {
    const conf = this.conf
    const lateY = this.slide.style.transform.match(/[-\d]{2,}/g)
    if (lateY > 0) {
      this.slide.classList.add('is-transition')
    } else {
      conf.scrollevent.scrollTop += 50
      this.slide.classList.remove('is-transition')
    }
    this.container.addEventListener('touchstart', this, false)
    this.moveElement(0)
    setTimeout(() => {
      this.topText.innerHTML = conf.toppulltext
      this.bottomText.innerHTML = conf.bottompulltext
    }, 100)
  },

  touchStart: function (e) {
    this.startY = e.touches[0].clientY
    this.container.addEventListener('touchmove', this, false)
    this.container.addEventListener('touchend', this, false)
  },

  touchMove: function (e) {
    this.moveY = e.touches[0].clientY // y轴坐标
    const conf = this.conf
    const condition = this.merge()

    switch (condition) {
      case 'pull':
        this.stop(e)
        this.slide.classList.remove('is-transition')
        this.top = (this.moveY - this.startY) / 2.2 // top 值计算
        this.topText.innerHTML = this.top < conf.offsettop ? conf.toppulltext : conf.topdroptext
        this.moveElement(this.top)
        break
      case 'push':
        this.stop(e)
        this.slide.classList.remove('is-transition')
        this.bottom = -(this.startY - this.moveY) / 2.2 // end 事件提供依据
        this.bottomText.innerHTML = this.bottom > -conf.offsettop ? conf.bottompulltext : conf.bottomdroptext
        this.moveElement(this.bottom)
        break
      case 'stretch':
        this.stop(e)
        let scaleY = (this.startY - this.moveY) / 4000 + 1
        if (scaleY >= 1.1) scaleY = 1.1
        this.slide.classList.remove('is-transition')
        this.slide.style.webkitTransformOrigin = 'center bottom'
        this.slide.style.webkitTransform = 'scaleY(' + scaleY + ')'
        break
    }
  },

  touchEnd: function (e) {
    this.slide.classList.add('is-transition')
    const conf = this.conf
    const condition = this.merge()
    switch (condition) {
      case 'pull':
        if (this.top >= conf.offsettop) {
          this.moveElement(50)
          this.callBcak(conf.pullcallback)
          this.topText.innerHTML = conf.toploadingtext
        } else {
          this.moveElement(0)
        }
        break
      case 'push':
        if (this.bottom <= -conf.offsettop) {
          this.moveElement(-50)
          this.callBcak(conf.pushcallback, true)
          this.bottomText.innerHTML = conf.bottomloadingtext
        } else {
          this.moveElement(0)
        }
        break
      case 'stretch':
        this.slide.style.webkitTransform = 'scaleY(1)'
        break
    }
    this.container.removeEventListener('touchmove', this, false)
    this.container.removeEventListener('touchend', this, false)
  },

  merge: function () {
    const top = this.conf.scrollevent.scrollTop
    if (this.pullEvent) {
      if (top === 0 && this.moveY > this.startY) {
        return 'pull'
      }
    }
    if (top === document.body.scrollHeight - window.innerHeight && this.moveY < this.startY) {
      if (this.pushEvent) {
        return 'push'
      } else {
        return 'stretch'
      }
    }
  },

  callBcak: function (cb, r) {
    this.container.removeEventListener('touchstart', this, false)
    cb()
  },

  tpl: function (oClass, position) {
    const d = document.createElement('div')
    d.className = oClass
    this.slide.insertAdjacentElement(position, d)
    return d
  },

  stop: function (e) {
    e.preventDefault()
    e.stopPropagation()
  },

  moveElement: function (pageY) {
    this.slide.style.transform = 'translate3d(0px, ' + pageY + 'px, 0px)'
  }
}

export default function (opt) {
  var loadmore = Object.create(loadMore)
  loadmore.render(opt)
  return loadmore
}

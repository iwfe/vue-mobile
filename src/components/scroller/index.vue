<template>
  <div :style="styles">
    <div class="xs-container">
      <slot></slot>
      <slot name="pulldown"></slot>
      <slot name="pullup"></slot>
    </div>
  </div>
</template>

<script>
import XScroll from 'xscroll/build/cmd/xscroll.js'
import Pulldown from 'xscroll/build/cmd/plugins/pulldown'
import Pullup from 'xscroll/build/cmd/plugins/pullup'
import props from './props'
const pulldownDefaultConfig = () => ({
  content: 'Pull Down To Refresh',
  height: 60,
  autoRefresh: false,
  downContent: 'Pull Down To Refresh',
  upContent: 'Release To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pulldown-'
})

const pullupDefaultConfig = () => ({
  content: 'Pull Up To Refresh',
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: 'Release To Refresh',
  upContent: 'Pull Up To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pullup-'
})

export default {
  props: props,
  methods: {
    reset (scrollPosition) {
      if (scrollPosition) {
        if (typeof scrollPosition.left !== 'undefined') {
          this._xscroll.scrollLeft(scrollPosition.left)
        }
        if (typeof scrollPosition.top !== 'undefined') {
          this._xscroll.scrollTop(scrollPosition.top)
        }
      }
      setTimeout(() => {
        this._xscroll && this._xscroll.render()
      })
    },
    getFool () {
      switch (this.fool) {
        case 'normal':
          this.lockX = true
          this.usePullup = true
          this.usePulldown = true
          break
        case 'up':
          this.lockX = true
          this.usePulldown = true
          break
        case 'bottom':
          this.lockX = true
          this.usePullup = true
          break
        case 'swiper':
          this.lockY = true
          break
        default:
          this.lockX = true
          this.usePullup = true
          this.usePulldown = true
      }
    }
  },
  compiled () {
    this.uuid = Math.random().toString(36).substring(3, 8)
  },
  computed: {
    styles () {
      if (!this.height && !this.$el.style.height && this.lockX) {
        this.height = `${document.documentElement.clientHeight}px`
        this.reset()
      }

      if (this.height && this.height.indexOf('-') === 0) {
        this.height = `${document.documentElement.clientHeight + parseInt(this.height)}px`
      }

      return {
        height: `${this.height}`
      }
    }
  },
  ready () {
    this.$el.setAttribute('id', `vux-scroller-${this.uuid}`)
    let content = null
    const slotChildren = this.$el.querySelector('.xs-container').childNodes
    for (let i = 0; i < slotChildren.length; i++) {
      if (slotChildren[i].nodeType === 1) {
        content = slotChildren[i]
        break
      }
    }
    if (!content) {
      throw new Error('no content is found')
    }

    this._xscroll = new XScroll({
      renderTo: `#vux-scroller-${this.uuid}`,
      lockX: this.lockX,
      lockY: this.lockY,
      scrollbarX: this.scrollbarX,
      scrollbarY: this.scrollbarY,
      content: content,
      bounce: this.bounce,
      useOriginScroll: this.useOriginScroll,
      useTransition: this.useTransition,
      preventDefault: this.preventDefault,
      boundryCheck: this.boundryCheck,
      gpuAcceleration: this.gpuAcceleration,
      stopPropagation: this.stopPropagation
    })

    if (this.usePulldown) {
      // if use slot=pulldown
      const container = this.$el.querySelector('div[slot="pulldown"]')
      const config = Object.assign(pulldownDefaultConfig(), this.pulldownConfig)
      if (container) {
        config.container = container
      }
      this.pulldown = new Pulldown(config)
      this._xscroll.plug(this.pulldown)
      this.pulldown.on('loading', (e) => {
        // this.$emit('pulldown:loading', this.uuid)
        this.$emit('loadingDown', this.uuid)
      })
      this.pulldown.on('statuschange', (val) => {
        this.pulldownStatus = val.newVal
      })
    }

    if (this.usePullup) {
      // if use slot=pullup
      const container = this.$el.querySelector('div[slot="pullup"]')
      const config = Object.assign(pullupDefaultConfig(), this.pullupConfig)

      if (container) {
        config.container = container
      }
      this.pullup = new Pullup(config)
      this._xscroll.plug(this.pullup)
      this.pullup.on('loading', (e) => {
        // this.$emit('pullup:loading', this.uuid)
        this.$emit('loadingUp', this.uuid)
      })
      this.pullup.on('statuschange', (val) => {
        this.pullupStatus = val.newVal
      })
    }

    if (this.enableHorizontalSwiping) {
      this._xscroll.on('panstart', (e) => {
        if (e.direction === 2 || e.direction === 4) {
          e.preventDefault()
          if (this.scrollbarY) {
            this._xscroll.userConfig.scrollbarY = false
          }
          this._xscroll.userConfig.lockY = true
        }
      })
      this._xscroll.on('panend', () => {
        if (this.scrollbarY) {
          this._xscroll.userConfig.scrollbarY = true
        }
        this._xscroll.userConfig.lockY = false
      })
    }

    this._xscroll.render()
  },
  events: {
    'pulldown:reset' (uuid) {
      // set pulldown status to default
      this.pulldownStatus = 'default'
      if (uuid === this.uuid) {
        this.pulldown.reset(() => {
          // repaint
          this.reset()
        })
      }
    },
    'pullup:reset' (uuid) {
      // set pulldown status to default
      this.pullupStatus = 'default'
      if (uuid === this.uuid) {
        this.pullup.complete()
        this.reset()
      }
    },
    'pullup:done' (uuid) {
      if (uuid === this.uuid) {
        this._xscroll.unplug(this.pullup)
      }
    },
    'scroller:reset' (uuid) {
      if (uuid === this.uuid) {
        this.reset()
      }
    },
    'pullup:disable' (uuid) {
      if (uuid === this.uuid) {
        this.pullup.stop()
      }
    },
    'pullup:enable' (uuid) {
      if (uuid === this.uuid) {
        this.pullup.restart()
      }
    }
  },
  beforeDestroy () {
    if (this.pullup) {
      this._xscroll.unplug(this.pullup)
      this.pullup.pluginDestructor()
    }
    if (this.pulldown) {
      this._xscroll.unplug(this.pulldown)
      this.pulldown.pluginDestructor()
    }
    this._xscroll.destroy()
    this._xscroll = null
  }
}
</script>

<style>
.xs-plugin-pullup-container {
  text-align: center;
}
</style>

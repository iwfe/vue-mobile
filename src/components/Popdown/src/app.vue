<template>
  <div ref="down" class="load-parent">
    <div class="loadmore-content is-transition">
      <div class="load-main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Popdown from './index'

export default {
  props: {
    topPullText: {
      type: String,
      default: '下拉刷新'
    },
    topDropText: {
      type: String,
      default: '松开刷新'
    },
    bottomPullText: {
      type: String,
      default: '上拉刷新'
    },
    bottomDropText: {
      type: String,
      default: '释放更新'
    },
    minHeight: {
      type: Number,
      default: window.innerHeight
    },
    pullCallback: {
      type: Function,
      default: () => {}
    },
    pushCallback: {
      type: Function,
      default: () => {}
    },
    pushEvent: {
      type: Boolean,
      default: true
    },
    pullEvent: {
      type: Boolean,
      default: true
    },
    offSettop: {
      type: Number,
      default: 70
    },
    scrollEvent: {
      type: String,
      default: 'window'
    }
  },
  data () {
    return {
      load: ''
    }
  },
  mounted () {
    this.load = Popdown({
      container: this.$refs.down,
      minheight: this.minHeight,
      pullcallback: this.pullCallback,
      pushcallback: this.pushCallback,
      scrollevent: this.scrollEvent,
      pullevent: this.pullEvent,
      pushevent: this.pushEvent
    })
  },
  methods: {
    reset () {
      this.load.reset()
    },
    setPushEvent (params) {
      this.load.pushEvent = params
    },
    setPullEvent (params) {
      this.load.pullEvent = params
    }
  }
}
</script>

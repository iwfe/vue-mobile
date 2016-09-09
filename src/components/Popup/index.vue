<template>
  <div class="popup-dialog {{direction}}" :transition="direction" v-show="show" :style="{width: width, height: height}">
    <slot></slot>
  </div>
</template>

<script lang="babel">
  export default {
    components: {},
    data() {
      return {}
    },
    props: {
      show: {
        type: Boolean,
        default: false,
        twoWay: true,
        required: true
      },
      direction: {
        type: String,
        default: 'up' // up, down, left, right
      },
      height: {
        type: String,
        default: '50%'
      },
      width: {
        type: String,
        default: '100%'
      },
      clickMaskHide: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      show(val) {
        if (val) {
          document.querySelectorAll('.fe-mask')[0].classList.add('show')
        } else {
          document.querySelectorAll('.fe-mask')[0].classList.remove('show')
        }
      }
    },
    ready() {
      if (!!document.querySelectorAll('.fe-mask').length <= 0) {
        this.divMask = document.createElement('a')
        this.divMask.className = 'fe-mask'
        this.divMask.href = 'javascript:void(0)'
        document.body.appendChild(this.divMask)
      }
      if (this.clickMaskHide) {
        document.querySelectorAll('.fe-mask')[0].addEventListener('click', () => { this.show = false })
        document.querySelectorAll('.fe-mask')[0].addEventListener('touchstart', () => { this.show = false })
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .popup-dialog {
    position: fixed;
    background: #eee;
    z-index: 101;
    transition-property: transform;
    -webkit-transition-property: transform;
    transition-duration: 200ms;
    -webkit-transition-duration: 200ms;

    &.up {
      bottom: 0;
      left: 0;
    }
    &.down {
      top: 0;
      left: 0;
    }
    &.left {
      top: 0;
      left: 0;
    }
    &.right {
      top: 0;
      right: 0;
    }
  }

  .up-enter {
    transform: translate3d(0, 100%, 0);
    -webkit-transform: translate3d(0, 100%, 0);
  }
  .up-leave {
    transform: translate3d(0, 100%, 0);
    -webkit-transform: translate3d(0, 100%, 0);
  }

  .down-enter {
    transform: translate3d(0, -100%, 0);
    -webkit-transform: translate3d(0, -100%, 0);
  }
  .down-leave {
    transform: translate3d(0, -100%, 0);
    -webkit-transform: translate3d(0, -100%, 0);
  }

  .left-enter {
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }
  .left-leave {
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }

  .right-enter {
    transform: translate3d(-100%, 0, 0);
    -webkit--webkit-transform: translate3d(-100%, 0, 0);
  }
  .right-leave {
    transform: translate3d(-100%, 0, 0);
    -webkit-transform: translate3d(-100%, 0, 0);
  }
</style>

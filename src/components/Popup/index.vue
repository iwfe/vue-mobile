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
      console.log(this.show)
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
    transition-duration: 300ms;

    &.up {
      bottom: 0;
      left: 0;
      width: 100%;
    }
    &.down {
      top: -100%;
      left: 0;
      width: 100%;
    }
    &.left {
      top: 0;
      left: 100%;
      height: 100%;
    }
    &.right {
      top: 0;
      left: -100%;
      height: 100%;
    }
  }

  .up-transiton {
  }
  .up-enter {
    transform: translate3d(0, 100%, 0);
  }
  .up-leave {
    transform: translate3d(0, 100%, 0);
  }
</style>

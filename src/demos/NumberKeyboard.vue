<template>
  <div class="number-kb-panel">
    <span class="place-holder" v-show="room === ''">请输入数字</span>
    <input type="tel" maxlength="3" v-model.number="room" class="num-input"/>
    <span class="tap" v-show="room > 0">室</span>
    <span class="tap sec" v-show="room > 10">厅</span>
    <span class="tap thd" v-show="room > 100">卫</span>
  </div>
</template>

<script>
  import NumberKeyboard from '../components/NumberKeyboard'
  export default {
    data () {
      return {
        room: ''
      }
    },
    components: {
      NumberKeyboard
    }
  }
</script>

<style lang="less" scoped>
  .number-kb-panel {
    position: relative;
    text-align: left;
    font-size: 12px;
    background-color: white;
    z-index: 0;
    width: 220px;
    .num-input {
      background-color: transparent;
      border: 1px solid #eee;
      height: 30px;
      width: 220px;
      outline: none;
      letter-spacing: 26px;
      z-index: 1;
    }
    .tap {
      position: absolute;
      left: 16px;
      top: 6px;
      &.sec {
        left: 50px;
      }
      &.thd {
        left: 80px;
      }
    }
    .place-holder {
      position: absolute;
      left: 6px;
      top: 6px;
      color: #999;
      letter-spacing: 2px;
      z-index: -1;
    }
  }
</style>

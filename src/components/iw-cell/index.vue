<template>
  <div class="iw-cell">
    <div class="left-item">
      <i class="item-icon iconfont" :class="icon"></i>
      <span class="title">{{title}}</span>
      <span class="info">{{info}}</span>
    </div>
    <i class="right-icon iconfont" :class="rightIcon"></i>
    <p class="iw-cell-line"></p>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      info: String,
      icon: String,
      rightIcon: {
        type: String,
        default: 'if-arrow-right'
      }
    }
  }
</script>

<style lang="less">
.iw-cell {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  padding: 0 15px;
  display: flex;
  font-size: 16px;
  .left-item {
    flex: 1;
  }
  .item-icon {
    float: left;
  }
  .title {
    float: left;
    padding-left: 14px;
  }
  .info {
    float: right;
    color: rgb(153, 153, 153);
  }
  .right-icon {
    width: 46px;
  }
  .iw-cell-line {
    position: absolute;
    border-bottom: 1px solid #E5E5E5;
    left: 15px;
    bottom: 1px;
    width: 100%;
  }
}
</style>

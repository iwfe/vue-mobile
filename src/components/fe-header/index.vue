<template>
  <header class="fe-header">
    <div class="title">{{title}}</div>
    <div class="desc">{{desc}}</div>
  </header>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'vue-mobile'
      },
      desc: {
        type: String,
        default: '爱屋吉屋vue组件库'
      }
    }
  }
</script>
<style lang="less">
  .fe-header{
    height: 100px;
    background-color: #4c9da0;
    color: #fff;
    font-size: 24px;
    text-align: center;
    line-height: 100px;
    // padding-top: 20px;
    .title,.desc{
      // margin-top: 20px;
      height: 50px;
      line-height: 50px;
    }
    .title{
      font-size: 32px;
      line-height: 70px;
    }
    .desc{
      font-size: 14px;
    }
  }
</style>

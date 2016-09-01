<template>
  <header class="fe-header">
    <div class="title">{{title}}<p>{{desc}}</p></div>

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
    .title{
      // margin-top: 20px;
    }
    p{
      font-size: 16px;
    }
  }
</style>

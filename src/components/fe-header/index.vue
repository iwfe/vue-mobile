<template>
  <header class="fe-header">
    {{title}}
  </header>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'vue-mobile'
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
  }
</style>

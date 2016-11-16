<template>
  <div class="foot-panel">
    <div class="foot-item">
      <router-link :to="{ name: 'home' }">
        <i class="iconfont if-detailcollected"></i>
        <p>Home</p>
      </router-link>
    </div>
    <div class="foot-item">
      <router-link :to="{ name: 'demos' }">
        <i class="iconfont if-favourite"></i>
        <p>Demos</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    }
  }
</script>

<style lang="less">
.foot-panel {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 68px;
  background-color: #fff;
  font-size: 12px;
  .iconfont {
    font-size: 22px;
  }
  .foot-item {
    flex: 1;
    margin: auto;
  }
}
</style>

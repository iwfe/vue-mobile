<template>
  <div class="home">
    <div class="logo">
      <img src="./assets/logo.png"/>
      <p class="version">v0.1.0</p>
    </div>
    <div class="center">
      <iw-cell icon="if-favourite" title="Done" />
      <iw-cell icon="if-favourite" title="Github" info="Star me" />

    </div>
  </div>
</template>
<script>
  // import * as Demos from './demos'
  import Group from './components/Group'
  import IwCell from './components/iw-cell'
  import groups from './menus'

  export default {
    components: {
      Group,
      IwCell
    },
    data () {
      return {
        groups: groups
      }
    }
  }
</script>
<style lang="less">
.home {
  height: 100%;
  background-color: #EFEFF4;
  .logo {
    padding: 90px 0 68px 0;
    img {
      width: 50px;
      height: 43px;
    }
  }
  .center {

  }

}

</style>

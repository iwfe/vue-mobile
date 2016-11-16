<template>
  <div class="home">
    <div class="logo">
      <img src="./assets/logo.png"/>
      <p class="version">v0.1.0</p>
    </div>
    <div class="center">
      <iw-cell icon="if-favourite" title="Done" needline="false"/>
      <div class="nd-pad">
        <iw-cell icon="if-subway" title="Github" info="Star me"/>
        <iw-cell icon="if-entrust-mgmt" title="Settings" needline="false"/>
      </div>
    </div>
    <iw-footer />
  </div>
</template>
<script>
  // import * as Demos from './demos'
  import IwFooter from './components/iw-footer'
  import IwCell from './components/iw-cell'
  import groups from './menus'

  export default {
    components: {
      IwFooter,
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
  .nd-pad {
    margin-top: 14px;
  }

}

</style>

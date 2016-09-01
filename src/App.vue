<template>
  <div>
    <fe-header v-link="{name:'home'}" :title="title"></fe-header>
    <router-view :transition="viewTransition"></router-view>
  </div>
</template>
<script>
  import FeHeader from './components/fe-header'
  import store from './vuex/store'
  require('./transition.js')
  export default {
    components: {
      FeHeader
    },
    store: store,
    vuex: {
      getters: {
        route: (state) => state.route,
        isLoading: (state) => state.isLoading,
        direction: (state) => state.direction
      }
    },
    ready () {
    },
    computed: {
      headerTransition () {
      },
      viewTransition () {
        return this.direction === 'forward' ? 'fe-slide-in' : 'fe-slide-out'
      },
      title () {
        const name = this.route.name
        if (name === 'home') {
          return 'vue-mobile'
        }
        return `${this.route.name}组件`
      }
    }
  }
</script>
<style lang="less">
@import "./styles/transition.less";
</style>

<template>
  <div>
    <fe-header v-link="{name:'home'}" :title="title" :desc="desc"></fe-header>
    <router-view :transition="viewTransition"></router-view>
  </div>
</template>
<script>
  import FeHeader from './components/fe-header'
  import store from './vuex/store'
  import util from './libs/util'
  import { componentsList } from './demo/config'
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
      curRoute () {
        const name = this.route.name
        if (!name) return {}
        if (name === 'home') {
          return {
            name: 'vue-mobile',
            desc: '爱屋吉屋vue组件库',
            link: { name: 'home' }
          }
        }
        return util.findItem(componentsList(), 'name', name)
      },
      title () {
        return this.curRoute.name
      },
      desc () {
        return this.curRoute.desc
      }
    }
  }
</script>
<style lang="less">
@import "./styles/transition.less";
</style>

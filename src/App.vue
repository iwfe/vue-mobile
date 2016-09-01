<template>
  <div>
    <fe-header></fe-header>
    <router-view></router-view>
  </div>
</template>
<script>
  import FeHeader from './components/fe-header'
  import store from './vuex/store'
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
      console.log(this.$route)
    },
    computed: {
      title () {
        return this.$route.name
      }
    }
  }
</script>

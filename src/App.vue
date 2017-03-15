<template>
  <div id="app">
    <!-- <router-link to="{ name: 'home' }">
      <fe-header />
    </router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
  // import FeHeader from './components/FeHeader'

  export default {
    name: 'app',
    components: {
      // FeHeader
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

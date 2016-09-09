<template>
  <div>
    <button @click="show.demo1 = true">Show Popup</button>

    <popup :show.sync="show.demo1">
      <button @click="show.demo1 = false">hide Popup</button>
    </popup>
  </div>
</template>

<script lang="babel">
  import Popup from '../components/Popup'

  export default {
    components: {
      Popup
    },
    data() {
      return {
        show: {
          demo1: false
        }
      }
    },
    props: {},
    ready() {

    },
    methods: {}
  }
</script>

<style lang="less">

</style>

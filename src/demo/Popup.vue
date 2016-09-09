<template>
  <div>
    <button @click="show.demo1 = true">Show Popup</button>
    <button @click="show.demo2 = true">Show Popdown</button>
    <button @click="show.demo3 = true">Show Popleft</button>
    <button @click="show.demo4 = true">Show Popright</button>

    <popup :show.sync="show.demo1">
      <button @click="show.demo1 = false">hide</button>
    </popup>
    <popup :show.sync="show.demo2" direction="down">
      <button @click="show.demo2 = false">hide</button>
    </popup>
    <popup :show.sync="show.demo3" direction="left" height="100%">
      <button @click="show.demo3 = false">hide</button>
    </popup>
    <popup :show.sync="show.demo4" direction="right" height="100%">
      <button @click="show.demo4 = false">hide</button>
    </popup>
  </div>
</template>

<script lang="babel">
  import Popup from '../components/popup'

  export default {
    components: {
      Popup
    },
    data() {
      return {
        show: {
          demo1: false,
          demo2: false,
          demo3: false,
          demo4: false
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

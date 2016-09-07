<template>
  <div>
    <datetime show-format="YYYY年MM月DD日HH时mm分" format="YYYY-MM-DD HH:mm"></datetime>
  </div>
</template>
<script>
  import Datetime from '../components/datetime'
  export default {
    data () {

    },
    components: {
      Datetime
    },
    ready () {
    }
  }
</script>

<template>
  <picker :data="arr" :value.sync="arr1"></picker>
</template>
<script lang="babel">
  import Picker from '../components/picker/index.vue'

  let years = []
  for (var i = 2000; i <= 2030; i++) {
    years.push({
      name: i + '年',
      value: i + ''
    })
  }
  export default {
    components: {
      Picker
    },
    data() {
      return {
        /*eslint no-labels: ["error", { "allowLoop": true }]*/
        arr: [years, [1, 2, 3, 4, 5]],
        arr1: ['']
      }
    },
    watch: {
      arr1(val) {
        console.log('arr1:' + val)
      }
    }
  }
</script>

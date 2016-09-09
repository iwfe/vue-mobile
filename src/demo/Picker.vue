<template>
  <picker :picker-data="arr"></picker>
</template>
<script lang="babel">
  import Picker from '../components/picker/index.vue'
  export default {
    components: {
      Picker
    },
    data() {
      return {
        /*eslint no-labels: ["error", { "allowLoop": true }]*/
        arr: [
          [{name: '2000', value: 10},
            {name: '2001', value: 11},
            {name: '2002', value: 12},
            {name: '2003', value: 13},
            {name: '2004', value: 14},
            {name: '2005', value: 15},
            {name: '2006', value: 16}],
          [{name: '1', value: 17},
            {name: '2', value: 18},
            {name: '3', value: 19},
            {name: '4', value: 20},
            {name: '5', value: 21},
            {name: '6', value: 22},
            {name: '7', value: 23}],
          [{name: 'one', value: 24},
            {name: 'two', value: 25},
            {name: 'three', value: 26},
            {name: 'four', value: 27},
            {name: 'five', value: 28},
            {name: 'six', value: 29},
            {name: 'seven', value: 30}]
        ]
      }
    }
  }
</script>

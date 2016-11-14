<template>
  <div>
    <group v-for="group in groups" :title="group.groupTitle" >
      <router-link :to="item.link"  v-for="item in group.groupItems">
        <cell :desc="item.desc" :link="item.link"></cell>
      </router-link>
    </group>
  </div>
</template>
<script>
  // import * as Demos from './demos'
  import Group from './components/Group'
  import Cell from './components/Cell'

  const groups = require('./menus')
  export default {
    components: {
      Group,
      Cell
    },
    data () {
      return {
        groups: groups
      }
    }
  }
</script>
<style>
  .weui_cell_primary {
    text-align: left;
    padding-left: 10px;
  }
</style>

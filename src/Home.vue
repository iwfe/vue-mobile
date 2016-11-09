<template>
  <div>
    <group title="组件">
      <router-link :to="component.link"  v-for="component in demos">
        <cell :title="component.name" :desc="component.desc" :link="component.link"></cell>
      </router-link>
    </group>
  </div>
</template>
<script>
  // import * as Demos from './demos'
  import Group from './components/Group'
  import Cell from './components/Cell'

  export default {
    components: {
      Group,
      Cell
    },
    data () {
      return {
        demos: [
          {
            name: 'Input',
            desc: 'input组件',
            link: { name: 'input' }
          }
        ]
      }
    }
  }
</script>

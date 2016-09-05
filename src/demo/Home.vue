<template>
  <div>
    <group title="组件">
      <cell :title="component.name" :desc="component.desc" :link="component.link" v-for="component in componentsList"></cell>
    </group>
  </div>
</template>

<script>
import Group from '../components/group'
import Cell from '../components/cell'
import { componentsList } from './config'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      componentsList: componentsList()
    }
  },
  ready () {
  }
}
</script>

<style lang="less">
html {
  height: 100%;
  width: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(251, 249, 254);
}

#app {
  color: #2c3e50;
  text-align: left;
  height: 100%;
  width: 100%;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

#app p {
  margin: 0;
  padding: 0;
}

.logo {
  width: 100px;
  height: 100px
}


</style>

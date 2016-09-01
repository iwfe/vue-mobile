<template>
  <div id="app">
    <group title="组件">
      <cell title="Input" desc="input组件" :link="{name:'input'}"></cell>
    </group>
</template>

<script>
import Group from '../components/group'
import Cell from '../components/cell'

export default {
  components: {
    Group,
    Cell
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

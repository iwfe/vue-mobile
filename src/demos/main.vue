<template>
  <div class="demos-panel">
    <div class="search">
      <input type="text" class="search-input" @focus="hideSearchTip = true" @blur="searchBlur" v-model="search"/>
      <span class="input-tip" :class="{hide : hideSearchTip}"><i class="iconfont if-message"></i>搜索</span>
    </div>
    <group v-for="group in groups" :key="group.groupTitle" :title="group.groupTitle">
      <router-link :to="item.link"  v-for="(item, index) in group.groupItems">
        <iw-cell :title="item.desc" :link="item.link" :icon="item.icon" :needline="index < (group.groupItems.length - 1)"></iw-cell>
      </router-link>
    </group>
  </div>
</template>
<script>
  // import * as Demos from './demos'
  import Group from '../components/Group'
  import IwCell from '../components/iw-cell'
  import groups from '../menus'

  export default {
    components: {
      Group,
      IwCell
    },
    data () {
      return {
        search: '',
        groups: groups,
        hideSearchTip: false
      }
    },
    methods: {
      searchBlur () {
        if (this.search !== '') {
          this.hideSearchTip = true
        } else {
          this.hideSearchTip = false
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.demos-panel {
  .search {
    position: relative;
    height: 44px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    height: 44px;
    line-height: 44px;
    padding: 0 15px;
    .input-tip {
      position: absolute;
      left: 50%;
      top: 0;
      font-size: 14px;
      color: #b2b2b2;
    }
    .search-input {
      background-color: #fff;
      background-color: #fff;
      width: 100%;
      height: 28px;
      line-height: 28px;
      border-radius: 2px;
      border-style: none;
      outline: none;
      font-size: 14px;
    }
    .hide {
      display: none;
    }
  }
  .weui_cell_primary {
    text-align: left;
    padding-left: 10px;
  }
  .weui_cells_title {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 15px;
    padding-right: 0;
    color: #888;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    text-align: left;
  }
}
</style>

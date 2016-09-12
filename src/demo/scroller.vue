<template>
  <div>
    <scroller lock-y :scrollbar-x="false">
        <div class="box1">
          <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
        </div>
    </scroller>
  </div>
</template>
<script>
  import scroller from '../components/scroller'
  export default {
    components: {
      scroller
    }
  }
</script>
<style lang="less">
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
</style>

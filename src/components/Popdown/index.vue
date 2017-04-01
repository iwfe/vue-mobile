<template>
  <popdown 
    :pull-callback="pullback"
    :push-callback="pushback"
    ref="pop">
    <div class="demo" v-for="item in list">{{item}}</div> 
  </popdown>
</template>

<script>
import Popdown from './src/app.vue'

export default {
  data () {
    return {
      list: [],
      total: '',
      num: 0
    }
  },
  components: {
    Popdown
  },
  mounted () {
    this.pullback()
  },
  methods: {
    pullback () {
      this.num = 0
      this.total = 0
      this.list = []
      const arr = []
      this.$refs.pop.setPushEvent(true) // 有一页
      for (let i = 0, len = 10; i < len; i++) {
        arr.push(i)
        this.total++
      }
      this.list = arr
      setTimeout(() => {
        this.$refs.pop.reset()
      }, 2000)
    },
    pushback () {
      this.num += 1
      const arr = []
      for (let i = 0, len = 10; i < len; i++) {
        arr.push(this.total)
        this.total++
      }
      setTimeout(() => {
        this.list = this.list.concat(arr)
        this.$refs.pop.reset()
      }, 2000)
      if (this.num >= 3) {
        this.$refs.pop.setPushEvent(false) // 无
      }
    }
  }
}
</script>

<style lang="less">
.demo {
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 12px;
}
</style>

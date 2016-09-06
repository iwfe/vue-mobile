<template>
  <div class="datetime">
    <p class="data-slot" v-for="slot in dataSlots">
      <span class="sp" v-for="d in slot" @click="change()">{{d}}</span>
    </p>
  </div>
</template>
<script>
  export default {
    props: {
      startYear: {
        type: Number
      },
      endYear: {
        type: Number
      },
      format: {
        type: String,
        default: 'YYYY-MM-DD HH:mm'
      }
    },
    data () {
      return {
        startM: 1,
        endM: 12,
        startD: 1,
        endD: 31,
        startH: 1,
        endH: 24,
        startm: 1,
        endm: 60,
        dataSlots: []
      }
    },
    ready () {
      this.init()
    },
    methods: {
      init () {
        this.initData()
        const initMap = {
          Y: [this.startY, this.endY],
          M: [this.startM, this.endM],
          D: [this.startD, this.endD],
          H: [this.startH, this.endH],
          m: [this.startm, this.endm]
        }
        this.getSlots(initMap)
        // window.alert(JSON.stringify(this.dataSlots))
      },
      initData () {
        let now = new Date()
        this.startY = !!this.startYear ? this.startYear : (now.getFullYear() - 5)
        this.endY = !!this.endYear ? this.endYear : (now.getFullYear() + 5)
      },
      initFormat () {
        let reg = /(?:(YYYY)(.*))?(?:(MM)(.*))?(DD)(HH)(mm)/
      },
      getArray (start, end) {
        let arr = []
        for (let i = start; i <= end; i++) {
          if (i < 10) i = `0${i}`
          arr.push(i)
        }
        return arr
      },
      getSlots (dateMap) {
        for (let d in dateMap) {
          let [start, end] = dateMap[d]
          this.dataSlots.push(this.getArray(start, end))
        }
      },

      change () {

      },
      comfirm () {
      }
    }
  }
</script>
<style lang="less" scoped>
  .datetime {
    display: flex;
    .data-slot {
      flex: 0;
      .sp {
        display: inline-block;
        width: 40px;
        border: solid 1px #e9e9e9;
        text-align: center;
      }
    }
  }
</style>

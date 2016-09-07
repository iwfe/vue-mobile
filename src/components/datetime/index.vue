<template>
  <div class="datetime">
    <p class="data-slot" v-for="slot in dataSlots">
      <span class="sp" v-for="d in slot.data" @click="change()">{{d}}</span>
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
      },
      showFormat: {
        type: String,
        default: ''
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
        dataSlots: [],
        initMap: {}
      }
    },
    ready () {
      this.init()
    },
    methods: {
      init () {
        this.initData()
        const fmt = this.getFormat()
        console.log(JSON.stringify(fmt));
        this.initMap = {
          Y: [fmt.Y.isNeed, fmt.Y.append, this.startY, this.endY],
          M: [fmt.M.isNeed, fmt.M.append, this.startM, this.endM],
          D: [fmt.D.isNeed, fmt.D.append, this.startD, this.endD],
          H: [fmt.H.isNeed, fmt.H.append, this.startH, this.endH],
          m: [fmt.m.isNeed, fmt.m.append, this.startm, this.endm]
        }
        this.getSlots(this.initMap)
      },
      initData () {
        const now = new Date()
        this.startY = !!this.startYear ? this.startYear : (now.getFullYear() - 5)
        this.endY = !!this.endYear ? this.endYear : (now.getFullYear() + 5)
      },
      getFormat () {
        const reg = /(Y{4}|Y{2})?([^M{2}D{2}H{2}m{2}]*)?(M{2})?([^D{2}H{2}m{2}]*)?(D{2})?([^H{2}m{2}]*)?(H{2})?([^m{2}]*)?(m{2})?(.*)?/
        const res = reg.exec(this.format) // ["YYYY-MM-DD HH:mm", "YYYY", "-", "MM", "-", "DD", " ", "HH", ":", "mm", undefined]
        let sres = {}
        if (!!this.showFormat) {
          sres = reg.exec(this.showFormat)
        }
        return {
          Y: {isNeed: !!res[1], append: sres[2]},
          M: {isNeed: !!res[3], append: sres[4]},
          D: {isNeed: !!res[5], append: sres[6]},
          H: {isNeed: !!res[7], append: sres[8]},
          m: {isNeed: !!res[9], append: sres[10]}
        }
      },
      getArray (start, end, append) {
        if (!append) append = ''
        const arr = []
        for (let i = start; i <= end; i++) {
          if (i < 10) i = `0${i}`
          arr.push(`${i}${append}`)
        }
        return arr
      },
      getSlots (dateMap) {
        for (const d in dateMap) {
          const [isNeed, append, start, end] = dateMap[d]
          if (!isNeed) continue;
          this.dataSlots.push(this.initSlot(d, start, end, append))
        }
      },
      initSlot (type, start, end, append) {
        return {type: type, data: this.getArray(start, end, append)}
      },
      change (curData) {
        // 改变日
        const dd = this.initMap.D
        const [isNeed, append, start] = dd
        if (dd[0]) {
          const slots = this.dataSlots;
          for (const i in slots) {
            if (slots[i].type === 'D') {
              const maxDay = this.getMaxDay(2016, 2)
              slots[i] = this.initSlot('D', start, maxDay, append)
              this.dataSlots = []
              this.dataSlots = slots
              // this.dataSlots.$set(slots)
              return
            }
          }
        }
      },
      getMaxDay (year, month) {
        year = parseFloat(year)
        month = parseFloat(month)
        if (month === 2) {
          return this.isLeapYear(year) ? 29 : 28
        }
        return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31
      },
      isLeapYear (year) {
        return year % 100 !== 0 && year % 4 === 0 || year % 400 === 0
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
        width: 50px;
        border: solid 1px #e9e9e9;
        text-align: center;
      }
    }
  }
</style>

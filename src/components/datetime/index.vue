<template>
  <div>
    <p>显示格式：<input type="input" v-model="showFormat" value="{{showFormat}}" style="width:300px" @change="init"/></p>
    <p>返回格式：<input type="input" v-model="format" style="width:300px" @change="init"/></p>

    <p>
      <input type="button" value="OK" @click="comfirm()"/>
      <input type="input" id="result" style="width:300px"/>
    </p>
    <div class="datetime">
      <p class="data-slot" v-for="(index, slot) in dataSlots">
        <span class="sp" v-for="d in slot.data" :class="{selected : slot.value == d}" @click="change(index, $event)" data-value="{{d}}">{{d}}{{slot.append}}</span>
      </p>
    </div>
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
        initMap: {},
        dataNeedTypes: [] // 显示的列的类型 如['Y','M','D']
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
        // 设置dataNeedTypes
        if (!!res[1]) this.dataNeedTypes.push('Y')
        if (!!res[3]) this.dataNeedTypes.push('M')
        if (!!res[5]) this.dataNeedTypes.push('D')
        if (!!res[7]) this.dataNeedTypes.push('H')
        if (!!res[9]) this.dataNeedTypes.push('m')

        return {
          Y: {isNeed: !!res[1], append: sres[2]},
          M: {isNeed: !!res[3], append: sres[4]},
          D: {isNeed: !!res[5], append: sres[6]},
          H: {isNeed: !!res[7], append: sres[8]},
          m: {isNeed: !!res[9], append: sres[10]}
        }
      },
      getSlots (dateMap) {
        this.dataSlots = []
        for (const d in dateMap) {
          const [isNeed, append, start, end] = dateMap[d]
          if (!isNeed) continue;
          this.dataSlots.push(this.initSlot(d, start, end, append))
        }
      },
      initSlot (type, start, end, append) {
        const defaultVal = start < 10 ? `0${start}` : start
        if (!append) append = ''
        return {type: type, value: defaultVal, append: append, data: this.getArray(start, end)}
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
      // value: ['val1', 'val2']
      getTypeVals (value) {
        let i = 0
        let typeVals = {}
        for (const ty in this.initMap) {
          if (this.initMap[ty][0]) { // 显示
            typeVals[ty] = value[i]
            i++
          }
        }
        return typeVals
      },
      getSelValue () {
        let curData = []
        const slots = $('.data-slot').each(function () {
          const val = $(this).find('.selected').data('value')
          curData.push(val)
        })
        return curData
      },
      change (index, event) {
        // Test
        $(event.target).siblings('.selected').removeClass('selected').end().addClass('selected')
        const curData = this.getSelValue()

        // 如果改变了年或月，则改变日
        const changeType = this.dataNeedTypes[index]
        const dd = this.initMap.D
        const [isNeed, append, start] = dd
        if ((changeType === 'Y' || changeType === 'M') && isNeed) {
          const slots = this.dataSlots;
          const typeVals = this.getTypeVals(curData)
          for (const i in slots) {
            if (slots[i].type === 'D') {
              let now = new Date()
              if (!typeVals.Y) typeVals.Y = now.getFullYear
              if (!typeVals.M) typeVals.M = now.getMonth + 1
              const maxDay = this.getMaxDay(typeVals.Y, typeVals.M)
              const dslot = this.initSlot('D', start, maxDay, append)
              this.dataSlots.$set(i, dslot)
              return
            }
          }
        }

        // test
        this.comfirm()
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
        const curData = this.getSelValue()
        const ntypes = this.dataNeedTypes
        let res = this.format
        // window.alert(JSON.stringify(ntypes))
        for (let i = 0; i < ntypes.length; i++) {
          const type = ntypes[i]
          const val = curData[i]
          if (type === 'Y') res = res.replace(/(Y{4}|Y{2})/, val)
          else if (type === 'M') res = res.replace('MM', val)
          else if (type === 'D') res = res.replace('DD', val)
          else if (type === 'H') res = res.replace('HH', val)
          else if (type === 'm') res = res.replace('mm', val)
        }
        $('#result').val(res)
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
      .selected {
        background: #3fd7ea;
      }
    }
  }
</style>

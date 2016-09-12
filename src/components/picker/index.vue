<template>
  <div class="fe-picker">
    <div class="fe-flexbox fe-flex-row">
      <div class="fe-flexbox-item" v-for="(index, one) in data">
        <div class="fe-picker-item" :id="'fe-picker-' + uuid + '-' + index"></div>
      </div>
    </div>
  </div>
</template>
<script lang="babel">
  import Scroller from './scroller'
  export default {
    props: {
      data: {
        type: Array
      },
      columns: {
        type: Number,
        default: 0
      },
      value: {
        type: Array,
        twoWay: true
      },
      itemClass: {
        type: String,
        default: 'scroller-item'
      }
    },
    data() {
      return {
        scroller: [],
        uuid: Math.random().toString(36).substring(3, 8),
        count: 0
      }
    },
    ready() {
      this.$nextTick(() => {
        this.render(this.data, this.value)
      })
    },
    methods: {
      getId(i) {
        return `#fe-picker-${this.uuid}-${i}`
      },
      render(data, value) {
        this.count = this.data.length
        const _this = this
        if (!data || !data.length) {
          return
        }
        let count = this.data.length
        // set fist item as default value
        if (value.length < count) {
          for (let i = 0; i < count; i++) {
            _this.value.$set(i, data[i][0].value || data[i][0])
          }
        }

        for (let i = 0; i < data.length; i++) {
          if (!document.querySelector(_this.getId(i))) {
            return
          }
          // destroy the old item
          _this.scroller[i] && _this.scroller[i].destroy()
          _this.scroller[i] = new Scroller(_this.getId(i), {
            data: data[i],
            defaultValue: value[i] || data[i][0].value,
            itemClass: _this.itemClass,
            onSelect(value) {
              _this.value.$set(i, value)
            }
          })
          if (_this.value) {
            _this.scroller[i].select(value[i])
          }
        }
      }
    }
  }
</script>
<style lang="less">
  .fe-picker {
    overflow: hidden;
  }

  .fe-flexbox {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 24px;
    position: relative;

    .fe-flexbox-item {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      min-width: 20px;
      width: 0;
    }

    .scroller-component {
      display: block;
      position: relative;
      height: 238px;
      overflow: hidden;
      width: 100%;
    }
    .scroller-component-content, .scroller-component-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .scroller-item {
      text-align: center;
      font-size: 16px;
      height: 34px;
      line-height: 34px;
      color: #000;
    }
    .scroller-component-mask {
      height: 100%;
      margin: 0 auto;
      z-index: 3;
      background-image: -webkit-linear-gradient(top,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),-webkit-linear-gradient(bottom,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
      background-image: linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));
      background-position: top,bottom;
      background-size: 100% 102px;
      background-repeat: no-repeat;
    }
    .scroller-component-indicator {
      width: 100%;
      height: 34px;
      position: absolute;
      left: 0;
      top: 102px;
      z-index: 3;
      background-image: -webkit-linear-gradient(top,#d0d0d0,#d0d0d0,transparent,transparent),-webkit-linear-gradient(bottom,#d0d0d0,#d0d0d0,transparent,transparent);
      background-image: linear-gradient(180deg,#d0d0d0,#d0d0d0,transparent,transparent),linear-gradient(0deg,#d0d0d0,#d0d0d0,transparent,transparent);
      background-position: top,bottom;
      background-size: 100% 1px;
      background-repeat: no-repeat;
    }
  }

  .fe-flex-row {
    box-direction: row;
    box-orient: horizontal;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }
</style>

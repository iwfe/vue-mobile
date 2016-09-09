<template>
  <div class="fe-picker">
    <div class="fe-flexbox fe-flex-row">
      <div class="fe-flexbox-item" v-for="(index, data) in pickerData">
        <div class="fe-picker-item" :id="'fe-picker-' + uuid + '-' + index">
          <div class="scroller-component">
            <div class="scroller-component-mask"></div>
            <div class="scroller-component-indicator"></div>
            <div class="scroller-component-content">
              <div class="scroller-item" v-for="item in data">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="babel">
  import Scroller from './scroller'
  export default {
    props: {
      pickerData: {
        type: Array
      }
    },
    data() {
      return {
        uuid: Math.random().toString(36).substring(3, 8)
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

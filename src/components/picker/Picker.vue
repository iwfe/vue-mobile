<template>
  <div class="fe-picker">
    <div class="fe-flexbox fe-flex-row">
      <div class="fe-flexbox-item">
        <div class="fe-picker-item">
          <div class="scroller-component">
            <div class="scroller-component-mask"></div>
            <div class="scroller-component-indicator"></div>
            <div class="scrollrt-component-content">
              <div class="scroller-item">2006年</div>
              <div class="scroller-item">2007年</div>
              <div class="scroller-item">2008年</div>
              <div class="scroller-item">2009年</div>
              <div class="scroller-item">2010年</div>
              <div class="scroller-item">2011年</div>
              <div class="scroller-item">2012年</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .fe-picker {
    overflow: hidden;
  }

  .fe-flexbox {
    width: 100%;
    text-align: left;
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

    .fe-picker-item {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      min-width: 20px;
      width: 0;
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

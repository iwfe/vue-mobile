import Vue from 'vue'
import App from './App'
require('normalize.css')
require('reset.css')
require('./styles/site.css')
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

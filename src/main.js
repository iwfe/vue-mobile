import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'

require('./styles/site.css')
require('./styles/global.css')

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')

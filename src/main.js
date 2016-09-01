import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

/* demo view */
import Home from './demo/Home'
import Input from './demo/input'

Vue.use(VueRouter)
const router = new VueRouter({
  root: '/',
  mode: 'html5',
  history: true,
  saveScrollPosition: true
})
// const vm = Vue.extend({
//   template: App.template,
//   components: {
//     'fe-header':
//   }
// })
router.map({
  '/': {
    name: 'home',
    component: Home
  },
  '/demo/input': {
    name: 'input',
    component: Input
  }
})

/* reset.css */
require('normalize.css')
require('reset.css')
require('./styles/site.css')

/* eslint-disable no-new */
router.start(Vue.extend(App), '#app')

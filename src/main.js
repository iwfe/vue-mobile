import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import RouterMap from './router.map'

Vue.use(VueRouter)

const router = new VueRouter()

/**
* sync router params
*/
import { sync } from 'vuex-router-sync'
import store from './vuex/store'

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/**
* sync router loading status
*/
const commit = store.commit || store.dispatch
router.beforeEach(({ to, from, next }) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  commit('UPDATE_LOADING', true)
  setTimeout(next, 50)
})
router.afterEach(() => {
  commit('UPDATE_LOADING', false)
})

sync(store, router)

router.map(RouterMap)

/* reset.css */
require('normalize.css')
require('reset.css')
require('./styles/site.css')
require('./styles/global.css')

/* eslint-disable no-new */
router.start(Vue.extend(App), '#app')

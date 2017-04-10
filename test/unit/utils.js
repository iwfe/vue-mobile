import Vue from 'vue'

let id = 0

const createElm = function () {
  const elm = document.createElement('div')

  elm.id = 'app' + ++id
  document.body.appendChild(elm)

  return elm
}

/**
 * 回收 vm
 * @param  {Object} vm
 */
exports.destroyVM = function (vm) {
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el)
}

/**
 * 创建一个 Vue 的实例对象
 * @param  {Object|String}  component   组件配置，可直接传 template
 * @param  {Boolean=false} mounted 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createVue = function (component, mounted = false) {
  if (Object.prototype.toString.call(component) === '[object String]') {
    component = { template: component }
  }
  return new Vue(component).$mount(mounted === false ? null : createElm())
}

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  component      - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
exports.createTest = function (component, propsData = {}, mounted = false) {
  if (propsData === true || propsData === false) {
    mounted = propsData
    propsData = {}
  }
  const Constructor = Vue.extend(component)
  return new Constructor({ propsData }).$mount(mounted === false ? null : createElm())
}

import Home from './Home.vue'
// import Demos from './demos/Main.vue'
import NumberKeyboard from './demos/NumberKeyboard.vue'
const Demos = r => require.ensure([], () => r(require('./demos/Main.vue')), 'demos')
const PopDown = r => require.ensure([], () => r(require('./components/Popdown/index.vue')), 'popdown')

export default [{
  path: '/',
  component: Home
}, {
  path: '/demos',
  component: Demos
}, {
  path: '/popdown',
  component: PopDown
}, {
  path: '/numberKeyboard',
  component: NumberKeyboard
}]

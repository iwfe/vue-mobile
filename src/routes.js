import Home from './Home.vue'
// import Demos from './demos/Main.vue'
import Input from './demos/Input.vue'
const Demos = r => require.ensure([], () => r(require('./demos/Main.vue')), 'demos')

export default [{
  path: '/',
  component: Home
}, {
  path: '/demos',
  component: Demos
}, {
  path: '/input',
  component: Input
}]

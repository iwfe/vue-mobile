import Home from './Home.vue'
import Demos from './demos/Main.vue'
import Input from './demos/Input.vue'

export default [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/demos',
  name: 'demos',
  component: Demos
}, {
  path: '/input',
  name: 'input',
  component: Input
}]

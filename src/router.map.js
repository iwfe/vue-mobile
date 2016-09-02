/* demo view */
import Home from './demo/Home'
import Input from './demo/input'

export default {
  '/': {
    name: 'home',
    component: Home
  },
  '/demo/input': {
    name: 'input',
    component: Input
  }
}

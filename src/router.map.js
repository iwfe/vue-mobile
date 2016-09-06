/* demo view */
import Home from './demo/Home'
import Input from './demo/input'
import Picker from './demo/Picker'

export default {
  '/': {
    name: 'home',
    component: Home
  },
  '/demo/input': {
    name: 'input',
    component: Input
  },
  '/demo/picker': {
    name: 'picker',
    component: Picker
  }
}

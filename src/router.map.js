/**
* @Author: lancui
* @Date:   2016-09-05 11:09:00
* @Email:  lancui@superjia.com
* @Last modified by:   lancui
* @Last modified time: 2016-09-05 15:09:44
*/

/* demo view */
import Home from './demo/Home'
import Input from './demo/input'
import Datetime from './demo/datetime'
import Picker from './demo/Picker'
import Popup from './demo/Popup.vue'

export default {
  '/': {
    name: 'home',
    component: Home
  },
  '/demo/input': {
    name: 'input',
    component: Input
  },
  '/demo/datetime': {
    name: 'datetime',
    component: Datetime
  },
  '/demo/picker': {
    name: 'picker',
    component: Picker
  },
  '/demo/popup': {
    name: 'popup',
    component: Popup
  }
}

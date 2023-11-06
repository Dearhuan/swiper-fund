import copy from './copy'
import longpress from './longpress'
import debounce from './debounce'
import emoji from './emoji'
import permission from './permission'
import waterMarker from './waterMarker'

const directives = {
  copy,
  longpress,
  debounce,
  emoji,
  permission,
  waterMarker
}

export default {
  install(app) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })
  }
}
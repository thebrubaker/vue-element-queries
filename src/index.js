import VueElementQuery from './VueElementQuery'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

export default {
  install (Vue, options) {
    Vue.directive('query', {
      bind (element) {
        const veq = new VueElementQuery(ResizeSensor, element)
        element.__veq = veq
      },
      update (element) {
        const state = element.__veq
        if (state) {
          state.setInitialResize(element)
        }
      },
      unbind (element) {
        delete element.__veq
        ResizeSensor.detach(element)
      }
    })
  }
}

import ResponsiveComponent from './ResponsiveComponent'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

export default {
  install (Vue, options) {
    Vue.directive('resize', {
      inserted (element, { value }) {
        new ResponsiveComponent(ResizeSensor, element, value)
      },
      unbind (element) {
        ResizeSensor.detach(element)
      }
    })
  }
}

import Vue from 'vue'
import Example from './Example'
import VueElementQuery from '../Plugin'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

Vue.use(VueElementQuery)
Vue.directive('responsive', {
	inserted (element, { value }) {
		if (!value) {
		  return
		}

		const queryList = Object.keys(value).sort((a, b) => b - a)
		new ResizeSensor(element.parentElement, () => {
		  const breakpoint = queryList.find(breakpoint => {
		    return element.parentElement.clientWidth >= breakpoint
		  })
		  element.dataset.responsive = value[breakpoint]
		})
		element.parentElement.resizedAttached.call()
	},
	unbind (element) {
	  ResizeSensor.detach(element)
	}
})

new Vue({
  el: '#app',
  components: {
    Example
  },
  render: h => h('example')
})

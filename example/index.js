import Vue from 'vue'
import Example from './Example'
import VueElementQuery from '../dist/Plugin'
import ResponsiveComponent from '../Plugin2'

Vue.use(VueElementQuery)
Vue.use(ResponsiveComponent)

new Vue({
  el: '#app',
  components: {
    Example
  },
  render: h => h('example')
})

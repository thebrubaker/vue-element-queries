import Vue from 'vue'
import Example from './Example'
import VueElementQuery from '../dist'

Vue.use(VueElementQuery)

new Vue({
  el: '#app',
  components: {
    Example
  },
  render: h => h('example')
})

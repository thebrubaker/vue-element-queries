import VueElementQuery from './VueElementQuery';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';

export default {
  install(Vue) {
    Vue.directive('query', {
      inserted(element) {
        new VueElementQuery(ResizeSensor, element);
      },
      unbind(element) {
        ResizeSensor.detach(element);
      },
    });
  },
};

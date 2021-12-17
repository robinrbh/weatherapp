import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import {InlineSvgPlugin} from 'vue-inline-svg';
Vue.use(InlineSvgPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')

import 'core-js/stable'; // only stable feature also is possible with only `core-js`
import 'regenerator-runtime/runtime'; 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

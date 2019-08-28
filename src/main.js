import Vue from 'vue'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'

import './assets/css/styles.css'
import VueResource from 'vue-resource';
// Vue.http.options.root = 'http://localhost:8080/miniworks/';

Vue.use(VueRouter);
Vue.use(VueResource)

Vue.use(Datetime);
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})

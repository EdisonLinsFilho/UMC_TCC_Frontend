import Vue from 'vue'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

//Auto Complete
import VueSelect from 'vue-cool-select'

Vue.use(VueSelect, {
  theme: 'bootstrap'
})

//Dialog
import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } })

//Mask
import VueMask from 'v-mask'
Vue.use(VueMask);

import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes.js'

//AXIOS
import axios from 'axios'
import VueAxios from 'vue-axios'

// import {saveAs} from 'file-saver'
 
Vue.use(axios, VueAxios)

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

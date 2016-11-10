require('./bootstrap.js');

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import routes from './routes.js'
import store from './store/store.js'

Vue.use(Vuex)
Vue.use(VueRouter)



const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    base: __dirname,
    routes: routes
})

/* eslint-disable no-new */
let vm = new Vue({
  router,
  store,
  el: '#app',

  template: '<App/>',
  components: { App }
}).$mount('#app')

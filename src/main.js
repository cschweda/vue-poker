require('./bootstrap.js');

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes.js';

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    linkActiveClass: "active",
    base: __dirname,
    routes: routes
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
}).$mount('#app')

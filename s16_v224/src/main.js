import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes.js'

Vue.use(VueRouter);

const router = new VueRouter({
    routes,  //short for 'routes: routes'
    //mode: 'history' //tryb bez '#' - wymaga skonfigurowania serwera aby dla każdego requestu zwracał index.html. Domyślny mode to 'hash'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

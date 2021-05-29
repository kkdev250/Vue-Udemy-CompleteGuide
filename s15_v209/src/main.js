import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.root = 'https://vuejs-http-62c18.firebaseio.com/';  //bazowy url dla wywołań .$http
//Vue.http.options.headers... i ew. inne ustawienia
Vue.http.interceptors.push((request, next) => {
    console.log(request);
    if (request.method == 'POST') {
        //alert('POST!');
        //request.method = 'PUT';
    }
    next();
});
Vue.http.interceptors.push((request, next) => {
    next(response => {
        /*response.json = () => {
            console.log(response);
            return response.body;
        }*/
    });
});

new Vue({
  el: '#app',
  render: h => h(App)
})

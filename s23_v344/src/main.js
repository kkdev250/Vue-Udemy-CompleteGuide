import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://vue-axios-b53b6.firebaseio.com';
//axios.defaults.headers.common['Authorization'] = 'this is for all requestes';
//axios.defaults.headers.get['Accepts'] = 'this is only for get requests';

const reqInterceptor = axios.interceptors.request.use((config) => {
    console.log('Request Interceptor:', config);
    return config;
});
const resInterceptor = axios.interceptors.response.use((response) => {
    console.log('Response Interceptor:', response);
    return response;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

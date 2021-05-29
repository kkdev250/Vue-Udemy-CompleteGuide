import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'
import store from './store'

//Vue.use(axios) - NIE, dla axiosa tak nie robimy!
axios.defaults.baseURL = 'https://vue-axios-b53b6.firebaseio.com'; //global options, that will be applied to any request
axios.defaults.headers.common['Authorization'] = 'this is for all requestes';
axios.defaults.headers.get['Accepts'] = 'this is only for get requests';

const reqInterceptor = axios.interceptors.request.use((config) => {
    console.log('Request Interceptor:', config);
    //config.headers['']... można tu manipulować konfiguracją requestu
    return config; //obowiązkowo, bez tego request będzie zablokowany
});
const resInterceptor = axios.interceptors.response.use((response) => {
    console.log('Response Interceptor:', response);
    return response;
});

axios.interceptors.request.eject(reqInterceptor); //programowe wyłączenie interceptora
axios.interceptors.response.eject(resInterceptor);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

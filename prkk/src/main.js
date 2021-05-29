import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store/store';
import axios from 'axios';

axios.defaults.baseURL = 'https://vuejs-stock-trader-e508d.firebaseio.com/';

Vue.filter('currency', function(value) {
    return value.toLocaleString() + '$';
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

import Vue from 'vue'
import App from './App.vue'

Vue.filter('to-lowercase', function(value) {  //rejestracja globalna filtrów
    return value.toLowerCase();
});

Vue.mixin({ //mixin - rejestracja globalna - będzie dostępny w każdym komponencie w każdej instancji Vue
    created() {
        console.log('Global Mixin - Created Hook');
    }
});

new Vue({
  el: '#app',
  render: h => h(App)
})

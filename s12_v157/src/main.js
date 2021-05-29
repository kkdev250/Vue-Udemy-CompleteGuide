//szablon dyrektywy: v-dyrektywa:arg.modifier="value"
import Vue from 'vue'
import App from './App.vue'

Vue.directive('highlight', { //rejestracja globalna (dyrektywa: v-highlight)
    bind(el, binding, vnode) {
        //el.style.backgroundColor = 'green';
        //el.style.backgroundColor = binding.value;
        var delay = 0;
        if (binding.modifiers['delayed']) {
            delay = 3000;
        }
        setTimeout(()=>{
            if (binding.arg == 'background') { //v-highlight:background.delayed="'red'" -> binding.arg=='background', binding.value=='red', binding.modifiers.delayed==true
                el.style.backgroundColor = binding.value;
            } else {
                el.style.color = binding.value;
            }
        }, delay);
    }
}); 

new Vue({
  el: '#app',
  render: h => h(App)
})
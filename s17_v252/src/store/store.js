import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        /*doubleCounter: function(state) {
            return state.counter * 2;
        },*/
        /*doubleCounter(state) {
            return state.counter * 2;
        }*/
        doubleCounter: state => {
            return state.counter * 2;
        },
        stringCounter: state => {
            return state.counter + ' Clicks';
        }
    }
});
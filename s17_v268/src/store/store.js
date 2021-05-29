import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter';

import * as actions from './actions';  //tworzy obiekt actions zawierający wyeksportowane elementy z actions.js
import * as mutations from './mutations';
import * as getters from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        value:0 
    },
    getters,
    mutations,
    actions,

    modules: {
        counter //counter: counter
    }
});
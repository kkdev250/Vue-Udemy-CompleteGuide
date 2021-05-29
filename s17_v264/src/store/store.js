import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        doubleCounter: state => {
            return state.counter * 2;
        },
        stringCounter: state => {
            return state.counter + ' Clicks';
        }
    },
    mutations: { //W MUTACJACH NIE WOLNO UŻYWAĆ ASYNCHRONICZNEGO KODU!!! (Mutacja musi wykonać się od razu, inaczej kolejność modyfikacji danych może być różna niż kolejność commitów)
        increment: state => {
            state.counter++;
        },
        decrement: (state, payload) => {
            state.counter -= payload;
        }
    },
    actions: {  //w akcjach może być asynchroniczny kod - bo dopiero gdy akcja się wykona robiony jest commit
        increment: context => {                 //lub:  increment: ({ commit }) => {    //z obiektu (tu niejawnie obiekt 'context') wyciągamy tylko metodę commit
            context.commit('increment');        //          commit('increment')    }; 
        },
        decrement: ({ commit }, payload) => {
            commit('decrement', payload);
        },
        asyncIncrement: ({ commit }) => {
            setTimeout(()=>{
                commit('increment');
            }, 1000)
        },
        asyncDecrement: ({ commit }) => {
            setTimeout(()=>{
                commit('decrement');
            }, 1000)
        }
    }
});
import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-auth';  //'axios' - skonfigurowany do dostępu do Firebase Authentication
import globalAxios from 'axios';   //'globalAxios' - skonfigurowany do dostępu do Firebase Realtime Database
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    storeUser(state, user) {
        state.user = user;
    },
    clearAuthData(state) {
        state.idToken = null;
        state.userId = null;
    }
  },
  actions: {
    //po upływie czasu ważności tokena wywołuje logout 
    setLogoutTimer({commit, dispatch}, expirationTime) {
        setTimeout(()=>{
            dispatch('logout');
            router.replace('/signin');
        }, expirationTime * 1000);
    },
    //Firebase authentication: sign up + zapis w storze tokenu + zapis usera w db
    signup({commit, dispatch}, authData) { //z obiektu 'context' można wyciąnąć nie tylko metodę 'commit' ale i 'dispatch' (jeśli będzie potrzena)
        axios.post('/signupNewUser?key=AIzaSyAuj88F8d7w0ZmbsPSNpWoVOM_jR98CmkY', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(response => {
                console.log(response);
                commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                const now = new Date();
                const expirationDate = new Date(now.getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch('storeUser', authData);
                dispatch('setLogoutTimer', response.data.expiresIn);
            })
            .catch(error => console.log(error));
    },
    //Firebase authentication: sign in + zapis w storze tokenu
    login({commit, dispatch}, authData) {
        axios.post('/verifyPassword?key=AIzaSyAuj88F8d7w0ZmbsPSNpWoVOM_jR98CmkY', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(response => {
                console.log(response);
                commit('authUser', {
                    token: response.data.idToken,
                    userId: response.data.localId
                });
                const now = new Date();
                const expirationDate = new Date(now.getTime() + response.data.expiresIn*1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch('setLogoutTimer', response.data.expiresIn);
            })
            .catch(error => console.log(error));
    },
    tryAutoLogin({commit}) {
        const token = localStorage.getItem('token');
        if (!token) {
            return
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if (now >= expirationDate) {
            return
        }
        const userId = localStorage.getItem('userId');
        commit('authUser', {
            token: token,
            userId: userId
        });
    },
    //czyści token w storze
    logout({commit}) {
        commit('clearAuthData');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');
    },
    //Firebase - zapis usera w db
    storeUser({commit, state}, userData) {  //z obiektu 'context' można wyciąnąć nie tylko metody 'commit' czy 'dispatch', ale i obiekt 'state'
        if (!state.idToken) {
            return
        }
        globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    },
    //Firebase - odczyt userów(!) z db i zapis w storze pierwszego
    fetchUser({commit, state}) {
        if (!state.idToken) {
            return
        }
        globalAxios.get('/users.json' + '?auth=' + state.idToken)
            .then(response => {
                console.log(response);
                const data = response.data;
                const users = [];
                for (let key in data) {
                    const user = data[key];
                    user.id = key;
                    users.push(user);
                }
                console.log(users);
                commit('storeUser', users[0]);  //'storeUser' - to MUTACJA 'storeUser' a nie AKCJA 'storeUser'!
            })
            .catch(error => console.log(error))
    }
  },
  getters: {
    user(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.idToken !== null;
    }
  }
})
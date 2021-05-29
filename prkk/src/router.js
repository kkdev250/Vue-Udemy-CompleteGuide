import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';
import Portfolio from './components/Portfolio.vue';
import Stocks from './components/Stocks.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/portfolio', component: Portfolio},
    {path: '/stocks', component: Stocks},
];

export default new VueRouter({
    routes,
    mode: 'history'
})
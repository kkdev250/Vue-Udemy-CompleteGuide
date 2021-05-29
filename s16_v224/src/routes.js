import User from './components/user/User.vue';
import Home from './components/Home.vue';

export const routes = [
    { path: '', component: Home }, //uwaga: Home, a nie 'Home' !!!
    { path: '/user/:id', component: User }  //url: /user/something - ale nie samo /user
];
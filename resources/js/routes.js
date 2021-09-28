import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/visitor/Home.vue';

Vue.use(VueRouter);

let routes = [

    {
        path: '/home',
        name: 'home',
        component: Home,
    },

];

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router;

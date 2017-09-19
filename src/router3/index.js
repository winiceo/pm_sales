/**
 * Created by sailengsi on 2017/5/11.
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const _import = require('./_import_' + process.env.NODE_ENV)


import {Home, Content} from 'layout/';
import {Login} from 'views/';

// import Adv from './adv/';
import Function from './function/';
// import Demo from './demo/';
// import components from './components/';
import open from './function/open';

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            hidden: true,
            redirect(to) {
                return 'login';
            }
        }, {
            path: '/login',
            name: '登录',
            hidden: true,
            component: () => import('@/views/login/Login.vue')
        },
        {
            path: '/function',
            name: '静态演示',
            icon: 'inbox',
            component: Home,
            redirect: '/function/open',
            children: [open]
        }, {
            path: '/adv',
            name: '高级实战',
            icon: 'inbox',
            component: Home,
            redirect: '/adv/article',
            children: [{
                path: 'article',
                name: 'article-manager',
                icon: 'inbox',
                component: Content,
                redirect: '/adv/article/list',
                children: [{
                    path: 'list',
                    name: 'article-list',
                    icon: 'reorder',
                    component: () => import('@/views/adv/article/list/List.vue')
                }, {
                    path: 'edit',
                    name: 'article-edit',
                    icon: 'edit',
                    component: () => import('@/views/adv/article/edit/Edit.vue')
                }]
            }]
        }


    ]
})
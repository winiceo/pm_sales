import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import cart from './cart/';
import user from './user/';
import global from './global/';
import leftmenu from './leftmenu/';
import router from './router/';
import permission from './permission/';
import check from './check/';
import activity from './activity/';

export default new Vuex.Store({
    modules: {
        cart,
        user,
		global,
		router,
		leftmenu,
        permission,
        check,
        activity
    }
});
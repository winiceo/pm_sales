/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

import {Adv} from 'views/';
const _import = require('router/_import_' + process.env.NODE_ENV)

export default {
	path: 'article',
	name: 'article-manager',
	icon: 'inbox',
	component: Content,
	redirect: '/adv/article/list',
	children: [{
		path: 'list',
		name: 'article-list',
		icon: 'reorder',
		component: _import('adv/article/list/index')
	}, {
		path: 'edit',
		name: 'article-edit',
		icon: 'edit',
		component: _import('adv/article/edit/index')
	}]
};
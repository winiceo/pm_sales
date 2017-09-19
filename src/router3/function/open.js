/**
 * Created by sailengsi on 2017/5/11.
 */

import {Content} from 'layout/';

import {Function} from 'views/';

export default {
	path: 'open',
	name: '公共内容',
	icon: 'inbox',
	component: Content,
	redirect: '/function/open/echarts',
	children: [{
		path: 'echarts',
		name: '图表',
		icon: 'bar-chart',
		component: resolve => require(['views/function/open/echarts/Echarts.vue'], resolve)
	}, {
		path: 'list',
		name: '列表',
		icon: 'reorder',
		component: resolve => require(['views/function/open/list/List.vue'], resolve)
	}, {
		path: 'form',
		name: '表单',
		icon: 'edit',
		component: resolve => require(['views/function/open/form/Form.vue'], resolve)
	} ]
};
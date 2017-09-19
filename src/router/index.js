import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */

import {Home, Content} from 'layout/';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
    {path: '/login', component: _import('login/Login'), hidden: true},
    {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
    {path: '/404', component: _import('errorPage/404'), hidden: true},
    {path: '/401', component: _import('errorPage/401'), hidden: true},
    {
        path: '/',
        component: Home,
        redirect: '/hd/activity/index',
        name: '首页',
        hidden: true,
        children: [{path: 'dashboard', component: _import('dashboard/index')}]
    },


    {
        path: '/hd',
        name: '营销中心',
        icon: 'inbox',
        component: Home,
        redirect: '/hd/activity/index',
        children: [
            {
                path: 'activity',
                name: '活动管理',
                icon: 'inbox',
                component: Content,
                redirect: '/hd/activity/index',
                children: [{
                    path: 'index',
                    name: '活动列表',
                    icon: 'reorder',
                    component: () => import('@/views/activity/index.vue')
                    } ,
                    {
                        path: 'edit/:id',
                        alias: '',
                        name: '33',
                        title: '编辑活动',
                        hidden: true,
                        component: () => import('@/views/activity/edit.vue'),
                        children: [
                            {
                                path: 'step/1',
                                name: 'edit_step1',
                                title: '基本信息',
                                component:  () => import('@/views/activity/step1.vue'),
                                hidden: true
                            },
                            {
                                path: 'step/2',
                                name: 'edit_step2',
                                title: '奖品设定',
                                component: _import('activity/step2'),
                                hidden: true
                            },
                            {
                                path: 'step/3',
                                name: 'edit_step3',
                                title: '分享设置',
                                component: _import('activity/step3'),
                                hidden: true
                            },
                        ]

                    }
                ]
            },

            {
                path: 'check',
                name: '核销管理',
                icon: 'inbox',
                component: Content,
                redirect: '/hd/check/index',
                children: [{
                    path: 'index',
                    name: '核销中心',
                    icon: 'reorder',
                    component: () => import('@/views/check/index.vue')
                }, {
                    path: 'manange',
                    name: '核销员管理',
                    icon: 'edit',
                    component: () => import('@/views/check/manage.vue')
                }]
            }]
    },


    // {
    //     path: '/check',
    //     component: Home,
    //     redirect: '/check/index',
    //     name: '核销管理',
    //     title: '核销管理',
    //     icon: 'tubiao',
    //     children: [
    //         {path: 'index',   component: _import('check/index'),name:'asdfsdf', title: '核销中心'},
    //         {path: 'index',   component: _import('check/index'),name:'234324', title: '核销中心'}
    //
    //     ]
    // },

    // {
    //     path: '/uc',
    //     component: Home,
    //     redirect: '/uc/user',
    //     name: '个人中心',
    //     title: '个人中心',
    //     icon: 'tubiao',
    //
    //     children: [{
    //         path: 'user',
    //         name: '个人资料',
    //         icon: 'inbox',
    //         component: Content,
    //         redirect: '/uc/user/index',
    //         children: [{
    //             path: 'index',
    //             name: 'article-list2',
    //             icon: 'reorder',
    //             hidden:true,
    //             component: () => import('@/views/demo/user/list/List.vue')
    //         }, {
    //             path: 'edit',
    //             name: '修改个人信息',
    //             icon: 'edit',
    //             component: () => import('@/views/user/edit/Edit.vue')
    //         }, {
    //             path: 'access',
    //             name: 'article-edit4',
    //             icon: 'edit',
    //             hidden:true,
    //             component: () => import('@/views/demo/user/access/Access.vue')
    //         }]
    //     }]
    // },
    // {
    //     path: '/adv',
    //     name: '高级实战',
    //     icon: 'inbox',
    //     component: Home,
    //     redirect: '/adv/article',
    //     children: [{
    //         path: 'article',
    //         name: 'article-manager',
    //         icon: 'inbox',
    //         component: Content,
    //         redirect: '/adv/article/list',
    //         children: [{
    //             path: 'list',
    //             name: 'article-list',
    //             icon: 'reorder',
    //             component: () => import('@/views/adv/article/list/List.vue')
    //         }, {
    //             path: 'edit',
    //             name: 'article-edit',
    //             icon: 'edit',
    //             component: () => import('@/views/adv/article/edit/Edit.vue')
    //         }]
    //     }]
    // }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

export const asyncRouterMap = [


    //
    // {
    //     path: '/permission',
    //     component: Layout,
    //     redirect: '/permission/index',
    //     name: '权限测试',
    //     icon: 'quanxian',
    //     meta: {role: ['admin']},
    //     noDropdown: true,
    //     children: [{path: 'index', component: _import('permission/index'), name: '权限测试页', meta: {role: ['admin']}}]
    // },
    // {
    //     path: '/icon',
    //     component: Layout,
    //     icon: 'icons',
    //     noDropdown: true,
    //     children: [{path: 'index', component: _import('svg-icons/index'), name: 'icons'}]
    // },
    // {
    //     path: '/components',
    //     component: Layout,
    //     redirect: '/components/index',
    //     name: '组件',
    //     icon: 'zujian',
    //     children: [
    //         {path: 'index', component: _import('components/index'), name: '介绍 '},
    //         {path: 'tinymce', component: _import('components/tinymce'), name: '富文本编辑器'},
    //         {path: 'markdown', component: _import('components/markdown'), name: 'Markdown'},
    //         {path: 'jsoneditor', component: _import('components/jsonEditor'), name: 'JSON编辑器'},
    //         {path: 'dndlist', component: _import('components/dndList'), name: '列表拖拽'},
    //         {path: 'splitpane', component: _import('components/splitpane'), name: 'SplitPane'},
    //         {path: 'avatarupload', component: _import('components/avatarUpload'), name: '头像上传'},
    //         {path: 'dropzone', component: _import('components/dropzone'), name: 'Dropzone'},
    //         {path: 'sticky', component: _import('components/sticky'), name: 'Sticky'},
    //         {path: 'countto', component: _import('components/countTo'), name: 'CountTo'},
    //         {path: 'mixin', component: _import('components/mixin'), name: '小组件'},
    //         {path: 'backtotop', component: _import('components/backToTop'), name: '返回顶部'}
    //     ]
    // },
    //
    //
    //
    //
    // {
    //     path: '/charts',
    //     component: Layout,
    //     redirect: '/charts/index',
    //     name: '图表',
    //     icon: 'tubiao',
    //     children: [
    //         {path: 'index', component: _import('charts/index'), name: '介绍'},
    //         {path: 'keyboard', component: _import('charts/keyboard'), name: '键盘图表'},
    //         {path: 'keyboard2', component: _import('charts/keyboard2'), name: '键盘图表2'},
    //         {path: 'line', component: _import('charts/line'), name: '折线图'},
    //         {path: 'mixchart', component: _import('charts/mixChart'), name: '混合图表'}
    //     ]
    // },
    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     name: '综合实例',
    //     icon: 'zonghe',
    //     children: [
    //         {
    //             path: '/example/table',
    //             component: _import('example/table/index'),
    //             redirect: '/example/table/table',
    //             name: 'Table',
    //             icon: 'table',
    //             children: [
    //                 {path: 'dynamictable', component: _import('example/table/dynamictable/index'), name: '动态table'},
    //                 {path: 'dragtable', component: _import('example/table/dragTable'), name: '拖拽table'},
    //                 {path: 'inline_edit_table', component: _import('example/table/inlineEditTable'), name: 'table内编辑'},
    //                 {path: 'table', component: _import('example/table/table'), name: '综合table'}
    //             ]
    //         },
    //         {
    //             path: 'form/edit',
    //             icon: 'shouce',
    //             component: _import('example/form'),
    //             name: '编辑Form',
    //             meta: {isEdit: true}
    //         },
    //         {path: 'form/create', icon: 'from', component: _import('example/form'), name: '创建Form'},
    //         {path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'Tab'}
    //     ]
    // },
    // {
    //     path: '/error',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     name: '错误页面',
    //     icon: '404',
    //     children: [
    //         {path: '401', component: _import('errorPage/401'), name: '401'},
    //         {path: '404', component: _import('errorPage/404'), name: '404'}
    //     ]
    // },
    // {
    //     path: '/errlog',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     name: 'errlog',
    //     icon: 'bug',
    //     noDropdown: true,
    //     children: [{path: 'log', component: _import('errlog/index'), name: '错误日志'}]
    // },
    // {
    //     path: '/excel',
    //     component: Layout,
    //     redirect: '/excel/download',
    //     name: 'excel',
    //     icon: 'EXCEL',
    //     children: [
    //         {path: 'download', component: _import('excel/index'), name: '导出excel'},
    //         {path: 'download2', component: _import('excel/selectExcel'), name: '导出已选择项'},
    //         {path: 'upload', component: _import('excel/uploadExcel'), name: 'upload excel'}
    //     ]
    // },
    // {
    //     path: '/theme',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     name: 'theme',
    //     icon: 'theme',
    //     noDropdown: true,
    //     children: [{path: 'index', component: _import('theme/index'), name: '换肤'}]
    // },


    {path: '*', redirect: '/404', hidden: true}
]

import router from './router'
import store from './store'

import Cache from 'utils/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// permissiom judge
function hasPermission(roles, permissionRoles) {
    return true;
    // if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
    // if (!permissionRoles) return true
    // return roles.some(role => permissionRoles.indexOf(role) >= 0)
}


function proess(to,next){
    var query=to.query
    if(query.token){
        Cache.remove('userinfo')
        store.dispatch('update_userinfo', {
            userinfo: {
                token:query.token
            }
        }).then(() => {

            next('/hd/activity/index');

        });
    }else {
        // alert(3333)
        store.dispatch('logout').then(() => {
            next({path: '/login'})
        })

        next('/login') // 否则全部重定向到登录页
    }


}

// register global progress.
const whiteList = ['/login', '/authredirect']// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start() // 开启Progress



    var query=to.query
    if(query.token) {

        Cache.remove('userinfo')
    }

    if (store.state.user.userinfo.token) { // 判断是否有token

        if (to.path === '/login') {
            next({path: '/'})
        } else {

            if (store.state.user.userinfo.roles == undefined || store.state.user.userinfo.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息

                store.dispatch('getUserInfo').then(data => { // 拉取user_info
                    next({...to})

                    // var roles = data.roles;
                    // store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
                    //     router.addRoutes(store.state.permission.addRouters) // 动态添加可访问路由表
                    //     next({...to}) // hack方法 确保addRoutes已完成
                    // })
                }).catch((e) => {
                    proess(to,next)

                })
            } else {
                next()
                // // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                // if (hasPermission(store.getters.roles, to.meta.role)) {
                //     next()//
                // } else {
                //     next({path: '/401', query: {noGoBack: true}})
                // }
                // // 可删 ↑
            }
        }
    } else {

        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            proess(to,next)
            NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }




    //var username=query.username;
    //var token=store.state.user.userinfo.token||query.token;
   // alert(store.state.user.userinfo.token)



})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

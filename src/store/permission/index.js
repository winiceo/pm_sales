/* 测试数据 */

import {asyncRouterMap, constantRouterMap} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {

    if (route.meta && route.meta.role   ) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const state = {
    fuck:'asdfasdf',
    routers: constantRouterMap,
    addRouters: []
}


const mutations = {


    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers
        state.routers = constantRouterMap.concat(routers)
    }

}


const actions = {

    GenerateRoutes({commit}, data) {
        return new Promise(resolve => {
            const {roles} = data
            let accessedRouters
            if (roles.indexOf('admin') >= 0) {
                accessedRouters = asyncRouterMap
            } else {
                accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
            }

            console.log(accessedRouters)
            commit('SET_ROUTERS', accessedRouters)
            resolve()
        })
    }


}


const getters = {
    permission_routers: state =>state.routers ,
    addRouters: state => state.addRouters
}


export default {

    state,
    getters,
    mutations,
    actions
}

/**
 * Created by sailengsi on 2017/5/10.
 */

import * as types from './mutations_types.js';


import * as api from '@/api/user'

export default {
    update_userinfo: ({
                          commit
                      }, {
                          userinfo
                      }) => {
        return new Promise((resolve, reject) => {
            commit(types.UPDATE_USERINFO, {
                userinfo
            });
            resolve()
        });
    },

    remove_userinfo: ({ commit}) => {
        return new Promise((resolve, reject) => {
            commit(types.REMOVE_USERINFO);
            resolve()
        });
    },


    update_remumber: ({
                          commit
                      }, {
                          remumber_flag,
                          remumber_login_info
                      }) => {
        return new Promise((resolve, reject) => {
            commit(types.UPDATE_REMUMBER, {
                remumber_flag,
                remumber_login_info
            });
            resolve()
        });
    },

    remove_remumber: ({
                          commit
                      }) => {
        return new Promise((resolve, reject) => {
            commit(types.REMOVE_REMUMBER);
            resolve()
        });
    },


    login: ({commit}, userInfo) => {

        return api.login(userInfo).then((data) => {


        })

    },
    getUserInfo: ({commit}) => {

        return api.getUserInfo().then((data) => {

            console.log(data)
            // cache.set('token',data.token)
            // cache.set('roles',data.role)
            // cache.set('name',data.username)
            // cache.set('avatar',data.avatar)
            // cache.set('team',data.team)

            //commit('SET_TOKEN', data.token)
            commit('SET_ROLES', data.roles)
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            return data;


        })

    }
    , register: ({commit}, userInfo) => {
        return api.register(userInfo).then((data) => {
            // commit('SET_TOKEN', data.token)
            // commit('SET_ROLES', data.role)
            // commit('SET_NAME', data.username)
            // commit('SET_AVATAR', data.avatar)
            // cache.set('token',data.token)
            // cache.set('roles',data.role)
            // cache.set('name',data.username)
            // cache.set('avatar',data.avatar)
            // cache.set('team',data.objectId)
        })

    },
    logout: ({commit}) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])

        return api.logout()
    }


};




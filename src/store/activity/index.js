/* 测试数据 */

import * as api from '@/api/activity'
import Cache from 'utils/store'
import moment from 'moment'

const date = moment().format('YYYY-MM-DD')
const selfForm = {
    name: ' ',
    cate: 'dzp',
    activePerson: '无限制',
    startTimeData: new Date(),
    endTimeData: new Date(),
    activePersonNum: '',
    activeDescribe: '',
    numLimit: '无限制',
    gameMostPrize: '',
    gameRate: '5',
    awardList: [],
}

/* 活动管理测试数据 */
/*
 * ruleForm  1、活动信息的表单
 * signFrom  2、报名的表单
 * shareFrom 3、报名的表单
 * selfFrom  4、个性设置的表单
 * activeList 活动列表
 * */
const state = {

    selfForm: selfForm,

}

/* 从本地存储读取数据 */
for (var item in state) {

    try {
        Cache.get(item) ? state[item] = Cache.get(item) : false;

    } catch (e) {

    }
}

const mutations = {


    setSelfForm(state, payload) {
        Object.assign(state.selfForm, payload);
        Cache.set('selfForm', (payload));
    }

}


const actions = {

    setSelfForm({commit}, value) {
        commit('setSelfForm', value)
    },

    getActivityByObjectId({commit, state}, value) {
        return api.get(value)
    },

    saveActivity({commit, state}, value) {
        let data = {}
        let selfForm=Cache.get('selfForm')
        delete(selfForm.award)

        Object.assign(data, selfForm);


        return api.create(data).then(function(data){
            Cache.remove('selfForm')
            commit('setSelfForm',{})
        })

    },


}


const getters = {

}


export default {

    state,
    getters,
    mutations,
    actions
}

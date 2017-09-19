/**
 * Created by sailengsi on 2017/5/10.
 */

export default {
	getUserinfo(state) {
		return state.userinfo;
	},

	getToken(state) {
		return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
	},

	getRoles(state) {
		return state.userinfo && state.userinfo.roles ? state.userinfo.roles : '';
	},

	getRemumber(state){
		return state.remumber;
	}
};
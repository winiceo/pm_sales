var env = process.env;
import {Message} from 'element-ui'

var gbs={
	  host:   (env.NODE_ENV === 'development' ? '//localhost:7001/api/v1' : '/pm/api/v1') ,
	//host: '//localhost:7001/api/v1', //接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
	db_prefix: 'eve_', //本地存储的key

	//状态码字段
	api_status_key_field:'code',
	//状态码value
	api_status_value_field:200,

	api_data_field:'data',

	api_custom:{
        10001:function (res) {
            this.$store.dispatch('remove_userinfo').then(() => {
                this.$alert(res.code + ',' + res.message + '！', '登录错误', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push('/login');
                    }
                });
            });
        },
        10002:function (res) {
            this.$store.dispatch('remove_userinfo').then(() => {
                Message({
                    message: res.message,
                    type: 'error',
                    duration: 3 * 1000
                });
            });
        }
	}
};

var cbs={
	/**
	 * ajax请求成功，返回的状态码不是200时调用
	 * @param  {object} err 返回的对象，包含错误码和错误信息
	 */
	statusError(err) {
		console.log('err');
		if (err.status !== 404) {
			this.$message({
				showClose: true,
				message: '返回错误：' + err.msg,
				type: 'error'
			});
		} else {
			this.$store.dispatch('remove_userinfo').then(() => {
				this.$alert(err.status + ',' + err.msg + '！', '登录错误', {
					confirmButtonText: '确定',
					callback: action => {
						this.$router.push('/login');
					}
				});
			});
		}
	},

	/**
	 * ajax请求网络出错时调用
	 */
	requestError(err) {
		this.$message({
			showClose: true,
			message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
			type: 'error'
		});
	}
};

export {
	gbs,
	cbs
};
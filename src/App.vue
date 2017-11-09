<template>
    <div id="app">
        <transition name="bounce">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
	export default {
		name      : 'app',
		components: {},
		data(){
			return {

            }
		},
        methods:{
			init(){
			    var query=this.$route.query
			    var username=query.username;
			    var token=query.token;

                this.$store.dispatch('update_remumber', {
                    remumber_flag      : false,
                    remumber_login_info: {
                        username: username,
                        token   :  token
                    }
                });
            },
        },
        mounted(){

            var q = this.$route.query.q
            //var token=this.$route.query.token;
             console.log (q)
			//this.init();
        },
        watch:{
        	$route(to,from){
               this.init()
            }
        }
	}
</script>

<style lang="less">
    *{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin:0px;
        padding:0px;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
        -webkit-animation:bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-out .2s;
        -webkit-animation: bounce-out .2s;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(0);
        }
    }
</style>

<style lang="scss">
    @import '~normalize.css/normalize.css';// normalize.css 样式格式化
    @import './styles/index.scss'; // 全局自定义的css样式


</style>


<template>
    <div>

        <div class="my-themes">
            <div class="container">
                <ul class="theme-list">
                    <li class="theme-item create">
                        <div class="create-area">
                            <p>扫码添加核销员</p>
                            <canvas style="float: left" id="canvas"></canvas>

                        </div>
                    </li>
                    <template v-for="item in list">
                        <li class="theme-item">
                            <div class="thumb">
                                <img :src="item.userinfo.headimgurl" alt="" width="150">

                            </div>
                            <div class="footer">
                                <div class="title">{{item.userinfo.nickname}}</div>
                                <div class="content">
                                    <el-button type="danger" @click.native="remove(item.objectId,index)">删除</el-button>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import tools from '@/utils/tools'
    import  cache from '@/utils/store'
    import * as http from '@/utils/http'
    import QRCode from 'qrcode'

    export default {
        data() {
            return {
                isShowPreView: false,
                itemId: null,
                url: ''
            }
        },
        computed: {
            list() {
                return this.$store.state.check.manageList.items
            }
        },
        mounted() {
            var joinCheckManageUrl = 'http://' + window.location.host + '/check/manage/join/' + cache.get('team')
            this.url = joinCheckManageUrl
            var canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, joinCheckManageUrl, (err) => {
                console.log(err)
            })
            setInterval(()=>{
                this.$store.dispatch('getManangeList')
            }, 1000)

        },
        methods: {

            remove(id,index) {
                var vm=this;
                http.post('/check/delete/'+id).then((a) => {
                    vm.$message('删除成功');
                    vm.list.splice(index,1)
                })
            },

        },
        components: {}
    }
</script>



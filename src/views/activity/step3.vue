<template>
    <div class="step3">
        <el-form label-position="top" ref="selfForm" :model="selfForm" class="demo-form-stacked">

            <el-form-item label="分享标题">
                <el-input v-model="selfForm.title"></el-input>
            </el-form-item>

            <el-form-item label="分享描述">
                <el-input v-model="selfForm.describe"></el-input>
            </el-form-item>
            <el-form-item label="分享图片">
                <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :before-upload="beforeUpload">
                    <img v-if="selfForm.shareImg" :src="selfForm.shareImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Cache from 'utils/store'
    import * as http from 'utils/http'
    import $   from 'jquery'
    import axios from 'axios'
    export default {
        name: 'step3',
        data: function () {
            return {
                selfForm: {
                    shareImg:''
                },
                uploadTip: true,
            }
        },
        watch: {
            selfForm: {
                handler: function () {
                    Cache.set('selfForm', this.selfForm);
                },
                deep: true
            }
        },
        methods: {
//            handleRemove: function (file, fileList) {
//                console.log(file, fileList);
//            },
//            handlePreview: function (file) {
//                console.log(file);
//            },


            uploadSuccess(file) {

                this.selfForm.shareImg=file
            },
            beforeUpload(file) {
                var vm=this;
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                var ossData = new FormData();

                http.get('/oss/sign?path=static/upload').then(json => {
                    var filename = file.name;
                    var sec_name = /\.[^\.]+/.exec(filename);
                    ossData.append('OSSAccessKeyId', json.accessid);
                    ossData.append('policy', json.policy);
                    ossData.append('Signature', json.signature);
                    ossData.append('key', json.dir + json.filename + sec_name);
                    ossData.append('success_action_status', 201); // 指定返回的状态码
                    ossData.append('file', file, filename);
                    axios({
                        url: json.host,
                        data: ossData,
                        dataType: 'xml', // 这里加个对返回内容的类型指定
                        processData: false,
                        contentType: false,
                        method: 'POST'
                    }).then(function (response) {
                        var data = response.data
                        if ($(data).find('PostResponse')) {
                            var img_url = $(data).find('Location').text();
                            vm.uploadSuccess(img_url)
                        }
                    });
                })
                return false;
            }
        },

        created: function () {
            var vm = this;
            var item = Cache.get('selfForm')
            var objectId = this.$route.params.id;

            this.selfForm = item;

         }
    }
</script>
<style>

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .step3 .router-link {
        color: #333;
    }

    .step3 .el-button-primary .router-link {
        color: #fff;
    }
</style>

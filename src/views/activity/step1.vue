<template>
    <div class="step1">
        <!-- element表单组件 -->
        <el-form :model="selfForm" class="demo-selfForm" :rules="rules" ref="selfForm" label-position="top">
            <!-- 表单项，prop属性表示要进行表单验证，验证规则对应为rules的属性name -->
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="selfForm.name" size="large"></el-input>
            </el-form-item>


            <el-form-item label="活动时间" required style="width: 750px;">
                <el-date-picker size="large" style="width: 400px;"
                                v-model="activityDateRanage"
                                type="datetimerange"


                                placeholder="选择时间范围">
                </el-date-picker>

            </el-form-item>

            <!--<el-form-item label="报名时间" required style="width: 750px;">-->
            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signStartTimeDate">-->
            <!--<el-date-picker-->
            <!--v-model="selfForm.signStartTimeDate"-->
            <!--type="date"-->
            <!--placeholder="报名开始日期">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signStartTimeTime">-->
            <!--<el-time-select-->
            <!--placeholder="请选择时间点"-->
            <!--v-model="selfForm.signStartTimeTime"-->
            <!--:picker-options="{start: '00:00',step: '00:15', end: '23:45'}">-->
            <!--</el-time-select>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="1" style="text-align: center;">—</el-col>-->

            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signEndTimeDate">-->
            <!--<el-date-picker-->
            <!--v-model="selfForm.signEndTimeDate"-->
            <!--type="date"-->
            <!--placeholder="报名结束日期">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <!--</el-col>-->

            <!--<el-col :span="5">-->
            <!--<el-form-item prop="signEndTimeTime">-->
            <!--<el-time-select-->
            <!--placeholder="请选择时间点"-->
            <!--v-model="selfForm.signEndTimeTime"-->
            <!--:picker-options="{start: '00:00',step: '00:15',end: '23:45'}">-->
            <!--</el-time-select>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-form-item>-->


            <!--<el-form-item label="活动地点" required>-->

            <!--&lt;!&ndash; 自己封装的一个二级联动地址选择器 &ndash;&gt;-->
            <!--<address-select-->
            <!--:province="selfForm.province"-->
            <!--:city="selfForm.city"-->
            <!--:detail="selfForm.detail"-->
            <!--:isAddressTrue="isAddressTrue"-->
            <!--&gt;</address-select>-->
            <!--</el-form-item>-->

            <el-form-item label="活动人数">
                <el-row>
                    <el-col :span="6" style="width: 187px;">
                        <el-radio class="radio" v-model="selfForm.activePerson" label="无限制">无限制</el-radio>
                        <el-radio class="radio" v-model="selfForm.activePerson" label="限制">限制</el-radio>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="0" :number="true" size="large" v-model="selfForm.activePersonNum"
                                  :disabled=" selfForm.activePerson == '无限制' ">
                            <template slot="append">人</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="活动说明">
                <quill-editor v-model="selfForm.activeDescribe"
                              ref="myQuillEditor"
                              :options="getoptions">
                </quill-editor>

                <!--<vue-editor id="editor"-->
                <!--useCustomImageHandler-->
                <!--@imageAdded="handleImageAdded" v-model="selfForm.activeDescribe">-->
                <!--</vue-editor>-->
                <!--<el-input-->
                <!--type="textarea"-->
                <!--placeholder="请输入内容"-->
                <!--:autosize="{minRows: 4, maxRows: 8}"-->
                <!--v-model="selfForm.activeDescribe">-->
                <!--</el-input>-->


                <!--<div class="quill-editor"-->
                <!--v-model="selfForm.activeDescribe"-->
                <!--v-quill:myQuillEditor="editorOption">-->
                <!--</div>-->
                <!--<Qedit ref="myTextEditor"-->
                <!--:fileName="'myFile'"-->
                <!--:canCrop="canCrop"-->
                <!--:uploadUrl="uploadUrl"-->
                <!--:content="selfForm.activeDescribe"-->
                <!--v-model="selfForm.activeDescribe"></Qedit>-->

                <!-- Or manually control the data synchronization（手动控制数据流）  -->
                <!--<div class="quill-editor"-->
                <!--:content="selfForm.activeDescribe"-->
                <!--@change="onEditorChange($event)"-->
                <!--v-quill:myQuillEditor="editorOption">-->
                <!--</div>-->


            </el-form-item>


        </el-form>


    </div>
</template>

<style lang="stylus" scoped>
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-top: 0px;
        height: 200px;
    }
    .step {
        margin-bottom: 30px;
    }

    .step1 .demo-selfForm .el-form-item {
        margin-bottom: 25px;
        margin-right: 50px;
    }

    .step1 .el-form-item.is-required .el-form-item__label:after {
        content: '*';
        color: #ff4949;
        margin-right: 4px;
    }

    .step1 .el-form-item.is-required .el-form-item__label:before {
        display: none;
    }

    /* 标签 */
    .step1 .el-tag {
        padding: 10px 15px;
        margin: 10px;
        vertical-align: middle;
        height: auto;
    }

    .step1 .el-tag:first-child {
        margin-left: 0;
    }

    /* 对话框 */
    .step1 .el-dialog--small {
        width: 564px;
    }

    .step1 .el-dialog__body {
        padding-bottom: 0;
    }

    .step1 .el-dialog__body .el-form-item {
        margin-bottom: 10px;
    }

    .step1 .el-dialog__wrapper .el-button {
        margin-left: 15px;
    }

    /* 时间选择器 */
    .step1 .el-date-editor {
        width: 150px;
    }

    .step1 .el-form-item .router-link {
        color: #fff;
    }

    .el-form-item__error {
        white-space: nowrap;
    }
</style>
<script>
    //import { quillEditor } from 'vue-quill-editor'
    import {VueEditor} from 'vue2-editor'
    import axios from 'axios'
    import $ from 'jquery'
    import * as http from '@/utils/http'
    import Cache from 'utils/store'


    //var parser = require('xml2json');


    var IMGUR_CLIENT_ID = 'bcab3ce060640ba';
    var IMGUR_API_URL = 'https://api.imgur.com/3/image';
    import {quillEditor} from 'vue-quill-editor'


    export default {
        name: 'step1',
        components: {
            //'address-select': addressSelect,
            // Qedit
            quillEditor,
            VueEditor

        },
        data: function () {
            //验证活动日期
            var validateDate = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('活动日期不能为空'));
                } else if (value > this.selfForm.endTimeDate) {
                    callback(new Error('结束日期不能小于开始日期!'));
                } else {
                    callback();
                }
            };
            return {
                editorContent: 'Initial Content',
                getoptions: {
                    modules: {
                        toolbar: ['bold', 'italic', 'underline', 'strike']

                    }

                    // some quill options
                },
                canCrop: false,
                /*测试上传图片的接口，返回结构为{url:''}*/
                uploadUrl: 'http://localhost:4000/api/upload',

                test: '',
                tagsValid: false,
                tagsError: '请设置标签',
                isAddressTrue: false,
                dialogFormVisible: false,
                dialogFormFenLeiVisible: false,
                dialogForm: {name: ''},
                dialogFormFenLei: {name: ''},
                selfFormChange: false,
                selfFormValid: false,
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'change'}
                    ],
                    startTimeData: [
                        {required: true, message: '请选择活动开始日期', trigger: 'change'},
                        {validator: validateDate, trigger: 'change'}
                    ],
                    endTimeDate: [{required: true, message: '请选择活动结束日期', trigger: 'change'}],

                },
                activityDateRanage: [new Date(), new Date()],
                selfForm: {
                    name: '',
                    cate: 'dzp',
                    activePerson: '无限制',
                    startTimeData: new Date(),
                    endTimeData: new Date(),
                    activePersonNum: '',
                    activeDescribe: '',
                    numLimit: '无限制',
                    gameMostPrize: '',
                    gameRate: '50',
                    awardList: [],
                    title: '',
                    describe: '',
                    shareImg:''

                }
            };
        },
        watch: {
            selfForm: {
                handler: function (val, oldVal) {

                    //this.$store.commit('setselfForm',this.selfForm);
                    Cache.set('selfForm', this.selfForm)
                    this.$store.dispatch('setSelfForm', this.selfForm)
                    // this.tagsValid = !this.selfForm.tags.length ? '' : false;
                    //this.selfFormChange = true;
                },
                deep: true
            },
            activityDateRanage: {
                handler: function (val, oldVal) {
                    this.selfForm.startTimeData = val[0]
                    this.selfForm.endTimeData = val[1]
                    console.log(this.selfForm)

                }
            },
            computed: {
                editor() {
                    return this.$refs.myQuillEditor.quill
                }
            },
        },
        methods: {

            handleImageAdded(file, Editor, cursorLocation) {
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
                            Editor.insertEmbed(cursorLocation, 'image', img_url);
                        }
                    });
                })
//                const CLIENT_ID = '993793b1d8d3e2e'
//                var formData = new FormData();
//                formData.append('image', file)
//                axios({
//                    url: 'https://api.imgur.com/3/image',
//                    method: 'POST',
//                    headers:{
//                        'Authorization': 'Client-ID ' + CLIENT_ID
//                    },
//                    data: formData
//                })
//                    .then((result) => {
//                        console.log(result);
//                        let url = result.data.data.link
//                        Editor.insertEmbed(cursorLocation, 'image', url);
//                    })
//                    .catch((err) => {
//                        console.log(err);
//                    })
            },
            imageHandler: function (image, callback) {
                alert(3333)
                var data = new FormData();
                data.append('image', image);

                var xhr = new XMLHttpRequest();
                xhr.open('POST', IMGUR_API_URL, true);
                xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.status === 200 && response.success) {
                            callback(response.data.link);
                        } else {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                callback(e.target.result);
                            };
                            reader.readAsDataURL(image);
                        }
                    }
                }
                xhr.send(data);
            },
            handleReset: function () {
                this.$refs.selfForm.resetFields();
            },
            handleSubmit: function (ev) {
            },
            handleRemove: function (file, fileList) {
                console.log(file, fileList);
            },
            handlePreview: function (file) {
                console.log(file);
            },
            handleSuccess: function () {
            },
            handleError: function () {
            },
            showDialog: function () {
                if (this.selfForm.tags.length >= 5) {
                    this.$message({
                        message: '最多设置5个标签',
                        type: 'warning'
                    });
                } else {
                    this.dialogFormVisible = true;
                    this.dialogForm = {};
                }
            },
            handleClose: function (tag) {
                var index = this.selfForm.tags.indexOf(tag);
                this.selfForm.tags.splice(index, 1);
            },
            handleCloseFenLei: function (fenLei) {
                var index = this.selfForm.fenLeis.indexOf(fenLei);
                this.selfForm.fenLeis.splice(index, 1);
            },
            handleAdd: function (tag, form, tags) {
                if (tag && tag.trim().length !== 0) {
                    var isExist = false;
                    tag = tag.trim();
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].name == tag) {
                            isExist = true;
                            break
                        }
                    }
                    if (isExist) {
                        this.$message({
                            message: '该标签已存在',
                            type: 'warning'
                        });
                    } else {
                        this.dialogFormVisible = false;
                        this.dialogFormFenLeiVisible = false;
                        tags.push({
                            name: tag
                        });
                    }
                } else {
                    this.$message({
                        message: '标签不能为空',
                        type: 'warning'
                    });
                }
            },
            openAd: function () {
                this.$message('该功能正在完善');
            },

        },
        created: function () {
            var vm = this;

            var item = Cache.get('selfForm')
            var objectId = this.$route.params.id;

            if (objectId !== "0") {

                this.$store.dispatch('getActivityByObjectId', objectId).then((data) => {

                    Object.assign(vm.selfForm, data);
                }).catch(() => {
                })
            } else {
                Object.assign(vm.selfForm, item);
            }

            setTimeout(function () {
                vm.selfFormChange = false;
            })
        },
        beforeRouteLeave: function (to, from, next) {
            Cache.set('selfForm', this.selfForm)
            if (to.name == 'edit_step2') {
                var _this = this;


                this.$refs.selfForm.validate(function (valid) {

                    valid ? next() : next(false);
                });
            } else {
                next();
            }
        }
    }
</script>
<style>
    .step {
        margin-bottom: 30px;
    }

    .step1 .demo-selfForm .el-form-item {
        margin-bottom: 25px;
        margin-right: 50px;
    }

    .step1 .el-form-item.is-required .el-form-item__label:after {
        content: '*';
        color: #ff4949;
        margin-right: 4px;
    }

    .step1 .el-form-item.is-required .el-form-item__label:before {
        display: none;
    }

    /* 标签 */
    .step1 .el-tag {
        padding: 10px 15px;
        margin: 10px;
        vertical-align: middle;
        height: auto;
    }

    .step1 .el-tag:first-child {
        margin-left: 0;
    }

    /* 对话框 */
    .step1 .el-dialog--small {
        width: 564px;
    }

    .step1 .el-dialog__body {
        padding-bottom: 0;
    }

    .step1 .el-dialog__body .el-form-item {
        margin-bottom: 10px;
    }

    .step1 .el-dialog__wrapper .el-button {
        margin-left: 15px;
    }

    /* 时间选择器 */
    .step1 .el-date-editor {
        width: 150px;
    }

    .step1 .el-form-item .router-link {
        color: #fff;
    }

    .el-form-item__error {
        white-space: nowrap;
    }
</style>

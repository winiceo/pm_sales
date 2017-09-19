<template>
    <div class="step2">

        <el-form ref="selfForm" :model="selfForm" label-position="top" @submit.prevent="onSubmit">


            <el-form-item label="中奖次数限制" prop="">
                <el-row>
                    <el-col :span="6">
                        <el-radio class="radio" v-model="selfForm.numLimit" label="无限制"></el-radio>
                        <el-radio class="radio" v-model="selfForm.numLimit" label="限制"></el-radio>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="0" :number="true" size="large" v-model="selfForm.gameMostPrize"
                                  :disabled=" selfForm.numLimit == '无限制' ">
                            <template slot="append">次</template>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            <!--<el-form-item label="每日抽奖机会" prop="">-->
            <!--<el-row>-->

            <!--<el-col :span="6">-->
            <!--<el-input placeholder="0" :number="true" size="large" v-model="selfForm.costDetail">-->
            <!--<template slot="append">次</template>-->
            <!--</el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--</el-form-item>-->

            <el-form-item label="中奖概率" prop="">
                <el-row>

                    <el-col :span="6">
                        <el-input placeholder="0" :number="true" size="large" v-model="selfForm.gameRate">
                            <template slot="append">%</template>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        这意味着每100次抽奖{{selfForm.gameRate}}次获奖
                    </el-col>
                </el-row>
            </el-form-item>
            <div style="margin-bottom: 10px;">

            <el-tabs v-model="activeName" type="border-card" closable addable
                                 @tab-add='addTab'
                                 @tab-remove="removeTab">
                            <el-tab-pane
                                    v-for="(item, index) in selfForm.awardList"
                                    :key="item.index"
                                    :label="item.grade"
                                    :name="item.index"
                            >
                                <el-form label-position="top" label-width="80px" >
                                    <el-form-item label="奖项名称">
                                        <el-input v-model="item.grade" :disabled="true"></el-input>
                                    </el-form-item>
                                    <el-form-item label="奖品名称">
                                        <el-input v-model="item.title"></el-input>
                                    </el-form-item>
                                    <el-form-item label="奖品总数">
                                        <el-input v-model="item.total"></el-input>
                                    </el-form-item>
                                    <el-form-item label="奖品剩余数量">
                                        <el-input v-model="item.num"></el-input>
                                    </el-form-item>
                                    <el-form-item label="使用说明">
                                        <div>

                                                <quill-editor v-model="item.desc"
                                                              ref="myQuillEditor"
                                                              :options="getoptions(index)">
                                                </quill-editor>

                                            <!--<div class="quill-editor"-->
                                                 <!--v-model="item.desc"-->
                                                 <!--:id="item.id"-->
                                                 <!--v-quill:myQuillEditor="{name:item.id}">-->
                                                <!--<div></div>-->
                                            <!--</div>-->
                                        </div>


                                    </el-form-item>
                                </el-form>

                            </el-tab-pane>
                        </el-tabs>
            </div>
            <!-- <el-button
                size="small"
                @click="addTab(editableTabsValue2)"
              >
                add tab
              </el-button> -->


            <!--<el-form-item label="奖项设置" prop="" class="setSign">-->

                <!--<el-row :gutter="20" v-for="item of selfForm.awardList">-->
                    <!--<el-col :span="3">-->
                        <!--<el-input v-model="item.grade" size="large"></el-input>-->
                    <!--</el-col>-->
                    <!--<el-col :span="4" class="title">-->
                        <!--<el-input v-model="item.name" size="large" placeholder="奖品名称"></el-input>-->
                    <!--</el-col>-->
                    <!--<el-col :span="10">-->
                        <!--<el-input v-model="item.num" placeholder="奖品数量"></el-input>-->
                    <!--</el-col>-->


                    <!--<el-button icon="delete" @click.native.prevent="removeItem(item)" title="删除"></el-button>-->

                    <!--<el-dropdown trigger="click" style="margin-left: 10px;color: #20a0ff;">-->
                        <!--<el-button>-->
                            <!--移动<i class="el-icon-caret-bottom el-icon-right"></i>-->
                        <!--</el-button>-->
                        <!--<el-dropdown-menu slot="dropdown">-->
                            <!--<el-dropdown-item @click.native="moveTop(item)">置顶</el-dropdown-item>-->
                            <!--<el-dropdown-item @click.native="moveUp(item)">上移</el-dropdown-item>-->
                            <!--<el-dropdown-item @click.native="moveDown(item)">下移</el-dropdown-item>-->
                        <!--</el-dropdown-menu>-->
                    <!--</el-dropdown>-->
                <!--</el-row>-->

                <!--<el-row>-->
                    <!--<el-col :span="14" :offset="5">-->
                        <!--<el-button :span="24" type="primary" size="large" @click.native="addItem">添加更多</el-button>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            <!--</el-form-item>-->


        </el-form>


    </div>
</template>

<style  >
    .ql-container .ql-editor {
        min-height: 10em;
        padding-bottom: 1em;
        max-height: 15em;
    }
    .el-tabs__new-tab {
        float: right;
        border: 1px solid #18bc9c;
        height: 18px;
        width: 18px;
        line-height: 18px;
        margin: 12px 10px 9px 10px;
        border-radius: 3px;
        text-align: center;
        font-size: 12px;
        color: #18bc9c;
        cursor: pointer;
        transition: all .15s;
    }

    .step2 .setSign .el-row {
        line-height: 40px;
        margin-bottom: 10px;
    }

    .step2 .title {
        text-align: right;
    }

    .step2 .router-link {
        color: #333;
    }

    .step2 .el-button-primary .router-link {
        color: #fff;
    }

    /* dialog 的大小 */
    .step2 .el-dialog--small {
        min-width: 400px;
        max-width: 500px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }

    .list-enter, .list-leave-active {
        opacity: 0;
        transform: translateY(30px);
    }

</style>
<script>
    import { quillEditor } from 'vue-quill-editor'
    import Cache from 'utils/store'
    import * as http from 'utils/http'
    import _ from 'lodash'

    export default {
        name: 'step2',
        components: {
            quillEditor
        },
        data: function () {
            return {
                activeName:"1",
                imgUrl: '',
                editorOption:{},
                selfForm: {

                }
            }
        },
        watch: {

            selfForm: {
                handler: function (val, oldVal) {
//                    this.$store.dispatch('setSelfForm', this.selfForm)
//                    this.selfFormChange = true;
                  Cache.set('selfForm',this.selfForm)
                },
                deep: true
            },

        },
        methods: {
            getoptions(i){
                var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];

                return  {
                    modules: {
                        toolbar: toolbarOptions
                    }
                }
            },
            addTab() {

                var o = ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
                var n = this.selfForm.awardList ? this.selfForm.awardList.length : 0;
                if (n >= 8) {
                    this.$message.error('最多添加8个奖品');
                    return
                }
                this.selfForm.awardList.push({
                    index:(n+1)+'',
                    grade: o[n] + '等奖',
                    title: '奖品名称',
                    num: 0,
                    total:0,
                    desc:''
                });
                this.activeName=(n+1)+'';
            },
            removeTab(targetName) {

                let tabs = this.selfForm.awardList;
                var vm=this;
                if(tabs.length<=1){
                    this.$message.error('必须有一个奖品');
                    return
                }

                if (this.activeName === targetName) {

                    tabs.forEach((tab, index) => {
                        if (tab.index === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {

                                this.activeName = nextTab.index;
                            }
                        }
                    });
                }


                this.selfForm.awardList=tabs.filter(tab => tab.index !== targetName);
                var index=_.findIndex(tabs, function(chr) {
                    return chr.index == targetName;
                });
                if(tabs[index]){
                    if(tabs[index].objectId){
                        http.post('/award/delete/'+tabs[index].objectId)
                    }
                }


            },
            onSubmit: function () {
                console.log('submit!');
            },
            addItem: function () {
                var o = ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
                var n = this.selfForm.awardList ? this.selfForm.awardList.length : 0;
                this.selfForm.awardList.push({
                    grade: o[n] + '等奖',
                    name: '奖品名称',
                    num: 0

                });
            },
            removeItem: function (item) {
                var index = this.selfForm.awardList.indexOf(item);
                this.selfForm.awardList.splice(index, 1);
            },

            moveTop: function (item) {
                var index = this.selfForm.awardList.indexOf(item);
                if (index != 0) {
                    this.selfForm.awardList.splice(index, 1);
                    this.selfForm.awardList.splice(0, 0, item);
                }
            },
            moveUp: function (item) {
                var index = this.selfForm.awardList.indexOf(item);
                if (index != 0) {
                    this.selfForm.awardList.splice(index, 1);
                    this.selfForm.awardList.splice(index - 1, 0, item);
                }
            },
            moveDown: function (item) {
                var index = this.selfForm.awardList.indexOf(item);
                var max = this.selfForm.awardList.length;
                if (index != max) {
                    this.selfForm.awardList.splice(index, 1);
                    this.selfForm.awardList.splice(index + 1, 0, item);
                }
            },
            createQRcode: function () {
                console.log('生成二维码');
                this.$notify.info({
                    title: '消息',
                    message: '该功能正在完善中'
                });
            }
        },
        created: function () {
            var vm=this;
            var item = Cache.get('selfForm')
            this.selfForm=item;
            //alert(JSON.stringify(item))
            var objectId = this.$route.params.id;
            if (objectId !== "0") {
                this.selfForm=item;
//                this.$store.dispatch('getActivityByObjectId', objectId).then((data) => {
//
//                    Object.assign(vm.selfForm, data);
//                }).catch(() => {
//                })
            } else {
                 this.selfForm=item;
                 if(!item.awardList||item.awardList.length==0){
                     vm.addTab();
                 }


            }
            //Object.assign(this.selfForm, this.$store.state.activity.selfForm);
        }
    }
</script>


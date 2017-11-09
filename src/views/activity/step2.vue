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

            <el-form-item label="奖品有效期" prop="">
                <el-row>

                    <el-col :span="6">
                        <el-input placeholder="7" :number="true" size="large" v-model="selfForm.awardLimitDate">
                            <template slot="append">天</template>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        中奖次日起{{selfForm.awardLimitDate}}天有效
                    </el-col>
                </el-row>
            </el-form-item>




            <el-form-item label="活动奖品" required>
                <el-tag
                        v-for="tag in selfForm.awardList"
                        :closable="true"

                        v-bind:class="{active: tag.index==item.index,primary:tag.index!=item.index}"
                        @click.native="showAward(tag);"
                        @close="handleClose(tag)"
                >
                    {{tag.grade}}
                </el-tag>
                <el-button icon="plus" size="large" @click.native="showDialog"
                           style="vertical-align: middle;margin: 10px;"></el-button>
                <transition name="fade">
                    <div class="el-form-item__error" v-show="tagsValid">{{ tagsError }}</div>
                </transition>
            </el-form-item>
            <div style="margin-bottom: 10px;" v-show="item.grade">

                <el-form label-position="top" label-width="80px">
                    <el-form-item label="奖项名称">
                        <el-input v-model="item.grade"  v-on:blur="check(item.grade)"></el-input>
                    </el-form-item>
                    <el-form-item label="奖品名称">
                        <el-input v-model="item.title"></el-input>
                    </el-form-item>
                    <el-form-item label="奖品总数(供用户查看)">
                        <el-input v-model="item.total"></el-input>
                    </el-form-item>
                    <el-form-item label="奖品剩余数量(真实奖品数量)">
                        <el-input v-model="item.num"></el-input>
                    </el-form-item>
                    <el-form-item label="使用说明">
                        <div>

                            <quill-editor v-model="item.desc"
                                          ref="myQuillEditor"
                                          :options="getoptions()">
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
        <!-- 弹框 -->
        <el-dialog title="添加活动奖品" v-model="dialogFormVisible" top="35%">
            <el-form :model="dialogForm">
                <el-form-item>
                    <el-input v-model="dialogForm.grade" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click.native="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click.native="handleAdd(dialogForm.grade)">添加</el-button>
                </span>
        </el-dialog>

    </div>
</template>

<style>
    .ql-container .ql-editor {
        min-height: 10em;
        padding-bottom: 1em;
        max-height: 15em;
    }

    .step2 .primary {
        background-color: rgba(26, 32, 25, 0.13);
        border-color: rgba(61, 79, 93, 0.2);
        color: #151f20;
    }


    .step2 .active {
        background-color: rgba(68, 68, 68, 0.82);
        border-color: rgba(61, 79, 93, 0.2);
        color: #fcfeff;
    }

    .step2 .el-tag {
        padding: 10px 20px;
        margin: 5px;
        vertical-align: middle;
        height: auto;
    }

    .step2 .el-tag:first-child {
        margin-left: 0;
    }

    .step2 .el-tag .el-icon-close {
        right: -20px;
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
    import {quillEditor} from 'vue-quill-editor'
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

                item: {

                },
                tagsValid: false,
                tagsError: '请设置奖品',
                dialogForm: {grade: ''},
                dialogFormVisible: false,
                dialogFormFenLeiVisible: false,
                activeName: "一等奖",
                imgUrl: '',
                editorOption: {},
                selfForm: {}
            }
        },
        watch: {

            selfForm: {
                handler: function (val, oldVal) {
//                    this.$store.dispatch('setSelfForm', this.selfForm)
//                    this.selfFormChange = true;
                  //  alert(this.selfForm.awardLimitDate)
                    console.log(this.selfForm.awardLimitDate)
                    Cache.set('selfForm', this.selfForm)
                },
                deep: true
            },


        },
        methods: {
            check(tag){

                var tags=this.selfForm.awardList
                var isExist = false;
                tag = tag.trim();

                for (var i = 0; i < tags.length; i++) {
                    console.log([tags[i].index ,this.item.index])
                    if (tags[i].grade == tag&&tags[i].index!=this.item.index) {
                        isExist = true;
                        break
                    }
                }
                if (isExist) {
                    this.$message({
                        message: '该奖项已存在',
                        type: 'warning'
                    });
                }
            },
            showAward(award) {
                this.item = award;
               // alert(JSON.stringify(award))
                var index = this.selfForm.awardList.indexOf(award);

                this.selfForm.awardList.forEach((item, i)=>
                {

                   if(i!=index){
                       console.log(item)
                       //item.isSeclected=false;
                   }else{
                      // item.isSeclected=true;
                   }
                });
                //

            },
//            check(grade) {
//                var isExsit = _.findIndex(this.selfForm.awardList, function (chr) {
//                    return chr.grade == grade;
//                });
//                if (isExsit != -1) {
//                    grade = grade + "一"
//                }
//                return grade
//            },
            getoptions(i) {
                var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];

                return {
                    modules: {
                        toolbar: toolbarOptions
                    }
                }
            },
//            addTab() {
//
//                var o = ["一", "二", "三", "四", "五", "六", "七", "八", "九"]
//                var n = this.selfForm.awardList ? this.selfForm.awardList.length : 0;
//                if (n >= 8) {
//                    this.$message.error('最多添加8个奖品');
//                    return
//                }
//                var grade = o[n] + '等奖';
//                var isExsit = _.findIndex(this.selfForm.awardList, function (chr) {
//                    return chr.grade == grade;
//                });
//                if (isExsit != -1) {
//                    grade = grade + "一"
//                }
//                this.selfForm.awardList.push({
//
//                    grade: grade,
//                    title: '奖品名称',
//                    num: 0,
//                    total: 0,
//                    desc: ''
//                });
//                this.activeName = grade;
//            },
            removeTab(targetName) {
                console.log(targetName)

                let tabs = this.selfForm.awardList;
                var vm = this;
                if (tabs.length <= 1) {
                    this.$message.error('必须有一个奖品');
                    return
                }

                if (this.activeName === targetName) {

                    tabs.forEach((tab, index) => {
                        if (tab.grade === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {

                                this.activeName = nextTab.grade;
                            }
                        }
                    });
                }


                this.selfForm.awardList = tabs.filter(tab => tab.grade !== targetName);
                var index = _.findIndex(tabs, function (chr) {
                    return chr.grade == targetName;
                });
                if (tabs[index]) {
                    if (tabs[index].objectId) {
                        http.post('/award/delete/' + tabs[index].objectId)
                    }
                }


            },
            showDialog: function () {
                if (this.selfForm.awardList.length >= 8) {
                    this.$message({
                        message: '最多设置8个奖品',
                        type: 'warning'
                    });
                } else {
                    this.dialogFormVisible = true;
                    this.dialogForm = {};
                }
            },
            handleClose: function (tag) {
                let tabs = this.selfForm.awardList;
                let vm=this;
                if (tabs.length <= 1) {
                    this.$message.error('必须有一个奖品');
                    return
                }
                var index = this.selfForm.awardList.indexOf(tag);

                var item=this.selfForm.awardList.splice(index, 1);

                if(index==this.selfForm.awardList.length){

                         setTimeout(function() {
                             vm.item = vm.selfForm.awardList[vm.selfForm.awardList.length - 1]
                         },10)


                   // this.showAward(this.selfForm.awardList[this.selfForm.awardList.length-1])

                }

            },
            handleAdd: function (tag) {
                var tags=this.selfForm.awardList;

                var index=1;
                if(tags.length>=1){
                   index= _.sortBy(tags, 'index')[tags.length-1].index

                }
                index++;

                if (tag && tag.trim().length !== 0) {
                    var isExist = false;
                    tag = tag.trim();
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].grade == tag) {
                            isExist = true;
                            break
                        }
                    }
                    if (isExist) {
                        this.$message({
                            message: '该奖项已存在',
                            type: 'warning'
                        });
                    } else {
                        this.dialogFormVisible = false;
                        this.dialogFormFenLeiVisible = false;

                       var item={
                            index: index,
                            grade: tag,
                            title: '奖品名称',
                            num: 0,
                            total: 0,
                            desc: ''
                        }
                        tags.push(item);
                        this.item=item;
                    }
                } else {
                    this.$message({
                        message: '奖项不能为空',
                        type: 'warning'
                    });
                }
            },
        },
        created: function () {
            var vm = this;
            var item = Cache.get('selfForm')
            this.selfForm = item;
            console.log(this.selfForm.awardLimitDate)
           // console.log(JSON.stringify(item))
            var objectId = this.$route.params.id;
            if (objectId !== "0") {
                this.selfForm = item;
                setTimeout(function() {
                    vm.item = vm.selfForm.awardList[0]
                },10)
//
            } else {
                this.selfForm = item;
                //alert(this.selfForm.awardList.length)
                if (!this.selfForm.awardList || this.selfForm.awardList.length == 0) {

                    vm.handleAdd('一等奖');
                }else{
                    setTimeout(function() {
                        vm.item = vm.selfForm.awardList[0]
                    },10)
                }


            }
            //Object.assign(this.selfForm, this.$store.state.activity.selfForm);
        }
    }
</script>


<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="listQuery.title">
      </el-input>


      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary"   icon="search" @click="handleFilter">搜索</el-button>

         <el-button class="filter-item" style="margin-left: 10px;" @click="CreateActivity"   type="primary" icon="edit">创建活动</el-button>

      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>-->

      <!--<el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
      <!--<el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>-->
   <!---->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <!--<el-table-column align="center" label="序号" width="65">-->
        <!--<template scope="scope">-->
          <!--<span>{{scope.row.objectId}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column width="120px" align="center" label="时间">
        <template scope="scope">
          <span>{{scope.row.createdAt }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="标题">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
         </template>
      </el-table-column>


      <el-table-column align="center" label="打开数" width="95">
        <template scope="scope">
          <span class="link-type"> {{scope.row.pageviews}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="90">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status|statusText}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="280">
        <template scope="scope">
          <el-button   size="small"   @click="showPreView(scope.row)">预览
          </el-button>

          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status=='published'" size="small" @click="handleModifyStatus(scope.row,'draft')">停止
          </el-button>
          <el-button v-if="scope.row.status!='published'" size="small" @click="update(scope.row)">编辑
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="类型">
          <el-select class="filter-item" v-model="temp.type" placeholder="请选择">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>

        <el-form-item label="重要性">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </el-form-item>

        <el-form-item label="点评">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <PreView :item="item" @hideView="isShowPreView=false" v-if="isShowPreView"/>
  </div>
</template>

<script>
    import  * as api from '@/api/activity'
   // import waves from '@/directive/waves.js'// 水波纹指令
    import { parseTime } from '@/utils'
    import PreView from './PreView'
    import Cache from 'utils/store'
    import * as http from 'utils/http'
    const calendarTypeOptions = [
        { key: 'CN', display_name: '中国' },
        { key: 'US', display_name: '美国' },
        { key: 'JP', display_name: '日本' },
        { key: 'EU', display_name: '欧元区' }
    ]

    // arr to obj
    const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name
        return acc
    }, {})

    export default {
        components: {
             PreView
        },
        name: 'table_demo',
        directives: {
           // waves
        },

        data() {
            return {
                item:{},
                isShowPreView: false,
                itemId: null,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    cate:'dzp',
                    page: 1,
                    limit: 10,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                temp: {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    type: '',
                    status: 'published'
                },
                importanceOptions: [1, 2, 3],
                calendarTypeOptions,
                sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
                statusOptions: ['published', 'draft', 'deleted'],
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                dialogPvVisible: false,
                pvData: [],
                showAuditor: false,
                tableKey: 0
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            },
            statusText(status) {
                const statusMap = {
                    published: '发布',
                    draft: '草稿',
                    deleted: '删除'
                }
                return statusMap[status]
            },
            typeFilter(type) {
                return calendarTypeKeyValue[type]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            showPreView (item) {
                this.isShowPreView = true
                this.item = item
            },
            getList() {
                this.listLoading = true
                api.query(this.listQuery).then(data => {

                    this.list = data.items
                    this.total = data.total
                    this.listLoading = false
                })
            },
            handleFilter() {
                this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            timeFilter(time) {
                if (!time[0]) {
                    this.listQuery.start = undefined
                    this.listQuery.end = undefined
                    return
                }
                this.listQuery.start = parseInt(+time[0] / 1000)
                this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
            },
            handleModifyStatus(row, status) {

                var vm=this;
                http.post('/activity/status/'+row.objectId,{status:status}).then(function(){
                    vm.$message({
                        message: '操作成功',
                        type: 'success'
                    })
                    row.status = status
                })

            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
            },
            handleDelete(row) {
                var vm=this;
                this.$confirm('此操作将删除此活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const index = vm.list.indexOf(row)
                    http.post('/activity/status/'+row.objectId,{status:'deleted'}).then(function(){
                        vm.list.splice(index, 1)

                        this.$message({
                          type: 'success',
                          message: '删除成功!'
                      });
                    })

                }).catch((e) => {
                    console.log(e)
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
//                this.$notify({
//                    title: '成功',
//                    message: '删除成功',
//                    type: 'success',
//                    duration: 2000
//                })

            },
            CreateActivity(){
                Cache.remove('selfForm')
                this.$router.push({path:'/hd/activity/edit/0/step/1'})
            },
            create() {
                this.temp.id = parseInt(Math.random() * 100) + 1024
                this.temp.timestamp = +new Date()
                this.temp.author = '原创作者'
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                })
            },
            update(item) {
                this.$router.push({ path: '/hd/activity/edit/'+item.objectId+'/step/1' })
            },
            delete(item){

            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    status: 'published',
                    type: ''
                }
            },
            handleFetchPv(pv) {
                //fetchPv(pv).then(response => {
                    this.pvData = 333
                    this.dialogPvVisible = true
               // })
            },
            handleDownload() {
//                require.ensure([], () => {
//                    const { export_json_to_excel } = require('@/vendor/Export2Excel')
//                    const tHeader = ['时间', '地区', '类型', '标题', '重要性']
//                    const filterVal = ['timestamp', 'province', 'type', 'title', 'importance']
//                    const data = this.formatJson(filterVal, this.list)
//                    export_json_to_excel(tHeader, data, 'table数据')
//                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>

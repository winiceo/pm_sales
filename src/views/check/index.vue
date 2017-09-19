<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="奖品" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="中奖人" v-model="listQuery.nickname">
      </el-input>



      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary"   icon="search" @click="handleFilter">搜索</el-button>


      <!--<el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
     </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <!--<el-table-column align="center" label="序号" width="65">-->
        <!--<template scope="scope">-->
          <!--<span>{{scope.row.objectId}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column width="120px" align="center" label="中奖时间">
        <template scope="scope">
          <span>{{scope.row.createdAt }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="奖项">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.draw.grade}}</span>
         </template>
      </el-table-column>
      <el-table-column min-width="100px" label="奖品名称">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.draw.title}}</span>
         </template>
      </el-table-column>
      <el-table-column min-width="100px" label="中奖人">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.nickname}}</span>
         </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="核销时间">
        <template scope="scope">
          <span>{{scope.row.checkTime }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" label="备注">
        <template scope="scope">
           {{scope.row.remark}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="90">
        <template scope="scope">
          <el-tag  >{{scope.row.status| statusFilter}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">

          <el-button v-if="scope.row.status!=1" size="small" @click="update(scope.row)">核销
          </el-button>

        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="核销" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>


        <el-form-item label="奖项名称">
          <el-input v-model="currentItem.draw.grade" disabled></el-input>
        </el-form-item>
        <el-form-item label="奖品名称">
          <el-input v-model="currentItem.draw.title" disabled></el-input>
        </el-form-item>

        <el-form-item label="中奖人">
          <el-input v-model="currentItem.nickname" disabled></el-input>
        </el-form-item>

        <el-form-item label="核销码">
          <el-input v-model="currentItem.code" readonly=""></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="currentItem.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button   type="primary" @click="checkUpdate">确 定</el-button>

      </div>
    </el-dialog>

    <el-dialog title="核销" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
    import * as api from '@/api/draw'
    import * as http from 'utils/http'

    import { parseTime } from '@/utils'
   



    export default {
        components: {  
        },
        name: 'table_demo',
        directives: {
          
        },
        data() {
            return {
                remark:'',
                item:{},
                isShowPreView: false,
                itemId: null,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    cate:'dzp',
                    page: 1,
                    limit: 20,
                    title: undefined,
                    nickname: undefined,
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

                sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
                statusOptions: ['published', 'draft', 'deleted'],
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                currentItem:{
                    draw:{}
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
                    0: '未核销',
                    1: '已核销',
                    2: '已过期'
                }

                //console.log(statusMap[status])
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
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                row.status = status
            },
            //保存核销记录
            checkUpdate() {
                var vm=this;
                http.post('/draw/check/'+this.currentItem.objectId,this.currentItem).then(data => {
                    vm.dialogFormVisible = false
                    vm.currentItem.status=1;
//                    vm.currentItem.remark=this.currentItem.remark;
                })

            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
            },
            handleDelete(row) {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                const index = this.list.indexOf(row)
                this.list.splice(index, 1)
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
                this.currentItem=item
                this.dialogFormVisible=true;
                //this.$router.push({ path: 'dzp/edit/'+item.objectId })
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

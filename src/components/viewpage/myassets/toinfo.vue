<template>
  <div class="toinfo">
    <div class="control">

      <el-form :status-icon="true" ref="form" :model="form" label-width="80px">
       <el-form-item label="添加筛选">
          <el-select v-model="form.region" placeholder="请选择筛选项">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-input placeholder="请输入内容" v-model="form.region" clearable></el-input>

      <el-button type="primary" icon="el-icon-search">搜索</el-button>
        
      <el-button @click.native="Addsys"  type="success" icon="el-icon-circle-plus">新增</el-button>
      
      <el-button @click.native="handleDownload" :loading="downloadLoading" type="primary" icon="el-icon-share">导出</el-button>
        
      <el-button type="danger" @click.native="delrows" :disabled="candel" icon="el-icon-delete">批量删除</el-button>

      <el-popover
        ref="popover2"
        placement="bottom"
        title="条件"          
        trigger="click"
        content="">
        <br>
        <el-checkbox size="middle"  v-model="showColumn.partname">部门名称</el-checkbox><br><br>
        <el-checkbox size="middle"  v-model="showColumn.exampart">审批部门</el-checkbox><br><br>
        <el-checkbox size="middle"  v-model="showColumn.fund">指标金额</el-checkbox><br>
      </el-popover>
      <el-button type="primary" class="filter" size="middle" v-popover:popover2>条目选择</el-button>
  </div>  

  <el-dialog title="新增信息" 
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    :visible.sync="addDialog.AddVisible">
    <el-form :status-icon="true" ref="Addform" :rules="Addrules" :model="addDialog" label-width="">
              <el-form-item prop="infoname"  label="系统名称">
                <el-input v-model="addDialog.infoname"></el-input>
              </el-form-item>
              <el-form-item  prop="partname" label="部门名称">
                <el-input v-model="addDialog.partname"></el-input>
              </el-form-item>
              <el-form-item prop="exampart"  label="审批部门">
                <el-input v-model="addDialog.exampart"></el-input>
              </el-form-item>
              <el-form-item  prop="fund" label="指标金额">
                <el-input v-model="addDialog.fund"></el-input>
              </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CancelAdd">取 消</el-button>
      <el-button type="primary" @click="resetForm('Addform')">重 置</el-button>
      <el-button type="primary" @click="SaveAdd">确 定</el-button>
    </div>
  </el-dialog>

  <el-table
    :data="tableData"
    :stripe = "true"
    :border="true"
    :highlight-current-row="true"
    @selection-change="SelectionChange"
    :default-sort = "{prop: 'fund', order: 'increasing'}"
    style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>

    <el-table-column label="系统名称" >
      <template slot-scope="scope">
        <i class="fa fa-cogs"></i>
        <span style="margin-left: 10px">{{ scope.row.infoname }}</span>
      </template>
    </el-table-column>

    <el-table-column label="部门名称" v-if = "showColumn.partname" >
      <template slot-scope="scope">
        <i class="fa fa-bank"></i>
        <span style="margin-left: 10px">{{ scope.row.partname }}</span>
      </template>
    </el-table-column>

    <el-table-column label="审批部门" v-if = "showColumn.exampart" >
      <template slot-scope="scope">
        <i class="fa fa-cogs"></i>
        <span style="margin-left: 10px">{{ scope.row.exampart }}</span>
      </template>
    </el-table-column>

    <el-table-column label="指标金额" v-if = "showColumn.fund" prop = "fund" sortable >
      <template slot-scope="scope">
        <i class="fa fa-cny"></i>
        <span style="margin-left: 10px">{{ scope.row.fund }}</span>
      </template>
    </el-table-column>

    <el-table-column width="280" label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"> <i class="fa fa-pencil"></i><span>编辑</span>
        </el-button>
        <el-button
          size="mini"
          type="info"
          @click="CheckDetail(scope.$index, scope.row)"> <i class="fa fa-question-circle"></i><span>详情</span>
        </el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"> 
          <span ><i class="fa fa-trash"></i>删除</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="编辑信息" 
  :status-icon="true"
  :close-on-click-modal='false'
  :close-on-press-escape='false'
  :modal-append-to-body="false"
  :visible.sync="EditVisible">
    <el-form ref="Editform" :model="editDialog" label-width="">
      <el-form-item  label="系统名称">
        <el-input v-model="editDialog.infoname"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="editDialog.partname"></el-input>
      </el-form-item>
      <el-form-item label="审批部门">
        <el-input v-model="editDialog.exampart"></el-input>
      </el-form-item>
      <el-form-item label="指标金额">
        <el-input v-model="editDialog.fund"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="CancelAction">取 消</el-button>
      <el-button type="primary" @click="SaveEdit(editDialog)">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="详细信息" 
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    :visible.sync="DetailVisible">
    <el-form ref="Detailform" :model="editDialog" label-width="">
        <el-form-item label="系统ID">
          <el-input v-model="editDialog.id"></el-input>
        </el-form-item>
        <el-form-item disabled label="系统名称">
          <el-input v-model="editDialog.infoname"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input v-model="editDialog.partname"></el-input>
        </el-form-item>
        <el-form-item label="审批部门">
          <el-input v-model="editDialog.exampart"></el-input>
        </el-form-item>
        <el-form-item label="指标金额">
          <el-input v-model="editDialog.fund"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CancelAction">确 定</el-button>
    </div>
  </el-dialog>

  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>

</div>
</template>

<script>
import HTTP from '@/utils/http'
import axios from 'axios'
import {setStore, getStore, removeStore} from '@/utils/tool'

export default {
  name: 'toinfo',
  created(){ 
    if(!getStore('infoflag')){
      let totalData = []
      for(let i= 0; i< 100; i++){
        totalData.push({
          infoname: '系统'+i,
          exampart: '国务院'+i,
          partname: '委员会'+i,
          fund: 100+i,
          id : Math.ceil(new Date().getTime()*(Math.random()+0.5))
        })       
      }
      setStore('totalData',totalData)
      setStore('infoflag',true) 
    }
  },
  mounted(){
  },
  watch:{
    totalData: {
      handler: (val, oldval)=>{
        setStore('totalData',val)
      },
      deep: true
    }
  },
  data () {
    let totalData = getStore('totalData')
    return {
      form: {
          region: ''
      },
      totalData,
      pagination:{
        pageSizes: [5,10,15,20],
        pageSize: 10,
        display: 'total, sizes, prev, pager, next, jumper',     
        currentPage: 1
      },
      editDialog:{},
      editingId: null,
      EditVisible: false,
      addDialog: {
        partname: null,
        exampart: null,
        infoname: null,
        fund: null,
        AddVisible: false
      },  
      DetailVisible: false,
      
      selectedrows: [],
      showColumn: {
        partname: true,
        exampart: true,
        fund: true
      },
      Addrules:{
        infoname:[
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
        ],
        partname:[
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
        ],
        exampart:[
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
        ],
        fund:[
            {required:true,message:'必填项呢！',trigger:'blur'}
        ]
      },
      downloadLoading: false,
    }
  },
  computed: {
      totalCount(){return this.totalData.length},
      tableData(){
        let totalData = this.totalData 
        let perpage = this.pagination.pageSize
        let nowpage = this.pagination.currentPage
        return this.totalData.slice( (nowpage-1)*perpage, perpage*nowpage )
      },
      candel(){
        return !this.selectedrows.length
      }
  },
  methods: {
    handleEdit(index, row) {
        // console.log(index, row)
        this.EditVisible = !this.EditVisible
        this.editDialog = JSON.parse(JSON.stringify(row))
        this.editingId = row.id
    },
    SaveEdit(data){ 
      this.totalData.forEach(item => {
        if(item.id === this.editingId){
          // item = JSON.parse(JSON.stringify(data))
          item.infoname = data.infoname
          item.exampart = data.exampart
          item.partname = data.partname
          item.fund = data.fund
        }
      })
      this.$message(`修改成功！提交的数据ID为${this.editingId}`)  
      this.EditVisible= false
    },
    CheckDetail(index, row) {
        // console.log(index, row)
        this.editDialog = JSON.parse(JSON.stringify(row))
        this.DetailVisible = !this.DetailVisible
      },
    Addsys(){
        this.addDialog.AddVisible = true
    },
    SaveAdd(){
      this.$refs.Addform.validate( valid => {
        if(valid){
            this.addDialog.id = Math.ceil(new Date().getTime()*(Math.random()+0.5))
            let newinfo = JSON.parse(JSON.stringify(this.addDialog))
            totalData.unshift(newinfo)
            this.$message({
                type: 'success',
                message: '添加成功！'
              })
            this.resetForm('Addform')
            this.addDialog.AddVisible = false
        }else{
            this.$message({
            type: 'warning',
            message: '添加失败'
          })
        }
      })
      
    },
    resetForm(name){
      this.$refs[name].resetFields()
    },
    CancelAction(){
      this.EditVisible = false
      this.DetailVisible = false
    },
    CancelAdd(){
      this.addDialog.AddVisible = false
      this.$refs.Addform.resetFields()
    },
      handleDelete(index, row) {
        // console.log(index, row)
        this.delete(row)
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
        this.pagination.pageSize = val
        // this.tableData.perpage =val
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.pagination.currentPage = val
        // this.tableData.nowpage =val
      },
      delete(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(index)
          this.totalData.splice(this.totalData.indexOf(row), 1)

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
      },
      SelectionChange(arr){
          this.selectedrows = arr
      },
      delrows(){
        // console.log(this.selectedrows)   
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(index)
          this.selectedrows.forEach ((item) => {
            this.totalData.splice(this.totalData.indexOf(item), 1)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
    },
    handleDownload(){
      // console.log(123)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', '系统名称', '部门名称', '审批部门', '金额']
        const filterVal = ['id', 'partname', 'exampart', 'fund']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel(tHeader, data, "excel")
        this.downloadLoading = false
        // console.log(456)
      })
    },
    formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　　},
    getdb(){
      // axios.post('/api/sysinfo',{name: 'xiaolin',age: 20})
      // .then(res => {
      //   console.log(res.data)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
      HTTP.post('/api/sysinfo',
      {
        sysinfo: 'xiaolin',
        partname: '国务院',
        exampart: '委员会',
        fund: 999      
      })
       .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style  lang="less">
.toinfo{
  // min-height: 700px;
  .fa{
    margin-right:5px;
  }
  .control{
    height: 63px;
    line-height: 62px;
    position: relative;
    .filter{
      position: absolute;
      right: 20px;
      top: 12px;
    }
    .el-input{
      display: inline-block;
      width: 200px !important;
    }
    .el-form{
      height: 100%;
      // width: 300px;
      line-height: 40px;
      display: inline-block;
      .el-form-item{
        margin: 0;
      }
    }
  }
  
  .el-pagination{
    padding: 10px;
    text-align: center;
  }
  
}

</style>
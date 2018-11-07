<template>
  <div class="baseTable">
    <div class="control">
      <el-form :status-icon="true" ref="form" :model="form" label-width="80px">
       <el-form-item label="添加筛选">
          <el-select v-model="form.option" placeholder="请选择筛选项">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-input placeholder="请输入内容" v-model="form.search" clearable></el-input>

      <el-button @click="search" type="primary" icon="el-icon-search">搜索</el-button>
        
      <el-button @click.native="Addsys"  type="success" icon="el-icon-circle-plus">新增</el-button>
      
      <el-button @click.native="handleDownload" :loading="downloadLoading" 
      :disabled = "loading"
      type="primary" icon="el-icon-share">导出</el-button>
        
      <el-button type="danger" @click.native="delrows" :disabled="candel" icon="el-icon-delete">批量删除</el-button>

       <el-popover
        ref="popover2"
        placement="bottom"
        title="条件"          
        trigger="click"
        content="">
        <br>
        <div v-for="(item, index) in thArr" :key="index" >
          <el-checkbox size="middle" v-model="item.show">{{item.name}}
          </el-checkbox><br><br>
        </div>
      </el-popover>
      <el-button type="primary" class="filter" size="middle" v-popover:popover2>筛选条目</el-button> 
  </div>  

  <el-dialog title="新增信息" 
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    :lock-scroll= "false"
    :visible.sync="Visible.Add">
    <el-form :status-icon="true" ref="Addform" :rules="config.rules" :model="addDialog" label-width="">
      <el-form-item  v-for="(item, index) in thArr" :key="index" :prop="item.key"  :label="item.name">
        <el-input v-model="addDialog[item.key]"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="CancelAdd">取 消</el-button>
      <el-button type="primary" @click="resetForm('Addform')">重 置</el-button>
      <el-button type="primary" @click="SaveAdd">确 定</el-button>
    </div>
  </el-dialog>
  
  <el-table
    v-loading = "loading"
    :data="tableData"
    :stripe = "true"
    :border="true"
    :highlight-current-row="true"
    @selection-change="SelectionChange"
    style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column v-for="(col, index) in thArr" :key="index" :label="col.name" v-if="col.show">
      <template slot-scope="scope">
        <i class="fa" :class="col.icon || ''"></i>
        <span style="margin-left: 10px">{{ scope.row[col.key]}}</span>
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
  :lock-scroll= "false"
  :visible.sync="Visible.Edit">
    <el-form :status-icon="true" ref="Editform" :rules="config.rules" :model="editDialog" label-width="">
      <el-form-item  v-for="(item, index) in thArr" :key="index" :prop="item.key"  :label="item.name">
        <el-input v-model="editDialog[item.key]"></el-input>
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
    :lock-scroll= "false"
    :visible.sync="Visible.check">
    <el-form ref="Detailform" :model="checkinfo" label-width="">
        <el-form-item  v-for="(item, index) in DataKeys" :key="index" :label="item">
          <el-input v-model="checkinfo[item]"></el-input>
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
      :current-page="config.pagination.currentPage"
      :page-sizes="config.pagination.pageSizes"
      :page-size="config.pagination.pageSize"
      :layout="config.pagination.display"
      :total="totalCount">
    </el-pagination>
  </div>

</div>
</template>

<script>
export default {
  name: 'baseTable',
  created(){
    this.thArr.forEach(item => {
    this.addDialog[item.key] = null
    })
    this.DataKeys.forEach(item => {
      this.checkinfo[item] = ''
    })
  },
  props: {
    totalData:{
      type: Array,
      default(){
        return []
      }
    },
    thArr:{
      type: Array,
      default(){
        return []
      }
    },
    config:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  watch: {
    thArr: {
      handler(val, oldval){
        this.$emit('theadvar', val)
      },
      deep: true
    }
  },
  data () {
    return {
      form: { search: '', option: '' },
      editDialog:{},
      addDialog: {},
      checkinfo: {},
      Visible:{
        Add: false,
        Edit: false,
        check: false
      },
      editingId: null,
      selectedrows: [],
      downloadLoading: false,
    }
  },
  computed: {
      loading(){
        return this.totalData.length > 0? false: true
      },
      DataKeys(){
        if(this.totalData.length !== 0){
          return Object.keys(this.totalData[0])
        }else{
          return []
        }
      },
      totalCount(){return this.totalData.length},
      tableData(){ 
        let perpage = this.config.pagination.pageSize
        let nowpage = this.config.pagination.currentPage
        if(this.totalData.length !== 0){
          return this.totalData.slice( (nowpage-1)*perpage, perpage*nowpage )
        }else{
          return []
        }
      },
      candel(){
        return !this.selectedrows.length
      },
  },
  methods: {
    search(){
      let val = this.form.search
      let re = new RegExp(val)
      this.$emit('search', val)
      // this.tableData = this.totalData.filter(item => {
      //   return keys.forEach(subitem => {
      //     if(re.test(item[subitem]))
      //     return true
      //   })
      // })
    },
    handleEdit(index, row) {
      this.Visible.Edit = true
      this.editDialog = JSON.parse(JSON.stringify(row))
      this.editingId = row.id
    },
    SaveEdit(data){ 
      this.$refs.Editform.validate( valid => {
        if(valid){
            this.$emit('saveedit', JSON.parse(JSON.stringify(this.editDialog)))

            this.resetForm('Editform')
            this.Visible.Edit = false
        }else{
          this.$message({
            type: 'warning',
            message: '验证失败！'
          })
        }
      })
    },
    CheckDetail(index, row) {
      this.checkinfo = JSON.parse(JSON.stringify(row))
      this.Visible.check = true
    },
    Addsys(){
      this.Visible.Add = true
    },
    SaveAdd(){
      this.$refs.Addform.validate( valid => {
        if(valid){
          this.addDialog.id = Math.ceil(new Date().getTime()*(Math.random()+0.5))
          let newinfo = JSON.parse(JSON.stringify(this.addDialog))
          this.$emit('addinfo',newinfo)
          this.resetForm('Addform')
          this.Visible.Add = false
        }else{
          this.$message({
          type: 'warning',
          message: '验证失败！'
          })
        }
      })
    },
    resetForm(name){
      this.$refs[name].resetFields()
    },
    CancelAction(){
      this.Visible.Edit = false
      this.Visible.check = false
      this.resetForm('Editform')
    },
    CancelAdd(){
      this.Visible.Add = false
      // this.$refs.Addform.resetFields()
      this.resetForm('Addform')
    },
    handleDelete(index, row) {
      this.delete(row)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.config.pagination.pageSize = val
      // this.tableData.perpage =val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.config.pagination.currentPage = val
      // this.tableData.nowpage =val
    },
    delete(row) {
      this.$emit('deleteRow', row)
    },
    SelectionChange(arr){
      this.selectedrows = arr
      this.$emit('selecting', arr)
    },
    delrows(){
      // console.log(this.selectedrows)   
      this.$emit('delrows', this.selectedrows)
    },
    handleDownload(){
      // console.log(123)
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.DataKeys
        const filterVal = this.DataKeys
        const list = this.totalData
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
      HTTP.post('/api/sysinfo',
      {
        sysinfo: 'xiaolin',
        key_nd: '国务院',
        key_rd: '委员会',
        key_4th: 999      
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
.baseTable{
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
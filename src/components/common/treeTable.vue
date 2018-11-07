<template>
  <div id="treetable">
    <el-table 
      :data="formatData" 
      :row-style="showRow"
      :border="true" 
      :highlight-current-row="true"
      v-bind="$attrs">
      <el-table-column v-if="columns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i>
          </span>
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i>
          </span>
          {{scope.row[column.value]}}
        </template>
      </el-table-column>
      <el-table-column width="280" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="() => handleEdit(scope.$index, scope.row)"> <i class="fa fa-pencil"></i><span>修改</span>
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="() => handleAdd(scope.$index, scope.row)"> <i class="fa fa-plus"></i><span>新增</span>
          </el-button>
          <el-button size="mini" type="danger" @click="() => handleDelete(scope.$index, scope.row)"> 
            <span ><i class="fa fa-trash"></i>删除</span>
          </el-button>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <el-dialog title="新增菜单" 
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :modal-append-to-body="false"
      :visible.sync="Visible.Add">
      <el-form :status-icon="true" ref="addform" :model="addDialog" :rules="rules" label-width="">
        <el-form-item v-for="(item, index) in columns" :key="index" :prop="item.value" :label="item.text">
          <el-input v-model="addDialog[item.value]"></el-input>
        </el-form-item>
        <!-- <el-form-item  prop="code" label="金额">
          <el-input v-model="addDialog.code"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CancelAdd">取 消</el-button>
        <!-- <el-button type="primary" @click="resetForm('Addform')">重 置</el-button> -->
        <el-button type="primary" @click="SaveAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改菜单"
      :close-on-click-modal='false'
      :close-on-press-escape='false'
      :modal-append-to-body="false"
      :visible.sync="Visible.Edit">
      <el-form :status-icon="true" ref="editform" :rules="rules" :model="editDialog" label-width="">
        <el-form-item v-for="(item, index) in columns" :key="index" :prop="item.value" :label="item.text">
          <el-input v-model="editDialog[item.value]"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CancelEdit">取 消</el-button>
        <el-button type="primary" @click="SaveEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>

import treeToArray from './eval'
export default {
  name: 'treeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => {}
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      editwhich: null,
      addwhich: null,
      editDialog: {},
      addDialog: {},
      Visible: {
        Add: false,
        Edit: false
      }
    }
  },
  created () {
    // console.log(this.formatData)
    this.columns.forEach(item => {
      this.editDialog[item.value] = null
      this.addDialog[item.value] = null
    })
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    handleEdit(index, row){  
      // console.log(this.$refs.addform.resetFields)     
      this.Visible.Edit = true
      this.editwhich = row
      this.columns.forEach(item => {
        this.editDialog[item.value] = row[item.value]
      })
    },
    CancelEdit(){
      this.Visible.Edit = false
      this.resetForm('editform')
    },
    SaveEdit(){
      let self = this
      self.$refs.editform.validate( valid => {
        if(valid){
          self.columns.forEach(item => {
            self.editwhich[item.value] = self.editDialog[item.value]
          })
          self.$message({
            type: 'success',
            message: '保存成功，请点击确认做统一提交！'
          })
          self.resetForm('editform')
          self.Visible.Edit = false
        }else{
          self.$message({
            type: 'warning',
            message: '验证失败！'
          })
        }
      })
    },
    handleDelete(index, row){
      // console.log(index, row)
      this.$confirm('此操作将永久删除该层菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(index)
        const parent = row.parent
        const children = parent.children
        const index = children.findIndex(d => d.id === row.id)
        children.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    handleAdd(index, row){
      this.addwhich = row
      this.Visible.Add = true
      // console.log(this.$refs.addform.resetFields)
    },
    CancelAdd(){
      this.$refs.addform.resetFields()
      this.Visible.Add = false
    },
    SaveAdd(){
      this.$refs.addform.validate( valid => {
        
        if(valid){
          const newchild = {}
          this.columns.forEach(item => {
            newchild[item.value] = this.addDialog[item.value]
          })
          newchild._level = this.addwhich._level + 1
          newchild._expanded  = true
          newchild._show = true
          newchild.children = []
          newchild.parent = this.addwhich
          // console.log(self.addwhich._level,newchild)
          if(!this.addwhich.children) {this.addwhich.children = []}
          this.addwhich.children.push(newchild)
          this.$message({
            type: 'success',
            message: '保存成功，请点击确认做统一提交！'
          })
          this.resetForm('addform')
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
    }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="less" rel="stylesheet/less" scoped>
  @color-blue: #021cac;
  @space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: @space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  
  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: @color-blue;
    margin-left: -@space-width;
  }
  
  .el-table--border, .el-table--group{
    border: 1px solid #bbb;
  }
  .el-table--border td, .el-table--border th{
    border-right: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
  }
  .el-table th{
    text-align: center;
    font-size: 22px;
    height: 50px;
    padding: 8px 0;
    color: #fff;
    background: #545c64;
    .cell {
      height: 34px;
      line-height: 34px;
    }
  }
  
</style>

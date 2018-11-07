<template>
  <div class="custom-tree-container">
    <div class="tree-header">
      <span>名称</span><span>代码</span><span>操作</span>
    </div>
    <div class="block">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <div class="custom-tree-node" slot-scope="{ node, data }" >
          <span>{{ data.label }}</span>
          <span>{{ data.code }}</span>
          <span>
            <el-button type="success" size="mini" @click="() => append(data)"><i class="fa fa-plus"></i>添加</el-button>
            <el-button type="primary" size="mini" @click="() => edit(data)"><i class="fa fa-pencil"></i>编辑</el-button>
            <el-button type="danger" size="mini" @click="() => remove(node, data)"><i class="fa fa-trash"></i>删除</el-button>
          </span>
          <el-dialog title="新增信息" 
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false"
            :visible.sync="addDialog.visible">
            <el-form :status-icon="true" ref="Addform" :rules="addDialog.rules" :model="addDialog" label-width="">
              <el-form-item  prop="name" label="名称">
                <el-input v-model="addDialog.name"></el-input>
              </el-form-item>
              <el-form-item  prop="code" label="金额">
                <el-input v-model="addDialog.code"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="CancelAdd">取 消</el-button>
              <!-- <el-button type="primary" @click="resetForm('Addform')">重 置</el-button> -->
              <el-button type="primary" @click="SaveAdd">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="编辑信息" 
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false"
            :visible.sync="editDialog.visible">
            <el-form :status-icon="true" ref="Editform" :rules="editDialog.rules" :model="editDialog" label-width="">
              <el-form-item  prop="name" label="名称">
                <el-input v-model="editDialog.name"></el-input>
              </el-form-item>
              <el-form-item  prop="code" label="金额">
                <el-input v-if="editDialog.code" v-model="editDialog.code"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="CancelEdit">取 消</el-button>
              <!-- <el-button type="primary" @click="resetForm('Addform')">重 置</el-button> -->
              <el-button type="primary" @click="SaveEdit">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-tree>
    </div>
    
  </div> 
</template>

<script>
  let id = 100
  let num = 200
  export default {
    data() {
      const data = [
        {
          id: id++,
          label: '基础类',
          code:  num++,
          children: [
            {
              id: id++,
              label: '人口基础信息',
              code:  num++,
              children: null
            },
            {
              id: id++,
              label: '法人基础信息',
              code:  num++,
              children: null
            },
            {
              id: id++,
              label: '空间地理信息',
              code:  num++,
              children: [
                {
                  id: id++,
                  label: '电子证照',
                  code:  num++,
                  children: null
                },
                {
                  id: id++,
                  label: '社会信用',
                  code:  num++,
                  children: null
                }
              ]
            }
          ]
        },
        {
          id: id++,
          label: '主题类',
          code:  num++,
          children: [
            {
              id: id++,
              label: '综合政务',
              code:  num++,
              children: null
            },
            {
              id: id++,
              label: '方针政策',
              code:  num++,
              children: null
            },
            {
              id: id++,
              label: '机构编制',
              code:  num++,
              children: [
                {
                  id: id++,
                  label: '中央党务',
                  code:  num++,
                  children: null
                },
                {
                  id: id++,
                  label: '城乡建设',
                  code:  num++,
                  children: null
                }
              ]
            }
          ]
        }
      ]
      return {
        data: JSON.parse(JSON.stringify(data)),
        addDialog: {
          name: null,
          code: null,
          visible: false,
          rules: {
            name: [{type:'string',required:true,message:'必填项呢！',trigger:'blur'}],
            code: [{type:'string',required:true,message:'必填项呢！',trigger:'blur'}]
          }
        },
        editDialog: {
          name: null,
          code: null,
          visible: false,
          rules: {
            name: [{type:'string',required:true,message:'必填项呢！',trigger:'blur'}],
            code: [{type:'string',required:true,message:'必填项呢！',trigger:'blur'}]
          }
        },
        addwhich: null,
        editwhich: null
      }
    },

    methods: {
      append(data) {
        // console.log(data)
        this.addDialog.visible = true
        this.addwhich = data
      },
      edit(data) {
        // console.log(data)
        this.editDialog.visible = true
        this.editwhich = data
        this.editDialog.name = data.label
        this.editDialog.code = data.code           
      },
      SaveAdd(){
        this.$refs.Addform.validate( valid => {
        if(valid){
          const newchild = {id: id++, label: this.addDialog.name,code: this.addDialog.code, children: []}
          if(!this.addwhich.children){
            this.$set(this.addwhich, 'children', [])
          }
          this.addwhich.children.push(newchild)
          this.$message({
              type: 'success',
              message: '添加成功！'
            })
            this.resetForm('Addform')
            this.addDialog.visible = false
            // console.log(this.data5)
          }else{
              this.$message({
              type: 'warning',
              message: '添加失败!'
            })
          }
        }) 
      },
      SaveEdit(){
        this.$refs.Editform.validate( valid => {
        if(valid){
          this.editwhich.label = this.editDialog.name
          this.editwhich.code = this.editDialog.code     
          this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.resetForm('Editform')
            this.editDialog.visible = false
            // console.log(this.data5)
          }else{
              this.$message({
              type: 'warning',
              message: '修改失败!'
            })
          }
        }) 
      },
      CancelAdd(){
        this.addDialog.visible = false
        this.resetForm('Addform')
      },
      CancelEdit(){
        this.editDialog.visible = false
        this.resetForm('Editform')
      },
      resetForm(name){
        this.$refs[name].resetFields()
      },
      remove(node, data) {
        // console.log(node)
        // console.log(data)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log(index)
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
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
        
      }
    }
  };
</script>

<style lang="less">
.el-tree-node__content{
  min-height: 40px;
  border-bottom: 1px solid #ddd;
}
.block{
  border-bottom: 2px solid #ddd;
}
.tree-header{
  background: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ddd;
}
.tree-header>span{
    display: block;
    // flex-grow: 1;
    text-align: center;
    height: 100%;
    width: 20%;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
    font-family:  "华文细黑", "Microsoft YaHei", "微软雅黑";
  }
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px; 
}
</style>
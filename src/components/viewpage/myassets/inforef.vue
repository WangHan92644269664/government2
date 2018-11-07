<template>
  <div class="">
    <base-table 
    @addinfo= "saveinfo" 
    @theadvar= "update" 
    @saveedit= "saveEdit"
    @selecting = "selecting"
    @deleteRow = "deleteRow"
    @delrows = "delrows"
    :totalData= "InfoRefData|| []" 
    :thArr= "thArr|| []" 
    :config= "config || {}">
    </base-table>
  </div>
</template>

<script>
import HTTP from '@/utils/http'
import {setStore, getStore, removeStore} from '@/utils/tool'
import baseTable from '@/components/common/baseTable'

export default {
  name: 'inforef',
  components: {
    baseTable
  },
  data () {
    let InfoRefData = getStore('InfoRefData')
    let thArr = [
      {key: 'srcName', name: '信息项名称', icon: 'fa-map' , show: true, sort: false},
      {key: 'manage', name: '数据元', icon: 'fa-user', show: true, sort: false},
      {key: 'linkSys', name: '数据元长度', icon: 'fa-cny',  show: true, sort: false},
      {key: 'status', name: '所属部门', icon: 'fa-send',  show: true, sort: false}
    ] 
    return {
      loadok: false,
      InfoRefData,
      thArr,
      config: {
        pagination:{
          pageSizes: [5,10,15,25],
          pageSize: 10,
          display: 'total, sizes, prev, pager, next, jumper',     
          currentPage: 1
        },
        rules: {
          srcName: [
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
          ],
          manage: [
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
          ],
          linkSys: [
            {required:true,message:'必填项呢！',trigger:'blur'}
          ],
          status: [
            {required:true,message:'必填项呢！',trigger:'blur'}
          ]
        },
        handle: {
          canEdit: true,
          canDelete: true,
          showDetail: true
        }
      }
    }
  },
  created(){ 
    let InfoRefData = []
    if(!getStore('srcflag')){
      for(let i= 0; i< 100; i++){
        InfoRefData.push({
        srcName: '资源名称'+i,
        manage: '管理方式'+i,
        linkSys: 100+i,
        status: '珠海中心'+i,
        id : Math.ceil(new Date().getTime()*(Math.random()+0.5))
        }) 
      } 
      this.InfoRefData = InfoRefData
      setStore('srcflag', true)
    }
   
  },
  watch:{
    InfoRefData: {
      handler: (val, oldval)=>{
        setStore('InfoRefData',val)
      },
      deep: true
    }
  },
  methods: {
    update(val){
      this.thArr = val
    },
    saveinfo(val){
      this.InfoRefData.unshift(val)
      this.$message({
        type: 'success',
        message: '添加成功！'
      })
    },
    saveEdit(val){
      let id = val.id
      this.InfoRefData.forEach(item => {
        if(item.id === id){
          item.srcName = val.srcName
          item.metaType = val.metaType
          item.manage = val.manage
          item.linkSys = val.linkSys
          item.status = val.status
          this.$message({
            type: 'success',
            message: '修改成功！'
          })  
        }
      })  
    },
    selecting(arr){
      // console.log(arr)
    },
    deleteRow(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(index)
        this.InfoRefData.splice(this.InfoRefData.indexOf(row), 1)
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
    delrows(rows){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(index)
        rows.forEach ((item) => {
          this.InfoRefData.splice(this.InfoRefData.indexOf(item), 1)
        })
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
}
</script>

<style lang="less">

</style>
<template>
  <div class="">
    <base-table 
    @addinfo= "saveinfo" 
    @theadvar= "update" 
    @saveedit= "saveEdit"
    @selecting = "selecting"
    @deleteRow = "deleteRow"
    @delrows = "delrows"
    :totalData= "InfoItemData|| []" 
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
    let InfoItemData = getStore('InfoItemData')
    let thArr = [
      {key: 'itemName', name: '信息项名称', icon: 'fa-map' , show: true, sort: false},
      {key: 'metaName', name: '数据元', icon: 'fa-user', show: true, sort: false},
      {key: 'metaType', name: '数据元类别', icon: 'fa-bank', show: true, sort: false},
      {key: 'metaLenth', name: '数据元长度', icon: 'fa-cny',  show: true, sort: false},
      {key: 'belongTo', name: '所属部门', icon: 'fa-send',  show: true, sort: false}
    ] 
    return {
      loadok: false,
      InfoItemData,
      thArr,
      config: {
        pagination:{
          pageSizes: [5,10,15,25],
          pageSize: 10,
          display: 'total, sizes, prev, pager, next, jumper',     
          currentPage: 1
        },
        rules: {
          itemName: [
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
          ],
          metaName: [
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
          ],
          metaType: [
            {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
          ],
          metaLenth: [
            {required:true,message:'必填项呢！',trigger:'blur'}
          ],
          belongTo: [
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
    let InfoItemData = []
    if(!getStore('itemflag')){
      for(let i= 0; i< 100; i++){
        InfoItemData.push({
        itemName: '信息项'+i,
        metaName: '数据元'+i,
        metaType: '元类型'+i,
        metaLenth: 100+i,
        belongTo: '珠海中心'+i,
        id : Math.ceil(new Date().getTime()*(Math.random()+0.5))
        }) 
      } 
      this.InfoItemData = InfoItemData
      setStore('itemflag', true)
    }
  },
  watch:{
    InfoItemData: {
      handler: (val, oldval)=>{
        setStore('InfoItemData',val)
      },
      deep: true
    }
  },
  methods: {
    update(val){
      this.thArr = val
    },
    saveinfo(val){
      this.InfoItemData.unshift(val)
      this.$message({
        type: 'success',
        message: '添加成功！'
      })
    },
    saveEdit(val){
      let id = val.id
      this.InfoItemData.forEach(item => {
        if(item.id === id){
          item.itemName = val.itemName
          item.metaType = val.metaType
          item.metaName = val.metaName
          item.metaLenth = val.metaLenth
          item.belongTo = val.belongTo
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
        this.InfoItemData.splice(this.InfoItemData.indexOf(row), 1)
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
    delrows(rows){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(index)
        rows.forEach ((item) => {
          this.InfoItemData.splice(this.InfoItemData.indexOf(item), 1)
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
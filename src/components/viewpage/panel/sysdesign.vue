<template>
  <div id="syscount">
    <div class="bigdata">
      <div class="dataitem">
        <span class="icon0" ><i class="fa fa-cubes fa-3x"></i></span>
        <p class="textinfo">信息系统总数 : 
        <span class="cny">
          <count-to :startVal="startVal" :endVal="endVal" :duration="2000"></count-to>
        </span> 个</p>
      </div>
      <div class="dataitem">
        <span class="icon1" ><i class="fa fa-database fa-3x"></i></span>
        <p class="textinfo">系统年度运维总金额总数 : 
        <span class="cny">
          <count-to :start-val='0' :end-val='3337' :duration='2000' :decimals='0' separator=',' prefix='¥ ' suffix='' ></count-to>
        </span>亿元</p>
      </div>
      <div class="dataitem">
        <span class="icon2" ><i class="fa fa-bar-chart fa-3x"></i></span>
        <p class="textinfo">预估年度运维总金额 : 
          <span class="cny">
            <count-to :startVal="startVal" :endVal="endVal+20" :duration="2000"></count-to>
          </span>
        </p>
      </div>
    </div>
    <div class="search">
      <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
      <el-button type="primary" ><i class="fa fa-search"></i> 搜索</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6"  v-for=" (item, index) in content " :key="index">
        <div class="grid-content bg-purple">
          <p class="title"><span>{{item.title}}</span></p>
          <p class="partname">单位名称：<span>{{item.partname}}</span> </p>
          <p class="fund">年度运维金额： <span> {{item.fund}} </span>万元</p>
        </div>
      </el-col>
    </el-row>

    <div class="pagination">
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
import countTo from 'vue-count-to'
export default {
  name: 'sysdesign',
  components: {
    countTo
  },
  data () {
    return {
      input: '',
      startVal: 0,
      endVal: 337,
      pagination:{
        pageSizes: [5,10,15,20],
        pageSize: 10,
        display: 'total, sizes, prev, pager, next, jumper',     
        currentPage: 1
      },
      totalCount: 100,
      content: [
        {title: '港口安全监督工作信息管理系统',partname: '珠海市交通运输局',fund: '45'},
        {title: '珠海市综合公共服务平台',partname: '交通规划研究与信息中心',fund: '28'},
        {title: '交通信息综合服务平台',partname: '珠海市西部城区开发建设局',fund: '58'},
        {title: '珠海市建设业务管理系统',partname: '珠海市海洋农业和水务局',fund: '42'},
        {title: '珠海市综合公共服务平台',partname: '交通规划研究与信息中心',fund: '28'},
        {title: '交通信息综合服务平台',partname: '珠海市西部城区开发建设局',fund: '58'},
        {title: '珠海市建设业务管理系统',partname: '珠海市海洋农业和水务局',fund: '42'},
        {title: '珠海市综合公共服务平台',partname: '交通规划研究与信息中心',fund: '28'},
        {title: '交通信息综合服务平台',partname: '珠海市西部城区开发建设局',fund: '58'},
        {title: '珠海市建设业务管理系统',partname: '珠海市海洋农业和水务局',fund: '42'},
        {title: '珠海市电子公文协同处理系统',partname: '交通规划研究与信息中心',fund: '28'},
        {title: 'FE办公自动化综合平台',partname: '珠海市国土资源局',fund: '48'}
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        // this.pagination.pageSize = val
        // this.tableData.perpage =val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        // this.pagination.currentPage = val
        // this.tableData.nowpage =val
      }
  }
}
</script>
<style scope lang="less">
  .bigdata{
    margin: 10px 0;
    .dataitem{
      margin: 10px 0;
      padding-right: 20px;
      display: inline-block;
      height: 80px;
      background: #fff;
      line-height: 80px;
      margin-right: 10px;
      border-radius: 5px;
      .icon0{
        background:#12b2b4
      }
      .icon0:hover{
        background:#fff;
        color:#12b2b4;
      }
      .icon1{
        background:#ec9d19
      }
      .icon1:hover{
        background:#fff;
        color: #ec9d19;
      }
      .icon2{
        background:#ed5565
      }
      .icon2:hover{
        background:#fff;
        color: #ed5565;
      }
      .textinfo{
        float: right;
        line-height: 80px;
        vertical-align: top;
        .cny{
          font-size: 40px;
          color: #d31f07
        }
      }
      .icon0, .icon1, .icon2 {
        display: inline-block;
        text-align: center;
        line-height: 60px;
        height: 80px;
        width: 80px;
        border-radius: 5px 0 0 5px;
        margin-right: 10px;
        transition: all 0.4s ease-out;
        .fa{
          line-height: 80px;
        }
      }
    }
  }
  .search{
    margin-bottom: 10px;
    .el-input{
      display: inline-block;
      width: 250px !important;
    }
  }
  .el-row{
    width:100%;
    margin: 0 !important;
    .el-col {
      border-radius: 4px;
    }    
  }

  .bg-purple {
    background: #fff;
  }
  .pagination{
      padding: 10px;
      text-align: center;
    }
  .grid-content {
    border-radius: 4px;
    min-height: 140px;
    margin-bottom: 20px;
    .title{
      height: 300px;
      font-weight: bold;
      color: #fff;
      background-image: url(https://i.loli.net/2017/12/17/5a36219e9b0ba.jpg);
      background-size: cover;
      position: relative;
      span{
        color: #fff;
        display: inline-block;
        position: absolute;
        width: calc(100% - 10px);
        height: 60px;
        left: 10px;
        bottom: 10px;
        font-size: 20px;
        text-align: left;
        line-height: 60px;
      }
      // -webkit-filter: blur(10px);
      // filter: blur(10px);
    }
    .partname{
      height: 39px;
      padding-left: 12px;
      line-height: 39px;
      border-bottom: 1px solid #bbb;
      color: #888;
      font-size: 15px;
      span{
        color: #666;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .fund{
      height: 60px;
      padding-left: 12px;
      line-height: 60px;
      color: #888;
      font-size: 15px;
      span{
        color: #d31f07;
        font-size: 30px;
        font-weight: bold;
      }
    }

  }
</style>

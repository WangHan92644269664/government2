<template>
  <div id="headnav">
    <el-menu
      default-active="2"
      class="homenav"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      
      <p class="total_title">
        <img class="brand" src="http://183.245.210.26:18080/zhdata/static/images/skin/skin-1/dnalogo.png" alt="">
        <span>珠海市政务数据资产普查系统</span> 
      </p>
      <el-menu-item index="1"><i class="fa fa-sign-out"></i> 退出</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="fa fa-user-secret"></i> 超级管理员</template>
        <el-menu-item index="2-1"><i class="fa fa-folder-open"></i> 选项1</el-menu-item>
        <el-menu-item index="2-2"><i class="fa fa-folder-open"></i> 选项2</el-menu-item>
        <el-menu-item index="2-3"><i class="fa fa-folder-open"></i> 选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><i class="fa fa-question-circle"></i> 详情帮助</el-menu-item>
      <el-menu-item index="4"><i class="fa fa-comments"></i> 订单消息</el-menu-item>
    </el-menu>
    <div style="clear: both"></div>
  </div>
</template>

<script>

export default {
  name: 'headnav',
  data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped lang='less'>
#headnav{
  background-clip: content-box;
  width: 100%;
  .homenav{
    width: 100%;
    >.el-menu-item{
      float: right !important;
    }
    >.el-submenu{
      float: right !important;
    }
  }
 .total_title{
    // vertical-align: center;
    position: absolute;
    margin-left: 50px;
    height: 60px;
    line-height: 60px !important;
    top: 0;
    font-size: 24px;
    color: #fff;
    span{
      font-family:  "华文细黑", "Microsoft YaHei", "微软雅黑";
    }
    .brand{
        height: 40px;
        margin: 10px;
        line-height: 60px !important;
        vertical-align: top;
     }
  }
   }
    .fa{
          margin-right: 5px;
    }
    .el-menu-item , .el-submenu{
        
        min-width: 120px;
        text-align: center;
        color: #fff !important;
        .el-submenu__title{
          padding: 0 10px;          
      }
    }
    
</style>

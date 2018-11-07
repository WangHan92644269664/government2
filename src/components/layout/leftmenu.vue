<template>
  <div class="leftmenu">
    <el-menu
      default-active="1"
      :unique-opened = "true"
      :collapse = "isopen"
      mode="vertical"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-th-list"></i><span>我的面板</span>
        </template>
        
        <router-link :to="{name: 'partinfo'}" tag="div" >
          <el-menu-item index="1-1"><i class="fa fa-calendar"></i><span>部门信息</span></el-menu-item>
        </router-link>     
        <router-link :to="{name: 'datainfo'}" tag="div">
          <el-menu-item index="1-2"><i class="fa fa-area-chart"></i><span>数据概览</span></el-menu-item>
        </router-link> 
        <router-link :to="{name: 'sysdesign'}" tag="div">
          <el-menu-item index="1-3"><i class="fa fa-pie-chart"></i><span>系统统计</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'password'}" tag="div">
          <el-menu-item index="1-4"><i class="fa fa-unlock"></i><span>密码修改</span></el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-google-wallet"></i><span>我的资产</span>
        </template>

        <el-submenu index="2-1">
          <template slot="title"><i class="fa fa-windows"></i>信息系统</template>         
          <router-link :to="{name: 'toinfo'}" tag="div">
            <el-menu-item index="2-1-1"><i class="fa fa-calendar-plus-o"></i><span>拟建信息系统</span></el-menu-item>
          </router-link>         
          <router-link :to="{name: 'infoing'}" tag="div">
            <el-menu-item index="2-1-2"><i class="fa fa-calendar-minus-o"></i><span>在建信息系统</span></el-menu-item>
          </router-link> 
          <router-link :to="{name: 'infoed'}" tag="div">
            <el-menu-item index="2-1-3"><i class="fa fa-calendar-check-o"></i><span>已建信息系统</span></el-menu-item>
          </router-link>  
        </el-submenu>

        <router-link :to="{name: 'inforef'}" tag="div">
          <el-menu-item index="2-2"><i class="fa fa-th-list"></i><span>信息资源</span></el-menu-item>
        </router-link> 

        <router-link :to="{name: 'infoitem'}" tag="div">
          <el-menu-item index="2-3"><i class="fa fa-database"></i><span>信息项</span></el-menu-item>
        </router-link>

        <el-menu-item index="2-4"><i class="fa fa-sitemap"></i>数据源</el-menu-item>
        <el-menu-item index="2-5"><i class="fa fa-code"></i>代码集</el-menu-item>
      </el-submenu>

      <el-submenu index="3" >
        <template slot="title">
          <i class="fa fa-paypal"></i><span slot="title">目录管理</span>
        </template>
        <router-link :to="{name: 'todos'}" tag="div">
          <el-menu-item index="3-1"><i class="fa fa-pencil-square-o"></i><span>待办事宜</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'todeals'}" tag="div">
          <el-menu-item index="3-2"><i class="fa fa-calendar-plus-o"></i><span>待审核资源</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'dealed'}" tag="div">
          <el-menu-item index="3-3"><i class="fa fa-check-square-o"></i><span>已审核资源</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'backed'}" tag="div">
          <el-menu-item index="3-4"><i class="fa fa-share-square-o"></i><span>已回退资源</span></el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-gear"></i>
          <span>系统配置</span>
        </template>
        <el-submenu index="4-1">
          <template slot="title"><i class="fa fa-list-ul"></i>表单配置</template>
          <router-link :to="{name: 'itemconfig'}" tag="div">
            <el-menu-item index="4-1-1"><i class="fa fa-archive"></i><span>信息项配置</span></el-menu-item>
          </router-link>
          <router-link :to="{name: 'infosysconfig'}" tag="div">
            <el-menu-item index="4-1-2"><i class="fa fa-info"></i><span>信息系统配置</span></el-menu-item>
          </router-link>
          <router-link :to="{name: 'refconfig'}" tag="div">
            <el-menu-item index="4-1-3"><i class="fa fa-info-circle"></i><span>信息资源配置</span></el-menu-item>
          </router-link>
          <router-link :to="{name: 'userconfig'}" tag="div">
            <el-menu-item index="4-1-4"><i class="fa fa-user"></i><span>用户中心配置</span></el-menu-item>
          </router-link>
        </el-submenu>
        <router-link :to="{name: 'charconfig'}" tag="div">
          <el-menu-item index="4-2"><i class="fa fa-table"></i><span>字典配置</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'menuhandle'}" tag="div">
          <el-menu-item index="4-3"><i class="fa fa-list-ul"></i><span>菜单管理</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'rolehandle'}" tag="div">
          <el-menu-item index="4-4"><i class="fa fa-users"></i><span>角色管理</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'parthandle'}" tag="div">
          <el-menu-item index="4-5"><i class="fa fa-building"></i><span>机构管理</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'userhandle'}" tag="div">
          <el-menu-item index="4-6"><i class="fa fa-user-plus"></i><span>用户管理</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'cateconfig'}" tag="div">
          <el-menu-item index="4-7"><i class="fa fa-list"></i><span>目录配置</span></el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="5" >
        <template slot="title">
          <i class="fa fa-cogs"></i><span slot="title">系统监控</span>
        </template>
        <router-link :to="{name: 'ctrllog'}" tag="div">
          <el-menu-item index="5-1"><i class="fa fa-key"></i><span>操作日志</span></el-menu-item>
        </router-link>
        <router-link :to="{name: 'linkctrl'}" tag="div">
          <el-menu-item index="5-2"><i class="fa fa-anchor"></i><span>连接池监控</span></el-menu-item>
        </router-link> 
      </el-submenu>
    </el-menu> 
  </div>
</template>

<script>
import sidebarItem from '@/components/layout/sidebarItem'
export default {
  name: 'leftmenu',
  data () {
    return {
     
    }
  },
  components: {
    sidebarItem
  },
  computed: {
    routerMap(){
    },
    isopen(){
      return this.$store.state.sidebar
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        // console.log(keyPath);
        
      },
      handleClose(key, keyPath) {
        // console.log(routerMap);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.el-menu-vertical-demo{
  border: none;
  transition: all 0.7s ease-out;

  .el-menu-item{
    border: none;
    min-width: 180px !important;
  }
}
</style>

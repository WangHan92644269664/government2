<template>
  <div class="">
      <template v-for="item in routes" v-if="!item.hidden">

      <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" >
          <!-- <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i> -->
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item   v-if="child.children&&child.children.length>1" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link  :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>



  </div>
</template>

<script>

export default {
  name: 'sidebarItem',
  data () {
    return {

    }
  },
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>

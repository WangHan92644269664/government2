<template>
  <div id="layout">
    <header id="header">
    <headNav/>
    </header>
    <div class="container">
        <div :class="{'close':isopen}" class="aside">
            <leftMenu/>
        </div>
        <div :class="{'baropen':!isopen,'barclose':isopen }" class="main">
            <sub-nav/>
            <div class="app-main">
                <tags/>
                <transition name="view" mode="out-in">
                    <router-view/>
                </transition>
            </div>
        </div>
    </div>    
  </div>
</template>
 
<script>
import '@/assets/style/common.less'
import headNav from '@/components/layout/headnav'
import subNav from '@/components/layout/subnav'
import leftMenu from '@/components/layout/leftmenu'
import tags from '@/components/layout/tags'
         
export default {
  name: 'layout',
  data(){ 
    return{
      
    }
  },
  components: {
    headNav,
    leftMenu,
    subNav,
    tags
  },
  computed: {
      isopen(){
          return this.$store.state.sidebar
      }

  },
  methods:{
    

  },
  watch:{

  }
}
</script>

<style lang="less">
body{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    // overflow: hidden;
}
.view-enter{
  opacity: 0;
  -webkit-transform: translateX(20px);
}
.view-enter-to{
  opacity: 1;
  -webkit-transform: translateX(0px);
}
.view-enter-active{
  -webkit-transition: 0.3s ease-out;
}
.view-leave{
  opacity: 1;
  -webkit-transform: translateX(0px);
}
.view-leave-to{
  opacity: 0;
  -webkit-transform: translateX(-20px);
}
.view-leave-active{
  transition: 0.3s ease-out;
}
#layout{
    // height: calc(100% - 61px);
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
}
#header{
    // height: 61px;
    width: 100%;
    color: #333;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .container{
    position: relative;
    margin-top: 60px;
    border-top:1px solid #fff;
    width: 100%;
    height: calc(100% - 61px);
    overflow-y: scroll;
    &::-webkit-scrollbar {  
        width: 8px;  
        background-color: #ddd;  
    } 
    
    &::-webkit-scrollbar-track {  
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
        border-radius: 8px;  
        background-color: #F5F5F5;  
    }
    &::-webkit-scrollbar-thumb {  
        border-radius: 8px;  
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
        background-color: #888;  
    }

    .aside {
        background-color: #545c64;
        color: #333;
        position: fixed;
        height: calc(100% - 61px);
        top: 60px; 
        width: 180px;
        transition: width 0.7s ease-out;
    }
    .close{
        width: 64px;
    }
    .main {
        transition: margin-left 0.7s ease;
        z-index: 100;
        min-height: 100%;
        background-color: #E9EEF3;
        color: #333;
        padding:0 5px;
    }
    .app-main{
        position: relative;
        min-height: 100%;
    }
    .baropen{
        margin-left: 180px;
    }
    .barclose{
        margin-left: 64px;
    }
  }
 
</style>

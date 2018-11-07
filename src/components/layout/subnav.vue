<template>
  <div  class="subnav">

  <div class="breadnav">
    <span @click="toggleSideBar" class="bars"> 
		    <i class="fa fa-bars fa-lg"  :class="{close: isopen == true}"></i>
		</span>
      <router-link id="aaa" class="breadnavs" to="/" style="cursor: pointer" tag="span">HOME</router-link><span class="breadnavs" v-for="(item, index) in breadnav" :key = "index">{{item}}</span>
     <screenfull class="screenfull"></screenfull>          
           
  </div>
  
  </div>
</template>
 
<script>

import screenfull from '@/components/common/screenfull'

export default {
  name: 'subnav',
  components:{
    screenfull
  },
  data() {
      return {   
        breadnav: []
      }
  },
  
  computed:{
    isopen(){ 
      return this.$store.state.sidebar
    }
  },
  watch:{
    $route (){
      this.Getnavs()
      // console.log(this.breadnav)
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('togglebar')
    },
    Getnavs(){
      let route = this.$route
      if ( route.meta.hidden !== true ) {
        this.breadnav = route.matched.map( item => {
          return item.meta.title
        } )
      }else{
        this.breadnav = []
      }

    }
  }
}
</script>

<style lang='less'>
@keyframes tags{
  0% {
    transform: translateX(-50px);
  }
  20% {
  }
  100% {
    transform: translateX(0px);
  }
}
.breadnav{
  margin: 0;
  background: #545c64;
  height: 40px;
  line-height: 40px;
  position: relative;
  font-family:  "华文细黑", "Microsoft YaHei", "微软雅黑";
  .bars{
      cursor: pointer;
      .fa-bars{
        width:20px;
      }
			.close{
				-webkit-transform: rotate(90deg);
				transform: rotate(90deg);
				transition: .38s;
				-webkit-transform-origin: 50% 50%;
				transform-origin: 50% 50%;
			}
		}

  .screenfull{
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 40px;
    height: 40px;
    z-index: 99;
    background: #fff;
    border: 5px solid #545c64;
    svg{
      width: 30px;
      height: 30px;
    }
  }
}
.breadnav{
  padding:0 15px;
  line-height: 40px;
  color: #fff;
  font-weight: normal;
  font-size: 16px;
  .breadnavs{
    display: inline-block; 
    position: relative;
    min-width: 90px;
    height: 26px;
    margin-right: 18px;  
    line-height: 26px;
    text-align: center; 
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.35); 
    background: #fff;
    color: #333;
    animation: tags 0.7s ease-out  forwards;
    }
    .breadnavs:after{
      content: "";
      border-left: 13px solid green;
      border-top: 13px solid red;
      border-bottom: 13px solid red;
      border-left: 13px solid #fff;
      border-top: 13px solid transparent;
      border-bottom: 13px solid transparent;
      position: absolute;
      right: -13px;
      top: 0;
    }
    .breadnavs:before{
      content: "";
        border-top: 13px solid #fff;
        border-bottom: 13px solid #fff; 
        border-left: 13px solid transparent;
        position: absolute;
        top: 0;
        left: -13px;
    }
    #aaa{
      border-radius: 4px 0 0 4px;
    }
    #aaa:before{
      display: none;
    } 
}

</style>

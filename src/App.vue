<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
 
<script>
        
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components: {
    
  }
}
</script>

<style lang="less">
#app{
  width: 100%;
  height: 100%;
  .fa{
    margin-right: 5px;
  }
  // overflow: auto;
}

</style>

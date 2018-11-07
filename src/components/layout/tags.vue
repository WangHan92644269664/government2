<template>
  <div id="tags" :class="{'show': dynamicTags.length == 0}">
    <scroll>
      <el-tag   
        :hit= "true"
        :key="tag.name"
        v-for="tag in dynamicTags"
        closable
        :color = "tag.label === routename? '#fff': '#eee'"              
        :disable-transitions="false"
        @close="handleClose(tag)">
        <router-link :to="tag.path" tag="span" >{{tag.name}}</router-link>              
      </el-tag>
    </scroll>
            
  </div>
</template>
 
<script>
import scroll from '@/components/common/scroll'

export default {
  name: 'tags',
  components: {
    scroll
  },
  data(){
    return{
      dynamicTags: []
    }
  },
computed: {
    routename() {
      return this.$route.name 
    }
  },
  methods:{   
    Addtag(){
      let tag = {} 
      tag.path = this.$route.path
      tag.label = this.$route.name
      tag.name = this.$route.meta.title
      this.dynamicTags.push(tag)
      this.dynamicTags = this.Unique(this.dynamicTags)
    },
    handleClose(tag) {
        let index = this.dynamicTags.indexOf(tag)
        if (tag.label === this.$route.name) {
          
          if (index > 0) {
            this.$router.replace(this.dynamicTags[index-1].path)
          } else {
            if (this.dynamicTags[1]) {
              this.$router.replace(this.dynamicTags[1].path)
            }            
          }         
        }
        this.dynamicTags.splice(index, 1)
      },
    Unique(arr){
      let arr1 = arr.map( (item) =>  JSON.stringify(item) )
      arr1 = [... new Set(arr1)]
      arr1 = arr1.map( (item) =>  JSON.parse(item)  )
      return arr1
    }
  },
  watch:{
    $route(){
      this.Addtag()
    }
  }
}
</script>

<style scoped lang="less">
@keyframes tags {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  50% {
    background-color: #666;
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
#tags{
  margin-top: 5px;
  border-bottom: 1px solid #fff;
  font-family:  "华文细黑", "Microsoft YaHei", "微软雅黑";
  width: 100%;
  // .show{display: none}
  .el-tag {
    margin-left: 10px;
    border-radius: 0px;
    border: 1px solid #bbb;
    cursor: pointer;
    color: #333;
    animation: tags 0.3s ease-out  forwards;
  }
}
.show{display: none !important;}
</style>

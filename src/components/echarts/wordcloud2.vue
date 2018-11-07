<template>
  <div id="content">
      <div class="cloud">
        <div id="wordcloud2"></div>
    </div>
    
  </div>
</template>

<script>
  import echarts from 'echarts'
  import 'echarts-wordcloud'

  let options = {
    title: {
        text: '年度关键词'
    },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataView: {}
        },
        right: 20,
        top: 20
      },
      series: [{
        type: 'wordCloud',
        shape: 'cardioid',
        // shape: 'cardioid',
        // shape: 'pentagon',
        // shape: 'circle',
        left: 'center',
        top: 30,
        width: '75%',
        height: '80%',
        right: null,
        bottom: null,
        sizeRange: [12, 75],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        textStyle: {
          normal: {
            fontFamily: 'Microsoft Yahei',
            fontWeight: 'bold',
            color: function() {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: [
              { "name": "鸡公坑", "value": 1 },
              { "name": "新城大桥", "value": 1 },
              { "name": "杨咏曼图书馆", "value": 1 },
              { "name": "揽月台", "value": 1 },
              { "name": "揽月湖", "value": 2 },
              { "name": "恒尊体育场", "value": 2 },
              { "name": "杨存国报告厅", "value": 2 },
              { "name": "莲池咖啡", "value": 3 },
              { "name": "紫薇山公园", "value": 4 },
              { "name": "朱家尖大桥", "value": 5 },
              { "name": "海科楼", "value": 6 },
              { "name": "H125A", "value": 6 },
              { "name": "海洋科学城", "value": 7 },
              { "name": "长峙岛", "value": 8 }
        ]
      }]
    }

  export default {
    name: 'wordcloud',
    data() {
      return {
        wordcloud: null
      }
    },
    methods: {
      drawWord (id) {
        this.wordcloud = echarts.init(document.getElementById(id))
        this.wordcloud.setOption(options)
      }
    },
    mounted() {
      this.drawWord('wordcloud2')
    }
  }
</script>

<style scoped>
#content{
  height: 400px;
}
.cloud{
    z-index: 10;
    height: 400px;
}
  #wordcloud2 {
    height: 400px;
    background: #fff;
  }    
</style>
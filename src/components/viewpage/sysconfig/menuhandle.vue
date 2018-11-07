<template>
  <div class="treetable">
    <tree-Table
      :data = "data" :columns="columns" :rules="Rules"
    ></tree-Table>
  </div> 
</template>

<script>
import treeTable from '@/components/common/treeTable'
  let id = 0
  export default {
    components: {
      treeTable
    }, 
    data() {
      const data = [
        {
          id: '序号'+id++,
          label: '我的面板',
          fund: 5753,
          children: [
            {
              id: '序号'+id++,
              label: '部门信息',
              fund: 123,
              children: null
            },
            {
              id: '序号'+id++,
              label: '数据概览',
              fund: 226,
              children: null
            },
            {
              id: '序号'+id++,
              label: '信息系统',
              fund: null,
              children: [
                {
                  id: '序号'+id++,
                  label: '在建系统',
                  fund: 456,
                  children: null
                },
                {
                  id: '序号'+id++,
                  label: '拟建系统',
                  fund: 987,
                  children: null
                }
              ]
            }
          ]
        },
        {
          id: '序号'+id++,
          label: '我的面板2',
          fund: 57527,
          children: [
            {
              id: '序号'+id++,
              label: '部门信息2',
              fund: 123,
              children: null
            },
            {
              id: '序号'+id++,
              label: '数据概览2',
              fund: 226,
              children: null
            },
            {
              id: '序号'+id++,
              label: '信息系统2',
              fund: 3689,
              children: [
                {
                  id: '序号'+id++,
                  label: '在建系统2',
                  fund: 456,
                  children: null
                },
                {
                  id: '序号'+id++,
                  label: '拟建系统2',
                  fund: 987,
                  children: null
                }
              ]
            }
          ]
        }
      ]
    return {
      data,
      Rules: {
        id: [
          {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
        ],
        label: [
          {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
        ],
        fund: [
          {type:'string',required:true,message:'必填项呢！',trigger:'blur'}
        ]
      },
      columns: [{
        value: 'id',
        text: '序号'
        },{
        value: 'label',
        text: '标签'
        },{
        value: 'fund',
        text: '金额'
        }]
      }
    },
    methods: {
 
    }
  }
</script>

<style lang="less">

</style>
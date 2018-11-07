
<template>
  <div class="partinfo">
    <div class="action">
      <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable>
      </el-input>
      <!-- <input class="search" placeholder="请输入内容" type="text" v-model="input"> -->
      <el-button size="middle" type="primary" icon="el-icon-search">搜索</el-button>
      <el-popover
        ref="popover1"
        placement="bottom"
        title="条件"
        trigger="click"
        content="">
        <br>
        <el-checkbox size="middle"  v-model="checked1">备选项1</el-checkbox><br><br>
        <el-checkbox size="middle"  v-model="checked2">指标金额最多</el-checkbox><br><br>
        <el-checkbox size="middle"  v-model="checked3">指标金额最少</el-checkbox><br>
      </el-popover>
      <el-button  
        type="warning"
        class="filter" 
        size="middle" 
        v-popover:popover1>添加筛选</el-button>
    </div>
     <el-table
    :data="tableData"
    :stripe = "true"
    style="width: 100%">
    <el-table-column
      label="部门名称"
      >
      <template slot-scope="scope">
        <i class="fa fa-calendar"></i>
        <span style="margin-left: 10px">{{ scope.row.partname }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="指标金额"
      >
      <template slot-scope="scope">
        <i class="fa fa-cny"></i>
        <span style="margin-left: 10px">{{ scope.row.fund }}</span>
        <!-- <el-popover  placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover> -->
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          
          @click="handleEdit(scope.$index, scope.row)"> <i class="fa fa-pencil"></i><span>编辑</span>
        </el-button>
        <el-button
          size="mini"          
          type="info"
          @click="handleDelete(scope.$index, scope.row)"> <i class="fa fa-question-circle"></i><span>详情</span>
        </el-button>
        
      </template>
      
    </el-table-column>
  </el-table>

  <el-dialog title="详细信息" 
  :close-on-click-modal='false'
  :close-on-press-escape='false'
  :modal-append-to-body="false"
  :visible.sync="DetailVisible">
    <el-form ref="form" :model="form" label-width="200px">
              <el-form-item label="部门名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="部门信息化分管领导姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="承担信息化工作的内设机构">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="所属部门">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="国务院" value="国务院"></el-option>
                  <el-option label="教育局" value="教育局"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="DetailVisible = false">确 定</el-button>
    </div>
  </el-dialog>

  <el-dialog title="编辑信息" 
  :close-on-click-modal='false'
  :close-on-press-escape='false'
  :modal-append-to-body="false"
  :visible.sync="EditVisible">

    <el-form ref="form" :model="form" label-width="200px">
              <el-form-item label="部门名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="部门信息化分管领导姓名">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="承担信息化工作的内设机构">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="所属部门">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="国务院" value="国务院"></el-option>
                  <el-option label="教育局" value="教育局"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="EditVisible = false">取 消</el-button>
      <el-button type="primary" @click="EditVisible = false">确 定</el-button>
    </div>
  </el-dialog>

    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'partinfo',
    data() {
      return {
        input:'',
        tableData: [{
          partname: '珠海市委办公室',
          fund: '123'
        }, {
          partname: '珠海市委办公室1',
          fund: '145'
        }, {
          partname: '珠海市委办公室2',
          fund: '543'
        }, {
          partname: '珠海市委办公室3',
          fund: '652'
        }],
        checked1: false,
        checked2: false,
        checked3: false,

        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        EditVisible: false,
        DetailVisible: false,
        formLabelWidth: '200px'
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.EditVisible = !this.EditVisible
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.DetailVisible = !this.DetailVisible
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created(){
      // console.log(this.$route)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.fa{
    margin-right:5px !important;
  }
  .action{
    // width: 100%;
    height: 63px;
    line-height: 62px;
    position: relative;
    // padding-bottom: 15px;
    font-size: 18px !important;
    .search{
      height: 33px;
      line-height: 40px;
      width: 250px;
      text-indent: 10px;
    }
    .el-checkbox{
      height: 30px !important;
    }
    .el-input{
        display: inline-block;
        width: 200px !important;
      }
  }
  .el-pagination{
    padding: 10px;
    text-align: center;
  }
  


</style>

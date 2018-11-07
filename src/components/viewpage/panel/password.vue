<template>
<div class="pass">
  <div class="modify">
    <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px">
      <el-form-item label="原密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model="ruleForm.newPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码确认" prop="confirm">
        <el-input type="password" v-model="ruleForm.confirm"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="success" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>  
  </div>
</div>
  
</template>

<script>
export default {
  name: 'password',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入原密码！'))
      } else {
        // if (this.ruleForm.Pass !== '') {
        //   this.$refs.ruleForm.validateField('newPass')
        // }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        // if (this.ruleForm.newPass !== '') {
        //   this.$refs.ruleForm.validateField('confirm')
        // }
        callback()
      }
    }
    var checkconfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        pass: '',
        newPass: '',
        confirm: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        confirm: [
          { validator: checkconfirm, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '修改成功！'            
          })
          this.resetForm('ruleForm')
        } else {
          this.$message({
            type: 'error',
            message: '修改失败！'
          })
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
.pass{
  position: relative;
    .modify{
    width: 600px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    .el-input{
      width: 350px;
      display: inline-block;
    }
  }
}
</style>

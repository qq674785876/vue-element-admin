<template>
  <div class="forgetPass-container">
    <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" auto-complete="off" label-position="left">
      <el-col :span="7" :xs="0" style="height: 1px;"/>
      <el-col :span="10" :xs="24" class="left-box">
        <div class="login-nav">
          <a class="active" href="javascript:;" @click="selectType = 'login'">重置密码</a>
          &emsp;
          <a href="javascript:;" @click="$parent.selectType = 'login'">登陆</a>
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="forgetForm.username"
            placeholder="邮箱"
            name="username"
            type="text"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="pin">
          <el-input
            v-model="forgetForm.pin"
            placeholder="验证码"
            name="pin"
            type="tel"
            maxlength="4"
            auto-complete="off"
            style="width: 140px;"
            @keyup.enter.native="handleLogin"
          />
          <el-button size="mini" style="padding: 7px 5px;float: right;" @click="getVerifyCode">{{ verifyCodeText }}</el-button>
        </el-form-item>
        <el-form-item prop="registerPass">
          <el-input
            v-model="forgetForm.forgetPass"
            type="password"
            placeholder="新的密码"
            name="forgetPass"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="qrRegisterPass">
          <el-input
            v-model="forgetForm.qrForgetPass"
            type="password"
            placeholder="再次输入密码"
            name="qrForgetPass"
            auto-complete="on"
          />
        </el-form-item>
        <el-row style="text-align: right;padding-top: 30px;">
          <el-button type="info" size="small" @click="$parent.selectType = 'login'">取消</el-button>
          <el-button type="primary" size="small" @click="sure()">确定</el-button>
        </el-row>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'

export default {
  name: 'ForgetPass',
  data() {
    const _this = this
    const validateUsername = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('请输入正确邮箱'))
      } else {
        callback()
      }
    }
    const validatePass = function(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== _this.forgetForm.forgetPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePassword = function(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error('密码长度为6位以上'))
      } else {
        callback()
      }
    }

    const validatepin = (rule, value, callback) => {
      if (value !== this.identifyCode) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      identifyCode: '1111',
      verifyCodeText: '获取验证码',
      forgetForm: {
        username: '674785876@qq.com',
        pin: '1111',
        forgetPass: '123456',
        qrForgetPass: '123456'
      },
      forgetRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        forgetPass: [{ required: true, trigger: 'blur', validator: validatePassword }],
        qrForgetPass: [{ required: true, trigger: 'blur', validator: validatePass }],
        pin: [{ required: true, trigger: 'blur', validator: validatepin }]
      }
    }
  },
  methods: {
    sure() {
      const _this = this
      _this.$refs.forgetForm.validate(valid => {
        if (valid) {
          _this.$parent.loginForm.username = this.forgetForm.username
          _this.$parent.loginForm.password = this.forgetForm.forgetPass
          _this.$notify({
            title: '修改成功',
            message: '密码修改成功!',
            type: 'success'
          })
          setTimeout(function() {
            _this.$parent.selectType = 'login'
          }, 1000)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getVerifyCode() {
      let timer = null
      let time = 60
      const _this = this
      if (!validateEmail(this.forgetForm.username)) {
        return
      }
      if (this.verifyCodeText === '获取验证码') {
        alert('已发送验证码至邮箱！')
        _this.verifyCodeText = '重新获取 ' + time + 'S'
        timer = setInterval(function() {
          if (time > 1) {
            time--
            _this.verifyCodeText = '重新获取 ' + time + 'S'
          } else {
            clearInterval(timer)
            timer = null
            _this.verifyCodeText = '获取验证码'
          }
        }, 1000)
      } else {
        return
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$themeColor: #4f93fe;
.forgetPass-container{
  .el-form{
    padding-top: 50px;
    .el-input__inner{
      padding: 0;
    }
  }
  .login-nav{
    margin: 0px 0 10px;
    a{
      font-size: 14px;
      color: #666;
      padding-bottom: 5px;
      display: inline-block;
      cursor: pointer;
    }
    a.active{
      border-bottom: 1px solid #3f57f9;
    }
  }
}
</style>

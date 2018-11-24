<template>
  <div class="register-container">
    <div class="step">
      <el-row>
        <el-col :span="24">
          <div class="step-title">
            <i class="step-num">1</i> 填写基本信息
          </div>
        </el-col>
        <el-row class="form-box">
          <el-form ref="registerForm" :model="registerForm" :rules="registerRules" auto-complete="off" label-position="left">
            <el-col :span="10" :xs="24" class="left-box">
              <el-form-item prop="username">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  v-model="registerForm.username"
                  placeholder="注册邮箱"
                  name="username"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="pin">
                <span class="svg-container">
                  <svg-icon icon-class="lock" />
                </span>
                <el-input
                  v-model="registerForm.pin"
                  placeholder="请输入验证码"
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
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="registerForm.registerPass"
                  type="password"
                  placeholder="登录密码"
                  name="registerPass"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="qrRegisterPass">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="registerForm.qrRegisterPass"
                  type="password"
                  placeholder="确认密码"
                  name="qrRegisterPass"
                  auto-complete="on"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4" :xs="0" style="height: 1px;" class="line"/>
            <el-col :span="10" :xs="24" class="right-box">
              <el-form-item prop="wechat" label="微信:">
                <el-input
                  v-model="registerForm.wechat"
                  name="wechat"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="company" label="公司:">
                <el-input
                  v-model="registerForm.company"
                  name="company"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="qq" label="QQ:">
                <el-input
                  v-model="registerForm.qq"
                  name="qq"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="position" label="职位:">
                <el-input
                  v-model="registerForm.position"
                  name="position"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-button type="primary" size="mini" @click="next()">下一步</el-button>
            </el-col>
          </el-form>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
// import openWindow from '@/utils/openWindow'
import { validateEmail } from '@/utils/validate'

export default {
  name: 'Register',
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
      } else if (value !== _this.registerForm.registerPass) {
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
      registerForm: {
        username: '674785876@qq.com',
        pin: '1111',
        registerPass: '123456',
        qrRegisterPass: '123456'
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        registerPass: [{ required: true, trigger: 'blur', validator: validatePassword }],
        qrRegisterPass: [{ required: true, trigger: 'blur', validator: validatePass }],
        pin: [{ required: true, trigger: 'blur', validator: validatepin }]
      }
    }
  },
  methods: {
    next() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$emit('setSelectType', { currentRole: 'realName' })
          this.$parent.registerForm.username = this.registerForm.username
          this.$parent.registerForm.password = this.registerForm.registerPass
          alert('注册成功!')
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
      if (!validateEmail(this.registerForm.username)) {
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

<style rel="stylesheet/scss" lang="scss" >
$themeColor: #4f93fe;
.register-container{
  .step{
    width: 80%;
    margin: 0 auto;
    padding: 40px 0 0 0;
  }
  .step-title{
    float: left;
    width: 120px;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 2px solid $themeColor;
    .step-num{
      background: #000;
      color: #fff;
      display: inline-block;
      border-radius: 100%;
      width: 16px;
      height: 16px;
      line-height: 18px;
      text-align: center;
      font-style: normal;
    }
  }
  .form-box{
    padding-top:70px;
    .line{
      position: relative;
    }
    .line::after{
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      height: 200px;
      border-right: 1px solid #eee;

    }
    .left-box{
    }
    .right-box{
      .el-form-item__label{
        color: #ccc;
      }
      .el-input{
        width: 80%;
      }
      .el-input__inner{
        padding: 0 !important;
      }
      .el-button{
        display: block;
        margin: 30px auto 0;
      }
    }
  }
}
</style>

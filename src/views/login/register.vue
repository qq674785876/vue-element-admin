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
              <el-form-item prop="email">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  v-model="registerForm.email"
                  placeholder="注册邮箱"
                  name="email"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="code">
                <span class="svg-container">
                  <svg-icon icon-class="lock" />
                </span>
                <el-input
                  v-model="registerForm.code"
                  placeholder="请输入验证码"
                  name="code"
                  type="tel"
                  maxlength="6"
                  auto-complete="off"
                  style="width: 140px;"
                  @keyup.enter.native="handleLogin"
                />
                <el-button size="mini" style="padding: 7px 5px;float: right;" @click="getVerifyCode">{{ verifyCodeText }}</el-button>
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="登录密码"
                  name="password"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="qrPassword">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  v-model="registerForm.qrPassword"
                  type="password"
                  placeholder="确认密码"
                  name="qrPassword"
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
              <el-form-item prop="imNumber" label="QQ:">
                <el-input
                  v-model="registerForm.imNumber"
                  name="imNumber"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="job" label="职位:">
                <el-input
                  v-model="registerForm.job"
                  name="job"
                  type="text"
                  auto-complete="on"
                />
              </el-form-item>
              <el-button :loading="loading" type="primary" size="mini" @click="next()">下一步</el-button>
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
import { register, sendMail } from '@/api/index'
import { setToken, setName } from '@/utils/auth'

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
      } else if (value !== _this.registerForm.password) {
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

    const validatecode = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('验证长度为6位'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      verifyCodeText: '获取验证码',
      registerForm: {
        email: '',
        code: '',
        password: '',
        qrPassword: '',
        wechat: '',
        imNumber: '',
        company: '',
        job: ''
      },
      registerRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        qrPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        code: [{ required: true, trigger: 'blur', validator: validatecode }]
      }
    }
  },
  methods: {
    next() {
      const self = this
      self.$refs.registerForm.validate(valid => {
        if (valid) {
          self.loading = true
          self.$parent.registerForm.email = self.registerForm.email
          self.$parent.registerForm.password = self.registerForm.password
          return new Promise((resolve, reject) => {
            register(self.registerForm).then(response => {
              self.loading = false
              const data = response.data
              const result = data.result
              if (data.error !== 0) {
                self.$notify({
                  title: '注册失败',
                  message: data.reason,
                  type: 'error'
                })
                return
              }
              self.$notify({
                title: '成功',
                message: '注册成功！',
                type: 'success'
              })
              setToken(result.token)
              setName(result.email)
              setTimeout(function() {
                self.$emit('setSelectType', { currentRole: 'realName' })
              }, 1000)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getVerifyCode() {
      let timer = null
      let time = 60
      const self = this
      if (!validateEmail(this.registerForm.email)) {
        return
      }
      if (this.verifyCodeText === '获取验证码') {
        return new Promise((resolve, reject) => {
          sendMail(self.registerForm.email, 0).then(response => {
            const data = response.data
            if (data.error !== 0) {
              self.$notify({
                title: '发送失败',
                message: data.reason,
                type: 'error'
              })
              return
            }
            self.$notify({
              title: '发送成功',
              message: '已发送验证码至邮箱！',
              type: 'success'
            })
            self.verifyCodeText = '重新获取 ' + time + 'S'
            timer = setInterval(function() {
              if (time > 1) {
                time--
                self.verifyCodeText = '重新获取 ' + time + 'S'
              } else {
                clearInterval(timer)
                timer = null
                self.verifyCodeText = '获取验证码'
              }
            }, 1000)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
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

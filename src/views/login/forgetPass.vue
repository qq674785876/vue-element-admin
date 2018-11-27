<template>
  <div class="password-container">
    <el-form ref="forgetForm" :model="forgetForm" :rules="forgetRules" auto-complete="off" label-position="left">
      <el-col :span="7" :xs="0" style="height: 1px;"/>
      <el-col :span="10" :xs="24" class="left-box">
        <div class="login-nav">
          <a class="active" href="javascript:;" @click="selectType = 'login'">重置密码</a>
          &emsp;
          <a href="javascript:;" @click="$parent.selectType = 'login'">登陆</a>
        </div>
        <el-form-item prop="email">
          <el-input
            v-model="forgetForm.email"
            placeholder="邮箱"
            name="email"
            type="text"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="forgetForm.code"
            placeholder="验证码"
            name="code"
            type="tel"
            maxlength="6"
            auto-complete="off"
            style="width: 140px;"
            @keyup.enter.native="handleLogin"
          />
          <el-button size="mini" style="padding: 7px 5px;float: right;" @click="getVerifyCode">{{ verifyCodeText }}</el-button>
        </el-form-item>
        <el-form-item prop="registerPass">
          <el-input
            v-model="forgetForm.password"
            type="password"
            placeholder="新的密码"
            name="password"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="qrRegisterPass">
          <el-input
            v-model="forgetForm.qrPassword"
            type="password"
            placeholder="再次输入密码"
            name="qrPassword"
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
import { findPass, sendMail } from '@/api/login'

export default {
  name: 'Password',
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
      } else if (value !== _this.forgetForm.password) {
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
        callback(new Error('验证码长度为6位'))
      } else {
        callback()
      }
    }
    return {
      verifyCodeText: '获取验证码',
      forgetForm: {
        email: '',
        code: '',
        password: '',
        qrPassword: ''
      },
      forgetRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        qrPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        code: [{ required: true, trigger: 'blur', validator: validatecode }]
      }
    }
  },
  methods: {
    sure() {
      const self = this
      self.$refs.forgetForm.validate(valid => {
        if (valid) {
          return new Promise((resolve, reject) => {
            findPass(self.forgetForm).then(response => {
              const data = response.data
              if (data.error !== 0) {
                self.$notify({
                  title: '修改失败',
                  message: data.reason,
                  type: 'error'
                })
                return
              }
              self.$parent.loginForm.email = this.forgetForm.email
              self.$parent.loginForm.password = this.forgetForm.password
              self.$notify({
                title: '修改成功',
                message: '密码修改成功!',
                type: 'success'
              })
              setTimeout(function() {
                self.$parent.selectType = 'login'
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
      if (!validateEmail(this.forgetForm.email)) {
        return
      }
      if (this.verifyCodeText === '获取验证码') {
        return new Promise((resolve, reject) => {
          sendMail(self.forgetForm.email, 1).then(response => {
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

<style rel="stylesheet/scss" lang="scss">
$themeColor: #4f93fe;
.password-container{
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

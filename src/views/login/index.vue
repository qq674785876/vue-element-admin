<template>
  <div class="login-container">

    <div v-if="selectType === 'login'" class="login-box">
      <el-row>
        <el-col :md="12" :xs="0" class="login-logo-box">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="index in 4" :key="index">
              <img :src="logoimgs[0]">
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :md="2" :xs="0" style="height: 1px;"/>
        <el-col :md="10" :xs="24">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
              <h3 class="title">{{ $t('login.title') }}</h3>
              <p>专业APP分发，一键上传，永久保存</p>
              <!-- <lang-select class="set-language"/> -->
            </div>
            <div class="login-nav">
              &nbsp;
              <a :class="{active: selectType === 'login'}" href="javascript:;" @click="selectType = 'login'">登录</a>
              &emsp;
              <a :class="{active: selectType === 'register'}" href="javascript:;" @click="selectType = 'register',currentRole = 'register'">注册</a>
            </div>
            <el-form-item prop="email">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                v-model="loginForm.email"
                :placeholder="$t('login.username')"
                name="email"
                type="text"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :type="passwordType"
                v-model="loginForm.password"
                :placeholder="$t('login.password')"
                name="password"
                auto-complete="on"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="eyeClass" />
              </span>
            </el-form-item>

            <el-row>
              <el-col :span="14">
                <el-form-item prop="pin">
                  <span class="svg-container">
                    <svg-icon icon-class="lock" />
                  </span>
                  <el-input
                    v-model="loginForm.pin"
                    :placeholder="$t('login.pin')"
                    name="pin"
                    type="tel"
                    maxlength="4"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <div class="code" @click="refreshCode">
                  <div class="code-num" oncopy="return false;">
                    {{ identifyCode }}
                  </div>
                </div>
              </el-col>
            </el-row>

            <el-row class="remember-psd">
              <el-col :span="12">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
              </el-col>
              <el-col :span="12" align="right">
                <a href="javascript:;" class="forget-psd" @click="goForgetPass()">忘记密码？</a>
              </el-col>
            </el-row>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
            <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{ $t('login.thirdparty') }}</el-button> -->
          </el-form>
          <el-row class="copyright">copyright © 2018 柴火分发 All rights Reserved</el-row>
        </el-col>
      </el-row>
    </div>

    <div v-if="selectType === 'register'" class="register-box">
      <h3 class="title" @click="selectType = 'login'">{{ $t('login.title') }}</h3>
      <p>专业APP分发，一键上传，永久保存</p>
      <component :is="currentRole" @setSelectType="setSelectType" @getLogin="getLogin"/>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import { loginByUsername } from '@/api/login'
import { setToken, setName } from '@/utils/auth'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import SIdentify from './identify'
import Register from './register'
import RealName from './realName'
import ForgetPass from './forgetPass'
import img1 from '../../../static/images/login-logo.png'

export default {
  name: 'Login',
  components: { LangSelect, SocialSign, SIdentify, Register, RealName, ForgetPass },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error('请输入正确邮箱'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
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
      identifyCodes: '1234567890',
      identifyCode: '',
      checked: false,
      showType: 'login',
      selectType: 'login',
      logoimgs: [img1],
      eyeClass: 'eye-close',
      currentRole: 'register',
      registerForm: {
        email: '',
        password: ''
      },
      loginForm: {
        email: '',
        password: '',
        pin: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        pin: [{ required: true, trigger: 'blur', validator: validatepin }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    this.refreshCode()
    this.getCookie()
    if (this.loginForm.email && this.loginForm.password) {
      this.checked = true
    }
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    goForgetPass() {
      this.selectType = 'register'
      this.currentRole = 'forgetPass'
    },
    setSelectType(role) {
      this.currentRole = role.currentRole
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
        this.eyeClass = 'eye'
      } else {
        this.passwordType = 'password'
        this.eyeClass = 'eye-close'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const self = this
          // 判断复选框是否被勾选 勾选则调用配置cookie方法
          if (self.checked === true) {
            console.log('checked == true')
            // 传入账号名，密码，和保存天数3个参数
            self.setCookie(self.loginForm.email, self.loginForm.password, 7)
          } else {
            console.log('清空Cookie')
            // 清空Cookie
            self.clearCookie()
          }
          this.getLogin(this.loginForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getLogin(loginForm) {
      // this.$store.dispatch('LoginByUsername', loginForm).then(() => {
      //   this.loading = false
      //   this.$router.push({ path: this.redirect || '/' })
      // }).catch(() => {
      //   this.loading = false
      // })
      const self = this
      return new Promise((resolve, reject) => {
        loginByUsername(loginForm.email, loginForm.password).then(response => {
          self.loading = false
          const data = response.data
          const result = data.result
          if (data.error !== 0) {
            self.$notify({
              title: '登陆失败',
              message: data.reason,
              type: 'error'
            })
            return
          }
          // this.$store.commit('SET_NAME', result.email)
          setToken(result.token)
          setName(result.email)
          self.$router.push({ path: self.redirect || '/' })
          // commit('SET_TOKEN', data.token)
          // setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    },
    // 设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'email' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    // 读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'email') {
            this.loginForm.email = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] === 'userPwd') {
            this.loginForm.password = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function() {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#ccc;
  $cursor: #fff;
  $light_hei:#333;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:#ccc;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:#ccc;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:#ccc;
      }
      :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color:#ccc;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .code{
      cursor: pointer;
      width: 60%;
      height: 30px;
      line-height: 30px;
      margin: 0 auto;
      margin-top: 8px;
      background-color: #ccc;
      text-align: center;
      color: #fff;
    }
    .remember-psd{
      padding-bottom: 16px;
    }
    .forget-psd{
      color: #ccc;
      font-size: 14px;
    }
    .forget-psd:hover{
      color: #333;
    }
    .copyright{
      font-size: 14px;
      padding-top: 20px;
      color: #ccc;
    }
    .login-logo-box{
      margin-top: 80px;
      img{
        height: 300px;
        margin: 0 auto;
        display: block;
      }
    }
    .el-input {
      display: inline-block;
      height: 30px;
      width: 80%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $light_hei;
        height: 30px;
        caret-color: #333;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border-bottom: 1px solid #eee;
      color: #454545;
      margin-bottom: 16px;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#3f57f9;
$dark_gray:#898989;
$light_gray:#333333;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(../../../static/images/login-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  overflow: auto;
  .login-box,.register-box{
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 800px;
    min-height: 540px;
    max-width: 100%;
    padding: 20px 35px 20px 35px;
    margin: 0 auto;
    border-radius: 10px;
    transform: translateY(-50%);
    -ms-transform: translateY(-50%);   /* IE 9 */
    -moz-transform: translateY(-50%);  /* Firefox */
    -webkit-transform: translateY(-50%); /* Safari 和 Chrome */
    -o-transform: translateY(-50%);
    .title{
      font-weight: 0;
      font-size: 24px;
      margin-bottom: 10px;
      text-align: center;
      cursor: pointer;
    }
    p{
      font-size: 14px;
      color: #ccc;
      text-align: center;
    }
    .login-nav{
      margin: 20px 0 10px;
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
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    p{
      margin: 10px 0;
      font-size: 12px;
      color: #ccc;
    }
    .title {
      font-size: 22px;
      color: $light_gray;
      font-weight: bold;
      margin: 40px 0 0 0;
    }
    .set-language {
      color: #333;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
  @media screen and (max-width: 500px) {
    .login-container{
      background: #fff;
      .login-box,.register-box {
        top: 0;
        border-radius: 0;
        transform: none;
        -ms-transform: none;   /* IE 9 */
        -moz-transform: none;  /* Firefox */
        -webkit-transform: none; /* Safari 和 Chrome */
        -o-transform: none;
        .login-nav{
          padding-top: 40px;
        }
      }
    }
  }
</style>

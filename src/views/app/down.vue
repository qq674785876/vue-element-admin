<template>
  <div v-loading="loading" :class="[type, { mobile: versions().mobile }]" element-loading-background="rgba(0, 0, 0, 0.3)" class="down-container">
    <div v-if="type === 'three' && versions().mobile">
      <span class="pattern left">
        <img src="/static/images/left.png">
      </span>
      <span class="pattern right">
        <img src="/static/images/right.png">
      </span>
    </div>
    <div class="app-info">
      <!-- <img :src="appInfo.qrCode" class="QRCode"> -->
      <div v-if="!versions().mobile" class="icon-box">
        <div class="left-top-box">
          <img :src="appInfo.appIcon" class="QRCode">
        </div>
        <div class="right-bottom-box">
          <img :src="appInfo.qrCode" class="QRCode">
        </div>
      </div>
      <img v-if="versions().mobile" :src="appInfo.appIcon" class="appIcon">
      <p class="appName">{{ appInfo.appName }}</p>
      <p v-if="!versions().mobile" class="tips">扫描二维码下载</p>
      <p v-if="!versions().mobile" class="tips">手机扫描或浏览器访问 {{ appInfo.baseUrl + appInfo.sortUrl }}</p>
      <el-button v-if="!versions().mobile" type="primary" round style="margin-bottom: 50px; width: 180px;" @click="appDown">下载安装</el-button>
      <p class="appSize">{{ appInfo.version + ' - ' + appInfo.size }}</p>
      <p class="appUpdateDate">更新于： {{ appInfo.createTime }}</p>
      <p v-if="isDown" style="color: #fff;font-size: 20px;position: relative;top: 30px;margin-bottom: 0;">正在安装，请查看手机桌面~</p>
      <el-button v-loading="btnLoading" v-if="!isDown && !versions().weixin && versions().mobile && isShowButton && appInfo.state === 0" element-loading-background="rgba(255, 255, 255, 0.5)" class="mobileBtn" round @click="appDown">
        <span class="svg-container">
          <svg-icon :icon-class="appType" />
        </span>
        下载安装
      </el-button>
      <el-button v-if="isDown" class="mobileBtn" round @click="goTrust">立即信任</el-button>
      <div v-if="versions().weixin" class="pop">
        <p>请点击右上角选择用浏览器打开</p>
      </div>
      <el-row v-if="!versions().mobile" class="copyright">copyright © 2018 柴火分发 All rights Reserved</el-row>
      <el-row v-if="appInfo.describe && appInfo.appImage.length !== 0" class="detailBox">
        <div v-if="appInfo.describe">
          <p class="title">应用描述</p>
          <p>{{ appInfo.describe }}</p>
        </div>
        <div v-if="appInfo.appImage.length !== 0">
          <p class="title">应用截图</p>
          <div class="imgBox">
            <img v-for="(img, index) in appInfo.appImage" :src="img" :key="index" @click="handlePictureCardPreview(img)">
          </div>
        </div>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogImageVisible" class="imgDialog" height="500">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { appDownInfo, appDownUrl } from '@/api/index'

export default {
  name: 'Down',
  components: { },
  props: {
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      isDown: false,
      type: '',
      cert: '',
      appId: this.$route.params.id,
      updateTime: '',
      appInfo: {},
      lat: '',
      lng: '',
      isShowButton: false,
      dialogImageVisible: false,
      dialogImageUrl: '',
      appType: this.versions().ios ? 'ios' : 'android'
    }
  },
  mounted() {
    const _this = this
    let timer = null
    _this.getPosition()
    _this.appDownInfo()
    window.onresize = function() {
      clearTimeout(timer)
      timer = setTimeout(function() {
        window.location.reload()
      }, 100)
    }
  },
  methods: {
    handlePictureCardPreview(img) {
      this.dialogImageUrl = img
      this.dialogImageVisible = true
    },
    goTrust() {
      const _this = this
      window.location.href = _this.cert
    },
    versions() {
      const u = window.navigator.userAgent
      // app = window.navigator.appVersion
      return {// 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
        qq: u.match(/\sQQ/i) === ' qq' // 是否QQ
      }
    },
    getPosition() {
      const _this = this
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          _this.lat = r.point.lat
          _this.lng = r.point.lng
        }
      })
      // if(navigator.geolocation){
      //   navigator.geolocation.getCurrentPosition(_this.onSuccess , _this.onError);
      // }else{
      //   alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
      // }
    },
    onSuccess() {

    },
    onError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert('您拒绝对获取地理位置的请求')
          break
        case error.POSITION_UNAVAILABLE:
          alert('位置信息是不可用的')
          break
        case error.TIMEOUT:
          alert('请求您的地理位置超时')
          break
        case error.UNKNOWN_ERROR:
          alert('未知错误')
          break
      }
    },
    appDown() {
      const _this = this
      let timer = null
      _this.loading = true
      appDownUrl({
        appId: _this.appId,
        lat: _this.lat,
        lng: _this.lng,
        platform: _this.appType
      }).then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          return
        }
        // window.open(result.url)
        location.href = result.url
        _this.cert = result.cert
        if (_this.appType === 'ios') {
          _this.btnLoading = true
          clearTimeout(timer)
          timer = setTimeout(function() {
            _this.btnLoading = false
            _this.isDown = true
          }, 6000)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    appDownInfo() {
      const _this = this
      _this.loading = true
      appDownInfo({
        appId: _this.appId
      }).then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '查询失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.appInfo = result
        if (_this.appInfo.background === 1) {
          _this.type = 'two'
        } else if (_this.appInfo.background === 2) {
          _this.type = 'three'
        }
        _this.isShowButton = _this.appInfo.platform.indexOf(_this.appType) > -1
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
html,body{
  overflow: hidden !important;
}
.down-container{
  text-align: center;
  background: url(/static/images/login-bg.jpg);
  height: 100%;
  max-height: 100%;
  display:flex;
  .app-info{
    max-width: 100%;
    max-height: 666px;
    width: 800px;
    margin:0 auto;
    border-radius: 20px;
    background-color: #fff;
    padding: 10vh 0 0;
    align-self:center;
    position:relative;
    font-size: 14px;
    color: #ccc;
    overflow: auto;
    &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color:rgba(0,0,0,.1);
    }
    &::-webkit-scrollbar {//滚动条的宽度
      width:3px;
      height:3px;
    }
    &::-webkit-scrollbar-thumb {//滚动条的设置
      background-color:rgba(0,0,0,.2);
      background-clip:padding-box;
      min-height:28px;
    }
    &::-webkit-scrollbar-thumb:hover{
      background-color: rgba(0,0,0,.3);
    }
    .detailBox{
      padding-bottom: 5vh;
      p{
        color: #666;
      }
      .title{
        font-size: 24px;
        color: #000;
      }
      .imgBox{
        text-align: left;
        width: 90%;
        margin: 0 auto;
      }
      img{
        width: 32.33333%;
        margin-bottom: 5px;
        &:nth-of-type(3n - 1){
          margin-left: 1.5%;
          margin-right: 1.5%;
        }
      }
    }
    .appSize,.appUpdateDate{
      margin: 0;
      font-size: 14px;
    }
    .icon-box{
      height: 200px;
      width: 190px;
      margin: 0 auto;
      position: relative;
      div{
        img{
          height: 70px;
          width: 70px;
          margin: 10px;
        }
      }
      &::after{
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        top: 50px;
        height: 120px;
        text-align: center;
        background: #ddd;
        transform: rotate(45deg);
        border-radius: 10px;
      }
      &:hover{
        .right-bottom-box{
          transform: scale(2);
        }
      }
      .left-top-box{
        position: absolute;
        left: -12px;
        top: 2px;
        background: #eee;
        height: 90px;
        width: 90px;
        border-radius: 10px;
        z-index: 99;
      }
      .right-bottom-box{
        position: absolute;
        right: -15px;
        bottom: -20px;
        background: #ddd;
        height: 90px;
        width: 90px;
        border-radius: 10px;
        z-index: 99;
        transition: .4s;
      }
    }
  }
  .copyright{
    font-size: 14px;
    padding-top: 6vh;
    padding-bottom: 20px;
    color: #ccc;
  }
  .QRCode{
    width: 140px;
    height: 140px;
  }
  .appName{
    font-size: 20px;
    padding-top: 30px;
    color: #000;
  }
  .el-button{
    margin-top: 20px;
    font-size: 14px;
    .svg-container{
      font-size: 20px;
    }
  }
  .getTips{
    position: fixed;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    padding-top: 8vh;
    background: rgba(0,0,0,.5);
    p{
      display: inline-block;
      position: relative;
      font-size: 14px;
    }
    .svg-container{
      position: absolute;
      right: 5vw;
      top: 3vh;
      font-size: 50px;
    }
  }
  &.mobile{
    background: url(/static/images/mobile-bg.jpg);
    background-size: cover;
    color: #fff;
    overflow: hidden;
    .imgDialog{
      .el-dialog{
        width: 100% !important;
        max-heihgt: 100% !important;
      }
    }
    .appIcon{
      width: 20vw;
      height: 20vw;
      border-radius: 10px;
      margin-top: 0vh;
    }
    .appName{
      font-size: 22px;
      color: #fff;
    }
    .appSize,.appUpdateDate{
      font-size: 14px;
    }
    .app-info{
      background-color: transparent;
      padding-top: 0;
      overflow: auto;
      height: calc(100%);
      padding-top: 20vh;
    }
    .mobileBtn{
      position: relative;
      top: 10vh;
      background: transparent;
      color: #fff;
    }
    .detailBox{
      border-top: 1px solid #fff;
      margin-top: 50vh;
      margin-bottom: 10vh;
      p{
        color: #eee;
        font-size: 14px;
        width: 80%;
        margin: 30px auto;
      }
      .title{
        font-size: 20px;
        color: #fff;
      }
      .imgBox{
        text-align: left;
        width: 90%;
        margin: 0 auto;
      }
      img{
        width: 49%;
        &:nth-of-type(3n - 1){
          margin: 0 0 5px 0;
        }
        &:nth-of-type(2n + 1){
          margin-right: 2%;
        }
      }
    }
    .pop {
      position: fixed;
      right: 10px;
      top: 30px;
      width: 160px;
      padding: 5px 15px;
      background: rgba(0,0,0,.3);
      -moz-border-radius:    10px;
      -webkit-border-radius: 10px;
      border-radius:         10px;
      color: #fff;
      z-index: 9999;
    }
    .pop:before {
      content:"";
      position: absolute;
      right: 10px;
      top: -16px;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 16px solid rgba(0,0,0,.3);
    }
    &.two{
      background: -webkit-linear-gradient(red, blue); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(red, blue); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(red, blue); /* Firefox 3.6 - 15 */
      background: linear-gradient(red, blue); /* 标准的语法 */
      .mobileBtn{
        color: #fff;
        border-color: #fff;
      }
    }
    &.three{
      background: #fff;
      .appName{
        color: #333;
      }
      .appSize,.appUpdateDate{
        color: #666;
      }
      .detailBox{
        p{
          color: #000;
        }
      }
      .pattern{
        position: absolute;
        top: 0;
        z-index: 1;
        max-width: 312px;
        width: 21.66%;
        transition: all .5s;
        img{
          width: 100%;
        }
        &.left{
          left: 0;
        }
        &.right{
          right: 0;
        }
      }
      .pattern{
        width: 20%;
      }
      .mobileBtn{
        color: rgba(73,212,177,1);
        border-color: rgba(73,212,177,1);
      }
      .pop{
        background: rgba(0,0,0,.6);
      }
    }
  }
}
</style>


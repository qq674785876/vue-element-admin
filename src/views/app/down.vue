<template>
  <div v-loading="loading" :class="{ mobile: versions().mobile }" element-loading-background="rgba(0, 0, 0, 0.3)" class="down-container">
    <img v-if="!versions().mobile" :src="appInfo.qrCode" class="QRCode">
    <img v-if="versions().mobile" :src="appInfo.appIcon" class="appIcon">
    <p class="appName">{{ appInfo.appName }}</p>
    <p v-if="!versions().mobile" class="tips">手机扫描或浏览器访问 {{ appInfo.baseUrl + appInfo.sortUrl }}</p>
    <p v-if="!versions().mobile" style="padding: 20px 0;color: #fff;"> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
    <p class="appSize">{{ appInfo.version + ' - ' + appInfo.size }}</p>
    <p class="appUpdateDate">更新于： {{ appInfo.createTime }}</p>
    <el-button v-if="versions().mobile && isShowButton && appInfo.state === 0" type="primary" round @click="appDown">
      <span class="svg-container">
        <svg-icon :icon-class="appType" />
      </span>
      下载安装
    </el-button>
    <div v-if="versions().weixin" class="getTips">
      请点击右上角选择用浏览器打开
    </div>
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
      appId: this.$route.params.id,
      updateTime: '',
      appInfo: {},
      lat: '',
      lng: '',
      isShowButton: false,
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
        window.open(result.url)
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
        _this.isShowButton = _this.appInfo.platform.indexOf(_this.appType) > -1
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.down-container{
  text-align: center;
  background: #147bdbc5;
  height: 100vh;
  .QRCode{
    width: 140px;
    height: 140px;
    margin-top: 20vh;
  }
  .appName{
    font-size: 16px;
    padding-top: 30px;
  }
  .el-button{
    margin-top: 20px;
    font-size: 18px;
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
    padding-top: 10vh;
    background: rgba(0,0,0,.3);
  }
  &.mobile{
    background: url(/static/images/message.jpg);
    background-size: cover;
    color: #fff;
    .appIcon{
      width: 30vw;
      padding-top: 20vh;
    }
  }
}
</style>


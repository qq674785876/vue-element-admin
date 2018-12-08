<template>
  <div v-loading="loading" :class="{ mobile: versions().mobile }" class="down-container">
    <img v-if="!versions().mobile" :src="QRCode" class="QRCode">
    <img v-if="versions().mobile" :src="appInfo.appIcon" class="appIcon">
    <p class="appName">{{ appInfo.appName }}</p>
    <p v-if="!versions().mobile" class="tips">手机扫描或浏览器访问 {{ appInfo.baseUrl + appInfo.sortUrl }}</p>
    <p v-if="!versions().mobile" style="padding: 20px 0;color: #fff;"> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </p>
    <p class="appSize">{{ appInfo.version + ' - ' + appInfo.size }}</p>
    <p class="appUpdateDate">更新于： {{ updateTime }}</p>
    <el-button v-if="versions().mobile" type="primary" round @click="getPreview(list.appId)">
      <span class="svg-container">
        <svg-icon :icon-class="appType" />
      </span>
      下载安装
    </el-button>
  </div>
</template>

<script>
import { getAppInfo } from '@/api/index'

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
      QRCode: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544269355031&di=02103251c192fd098cbe01a311db69b4&imgtype=0&src=http%3A%2F%2Fwww.ccfao.gov.cn%2Fzwgk%2Fxxgkml%2Fdtxx%2F201808%2FW020180801562481131566.jpg',
      appType: this.versions().ios ? 'ios' : 'android'
    }
  },
  mounted() {
    console.log('ios:' + this.versions().ios, 'android:' + this.versions().android, 'mobile:' + this.versions().mobile)
    const _this = this
    let timer = null
    _this.getAppInfo()
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
    getAppInfo() {
      const _this = this
      _this.loading = true
      getAppInfo({
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
        for (var i = 0; i < result.versionList.length; i++) {
          if (result.version === result.versionList[i].version) {
            _this.updateTime = result.versionList[i].createTime
          }
        }
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


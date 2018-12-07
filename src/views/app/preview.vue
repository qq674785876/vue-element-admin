<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="45%"
      @open="getAppInfo">
      <div v-loading="loading">
        <div class="preview-cont">
          <img :src="appInfo.appIcon">
          <p class="name">{{ appInfo.appName }}</p>
          <p class="tips">扫描二维码下载</p>
          <p class="tips">或用手机浏览器输入这个网址：<span>{{ appInfo.appUrl }}</span></p>
          <el-button type="primary" style="width: 180px;margin: 15px 0;" round>下载安装</el-button>
        </div>
        <div class="preview-cont-2">
          <p class="tips">{{ appInfo.version }} - {{ appInfo.size }}</p>
          <p class="tips">更新于：{{ appInfo.updateTime }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAppInfo } from '@/api/index'

export default {
  name: 'Preview',
  components: {},
  props: {
    appId: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      appInfo: {
      }
    }
  },
  mounted() {
    this.getAppInfo()
  },
  methods: {
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
            _this.appInfo.updateTime = result.versionList[i].createTime
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.preview-cont{
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  img{
    height: 120px;
    width: 120px;
    border-radius: 20px;
  }
  .name{
    font-size: 20px;
    padding: 10px 0;
    color: #333;
  }
  .tips{
    font-size: 14px;
    color: #666;
    line-height: 20px;
    span{
      color: blue;
    }
  }
}
.preview-cont-2{
  padding-top: 30px;
  text-align: center;
  .tips{
    font-size: 14px;
    color: #666;
  }
}
</style>


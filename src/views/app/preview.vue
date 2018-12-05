<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="45%">
      <div class="preview-cont">
        <img :src="previewSrc">
        <p class="name">TEST001</p>
        <p class="tips">扫描二维码下载</p>
        <p class="tips">或用手机浏览器输入这个网址：{{ previewUrl }}</p>
        <el-button type="primary" style="width: 180px;margin: 15px 0;" round>下载安装</el-button>
      </div>
      <div class="preview-cont-2">
        <p class="tips">1.0.5（Build 5） - 51.9KB</p>
        <p class="tips">更新于：{{ uploadTime }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Preview',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    uploadTime: {
      type: String,
      default: ''
    },
    previewSrc: {
      type: String,
      default: ''
    },
    previewUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
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
  }
  .name{
    font-size: 20px;
    padding: 10px 0;
    color: #333;
  }
  .tips{
    font-size: 12px;
    color: #666;
  }
}
.preview-cont-2{
  padding-top: 30px;
  text-align: center;
  .tips{
    font-size: 12px;
    color: #666;
  }
}
</style>


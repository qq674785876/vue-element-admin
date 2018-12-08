<template>
  <div class="loading-box">
    <iframe :src="loadingSrc" class="loadingIframe" frameborder="0" scrolling="auto"/>
    <div class="progressBar">{{ progressBar + '%' }}</div>
  </div>
</template>

<script>

export default {
  name: 'IframeLoading',
  components: {},
  props: {
    // route object
    progressBar: {
      type: Number,
      default: 0
    },
    loadingSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.loading-box{
  iframe{
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 999999;
  }
  .progressBar{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    color: red;
    font-size: 3vw;
    text-align: center;
    z-index: 99999999;
    line-height: 100vh;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
}
</style>


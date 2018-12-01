<template>
  <div class="dashboard-editor-container">
    <el-row v-if="device==='mobile'" class="exhibition-box">
      <el-col v-for="(list, index) in exhibition" :span="24" :style="{'background-image': 'url('+ list.bg +')'}" :key="index" class="exhibition-list">
        <p class="title">{{ list.title }}</p>
        <p class="tips">{{ list.tips }}</p>
      </el-col>
    </el-row>

    <el-row v-if="device!=='mobile'" class="exhibition-box" type="flex" justify="space-around">
      <el-col v-for="(list, index) in exhibition" :span="5" :style="{'background-image': 'url('+ list.bg +')'}" :key="index" class="exhibition-list">
        <p class="title">{{ list.title }}</p>
        <p class="tips">{{ list.tips }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  components: {
  },
  data() {
    return {
      exhibition: [{
        bg: '',
        title: '内测托管',
        tips: '一键上传应用，扫描二维码下载'
      }, {
        bg: '',
        title: '应用合并',
        tips: '扫描同一个二维码，根据设备类型自动下载对应的IOS或Android应用'
      }, {
        bg: '',
        title: '实名管理',
        tips: '实名认证保证每个上传者在一个安全的环境中进行应用开发'
      }]
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container{
  height: calc(100vh - 85px);
  overflow: auto;
  .exhibition-box{
    padding-top: 10vh;
    text-align: center;
    margin: 0 !important;
    .exhibition-list{
      height: 60vh;
      background-size: cover;
      background-color: #376AFB;
      padding: 0 40px;
      .title{
        font-size: 26px;
        margin-top: 70%;
      }
    }
  }
}
.mobile{
  .exhibition-box{
    padding: 0 30px !important;
    .exhibition-list{
      margin: 20px 0;
    }
  }
}

</style>

<template>
  <div class="register-container">
    <h3 class="title">{{ $t('login.title') }}</h3>
    <p>专业APP分发，一键上传，永久保存</p>
    <div class="step_1">
      <el-row>
        <div class="step-title">
          <i class="step-num">1</i> 填写基本信息
        </div>
        <el-col :span="12"/>
      </el-row>
    </div>
  </div>
</template>

<script>
// import openWindow from '@/utils/openWindow'

export default {
  name: 'Register',
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$themeColor: #4f93fe;
.register-container{
  text-align: center;
  .title{
    font-weight: 0;
    font-size: 24px;
    margin-bottom: 10px;
  }
  p{
    font-size: 14px;
    color: #ccc;
  }
  .step_1{
    width: 80%;
    margin: 0 auto;
    padding: 40px 0 0 0;
  }
  .step-title{
    float: left;
    font-size: 16px;
    padding-bottom: 10px;
    border-bottom: 2px solid $themeColor;
    .step-num{
      background: #000;
      color: #fff;
      display: inline-block;
      border-radius: 100%;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-style: normal;
    }
  }
}
</style>

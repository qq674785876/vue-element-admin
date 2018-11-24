<template>
  <div class="realName-container">
    <div class="step">
      <el-row>
        <el-col :span="24">
          <div class="step-title">
            <i class="step-num">2</i> 实名认证
          </div>
        </el-col>
        <el-row class="info-box">
          <el-col :span="7">
            <div class="img-box">
              <span class="svg-container">
                <svg-icon icon-class="add" />
              </span>
            </div>
            <p class="tips">上传身份证正面</p>
          </el-col>
          <el-col :span="7" :offset="1">
            <div class="img-box">
              <span class="svg-container">
                <svg-icon icon-class="add" />
              </span>
            </div>
            <p class="tips">上传身份证反面</p>
          </el-col>
          <el-col :span="7" :offset="1">
            <div class="img-box">
              <span class="svg-container">
                <svg-icon icon-class="add" />
              </span>
            </div>
            <p class="tips">上传手持身份证正面</p>
          </el-col>
        </el-row>
        <el-row class="btn-box">
          <el-button size="mini">稍后完善</el-button>
          <el-button size="mini" type="primary" @click="getLogin()">完成</el-button>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RealName',
  data() {
    return {
      infos: []
    }
  },
  methods: {
    getLogin: function() {
      alert('注册成功！')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
$themeColor: #4f93fe;
.realName-container{
  .step{
    width: 80%;
    margin: 0 auto;
    padding: 40px 0 0 0;
    .step-title{
      width: 100px;
      float: left;
      font-size: 12px;
      padding-bottom: 10px;
      border-bottom: 2px solid $themeColor;
      .step-num{
        background: #000;
        color: #fff;
        display: inline-block;
        border-radius: 100%;
        width: 16px;
        height: 16px;
        line-height: 18px;
        text-align: center;
        font-style: normal;
      }
    }
  }
  .info-box{
    padding-top: 60px;
    .img-box{
      height: 120px;
      line-height: 120px;
      background-color: #4f93fe;
      text-align: center;
      .svg-container{
        font-size: 30px;
        cursor: pointer;
      }
      .svg-icon{
        width: 100%;
        height: 30px;
      }
    }
    .tips{
      padding-top: 10px;
      text-align: center;
      font-size: 14px;
      color: #ccc;
    }
  }
  .btn-box{
    padding-top: 60px;
    text-align: right;
  }
}
</style>

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
          <el-col :span="7" :xs="24">
            <div class="img-box">
              <span class="svg-container">
                <svg-icon icon-class="add" />
              </span>
            </div>
            <p class="tips">上传身份证正面</p>
          </el-col>
          <el-col :span="1" :xs="0" style="height: 1px;"/>
          <el-col :span="7" :xs="24">
            <div class="img-box">
              <span class="svg-container">
                <svg-icon icon-class="add" />
              </span>
            </div>
            <p class="tips">上传身份证反面</p>
          </el-col>
          <el-col :span="1" :xs="0" style="height: 1px;"/>
          <el-col :span="7" :xs="24">
            <div class="img-box">
              <span class="svg-container">
                <svg-icon icon-class="add" />
              </span>
            </div>
            <p class="tips">上传手持身份证正面</p>
          </el-col>
        </el-row>
        <el-row class="btn-box">
          <el-button size="mini" @click="finish(false)">稍后完善</el-button>
          <el-button size="mini" type="primary" @click="finish(true)">完成</el-button>
        </el-row>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="340px"
      class="realName-dialog"
      center>
      <div class="dialogBox">
        <div class="dialogBg"/>
        <div class="dialogCont">
          <h1>
            <p>恭喜您</p>
            <p>注册成功</p>
          </h1>
          <div class="tips-box">
            <p class="loading">等待人工审核...</p>
            <p class="tips">审核完成即可上传您的应用</p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="getLogin()">立即登陆</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'RealName',
  data() {
    return {
      loading: false,
      infos: [],
      dialogVisible: false
    }
  },
  methods: {
    finish(flag) {
      if (flag) {
        console.log(1)
      }
      const _this = this
      _this.dialogVisible = true
    },
    getLogin() {
      this.loading = true
      this.$emit('getLogin', this.$parent.registerForm)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
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
    padding-top: 40px;
    text-align: right;
  }
}
.el-dialog__header{

}
.realName-dialog{
  .el-dialog__header{
    display: none;
  }
  .el-dialog__body{
    position: relative;
    overflow: hidden;
    .dialogBox{
      height: 240px;
    }
    .dialogCont{
      position: absolute;
      z-index: 1;
      width: 100%;
      left: 0;
      h1{
        font-size: 40px;
        text-align: center;
        p{
          position: relative;
          top: -20px;
          margin: 5px 0;
          color: #fff;
        }
      }
      .tips-box{
        position: relative;
        top: 46px;
        text-align: center;
        .loading{
          font-size: 16px;
          color: black;
          margin: 0;
        }
        .tips{
          font-size: 12px;
          color: #333;
        }
      }
    }
    .dialogBg{
      z-index: 0;
      position: absolute;
      height: 600px;
      width: 600px;
      top: -420px;
      left: -130px;
      border-radius: 100%;
      background: -webkit-linear-gradient(left,#4c59ec, #4ce7f3); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right,#4c59ec, #4ce7f3); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right,#4c59ec, #4ce7f3); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right,#4c59ec, #4ce7f3); /* 标准的语法 */
    }
  }
  .dialog-footer{
    position: relative;
    top: -10px;
    .el-button{
      width: 80%;
      border: 0;
      border-radius: 50px;
      background: -webkit-linear-gradient(left,#4c59ec, #4ce7f3); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right,#4c59ec, #4ce7f3); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right,#4c59ec, #4ce7f3); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right,#4c59ec, #4ce7f3); /* 标准的语法 */
    }
  }
}
</style>

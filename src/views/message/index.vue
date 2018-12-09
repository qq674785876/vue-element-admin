<template>
  <div class="message-box">
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="25%">
      <div class="header">
        <h1>消息通知</h1>
      </div>
      <div class="cont-box">
        <h1>{{ messageTtile }}</h1>
        <p>{{ messageCont }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose(recId)">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Message',
  components: {},
  props: {
    recId: {
      type: Number,
      default: 0
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    messageTtile: {
      type: String,
      default: ''
    },
    messageCont: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose(recId) {
      this.$emit('handleClose', recId)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.message-box{
  .el-dialog{
    width: 500px;
    max-width: 500px;
    border-radius: 10px;
    overflow: hidden;
    .el-dialog__header {
      z-index: 9999;
      position: relative;
    }
    .el-dialog__close{
      border: 1px solid #fff;
      border-radius: 100%;
      color: #fff;
      padding: 4px;
    }
  }
  .header{
    position: absolute;
    left: 0;
    top: 0;
    height: 100px;
    width: 100%;
    background: url('/static/images/message.jpg');
    h1{
      text-align: center;
      font-size: 30px;
      color: #fff;
      padding-top: 10px;
      font-family: serif;
    }
  }
  .cont-box{
    min-height: 240px;
    max-height: 260px;
    position: relative;
    top: 50px;
    text-align: center;
    overflow: auto;
    h1{
      font-size:24px;
    }
    p{
      font-size: 16px;
    }
  }
  .el-dialog__footer{
    text-align: center;
  }
}
.mobile{
  .message-box{
    .el-dialog{
      min-width: 100%;
    }
    .header{
      position: absolute;
      left: 0;
      top: 0;
      height: 100px;
      width: 100%;
      background: blue;
    }
  }
}
</style>


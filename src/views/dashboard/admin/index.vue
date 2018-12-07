<template>
  <div class="dashboard-editor-container">
    <el-row v-if="device==='mobile'" class="exhibition-box">
      <el-col
        v-for="(list, index) in exhibition"
        :span="24"
        :style="{
          'background': list.bgColor,
          'background': '-webkit-linear-gradient(left top, ' + gradientColor + ' , ' + list.bgColor + ')',
          'background': '-o-linear-gradient(bottom right, ' + gradientColor + ', ' + list.bgColor + ')',
          'background': '-moz-linear-gradient(bottom right, ' + gradientColor + ', ' + list.bgColor + ')',
          'background': 'linear-gradient(to bottom right, ' + gradientColor + ' , ' + list.bgColor + ')',
        }"
        :key="index"
        class="exhibition-list">
        <div class="exhibition-cont">
          <span class="svg-container">
            <svg-icon :icon-class="list.svgClass" />
          </span>
          <p class="title">{{ list.title }}</p>
          <p class="tips">{{ list.tips }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row v-if="device!=='mobile'" class="exhibition-box" type="flex" justify="space-around">
      <el-col
        v-for="(list, index) in exhibition"
        :span="5"
        :style="{
          'background': list.bgColor,
          'background': '-webkit-linear-gradient(left top, ' + gradientColor + ' , ' + list.bgColor + ')',
          'background': '-o-linear-gradient(bottom right, ' + gradientColor + ', ' + list.bgColor + ')',
          'background': '-moz-linear-gradient(bottom right, ' + gradientColor + ', ' + list.bgColor + ')',
          'background': 'linear-gradient(to bottom right, ' + gradientColor + ' , ' + list.bgColor + ')',
        }"
        :key="index"
        class="exhibition-list">
        <div class="exhibition-cont">
          <span class="svg-container">
            <svg-icon :icon-class="list.svgClass" />
          </span>
          <p class="title">{{ list.title }}</p>
          <p class="tips">{{ list.tips }}</p>
        </div>
      </el-col>
    </el-row>
    <component
      :is="currentRole"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"/>
  </div>
</template>

<script>
import Message from '@/views/message'

export default {
  name: 'DashboardAdmin',
  components: {
    Message
  },
  data() {
    return {
      currentRole: 'message',
      dialogVisible: false,
      gradientColor: '#ccc',
      exhibition: [{
        bgColor: 'rgb(5, 171, 191)',
        title: '内测托管',
        tips: '一键上传应用，扫描二维码下载',
        svgClass: 'tuoguan'
      }, {
        bgColor: 'rgb(94, 90, 226)',
        title: '应用合并',
        tips: '扫描同一个二维码，根据设备类型自动下载对应的IOS或Android应用',
        svgClass: 'merge'
      }, {
        bgColor: 'rgb(54, 59, 61)',
        title: '实名管理',
        tips: '实名认证保证每个上传者在一个安全的环境中进行应用开发',
        svgClass: 'realName'
      }]
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    this.sendMessage()
    this.dialogVisible = true
  },
  methods: {
    sendMessage() {
      const h = this.$createElement
      this.notify = this.$notify({
        dangerouslyUseHTMLString: true,
        message: h('div', {
          attrs: { 'class': 'message-notice-box' }
        }, [
          h('div', {
            attrs: { 'class': 'header' }
          }),
          h('div', {
            attrs: { 'class': 'cont-box' }
          }, [
            h('h1', null, '开启消息通知'),
            h('p', null, '特惠活动，账号信息，到账通知')
          ]),
          h('div', {
            attrs: { 'class': 'btn-box' }
          }, [
            h('a', {
              attrs: { 'href': 'javascript:;' },
              on: {
                click: this.clickBtn
              }
            }, '知道了')
          ])
        ]),
        // message: '<div class="message-notice-box">' +
        //   '<div class="header"></div>' +
        //   '<div class="cont-box">' +
        //   '<h1>开启消息通知</h1>' +
        //   '<p>特惠活动，账号信息，到账通知</p>' +
        //   '</div>' +
        //   '<div class="btn-box"><a href="javascript:;" @click="close">知道了</a></div>' +
        //   '</div>',
        position: 'bottom-right',
        duration: 0,
        customClass: 'zz-message-notice'
      })
    },
    clickBtn() {
      this.notify.close()
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
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
      padding: 0 40px;
      border-radius: 10px;
      .exhibition-cont{
        margin-top: 15vh;
        color: #fff;
        .svg-container{
          font-size: 10vh;
        }
      }
      .title{
        font-size: 26px;
      }
    }
  }
}
.zz-message-notice{
  width: auto;
  padding: 0;
  border: 0;
  .el-notification__group{
    margin: 0;
    .el-notification__closeBtn{
      display: none;
    }
  }
  .message-notice-box{
    width: 180px;
    height: 160px;
    .header{
      position: absolute;
      left: 0;
      top: 0;
      height: 80px;
      width: 100%;
      background: url('/static/images/message.jpg');
      .svg-container{
        font-size: 30px;
        color: #fff;
      }
    }
    .cont-box{
      margin-top: 80px;
      height: 120px;
      text-align: center;
      padding: 0 20px;
      h1{
        font-size: 18px;
        padding-top: 15px;
      }
      p{
        font-size: 12px;
        color: #ccc;
      }
    }
    .btn-box{
      border-top: 1px solid #eee;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: blue;
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

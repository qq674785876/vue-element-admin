<template>
  <div id="app">
    <router-view/>
    <component
      :is="currentRole"
      :dialog-visible="dialogVisible"
      :message-ttile="messageTtile"
      :message-cont="messageCont"
      :rec-id="recId"
      @handleClose="handleClose"/>
  </div>
</template>

<script>
import { messageFind, messageUpdate } from '@/api/index'
import Message from '@/views/message'

export default{
  name: 'App',
  components: {
    Message
  },
  data() {
    return {
      notify: null,
      currentRole: 'message',
      messageTtile: '',
      recId: 0,
      messageCont: '',
      dialogVisible: false
    }
  },
  computed: {

  },
  destroyed() {
    const _this = this
    if (_this.notify) _this.notify.close()
  },
  mounted() {
  },
  methods: {
    messageFind() {
      const _this = this
      messageFind().then(response => {
        const data = response.data
        const result = data.result
        if (data.error !== 0) {
          return
        }
        if (result.type === 3) {
          _this.recId = result.recId
          _this.messageTtile = result.title
          _this.messageCont = result.message
          _this.dialogVisible = true
        } else {
          _this.sendMessage(result.recId, result.title, result.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    messageUpdate(recId) {
      const _this = this
      _this.loading = true
      messageUpdate({
        recId: recId || _this.selectRecIds
      }).then(response => {
        const data = response.data
        _this.loading = false
        if (data.error !== 0) {
          return
        }
      }).catch(error => {
        console.log(error)
      })
    },
    sendMessage(recId, title, message) {
      const _this = this
      const h = _this.$createElement
      if (_this.notify) _this.notify.close()
      _this.notify = _this.$notify({
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
            h('h1', null, title),
            h('p', null, message)
          ]),
          h('div', {
            attrs: { 'class': 'btn-box' }
          }, [
            h('a', {
              attrs: { 'href': 'javascript:;' },
              on: {
                click: () => {
                  return _this.clickBtn(recId)
                }
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
    clickBtn(recId) {
      const _this = this
      _this.notify.close()
      _this.messageUpdate(recId)
    },
    handleClose(recId) {
      const _this = this
      _this.dialogVisible = false
      _this.messageUpdate(recId)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-pagination{
  padding-top: 10px;
}
.el-dialog__body{
  padding-top: 10px;
  padding-bottom: 10px;
}
.mobile{
	.message-box{
		display: none;
	}
}

</style>

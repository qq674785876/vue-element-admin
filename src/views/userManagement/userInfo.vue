<template>
  <div>
    <el-dialog
      :id="dialogId"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      append-to-body
      width="30%">
      <el-row>
        <el-form v-if="dialogTitle != '修改密码'" ref="formData" :model="formData" :rules="rules" label-width="80px">
          <el-form-item prop="" label="账号:">
            <el-input
              v-model="formData.username"
              placeholder="请输入账号"
              name="username"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="密码:">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              name="password"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="姓名:">
            <el-input
              v-model="formData.userRealName"
              placeholder="请输入姓名"
              name="userRealName"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="手机号:">
            <el-input
              v-model="formData.phone"
              placeholder="请输入手机号"
              name="phone"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="权限值:">
            <el-input
              v-model="formData.role"
              placeholder="权限值(数字越小权限越大)"
              name="role"
              type="number"
              min="0"
              auto-complete="on"
            />
          </el-form-item>
        </el-form>
        <el-form v-else ref="editPsdForm" :model="editPsdForm" :rules="rules" label-width="80px">
          <el-form-item prop="" label="旧密码:">
            <el-input
              v-model="editPsdForm.oldpassword"
              placeholder="请输入旧密码"
              name="oldpassword"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="新密码:">
            <el-input
              v-model="editPsdForm.newpassword"
              placeholder="请输入新密码"
              name="newpassword"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { registadmin, resetpassword } from '@/api/index'

export default {
  name: 'UserInfo',
  components: {},
  props: {
    dialogId: {
      type: Number,
      default: 0
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        username: '',
        password: '',
        userRealName: '',
        phone: '',
        role: ''
      },
      editPsdForm: {
        oldpassword: '',
        newpassword: ''
      },
      rules: {}
    }
  },
  mounted() {
    console.log()
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {
      const _this = this
      if (_this.dialogTitle === '修改密码') {
        _this.resetpassword()
      } else {
        _this.registadmin()
      }
    },
    registadmin() {
      const _this = this
      registadmin(_this.formData).then(res => {
        _this.loading = false
        const data = res.data
        if (data.error !== 0) {
          _this.$notify({
            title: '查询失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.$notify({
          title: '新增成功',
          message: '新增成功',
          type: 'success'
        })
        _this.$emit('handleClose')
      }).catch(error => {
        console.log(error)
      })
    },
    resetpassword() {
      const _this = this
      resetpassword({
        username: _this.$store.getters.userInfo.username,
        oldpassword: _this.$md5(_this.editPsdForm.oldpassword),
        newpassword: _this.$md5(_this.editPsdForm.newpassword)
      }).then(res => {
        _this.loading = false
        const data = res.data
        if (data.error !== 0) {
          _this.$notify({
            title: '查询失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.$notify({
          title: '操作成功',
          message: '密码修改成功！即将退出登录~~~',
          type: 'success'
        })
        _this.$emit('handleClose')
        setTimeout(function() {
          _this.$store.dispatch('LogOut').then(() => {
            // _this.$router.push({path: '/login'})
            location.href = '/#/login'
            // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
          })
        }, 3000)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.mobile{
  .el-dialog{
    width: 100% !important;
  }
}
</style>


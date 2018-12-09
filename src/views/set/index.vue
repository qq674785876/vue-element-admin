<template>
  <div v-loading="loading" class="set-container" element-loading-text="拼命加载中">
    <el-tabs type="border-card" class="card-box" @tab-click="selectTab">
      <el-tab-pane label="个人信息" class="personal-info">
        <div class="module-list">
          <p class="title">基本信息</p>
          <el-row class="info-box">
            <el-col :span="12">
              <span class="name">微信：</span>
              <span v-if="!isEdit">{{ userInfo.wechat }}</span>
              <el-input v-else v-model="userInfo.wechat" placeholder="请输入微信"/>
            </el-col>
            <el-col :span="12">
              <span class="name">QQ：</span>
              <span v-if="!isEdit">{{ userInfo.imNumber }}</span>
              <el-input v-else v-model="userInfo.imNumber" placeholder="请输入QQ"/>
            </el-col>
            <el-col :span="12">
              <span class="name">公司：</span>
              <span v-if="!isEdit">{{ userInfo.company }}</span>
              <el-input v-else v-model="userInfo.company" placeholder="请输入公司名称"/>
            </el-col>
            <el-col :span="12">
              <span class="name">职位：</span>
              <span v-if="!isEdit">{{ userInfo.job }}</span>
              <el-input v-else v-model="userInfo.job" placeholder="请输入职位："/>
            </el-col>
          </el-row>
          <div class="btn-box" align="right">
            <el-button v-if="!isEdit" type="primary" size="mini" style="margin-right: 30px;" @click="isEdit = true">编辑</el-button>
            <el-button
              v-else
              type="primary"
              size="mini"
              style="margin-right: 30px;"
              @click="userUpdate({
                wechat: userInfo.wechat,
                imNumber: userInfo.imNumber,
                company: userInfo.company,
                job: userInfo.job
            })">保存</el-button>
          </div>
        </div>
        <div class="module-list">
          <p class="title">账号信息</p>
          <el-row class="info-box">
            <el-col :span="12">
              <span class="name">密码：</span>
              <span>{{ '******' }}</span>
              <a href="javascript:;" style="margin-left: 15px;color: blue;" class="el-icon-edit" @click="edit('password')">修改</a>
            </el-col>
            <el-col :span="12">
              <span class="name">套餐：</span>
              <span>{{ userInfo.packageName ? userInfo.packageName : '未购买套餐' }}</span>
              <a href="javascript:;" style="margin-left: 15px;color: blue;" class="el-icon-goods" @click="currentRole = 'package',dialogVisible = true">购买</a>
            </el-col>
            <el-col :span="12">
              <span class="name">绑定手机：</span>
              <span v-if="!isEditMobile">{{ userInfo.mobile ? userInfo.mobile : '未绑定' }}</span>
              <el-input v-else v-model="userInfo.mobile" placeholder="请输入手机号"/>
              <a v-if="!isEditMobile" href="javascript:;" style="margin-left: 15px;color: blue;" class="el-icon-edit" @click="isEditMobile = true">修改</a>
              <a v-else href="javascript:;" style="margin-left: 15px;color: blue;" class="el-icon-download" @click="userUpdate({ mobile: userInfo.mobile })">保存</a>
            </el-col>
            <el-col :span="12">
              <span class="name">绑定邮箱：</span>
              <span>{{ userInfo.email }}</span>
              <a href="javascript:;" style="margin-left: 15px;color: blue;" class="el-icon-edit" @click="edit('email')">修改</a>
            </el-col>
          </el-row>
        </div>
        <div class="module-list">
          <p class="title">实名信息</p>
          <el-row class="realName-box">
            <el-col :span="24" style="text-align: left;">
              <span class="name">实名状态：</span>
              <span>{{ userInfo.realState | realName }}</span>
              <el-button v-if="userInfo.realState !== 1" type="primary" size="mini" @click="getRealName">提交实名信息</el-button>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="img-box">
                <img v-if="userInfo.realState === 1" :src="userInfo.front">
                <el-upload
                  v-else
                  :before-upload="frontImgUpload"
                  :show-file-list="false"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture">
                  <img v-if="userInfo.front" :src="userInfo.front">
                  <i v-else class="el-icon-plus"/>
                </el-upload>
              </div>
              <p>身份证正面</p>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="img-box">
                <img v-if="userInfo.realState === 1" :src="userInfo.contrary">
                <el-upload
                  v-else
                  :before-upload="contraryImgUpload"
                  :show-file-list="false"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture">
                  <img v-if="userInfo.contrary" :src="userInfo.contrary">
                  <i v-else class="el-icon-plus"/>
                </el-upload>
              </div>
              <p>身份证反面</p>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="img-box">
                <img v-if="userInfo.realState === 1" :src="userInfo.hand">
                <el-upload
                  v-else
                  :before-upload="handImgUpload"
                  :show-file-list="false"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture">
                  <img v-if="userInfo.hand" :src="userInfo.hand">
                  <i v-else class="el-icon-plus"/>
                </el-upload>
              </div>
              <p>手持身份证正面</p>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知管理">
        <div class="module-list">
          <p class="title" align="right">
            <!-- 3项 -->
            <a href="javascript:;" style="margin-left: 15px;color: blue;font-size: 14px;" @click="setRead('')">全部标记已读</a>
          </p>
          <el-row>
            <el-table
              ref="multipleTable"
              :data="noticeList"
              tooltip-effect="dark"
              height="calc(100vh - 305px)"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55"/>
              <el-table-column
                :index="indexMethod"
                type="index"
                label="编号"
                width="100"/>
              <el-table-column
                prop="createTime"
                label="发送时间"
                width="220"/>
              <el-table-column
                prop="message"
                label="通知内容"
                show-overflow-tooltip/>
              <el-table-column
                prop="state"
                label="状态"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.state === '未读'"
                    type="warning"
                    size="mini"
                    @click="handleRead(scope.$index, scope.row)">未读</el-button>
                  <span v-else>{{ scope.row.state }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page.sync="pageNum"
              :page-size="pageSize"
              :total="total"
              layout="prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <component
      :is="currentRole"
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"/>
    <el-dialog
      :title="editTitle"
      :visible.sync="editDialogVisible"
      width="30%"
      @handleClose="editClose">
      <div v-if="editType === 'email'" class="editEmail">
        <el-form ref="emailForm" :model="emailForm" :rules="emailRules" label-width="80px">
          <el-form-item
            v-if="step === 2"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'change' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
            ]"
            prop="email"
            label="邮箱"
          >
            <el-input v-model="emailForm.email" placeholder="请输入新邮箱地址"/>
          </el-form-item>
          <el-form-item v-else>
            <p>请验证您当前邮箱： {{ userInfo.email }}</p>
          </el-form-item>
          <el-form-item v-if="step === 2" prop="code" label="验证码">
            <el-input
              v-model="emailForm.code"
              placeholder="验证码"
              name="code"
              type="tel"
              maxlength="6"
              style="width: 140px;"
            />
            <el-button @click="getVerifyCode">{{ verifyCodeText }}</el-button>
          </el-form-item>
          <el-form-item v-if="step === 1">
            <el-input
              v-model="code"
              placeholder="验证码"
              name="code"
              type="tel"
              maxlength="6"
              style="width: 140px;"
            />
            <el-button @click="getVerifyCode">{{ verifyCodeText }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="editType === 'password'" class="editPassword">
        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="80px">
          <el-form-item prop="oldPassword" label="旧密码">
            <el-input
              v-model="passwordForm.oldPassword"
              type="password"
              placeholder="请输入旧密码"
              name="oldPassword"/>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码">
            <el-input
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="请输入新密码"
              name="newPassword"/>
          </el-form-item>
          <el-form-item prop="rNewPassword" label="确认密码">
            <el-input
              v-model="passwordForm.rNewPassword"
              type="password"
              placeholder="请再次输入新密码"
              name="rNewPassword"/>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="step === 1" @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(editType + 'Form')">{{ step === 1 ? '下一步' : '确 定' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserDetails, userUpdate, sendMail, getRealName, imageUpload, sendMailUpdate, checkCode, emailUpdate, messageList, messageUpdate } from '@/api/index'
import store from '@/store'
import { Message } from 'element-ui'
import { validateEmail } from '@/utils/validate'
import Package from '@/views/app/package'
// import { mapGetters } from 'vuex'
let timer = null

export default {
  name: 'Set',
  components: { Package },
  // computed: {
  //   ...mapGetters([
  //     'userInfo'
  //   ])
  // },
  filters: {
    realName(value) {
      if (value === 0) {
        return '未实名或待审核（审核期间可以点击图片重新上传身份信息）'
      } else if (value === 1) {
        return '已实名'
      } else if (value === 2) {
        return '审核失败（点击图片重新上传身份信息进行实名）'
      } else {
        return ''
      }
    }
  },
  data() {
    const _this = this
    const validatecode = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('验证码长度为6位'))
      } else {
        callback()
      }
    }
    const validateOldPassword = function(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error('密码长度为6位以上'))
      } else {
        callback()
      }
    }
    const validatePass = function(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== _this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePassword = function(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error('密码长度为6位以上'))
      } else {
        callback()
      }
    }
    return {
      step: 1,
      emailRules: {
        code: [{ required: true, trigger: 'blur', validator: validatecode }]
      },
      passwordRules: {
        oldPassword: [{ required: true, trigger: 'change', validator: validateOldPassword }],
        newPassword: [{ required: true, trigger: 'change', validator: validatePassword }],
        rNewPassword: [{ required: true, trigger: 'change', validator: validatePass }]
      },
      verifyCodeText: '获取验证码',
      loading: false,
      currentRole: '',
      editTitle: '',
      editDialogVisible: false,
      editType: '',
      dialogTitle: '购买套餐',
      dialogVisible: false,
      isEditMobile: false,
      pageNum: 1,
      pageSize: 10,
      total: 9,
      isEdit: false,
      userInfo: {},
      code: '',
      updateKey: '',
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        rNewPassword: ''
      },
      emailForm: {
        email: '',
        code: ''
      },
      noticeList: [],
      selectRecIds: ''
    }
  },
  mounted() {
    this.getUserDetails()
  },
  methods: {
    selectTab(tab) {
      if (tab.label === '通知管理') {
        this.messageList()
      }
    },
    handleRead(index, row) {
      this.setRead(row.recId)
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
          _this.$notify({
            title: '操作失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.$notify({
          title: '操作成功',
          message: '已全部标记为已读',
          type: 'success'
        })
        _this.messageList()
      }).catch(error => {
        console.log(error)
      })
    },
    setRead(recId) {
      const _this = this
      let text = ''
      if (!recId) {
        text = '是否全部标记为已读?'
      } else {
        text = '是否标记为已读?'
      }

      _this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.messageUpdate(recId)
      }).catch(() => {

      })
    },
    messageList() {
      const _this = this
      messageList({
        pageNum: _this.pageNum,
        pageSize: _this.pageSize
      }).then(response => {
        const data = response.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '查询失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.total = result.total
        _this.noticeList = result.row
      }).catch(error => {
        console.log(error)
      })
    },
    editEmail() {
      const _this = this
      if (_this.step === 1) {
        checkCode({ code: _this.code }).then(response => {
          const data = response.data
          const result = data.result
          if (data.error !== 0) {
            _this.$notify({
              title: '操作失败',
              message: data.reason,
              type: 'error'
            })
            return
          }
          _this.step = 2
          _this.verifyCodeText = '获取验证码'
          clearInterval(timer)
          _this.emailForm.code = ''
          _this.updateKey = result.updateKey
          console.log(_this.updateKey)
        }).catch(error => {
          console.log(error)
        })
      } else {
        emailUpdate({
          code: _this.emailForm.code,
          email: _this.emailForm.email,
          updateKey: _this.updateKey
        }).then(response => {
          const data = response.data
          if (data.error !== 0) {
            _this.$notify({
              title: '操作失败',
              message: data.reason,
              type: 'error'
            })
            return
          }
          Message({
            message: '邮箱修改成功，请重新登陆！', // error.message
            type: 'warning',
            duration: 5 * 1000
          })
          setTimeout(function() {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }, 2000)
          // _this.verifyCodeText = '获取验证码'
          // _this.updateKey = ''
          // clearInterval(timer)
          // _this.emailForm.code = ''
        }).catch(error => {
          console.log(error)
        })
      }
    },
    getVerifyCode() {
      const _this = this

      if (_this.verifyCodeText === '获取验证码') {
        if (_this.step === 2) {
          _this.sendMail()
        } else {
          _this.sendMailUpdate()
        }
      } else {
        return
      }
    },
    sendMail() {
      const _this = this
      let time = 60
      if (!validateEmail(this.emailForm.email)) {
        return
      }
      return new Promise((resolve, reject) => {
        sendMail(_this.emailForm.email, 0).then(response => {
          const data = response.data
          if (data.error !== 0) {
            _this.$notify({
              title: '发送失败',
              message: data.reason,
              type: 'error'
            })
            return
          }
          _this.$notify({
            title: '发送成功',
            message: '已发送验证码至邮箱！',
            type: 'success'
          })
          _this.verifyCodeText = '重新获取 ' + time + 'S'
          timer = setInterval(function() {
            if (time > 1) {
              time--
              _this.verifyCodeText = '重新获取 ' + time + 'S'
            } else {
              clearInterval(timer)
              timer = null
              _this.verifyCodeText = '获取验证码'
            }
          }, 1000)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    sendMailUpdate() {
      const _this = this
      let time = 60
      sendMailUpdate().then(response => {
        const data = response.data
        if (data.error !== 0) {
          _this.$notify({
            title: '操作失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.$notify({
          title: '发送成功',
          message: '已发送验证码至邮箱！',
          type: 'success'
        })
        _this.verifyCodeText = '重新获取 ' + time + 'S'
        timer = setInterval(function() {
          if (time > 1) {
            time--
            _this.verifyCodeText = '重新获取 ' + time + 'S'
          } else {
            clearInterval(timer)
            timer = null
            _this.verifyCodeText = '获取验证码'
          }
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    },
    getRealName() {
      const _this = this
      getRealName({
        front: _this.userInfo.front,
        contrary: _this.userInfo.contrary,
        hand: _this.userInfo.hand
      }).then(response => {
        const data = response.data
        if (data.error !== 0) {
          _this.$notify({
            title: '实名失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.$notify({
          title: '操作成功',
          message: '实名信息提交成功！',
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    frontImgUpload(file) {
      const _this = this
      // return isLt2M;
      // return isJPG && isLt2M;

      if (_this.isImgFlag(file)) {
        _this.uploadImg(file, 'front')
      }

      return false
    },
    contraryImgUpload(file) {
      const _this = this
      // return isLt2M;
      // return isJPG && isLt2M;

      if (_this.isImgFlag(file)) {
        _this.uploadImg(file, 'contrary')
      }

      return false
    },
    handImgUpload(file) {
      const _this = this
      // return isLt2M;
      // return isJPG && isLt2M;

      if (_this.isImgFlag(file)) {
        _this.uploadImg(file, 'hand')
      }

      return false
    },
    uploadImg(file, type) {
      const _this = this

      const formData = new FormData()
      formData.append('image', file) // 传文件
      imageUpload(formData).then(response => {
        const data = response.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '上传失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.$notify({
          title: '上传成功',
          message: '图片上传成功!',
          type: 'success'
        })
        _this.userInfo[type] = result.viewUrl
      }).catch(error => {
        console.log(error)
      })
    },
    isImgFlag(file) {
      const _this = this
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        _this.$notify({
          title: '格式错误',
          message: '上传图片必须是JPG/GIF/PNG/BMP格式!',
          type: 'error'
        })
        return false
      }

      if (!isLt2M) {
        _this.$notify({
          title: '格式错误',
          message: '上传图片必须是JPG/GIF/PNG/BMP格式!',
          type: 'error'
        })
        return false
      }

      return true
    },
    submitForm(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'emailForm') {
            _this.editEmail()
          } else {
            _this.userUpdate({
              password: _this.passwordForm.newPassword,
              oldPassword: _this.passwordForm.oldPassword
            }, '密码修改成功！', true)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    edit(editType) {
      const _this = this
      _this.editType = editType
      _this.editDialogVisible = true
      _this.step = 1
      if (editType === 'email') {
        _this.editTitle = '修改邮箱'
      } else if (editType === 'password') {
        _this.editTitle = '修改密码'
      }
    },
    userUpdate(data, tips, isLogOut) {
      const _this = this
      _this.loading = true
      userUpdate(data).then(res => {
        _this.loading = false
        const data = res.data
        if (data.error !== 0) {
          _this.$notify({
            title: '修改失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        if (isLogOut) {
          Message({
            message: '密码修改成功，请重新登陆！', // error.message
            type: 'warning',
            duration: 5 * 1000
          })
          setTimeout(function() {
            store.dispatch('FedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }, 2000)
        } else {
          _this.$notify({
            title: '修改成功',
            message: tips || '用户信息修改成功',
            type: 'success'
          })
        }
        _this.isEdit = false
        _this.isEditMobile = false
      }).catch(error => {
        console.log(error)
      })
    },
    getUserDetails() {
      const _this = this
      _this.loading = true
      getUserDetails().then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '查询失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.userInfo = result
      }).catch(error => {
        console.log(error)
      })
    },
    handleSelectionChange(data) {
      const _this = this
      const arr = []
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].recId)
      }
      _this.selectRecIds = arr.join(',')
    },
    handleSizeChange() {
      this.messageList()
    },
    handleCurrentChange() {
      this.messageList()
    },
    indexMethod(index) {
      return this.pageSize * (this.pageNum - 1) + index + 1
    },
    handleClose() {
      this.dialogVisible = false
      this.currentRole = ''
      this.getUserDetails()
    },
    editClose() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.set-container {
	padding: 20px;
	.card-box{
		.el-tabs__content{
			max-height: calc(100vh - 165px);
			overflow: auto;
		}
	}
	.el-table{
		height: calc(100vh - 305px);
	}
	.el-pagination{
		padding-top: 30px;
	}
	.personal-info{
    .name{
      display: inline-block;
      width: 80px;
      margin-right: 10px;
      text-align: justify;
      text-align-last: justify;
    }
    .el-col{
     margin: 10px 0;
     font-size: 14px;
     color: #888;
   }
   .module-list{
     box-shadow: 0 0 10px #ccc;
     padding: 10px 20px;
     margin-bottom: 30px;
     &:first-child{
      .name{
        width: 45px;
        margin-right: 10px;
      }
    }
    .el-input{
      width: 180px;
    }
    .realName-box{
      text-align: center;
      .img-box{
       img{
        width: 300px;
        height: 200px;
      }
      .el-icon-plus{
        font-size: 160px;
      }
    }
  }
}
}
}
.mobile{
  .el-dialog{
    width: 100% !important;
  }
  .module-list{
    .el-input{
      width: 90% !important;
      padding-bottom: 5px;
    }
    .btn-box{
      .el-button{
        margin-right: 0 !important;
      }
    }
    .info-box{
      span{
        display: block;
        padding-bottom: 10px;
      }
      a{
        margin-left: 0 !important;
        display: block;
      }
    }
  }
  .set-container .personal-info .module-list .realName-box .img-box img{
    width: 100%;
  }
}
</style>

<template>
  <div v-loading="loading" class="set-container" element-loading-text="拼命加载中">
    <el-tabs type="border-card" class="card-box">
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
            <el-button v-else type="primary" size="mini" style="margin-right: 30px;" @click="userUpdate(userInfo)">保存</el-button>
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
              <span>{{ userInfo.packageName ? userInfo.mobile : '未购买套餐' }}</span>
              <a href="javascript:;" style="margin-left: 15px;color: blue;" class="el-icon-edit" @click="dialogVisible = true">修改</a>
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
            <el-col :span="8" :xs="24">
              <div class="img-box">
                <img :src="userInfo.front">
              </div>
              <p>身份证正面</p>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="img-box">
                <img :src="userInfo.contrary">
              </div>
              <p>身份证反面</p>
            </el-col>
            <el-col :span="8" :xs="24">
              <div class="img-box">
                <img :src="userInfo.hand">
              </div>
              <p>手持身份证正面</p>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知管理">
        <div class="module-list">
          <p class="title">
            3项
            <a href="javascript:;" style="margin-left: 15px;color: blue;float: right;font-size: 14px;">全部标记已读</a>
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
                prop="time"
                label="发送时间"
                width="220"/>
              <el-table-column
                prop="cont"
                label="通知内容"
                show-overflow-tooltip/>
              <el-table-column
                prop="status"
                label="状态"
                show-overflow-tooltip/>
            </el-table>
            <el-pagination
              :current-page.sync="currentPage"
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
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'change' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
            ]"
            prop="email"
            label="邮箱"
          >
            <el-input v-model="emailForm.email" placeholder="请输入新邮箱地址"/>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
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
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(editType + 'Form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserDetails, userUpdate, sendMail } from '@/api/index'
import { validateEmail } from '@/utils/validate'
import Package from '@/views/app/package'
// import { mapGetters } from 'vuex'

export default {
  name: 'Set',
  components: { Package },
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
      } else if (value !== _this.passwordForm.validatePassword) {
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
      currentRole: 'package',
      editTitle: '',
      editDialogVisible: false,
      editType: '',
      dialogTitle: '购买套餐',
      dialogVisible: false,
      isEditMobile: false,
      currentPage: 1,
      pageSize: 10,
      total: 9,
      isEdit: false,
      userInfo: {},
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        rNewPassword: ''
      },
      emailForm: {
        email: '',
        code: ''
      },
      personalInfo: {
        frontImg: '',
        contraryImg: '',
        handImg: ''
      },
      noticeList: [{
        time: '2018-05-03 14:20:30',
        cont: '越来越多人在使用这个平台',
        status: 1
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }, {
        time: '2018-03-03 23:20:30',
        cont: '新增更多的套餐',
        status: 0
      }, {
        time: '2018-05-03 14:20:30',
        cont: '越来越多人在使用这个平台',
        status: 1
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }, {
        time: '2018-03-03 23:20:30',
        cont: '新增更多的套餐',
        status: 0
      }, {
        time: '2018-05-03 14:20:30',
        cont: '越来越多人在使用这个平台',
        status: 1
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }]
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'userInfo'
  //   ])
  // },
  mounted() {
    this.getUserDetails()
  },
  methods: {
    editEmail() {

    },
    submitForm(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.editEmail()
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
      if (editType === 'email') {
        _this.editTitle = '修改邮箱'
      } else if (editType === 'password') {
        _this.editTitle = '修改密码'
      }
    },
    userUpdate(data) {
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
        _this.$notify({
          title: '修改成功',
          message: '用户信息修改成功',
          type: 'success'
        })
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
    handleSelectionChange() {
      console.log(1)
    },
    handleSizeChange() {
      console.log(1)
    },
    handleCurrentChange() {
      console.log(1)
    },
    indexMethod(index) {
      return index * 2
    },
    handleClose() {
      this.dialogVisible = false
    },
    editClose() {

    },
    getVerifyCode() {
      let timer = null
      let time = 60
      const _this = this
      if (!validateEmail(this.emailForm.email)) {
        return
      }
      if (_this.verifyCodeText === '获取验证码') {
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
      } else {
        return
      }
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
		.el-col{
			margin: 10px 0;
			font-size: 14px;
			color: #888;
		}
		.module-list{
			box-shadow: 0 0 10px #ccc;
			padding: 10px 20px;
			margin-bottom: 30px;
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

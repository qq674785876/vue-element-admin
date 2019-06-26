<template>
  <div class="user-container">
    <el-row style="padding: 15px;">
      <!-- <el-button type="primary" size="mini" @click="setUserInfo()">新建</el-button> -->
      <!-- <el-button type="primary" size="mini" @click="deleteList()">删除</el-button> -->
    </el-row>
    <el-row v-loading="loading">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        height="calc(100vh - 160px)"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          :index="indexMethod"
          type="index"
          label="编号"/>
        <el-table-column
          prop="User_real_name"
          label="真实姓名"
          show-overflow-tooltip/>
        <el-table-column
          prop="User_nick_name"
          label="昵称"/>
        <el-table-column
          prop="Last_login_date"
          label="上次登陆时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="Create_date"
          label="创建时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="Update_date"
          label="登陆时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="Phone"
          label="电话"
          show-overflow-tooltip/>
        <el-table-column
          prop="Create_date"
          label="创建时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="Login_times"
          label="登陆次数"
          show-overflow-tooltip/>
        <el-table-column
          prop="set"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="seeAddr(scope.row)">查看地址</el-button>
            <el-button
              type="text"
              @click="setUseStatus(scope.row)">{{ scope.row.Is_use ? '禁用' : '启用' }}</el-button>
            <el-button
              type="text"
              @click="setProxy(scope.row)">{{ scope.row.Is_proxy ? '取消代理' : '设为代理' }}</el-button>
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
    <component
      :is="currentRole"
      :dialog-id="dialogId"
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"/>
  </div>
</template>

<script>
import { wxUserList, deleteoruse, setuserproxy } from '@/api/index'
import userInfo from '@/views/userManagement/userInfo'
import addrInfo from '@/views/userManagement/addrInfo'

export default {
  name: 'User',
  components: { userInfo, addrInfo },
  data() {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 9,
      startTime: '',
      endTime: '',
      isuse: '',
      currentRole: '',
      dialogId: 0,
      dialogTitle: '用户信息',
      dialogVisible: false,
      // oldFrequency: '',
      userList: [],
      setListId: '',
      form: {
        appId: '',
        description: ''
      }
    }
  },
  mounted() {
    const _this = this
    _this.wxUserList()
  },
  methods: {
    wxUserList() {
      const _this = this
      const userInfo = _this.$store.getters.userInfo
      wxUserList({
        username: userInfo.username,
        password: userInfo.password,
        pagesize: _this.pageSize,
        pagenum: _this.pageNum - 1,
        starttime: _this.startTime,
        endtime: _this.endTime,
        isuse: _this.isuse
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
        _this.total = result.allcount
        _this.userList = result.list
      }).catch(error => {
        console.log(error)
      })
    },
    seeAddr(row) {
      const _this = this
      _this.dialogTitle = '查看地址'
      _this.dialogId = row.User_id
      _this.currentRole = 'addrInfo'
      _this.dialogVisible = true
    },
    setProxy(row) {
      const _this = this
      let setTips = ''
      let state = 0
      if (row.Is_proxy) {
        setTips = '是否取消代理'
        state = 0
      } else {
        setTips = '是否设为代理'
        state = 1
      }
      _this.$confirm(setTips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true
        setuserproxy({
          userid: row.User_id,
          isproxy: state
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
            message: data.reason,
            type: 'success'
          })
          _this.wxUserList()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {

      })
    },
    setUseStatus(row) {
      const _this = this
      let setTips = ''
      let state = 0
      if (row.Is_use) {
        setTips = '禁用'
        state = 0
      } else {
        setTips = '启用'
        state = 1
      }
      _this.$confirm('确定' + setTips + '该账号？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true
        deleteoruse({
          id: row.Admin_id,
          isuse: state,
          idtype: 0 // 0 管理员 1 用户编辑  2 商品参数  3 商品参数 4 地址 5 商品详情
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
            message: data.reason,
            type: 'success'
          })
          _this.wxUserList()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {

      })
    },
    setUserInfo(row) {
      const _this = this
      if (row) {
        _this.dialogTitle = '用户编辑'
        _this.dialogId = row.Admin_id
      } else {
        _this.dialogTitle = '添加用户'
        _this.dialogId = 0
      }
      _this.currentRole = 'userInfo'
      _this.dialogVisible = true
    },
    deleteList(row) {

    },
    saveSet() {
      const _this = this
      if (!_this.form.appId) {
        this.$message('请选择推广APP')
      } else {
        wxUserList({
          id: _this.setListId,
          appId: _this.form.appId,
          description: _this.form.description
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
          _this.setDialogVisible = false
          _this.wxUserList()
        }).catch(error => {
          console.log(error)
        })
      }
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
      this.wxUserList()
    },
    handleCurrentChange() {
      this.wxUserList()
    },
    handlePictureCardPreview(img) {
      this.dialogImageUrl = img
      this.dialogImageVisible = true
    },
    indexMethod(index) {
      return this.pageSize * (this.pageNum - 1) + index + 1
    },
    handleClose() {
      this.dialogVisible = false
      this.currentRole = ''
      this.wxUserList()
    },
    setClose() {
      this.setDialogVisible = false
      this.wxUserList()
    },
    handleUpdate(index, row) {
      this.AdInfo(row)
    }
  }
}
</script>

<style scoped>
.user-container{

}
</style>


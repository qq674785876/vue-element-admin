<template>
  <div class="user-container">
    <!--     <el-row style="padding: 15px;">
      <el-button type="primary" size="mini" @click="AdInfo()">新建</el-button>
    </el-row> -->
    <el-row>
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        height="calc(100vh - 120px)"
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
          prop="user_name"
          label="用户名"
          width="220"/>
        <el-table-column
          prop="last_login_date"
          label="上次登陆时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="create_date"
          label="创建时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="update_date"
          label="登陆时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="user_real_name"
          label="真实姓名"
          show-overflow-tooltip/>
        <el-table-column
          prop="phone"
          label="电话"
          show-overflow-tooltip/>
        <el-table-column
          prop="role"
          label="权限"
          show-overflow-tooltip/>
        <el-table-column
          prop="login_times"
          label="登陆次数"
          show-overflow-tooltip/>
        <el-table-column
          prop="is_use"
          label="是否使用"
          show-overflow-tooltip>
          <!--           <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">升级</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="setApp(scope.$index, scope.row)">设置APP</el-button>
          </template> -->
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
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"/>
  </div>
</template>

<script>
import { webUserList } from '@/api/index'

export default {
  name: 'User',
  components: { },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 9,
      startTime: '',
      endtime: '',
      isuse: '',
      currentRole: '',
      dialogTitle: '购买套餐',
      dialogVisible: false,
      setDialogVisible: false,
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
    var _this = this
    _this.webUserList()
  },
  methods: {
    webUserList() {
      const _this = this
      const userInfo = _this.$store.getters.userInfo
      console.log(userInfo)
      webUserList({
        username: userInfo.username,
        password: userInfo.password,
        pagesize: _this.pageSize,
        pagenum: _this.pageNum,
        starttime: _this.starttime,
        endtime: _this.endtime,
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
    AdInfo(row) {
      var _this = this
      _this.currentRole = ''
      _this.dialogVisible = true
    },
    saveSet() {
      const _this = this
      if (!_this.form.appId) {
        this.$message('请选择推广APP')
      } else {
        webUserList({
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
          _this.seoList()
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
      this.seoList()
    },
    handleCurrentChange() {
      this.seoList()
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
      this.seoList()
    },
    setClose() {
      this.setDialogVisible = false
      this.seoList()
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


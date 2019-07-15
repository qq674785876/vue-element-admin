<template>
  <div class="order-container">
    <el-row style="padding: 15px;">
      <el-button type="primary" size="mini" @click="setUserInfo()">新建</el-button>
      <!-- <el-button type="primary" size="mini" @click="deleteList()">删除</el-button> -->
    </el-row>
    <el-row v-loading="loading">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        height="calc(100vh - 185px)"
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
          prop="order_num"
          label="订单号"
          width="220">
          <!-- <template slot-scope="scope">
            <el-button
              type="text"
              @click="setUserInfo(scope.row)">{{scope.row.User_name}}</el-button>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="product_num"
          label="商品数量"
          show-overflow-tooltip/>
        <el-table-column
          prop="pay_state"
          label="支付状态"
          show-overflow-tooltip/>
        <el-table-column
          prop="pay_money"
          label="实际支付金额"
          show-overflow-tooltip/>
        <el-table-column
          prop="pay_date"
          label="支付时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="design_image_url"
          label="效果图url"
          show-overflow-tooltip/>
        <el-table-column
          prop="image_url"
          label="原图"
          show-overflow-tooltip/>
        <el-table-column
          prop="order_state"
          label="订单状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.order_state == 0 ? '未发货' : '已发货'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="express_number"
          label="快递单号"
          show-overflow-tooltip/>
        <el-table-column
          prop="set"
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="setUseStatus(scope.row)">查看内容</el-button>
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
import { orderlist, deleteoruse } from '@/api/index'
import userInfo from '@/views/userManagement/userInfo'

export default {
  name: 'User',
  components: { userInfo },
  data() {
    return {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 9,
      startTime: '',
      endTime: '',
      pay_state: '',
      search: '',
      order_state: '',
      sorttype: '',
      is_proxy: '',
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
    var _this = this
    _this.orderlist()
  },
  methods: {
    orderlist() {
      const _this = this
      const userInfo = _this.$store.getters.userInfo
      orderlist({
        username: userInfo.username,
        password: userInfo.password,
        pagesize: _this.pageSize,
        pagenum: _this.pageNum - 1,
        starttime: _this.startTime,
        endtime: _this.endTime,
        pay_state: _this.pay_state,
        search: _this.search,
        order_state: _this.order_state,
        sorttype: _this.sorttype,
        is_proxy: _this.is_proxy
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
            message: '操作成功!',
            type: 'success'
          })
          _this.webUserList()
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
      this.webUserList()
    },
    setClose() {
      this.setDialogVisible = false
      this.webUserList()
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


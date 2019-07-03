<template>
  <div>
    <el-dialog
      :paramid="paramid"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      append-to-body
      width="50%">
      <el-row v-loading="loading">
        <el-row style="padding-top: 10px;">
          <el-form ref="formData" :model="formData">
            <el-form-item prop="" label="价格:">
              <el-input
                v-model="formData.price"
                placeholder="请输入价格"
                name="newpassword"
                type="text"
                style="width:300px;"
                auto-complete="on"
              />
            </el-form-item>
          </el-form>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="userList"
          align="center"
          height="400px"
          tooltip-effect="dark"
          @current-change="handleCurrentChange"
          style="width: 100%">
        <el-table-column width="55">
          <template scope="scope">
            <el-radio :label="scope.row.User_id" v-model="formData.userid" @change.native="getTemplateRow(scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
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
          prop="Phone"
          label="电话"
          show-overflow-tooltip/>
        </el-table>
        <el-pagination
          :current-page.sync="pageNum"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { wxUserList, addproductparamproxy } from '@/api/index'

export default {
  name: 'AgentInfo',
  components: {},
  props: {
    paramid: {
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
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 9,
      startTime: '',
      endTime: '',
      isuse: '',
      formData: {
        userid: '',
        price: ''
      },
      userList: []
    }
  },
  mounted() {
    if(this.dialogTitle === '添加代理价格'){
      this.wxUserList()
    }else{

    }
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
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {
      const _this = this
      addproductparamproxy({
        productparamid: _this.paramid,
        userid: _this.formData.userid,
        price: _this.formData.price
      }).then(response => {
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
        _this.handleClose()
      }).catch(error => {
        console.log(error)
      })
    },
    handleSizeChange() {
      this.wxUserList()
    },
    indexMethod(index) {
      return this.pageSize * (this.pageNum - 1) + index + 1
    },
    getTemplateRow(row) {
      console.log(row)
    },
    handleCurrentChange(row) {
      this.formData.userid = row.User_id
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


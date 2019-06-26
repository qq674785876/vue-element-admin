<template>
  <div>
    <el-dialog
      :id="dialogId"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      append-to-body
      width="50%">
      <el-row style="padding: 15px;">
        <el-button type="primary" size="mini" @click="setUserInfo()">新建</el-button>
      </el-row>
      <el-row v-loading="loading">
        <el-table
          ref="multipleTable"
          :data="addrList"
          align="center"
          tooltip-effect="dark"
          style="width: 100%">
          <!-- @selection-change="handleSelectionChange" -->
          <!--           <el-table-column
            type="selection"
            width="55"/> -->
          <el-table-column
            :index="indexMethod"
            type="index"
            label="编号"/>
          <el-table-column
            prop="Address_user_name"
            label="收件人姓名"
            show-overflow-tooltip/>
          <el-table-column
            prop="Address_user_phone"
            label="收件人电话"/>
          <el-table-column
            prop="Address_user_phone"
            label="收件人地址">
            <template slot-scope="scope">
              {{ scope.row.Province + scope.row.City + scope.row.Regoin + scope.row.Detail_address }}
            </template>
          </el-table-column>
          <el-table-column
            prop="set"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="setUseStatus(scope.row)">{{ scope.row.Is_use ? '禁用' : '启用' }}</el-button>
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
      <!--       <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { productdetaillist, deleteoruse } from '@/api/index'

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
      loading: false,
      pageNum: 1,
      pageSize: 10,
      total: 9,
      starttime: '',
      endtime: '',
      isuse: '',
      contenttype: '',
      addrList: [],
      rules: {}
    }
  },
  mounted() {
    this.productdetaillist()
  },
  methods: {
    productdetaillist() {
      const _this = this
      productdetaillist({
        productid: _this.dialogId,
        pagesize: _this.pageSize,
        pagenum: _this.pageNum - 1,
        starttime: _this.startTime,
        endtime: _this.endTime,
        isuse: _this.isuse,
        contenttype: _this.contenttype
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
        _this.addrList = result.list
      }).catch(error => {
        console.log(error)
      })
    },
    setUseStatus(row) {
      const _this = this
      let setTips = '', state = 0
      if (row.Is_use) {
        setTips = '禁用'
        state = 0
      } else {
        setTips = '启用'
        state = 1
      }
      _this.$confirm('确定' + setTips + '该地址？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true
        deleteoruse({
          id: row.Address_id,
          isuse: state,
          idtype: 5 // 0 管理员 1 用户编辑  2 商品  3 商品参数 4 地址 5 商品详情
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
          _this.productdetaillist()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {

      })
    },
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {

    },
    handleSizeChange() {
      this.wxUserList()
    },
    handleCurrentChange() {
      this.wxUserList()
    },
    indexMethod(index) {
      return this.pageSize * (this.pageNum - 1) + index + 1
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


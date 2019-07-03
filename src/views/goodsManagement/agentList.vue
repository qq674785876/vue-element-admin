<template>
  <div>
    <el-dialog
      :paramid="paramid"
      :userid="userid"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      append-to-body
      width="50%">
      <el-row v-loading="loading">
        <el-table
          ref="multipleTable"
          :data="agentList"
          align="center"
          height="500px"
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
            prop="UserName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="UserRealName"
            label="真实姓名">
          </el-table-column>
          <el-table-column
            prop="Product_param_Name"
            label="代理商品参数名"
            show-overflow-tooltip/>
          <el-table-column
            prop="Update_date"
            label="更新时间"/>
          <el-table-column
            prop="set"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="setList(scope.row)">修改</el-button>
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
import { paramproxylist } from '@/api/index'

export default {
  name: 'UserInfo',
  components: {},
  props: {
    userid: {
      type: Number,
      default: 0
    },
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
      agentList: []
    }
  },
  mounted() {
    this.paramproxylist()
  },
  methods: {
    paramproxylist() {
      const _this = this
      const params = {
        pagesize: _this.pageSize,
        pagenum: _this.pageNum - 1,
        starttime: _this.startTime,
        endtime: _this.endTime,
      }
      if(_this.userid) params.userid = _this.userid
      if(_this.paramid) params.paramid = _this.paramid

      paramproxylist(params).then(response => {
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
        _this.agentList = result.list
      }).catch(error => {
        console.log(error)
      })
    },
    setList(){

    },
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {

    },
    handleSizeChange() {
      this.paramproxylist()
    },
    handleCurrentChange() {
      this.paramproxylist()
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


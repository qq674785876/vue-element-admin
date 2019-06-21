<template>
  <div class="user-container">
    <!--     <el-row style="padding: 15px;">
      <el-button type="primary" size="mini" @click="AdInfo()">新建</el-button>
    </el-row> -->
    <el-row>
      <el-table
        ref="multipleTable"
        :data="noticeList"
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
          prop="startTime"
          label="开始时间"
          width="220"/>
        <el-table-column
          prop="endTime"
          label="到期时间"
          show-overflow-tooltip/>
        <el-table-column
          prop="packageType"
          label="套餐类型"
          show-overflow-tooltip/>
        <el-table-column
          prop="appName"
          label="推广的包"
          show-overflow-tooltip/>
        <el-table-column
          prop="total"
          label="期间展现总次数"
          show-overflow-tooltip/>
        <el-table-column
          prop="today"
          label="本日展现次数"
          show-overflow-tooltip/>
        <el-table-column
          prop="state"
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">升级</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="setApp(scope.$index, scope.row)">设置APP</el-button>
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
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      :old-id="oldId"
      :old-type="oldType"
      :old-end-time="oldEndTime"
      :old-package-type="oldPackageType"
      :old-total="oldTotal"
      @handleClose="handleClose"/>
    <el-dialog
      :title="setTitle"
      :visible.sync="setDialogVisible"
      :set-loading="setLoading"
      width="30%"
      @handleClose="setClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="推广APP">
          <el-select v-model="form.appId" placeholder="请选择推广的APP">
            <el-option
              v-for="item in applist"
              :key="item.appId"
              :label="item.appName"
              :value="item.appId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSet">设 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AdPackage from '@/views/app/adPackage'
import { seoList, updateApp } from '@/api/index'

export default {
  name: 'User',
  components: { AdPackage },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 9,
      currentRole: '',
      dialogTitle: '购买套餐',
      dialogVisible: false,
      setLoading: false,
      setTitle: '设置APP',
      setDialogVisible: false,
      applist: [],
      oldId: '',
      oldPackageType: '',
      oldEndTime: '',
      oldTotal: 0,
      oldType: 0,
      // oldFrequency: '',
      noticeList: [],
      setListId: '',
      form: {
        appId: '',
        description: ''
      }
    }
  },
  mounted() {
    var _this = this
    _this.seoList()
  },
  methods: {
    seoList() {
      const _this = this
      seoList({
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
    AdInfo(row) {
      var _this = this
      _this.currentRole = 'adPackage'
      _this.dialogVisible = true
      _this.oldId = ''
      if (row) {
        _this.oldId = row.id.toString()
        _this.oldEndTime = row.endTime
        _this.oldPackageType = row.packageType
        _this.oldTotal = row.total
        _this.oldType = row.type
        // _this.oldFrequency = row.frequency;
      }
    },
    saveSet() {
      const _this = this
      if (!_this.form.appId) {
        this.$message('请选择推广APP')
      } else {
        updateApp({
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


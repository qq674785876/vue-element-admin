<template>
  <div class="goods-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品列表" name="list">
        <el-row style="padding: 15px 0;">
          <el-button type="primary" size="mini" @click="setGoodsInfo()">新建</el-button>
          <!-- <el-button type="primary" size="mini" @click="deleteList()">删除</el-button> -->
        </el-row>
        <el-row v-loading="loading">
          <el-table
            ref="multipleTable"
            :data="userList"
            tooltip-effect="dark"
            height="calc(100vh - 230px)"
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
              prop="Product_name"
              label="商品名称"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="setGoodsInfo(scope.row)">{{ scope.row.Product_name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="AdminName"
              label="创建者"
              show-overflow-tooltip/>
            <el-table-column
              prop="Create_date"
              label="创建时间"
              show-overflow-tooltip/>
            <el-table-column
              prop="Update_date"
              label="更新时间"
              show-overflow-tooltip/>
            <el-table-column
              prop="set"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="seeDetails(scope.row)">查看详情</el-button>
                <el-button
                  type="text"
                  @click="seeParams(scope.row)">查看参数</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="details"/>
    </el-tabs>
    <component
      :is="currentRole"
      :dialog-id="dialogId"
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"/>
  </div>
</template>

<script>
import { productlist, deleteoruse } from '@/api/index'
import goodsInfo from '@/views/goodsManagement/goodsInfo'
import goodsDetails from '@/views/goodsManagement/goodsDetails'

export default {
  name: 'Goods',
  components: { goodsInfo, goodsDetails },
  data() {
    return {
      loading: false,
      activeName: 'list',
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
    var _this = this
    _this.productlist()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    productlist() {
      const _this = this
      const userInfo = _this.$store.getters.userInfo
      productlist({
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
            title: '操作失败',
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
      let setTips = '', state = 0
      if (row.Is_use) {
        setTips = '禁用'
        state = 0
      } else {
        setTips = '启用'
        state = 1
      }
      _this.$confirm('确定' + setTips + '该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true
        deleteoruse({
          id: row.Product_id,
          isuse: state,
          idtype: 0 // 0 管理员 1 用户编辑  2 商品  3 商品参数 4 地址 5 商品详情
        }).then(res => {
          _this.loading = false
          const data = res.data
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
            message: data.reason,
            type: 'success'
          })
          _this.productlist()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {

      })
    },
    setGoodsInfo(row) {
      const _this = this
      const userInfo = _this.$store.getters.userInfo
      if (row) {
        _this.dialogTitle = '商品编辑'
        _this.dialogId = row.Product_id
      } else {
        _this.dialogId = userInfo.adminid
        _this.dialogTitle = '添加商品'
      }
      _this.currentRole = 'goodsInfo'
      _this.dialogVisible = true
    },
    seeDetails(row) {
      const _this = this
      _this.dialogTitle = '商品详情'
      _this.dialogId = row.Product_id
      _this.currentRole = 'goodsDetails'
      _this.dialogVisible = true
    },
    seeParams(row) {
      const _this = this
      _this.dialogTitle = '商品参数'
      _this.dialogId = row.Product_id
      _this.currentRole = 'goodsDetails'
      _this.dialogVisible = true
    },
    deleteList(row) {

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
      this.productlist()
    },
    handleCurrentChange() {
      this.productlist()
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
      this.productlist()
    },
    handleUpdate(index, row) {
      this.AdInfo(row)
    }
  }
}
</script>

<style lang="scss">
.goods-container{
  padding: 0 10px;
  .el-tabs__header{
    margin-bottom: 0;
  }
}
</style>


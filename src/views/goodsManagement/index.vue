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
            :data="goodsList"
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
                  @click="setUseStatus(scope.row, 2)">{{ scope.row.Is_use ? '禁用' : '启用' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="goodsOption.pageNum"
            :page-size="goodsOption.pageSize"
            :total="goodsOption.total"
            layout="prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="activeGoodsText" name="details" :disabled="activeGoodsText === '商品详情(未选中)'">
        <el-row style="padding: 15px 0;">
          <el-button type="primary" size="mini" @click="setGoodsDetailsInfo()">新建</el-button>
          <!-- <el-button type="primary" size="mini" @click="deleteList()">删除</el-button> -->
        </el-row>
        <el-table
          ref="multipleTable"
          :data="goodsDetailsList"
          align="center"
          tooltip-effect="dark"
          height="calc(100vh - 230px)"
          style="width: 100%">
          <!-- @selection-change="handleSelectionChange" -->
          <!--           <el-table-column
            type="selection"
            width="55"/> -->
          <el-table-column
            :index="xq_indexMethod"
            type="index"
            label="编号"/>
          <el-table-column
            prop="Content"
            label="内容"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="setGoodsDetailsInfo(scope.row)">{{ scope.row.Content }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="Color"
            label="颜色值"
            show-overflow-tooltip/>
          <el-table-column
            prop="Contenttype"
            label="类型">
            <template slot-scope="scope">
              {{scope.row.Contenttype == 0 ? '标题' :
                scope.row.Contenttype == 1 ? '内容' :
                scope.row.Contenttype == 2 ? '图片' :
                scope.row.Contenttype == 3 ? '视频' :
                scope.row.Contenttype == 4 ? '轮播图图片' :
                scope.row.Contenttype == 5 ? '轮播中视频' : ''
               }}
            </template>
          </el-table-column>
          <el-table-column
            prop="Create_date"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="Update_date"
            label="更新时间">
          </el-table-column>
          <el-table-column
            prop="Showsorttype"
            label="优先级">
          </el-table-column>
          <el-table-column
            prop="set"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="setUseStatus(scope.row, 5)">{{ scope.row.Is_use ? '禁用' : '启用' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page.sync="goodsDetailsOption.pageNum"
          :page-size="goodsDetailsOption.pageSize"
          :total="goodsDetailsOption.total"
          layout="prev, pager, next, jumper"
          @size-change="xq_handleSizeChange"
          @current-change="xq_handleCurrentChange"/>
      </el-tab-pane>
      <el-tab-pane :label="activeGoodsParamsText" name="params" :disabled="activeGoodsParamsText === '商品参数(未选中)'">
        <el-row style="padding: 15px 0;">
          <el-button type="primary" size="mini" @click="setGoodsParamsInfo()">新建</el-button>
          <!-- <el-button type="primary" size="mini" @click="deleteList()">删除</el-button> -->
        </el-row>
          <el-table
            ref="multipleTable"
            :data="goodsParamsList"
            tooltip-effect="dark"
            height="calc(100vh - 230px)"
            style="width: 100%"
            @selection-change="pm_handleSelectionChange">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              :index="pm_indexMethod"
              type="index"
              label="编号"/>
            <el-table-column
              prop="Id"
              label="id"
              show-overflow-tooltip/>
            <el-table-column
              prop="Name"
              label="参数名称"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="setGoodsParamsInfo(scope.row)">{{ scope.row.Name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="Pname"
              label="父参数名称"
              show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column
              prop="Image"
              label="图片"
              show-overflow-tooltip/> -->
            <el-table-column
              prop="Old_price"
              label="原价"
              show-overflow-tooltip/>
            <el-table-column
              prop="Real_price"
              label="当前价格"
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
              prop="Show_sort_type"
              label="排序"
              show-overflow-tooltip/>
            <el-table-column
              prop="set"
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="setUseStatus(scope.row, 3)">{{ scope.row.Is_use ? '禁用' : '启用' }}</el-button>
                <el-button
                  type="text"
                  @click="seeAgent(scope.row, 3)">查看代理价格</el-button>
                <el-button
                  type="text"
                  @click="setAgentInfo(scope.row, 3)">新增代理价格</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="goodsParamsOption.pageNum"
            :page-size="goodsParamsOption.pageSize"
            :total="goodsParamsOption.total"
            layout="prev, pager, next, jumper"
            @size-change="pm_handleSizeChange"
            @current-change="pm_handleCurrentChange"/>
      </el-tab-pane>
    </el-tabs>
    <component
      :is="currentRole"
      :paramid="paramid"
      :dialog-id="dialogId"
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"/>
  </div>
</template>

<script>
import { productlist, productdetaillist, productparamlist, deleteoruse } from '@/api/index'
import goodsInfo from '@/views/goodsManagement/goodsInfo'
import goodsDetailsInfo from '@/views/goodsManagement/goodsDetailsInfo'
import goodsParamsInfo from '@/views/goodsManagement/goodsParamsInfo'
import agentInfo from '@/views/goodsManagement/agentInfo'
import agentList from '@/views/goodsManagement/agentList'

export default {
  name: 'Goods',
  components: { goodsInfo, goodsDetailsInfo, goodsParamsInfo, agentInfo, agentList },
  data() {
    return {
      loading: false,
      activeName: 'list',
      activeGoodsText: '商品详情(未选中)',
      activeGoodsParamsText: '商品参数(未选中)',
      activeGoodsId_xq: 0,
      activeGoodsId_pm: 0,
      selectRecIds: [],
      xq_selectRecIds: [],
      pm_selectRecIds: [],
      goodsOption: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        startTime: '',
        endTime: '',
        isuse: ''
      },
      goodsDetailsOption: {
        pageNum:1,
        pageSize:10,
        total:0,
        startTime: '',
        endTime: '',
        isuse: '',
        contenttype: ''
      },
      goodsParamsOption: {
        pageNum:1,
        pageSize:10,
        total:0,
        startTime: '',
        endTime: '',
        isuse: '',
        pid: ''
      },
      currentRole: '',
      paramid: 0,
      dialogId: 0,
      dialogTitle: '',
      dialogVisible: false,
      // oldFrequency: '',
      goodsList: [],
      goodsDetailsList: [],
      goodsParamsList: []
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
        pagesize: _this.goodsOption.pageSize,
        pagenum: _this.goodsOption.pageNum - 1,
        starttime: _this.goodsOption.startTime,
        endtime: _this.goodsOption.endTime,
        isuse: _this.goodsOption.isuse
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
        _this.goodsList = result.list
      }).catch(error => {
        console.log(error)
      })
    },
    productdetaillist(productid) {
      const _this = this
      productdetaillist({
        productid: _this.activeGoodsId_xq,
        pagesize: _this.goodsDetailsOption.pageSize,
        pagenum: _this.goodsDetailsOption.pageNum - 1,
        starttime: _this.goodsDetailsOption.startTime,
        endtime: _this.goodsDetailsOption.endTime,
        isuse: _this.goodsDetailsOption.isuse,
        contenttype: _this.goodsDetailsOption.contenttype
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
        _this.goodsDetailsOption.total = result.allcount
        _this.goodsDetailsList = result.list
      }).catch(error => {
        console.log(error)
      })
    },
    productparamlist(productid) {
      const _this = this
      productparamlist({
        productid: _this.activeGoodsId_pm,
        pagesize: _this.goodsParamsOption.pageSize,
        pagenum: _this.goodsParamsOption.pageNum - 1,
        starttime: _this.goodsParamsOption.startTime,
        endtime: _this.goodsParamsOption.endTime,
        isuse: _this.goodsParamsOption.isuse,
        pid: _this.goodsParamsOption.pid
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
        _this.goodsParamsOption.total = result.allcount
        _this.goodsParamsList = result.list
      }).catch(error => {
        console.log(error)
      })
    },
    setUseStatus(row, idtype) {
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
          id: idtype == 2 ? row.Product_id : idtype == 5 ? row.Id : 0,
          isuse: state,
          idtype: idtype // 0 管理员 1 用户编辑  2 商品  3 商品参数 4 地址 5 商品详情
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
    setGoodsDetailsInfo(row){
      const _this = this
      if (row) {
        _this.dialogTitle = '商品详情编辑'
        _this.dialogId = row.Id
      } else {
        _this.dialogId = _this.activeGoodsId_xq
        _this.dialogTitle = '添加商品详情'
      }
      _this.currentRole = 'goodsDetailsInfo'
      _this.dialogVisible = true
    },
    setGoodsParamsInfo(row){
      const _this = this
      if (row) {
        _this.dialogTitle = '商品参数编辑'
        _this.dialogId = _this.activeGoodsId_pm
        _this.paramid = row.Id
      } else {
        _this.dialogId = _this.activeGoodsId_pm
        _this.dialogTitle = '添加商品参数'
      }
      _this.currentRole = 'goodsParamsInfo'
      _this.dialogVisible = true
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
    setAgentInfo(row){
      const _this = this
      _this.paramid = row.Id
      _this.dialogTitle = '添加代理价格'
      _this.currentRole = 'agentInfo'
      _this.dialogVisible = true
    },
    seeAgent(row){
      const _this = this
      _this.dialogTitle = '商品代理价格'
      _this.paramid = row.Id
      _this.currentRole = 'agentList'
      _this.dialogVisible = true
    },
    seeDetails(row) {
      const _this = this
      _this.activeName = 'details'
      _this.activeGoodsText = '商品详情(' + row.Product_name + ')'
      _this.activeGoodsId_xq = row.Product_id
      _this.productdetaillist()
    },
    seeParams(row) {
      const _this = this
      _this.activeName = 'params'
      _this.activeGoodsParamsText = '商品参数(' + row.Product_name + ')'
      _this.activeGoodsId_pm = row.Product_id
      _this.productparamlist()
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
    xq_handleSelectionChange(data) {
      const _this = this
      const arr = []
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].recId)
      }
      _this.xq_selectRecIds = arr.join(',')
    },
    pm_handleSelectionChange(data) {
      const _this = this
      const arr = []
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].recId)
      }
      _this.pm_selectRecIds = arr.join(',')
    },
    handleSizeChange() {
      this.productlist()
    },
    handleCurrentChange() {
      this.productlist()
    },
    xq_handleSizeChange(){
      this.productdetaillist()
    },
    xq_handleCurrentChange() {
      this.productdetaillist()
    },
    pm_handleSizeChange(){
      this.productparamlist()
    },
    pm_handleCurrentChange() {
      this.productparamlist()
    },
    handlePictureCardPreview(img) {
      this.dialogImageUrl = img
      this.dialogImageVisible = true
    },
    indexMethod(index) {
      return this.goodsOption.pageSize * (this.goodsOption.pageNum - 1) + index + 1
    },
    xq_indexMethod(index) {
      return this.goodsDetailsOption.pageSize * (this.goodsDetailsOption.pageNum - 1) + index + 1
    },
    pm_indexMethod(index) {
      return this.goodsParamsOption.pageSize * (this.goodsParamsOption.pageNum - 1) + index + 1
    },
    handleClose() {
      this.dialogVisible = false
      this.currentRole = ''
      if(this.activeName === 'list'){
        this.productlist()
      }else if(this.activeName === 'params'){
        this.productparamlist()
      }else{
        this.productdetaillist()
      }
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


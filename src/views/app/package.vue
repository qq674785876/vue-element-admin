<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="packageDialog"
      width="40%">
      <div v-if="!isGet" class="packageList">
        <el-row style="font-size:  16px;color: #409EFF;padding: 10px 0;">
          <el-col v-if="packageName" :span="12">
            当前套餐：{{ packageName }}
          </el-col>
          <el-col v-if="expireTime" :span="12">
            到期时间：{{ expireTime }}
          </el-col>
        </el-row>
        <el-table
          v-loading="loading"
          :data="packageList"
          stripe
          height="300"
          style="width: 100%"
          @row-click="selectRow">
          <el-table-column
            label=""
            width="55">
            <template scope="scope">
              <el-radio :label="scope.row.packageId" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="packageName"
            label="套餐名称"
            width="140"/>
          <el-table-column
            prop="package"
            label="套餐内容"
            width="auto"/>
          <el-table-column
            prop="price"
            label="套餐价格"
            width="120">
            <template slot-scope="scope">
              {{ scope.row.price }}/月
            </template>
          </el-table-column>
        </el-table>
        <div align="right">
          购买数量：<el-input-number :precision="0" v-model="packageNum" :min="min" controls-position="right" style="width: 160px;margin-top: 15px;"/>
        </div>
      </div>
      <div v-if="isGet && !isPuySuccess" align="center">
        <div>请用<span style="color: blue;font-size: 16px;">微信扫码</span>支付￥{{ buyPrice }}</div>
        <div class="QRCode_box" style="width: 200px;height: 200px;margin: 20px auto;">
          <img :src="qrCode" style="width: 100%;">
        </div>
        温馨提示：<p class="tips" style="color: red;">支付成功后自动刷新</p>
      </div>
      <div v-if="isPuySuccess" align="center"><i class="el-icon-success" style="font-size: 50px;color: green;"/><p>套餐购买成功</p></div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!isGet" @click="handleClose">取 消</el-button>
        <el-button v-if="!isGet" type="primary" @click="getPackage">确 定</el-button>
        <el-button v-if="isGet" @click="prev">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { packages, buyPackage, checkOrderState } from '@/api/index'

export default {
  name: 'Upload',
  components: {},
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isGet: false,
      timer: null,
      loading: false,
      templateRadio: '',
      payType: 1,
      packageNum: 0,
      price: 0,
      deduction: 0,
      buyPrice: 0,
      isPuySuccess: false,
      orderNum: '',
      min: 1,
      expireTime: '',
      packageName: '',
      qrCode: '',
      packageList: []
    }
  },
  mounted() {
    this.packages()
  },
  methods: {
    prev() {
      const _this = this
      clearInterval(_this.timer)
      _this.isGet = false
      _this.isPuySuccess = false
      _this.packages()
    },
    checkOrderState() {
      const _this = this
      checkOrderState({
        orderNum: _this.orderNum
      }).then(res => {
        _this.loading = false
        const data = res.data
        // const result = data.result
        if (data.error !== 0) {
          return
        }
        _this.$notify({
          title: '支付成功！',
          message: '已经购买成功！',
          type: 'success'
        })
        _this.isPuySuccess = true
        clearInterval(_this.timer)
      }).catch(error => {
        console.log(error)
      })
    },
    packages() {
      const _this = this
      _this.isGet = false
      _this.loading = true
      packages().then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '获取失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.packageList = result.packages
        _this.expireTime = result.expireTime
        _this.packageName = result.packageName
      }).catch(error => {
        console.log(error)
      })
    },
    buyPackage() {
      const _this = this
      _this.loading = true
      buyPackage({
        packageId: _this.templateRadio,
        payType: _this.payType,
        num: _this.packageNum
      }).then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '获取失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.qrCode = result.qrCode
        _this.orderNum = result.orderNum
        _this.timer = setInterval(function() {
          _this.checkOrderState()
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    },
    selectRow(row, b, c) {
      this.templateRadio = row.packageId
      this.min = row.num
      this.packageNum = row.num
      this.price = row.price
      this.deduction = row.deduction
    },
    getTemplateRow() {

    },
    handleClose() {
      const _this = this
      clearInterval(_this.timer)
      _this.$emit('handleClose')
    },
    getPackage() {
      const _this = this
      if (_this.templateRadio) {
        if (_this.packageNum < 1) {
          this.$message('购买数量需大于0')
        } else {
          _this.isGet = true
          _this.buyPackage()
          _this.buyPrice = this.price * this.packageNum - this.deduction
          _this.buyPrice = _this.buyPrice.toFixed(2) < 0.01 ? 0.01 : _this.buyPrice.toFixed(2)
        }
      } else {
        this.$message('请选择购买套餐')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.packageDialog{
  .el-dialog__body{
    padding-top: 0 !important;
  }
}
.el-table__row{
  cursor: pointer;
}
.el-radio__label{
  display: none;
}
.mobile{
  .el-dialog{
    width: 100% !important;
  }
}
</style>


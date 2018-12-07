<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%">
      <div v-if="!isGet" class="packageList">
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
            prop="packageCont"
            label="套餐内容"
            width="auto"/>
          <el-table-column
            prop="packagePrice"
            label="套餐价格"
            width="120"/>
        </el-table>
        <div align="right">
          购买数量：<el-input-number :precision="0" v-model="packageNum" :min="1" controls-position="right" style="width: 160px;margin-top: 15px;"/>
        </div>
      </div>
      <div v-else class="QRCode_box" style="height: 200px;"/>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!isGet" @click="handleClose">取 消</el-button>
        <el-button v-if="!isGet" type="primary" @click="getPackage">确 定</el-button>
        <el-button v-if="isGet" @click="isGet = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

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
      isGet: true,
      loading: false,
      templateRadio: 12,
      packageNum: 0,
      packageList: [{
        packageName: '一号套餐',
        packageCont: '最大可上传500个应用，每天可下载500次',
        packagePrice: 1000,
        packageId: 12
      }, {
        packageName: '一号套餐',
        packageCont: '最大可上传500个应用，每天可下载500次',
        packagePrice: 1000,
        packageId: 11
      }]
    }
  },
  mounted() {
  },
  methods: {
    selectRow(row, b, c) {
      this.templateRadio = row.packageId
    },
    getTemplateRow() {

    },
    handleClose() {
      this.$emit('handleClose')
    },
    getPackage() {
      console.log('购买套餐！')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
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


<template>
  <div>
    <el-dialog
      :id="dialogId"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      append-to-body
      width="30%">
      <el-row>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
          <el-form-item prop="" label="商品名称:">
            <el-input
              v-model="formData.productName"
              placeholder="请输入商品名称"
              name="oldpassword"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="销量:">
            <el-input
              v-model="formData.salecount"
              placeholder="请输入销量"
              name="newpassword"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateproduct, addproduct } from '@/api/index'

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
      formData: {
        productName: '',
        salecount: ''
      },
      rules: {}
    }
  },
  mounted() {
    console.log()
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {
      const _this = this
      if (_this.dialogTitle === '商品编辑') {
        _this.updateproduct()
      } else {
        _this.addproduct()
      }
    },
    addproduct() {
      const _this = this
      addproduct({
        adminid: _this.dialogId,
        productName: _this.formData.productName,
        salecount: _this.formData.salecount
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
        _this.$emit('handleClose')
      }).catch(error => {
        console.log(error)
      })
    },
    updateproduct() {
      const _this = this
      updateproduct({
        productid: _this.dialogId,
        productName: _this.formData.productName,
        salecount: _this.formData.salecount
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
        _this.$emit('handleClose')
      }).catch(error => {
        console.log(error)
      })
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


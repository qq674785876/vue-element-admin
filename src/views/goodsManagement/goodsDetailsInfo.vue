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
          <el-form-item prop="" label="详情类型:">
            <el-select v-model="formData.contenttype" placeholder="请选择商品详情类型">
              <el-option label="标题" value="0"></el-option>
              <el-option label="内容" value="1"></el-option>
              <el-option label="图片" value="2"></el-option>
              <el-option label="视频" value="3"></el-option>
              <el-option label="轮播图图片" value="4"></el-option>
              <el-option label="轮播中视频" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="" label="颜色:" v-if="formData.contenttype < 2">
            <el-color-picker v-model="formData.color"></el-color-picker>
          </el-form-item>
          <el-form-item prop="" label="内容:" v-if="formData.contenttype < 2">
            <el-input
              v-model="formData.content"
              placeholder="请输入内容"
              name="oldpassword"
              type="textarea"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item v-else>
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              list-type="picture"
              :data="formData"
              :auto-upload="false">
              <el-button size="small" type="primary" v-if="!formData.content">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item prop="" label="排序:">
            <el-input
              v-model="formData.showsorttype"
              placeholder="排序(数字越小排序越前)"
              name="role"
              type="number"
              min="0"
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
import { updateproductinfo, addproductinfo } from '@/api/index'

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
      fileList: [],
      action: '',
      formData: {
        productid: '',
        content: '',
        color: '',
        contenttype: '0',
        showsorttype: 0
      },
      rules: {}
    }
  },
  mounted() {
    const _this = this
    if(_this.dialogTitle === '商品详情编辑'){
      _this.action = 'http://106.13.66.152:8686/updateproductinfo'
    }else{
      _this.action = 'http://106.13.66.152:8686/addproductinfo'
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {
      const _this = this
      if(_this.dialogTitle === '商品详情编辑'){
        _this.formData.produtdetailid = _this.dialogId
      }else{
        _this.formData.productid = _this.dialogId
      }
      if(_this.formData.contenttype > 1){
        _this.$refs.upload.submit()
        return
      }
      if (_this.dialogTitle === '商品详情编辑') {
        _this.updateproduct()
      } else {
        _this.addproduct()
      }
    },
    addproduct() {
      const _this = this
      this.formData.productid = this.dialogId
      addproductinfo(_this.formData).then(res => {
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
      _this.formData.produtdetailid = _this.dialogId
      updateproductinfo(_this.formData).then(res => {
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess(response, file, fileList){
      const _this = this
      const data = response
      _this.loading = false
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
    },
    handleChange(file) {
      const _this = this
      _this.formData.content = file.raw
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


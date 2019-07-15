<template>
  <div>
    <el-dialog
      :id="dialogId"
      :paramid="paramid"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      append-to-body
      width="30%">
      <el-row>
        <el-form ref="formData" :model="formData" :rules="rules" label-width="80px">
          <el-form-item prop="" label="名称:">
            <el-input
              v-model="formData.name"
              placeholder="请输入名称"
              name="showsorttype"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="父参数ID:">
            <el-input
              v-model="formData.pid"
              placeholder="请输入父参数ID"
              name="pid"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <!-- <el-form-item label="商品图:">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action="action"
              :show-file-list="false"
              :on-change="handleChange"
              :on-success="handleSuccess"
              :data="formData"
              :auto-upload="false">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
            </el-upload>
          </el-form-item> -->
          <el-form-item prop="" label="折前价:">
            <el-input
              v-model="formData.old_price"
              placeholder="请输入折前价"
              name="old_price"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="现价:">
            <el-input
              v-model="formData.real_price"
              placeholder="请输入现价"
              name="real_price"
              type="text"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="" label="是否默认:">
            <el-select v-model="formData.is_default">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="" label="排序:">
            <el-input
              v-model="formData.show_sort_type"
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
import { updateproductparam, addproductparam } from '@/api/index'

export default {
  name: 'UserInfo',
  components: {},
  props: {
    paramid: {
      type: Number,
      default: 0
    },
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
      imageUrl: '',
      formData: {
        productid: '',
        name: '',
        pid: 0,
        image: '',
        old_price: 0,
        real_price: 0,
        show_sort_type: 0,
        is_default: '0'  // 0 非默认 1 默认
      },
      rules: {}
    }
  },
  mounted() {
    const _this = this
    // if(_this.dialogTitle === '商品参数编辑'){
    //   _this.action = 'http://106.13.66.152:8686/updateproductparam'
    // }else{
    //   _this.action = 'http://106.13.66.152:8686/addproductparam'
    // }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    submit() {
      const _this = this
      if(_this.dialogTitle === '商品参数编辑'){
        _this.formData.productid = _this.dialogId
        _this.formData.paramid = _this.paramid
      }else{
        _this.formData.productid = _this.dialogId
      }
      if(_this.formData.image){
        _this.$refs.upload.submit()
      }else{
        if(_this.dialogTitle === '商品参数编辑'){
          _this.updateproductparam()
        }else{
          _this.addproductparam()
        }
      }
    },
    addproductparam(){
      const _this = this
      addproductparam(_this.formData).then(response => {
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
    updateproductparam(){
      const _this = this
      updateproductparam(_this.formData).then(response => {
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
      _this.formData.image = file.raw
      _this.imageUrl = file.url
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
.avatar-uploader-icon, img.avatar{
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>


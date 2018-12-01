<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%">
      <div v-if="!isAgreement" class="file-cont">
        <el-input v-model="fileName" placeholder="请选择文件">
          <template slot="prepend">应用文件：</template>
          <el-upload
            slot="append"
            :show-file-list="false"
            :before-upload="handleChange"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="small" type="primary">
              <span class="svg-container">
                <svg-icon icon-class="folder" />
              </span>
            </el-button>
          </el-upload>
        </el-input>
        <el-checkbox v-model="checked">已阅读</el-checkbox><span style="color: blue;cursor: pointer;" @click="isAgreement = true">《应用上传协议》</span>
      </div>
      <div v-if="isAgreement" class="app-agreement">
        <div class="agreement-text">
          dasasa sas asas asas asasa sasas asas asasas asas asas asasa sasa sasa sasd asda sdasd
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!isAgreement" @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!isAgreement" type="primary" @click="submitUpload">确 定</el-button>
        <el-button v-if="isAgreement" type="primary" @click="isAgreement = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Chart',
  components: {},
  props: {
    dialogTitle: {
      type: String,
      default: '上传应用'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileName: '',
      isAgreement: false,
      checked: false
    }
  },
  mounted() {
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    submitUpload() {

    },
    handleChange(file) {
      this.fileName = file.name
      console.log(file)
      return false
    }
  }
}
</script>

<style scoped>
</style>


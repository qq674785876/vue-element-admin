<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%">
      <div class="file-cont"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Upload',
  components: {},
  props: {
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
    }
  },
  mounted() {
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    submitUpload() {
      this.$emit('submitUpload')
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


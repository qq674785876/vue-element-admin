<template>
  <div class="advertisement-container">
    <el-row style="padding: 15px;">
      <el-button type="primary" size="mini" @click="addAd()">新建</el-button>
    </el-row>
    <el-row>
      <el-table
        ref="multipleTable"
        :data="noticeList"
        tooltip-effect="dark"
        height="calc(100vh - 180px)"
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
          prop="createTime"
          label="发送时间"
          width="220"/>
        <el-table-column
          prop="message"
          label="通知内容"
          show-overflow-tooltip/>
        <el-table-column
          prop="state"
          label="状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state === '未读'"
              type="warning"
              size="mini"
              @click="handleRead(scope.$index, scope.row)">未读</el-button>
            <span v-else>{{ scope.row.state }}</span>
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
  </div>
</template>

<script>

export default {
  name: 'Advertisement',
  components: {},
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 9,
      noticeList: []
    }
  },
  mounted() {
  },
  methods: {
    addAd() {

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
      this.messageList()
    },
    handleCurrentChange() {
      this.messageList()
    },
    indexMethod(index) {
      return this.pageSize * (this.pageNum - 1) + index + 1
    }
  }
}
</script>

<style scoped>
.advertisement-container{

}
</style>


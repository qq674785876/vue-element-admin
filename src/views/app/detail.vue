<template>
  <div v-loading="loading" class="app-detail-container" element-loading-text="拼命加载中">
    <div class="top-app-info">
      <div :style="{ 'background-image': 'url(' + basicInfo.appIcon + ')' }" class="app-img"/>
      <div class="app-info">
        <p class="app-title">{{ basicInfo.appName }}</p>
        <p class="app-info-cont">应用大小：<span class="app-text">{{ basicInfo.size }}</span></p>
        <p class="app-info-cont">应用标识：<span class="app-text">{{ basicInfo.package }}</span></p>
        <p class="app-info-cont">最新版本：<span class="app-text">{{ basicInfo.version }}</span></p>
      </div>
      <div class="app-btn-box">
        <el-upload
          :headers="headers"
          :action="uploadApi"
          :show-file-list="false"
          :on-progress="uploadProgress"
          :on-success="uploadSuccess"
          :before-upload="uploadApp">
          <el-button size="mini" icon="el-icon-upload" round style="margin-right: 10px;">上传新版本</el-button>
        </el-upload>
        <el-button type="primary" size="mini" icon="el-icon-view" round @click="getPreview">预览</el-button>
      </div>
    </div>
    <div class="app-detail-box">
      <el-tabs :value="activeName" type="border-card" @tab-click="switchTaps">
        <el-tab-pane name="tap1" label="版本记录">
          <div class="app-version-list">
            <div class="list-cont">
              <p class="title">版本更新</p>
              <el-input v-model="basicInfo.appUrl" placeholder="请输入内容" @keyup.enter.native="appUrlUpdate">
                <template slot="prepend">商店地址</template>
              </el-input>
              <el-button type="primary" @click="appUrlUpdate">
                <i class="el-icon-edit-outline"/>保存
              </el-button>
            </div>
          </div>
          <div v-for="(list , index) in basicInfo.versionList" :key="index" class="app-version-list">
            <div class="list-cont">
              <p class="title">{{ list.version }}</p>
              <p class="date">{{ list.createTime }}</p>
              <p v-if="!list.isEdit" class="tips">{{ list.remark }}</p>
              <el-row v-else class="edit-box">
                <el-input v-model="list.remark" type="textarea" placeholder="请输入更新日志"/>
                <el-row style="padding-top: 5px">
                  <el-button size="mini" @click="list.isEdit = false">取消</el-button>
                  <el-button :loading="saveLoading" type="primary" size="mini" @click="saveEait(list.apkId, list.remark, index)">保存</el-button>
                </el-row>
              </el-row>
              <div class="btn-box">
                <el-tooltip content="编辑更新日志" placement="top-start">
                  <el-button size="mini" round @click="list.isEdit = true"><i class="el-icon-edit"/></el-button>
                </el-tooltip>
                <el-tooltip content="预览" placement="top-start">
                  <el-button size="mini" round @click="getPreview"><i class="el-icon-view"/></el-button>
                </el-tooltip>
                <el-tooltip v-if="list.state === 1" content="下线" placement="top-start">
                  <el-button size="mini" round><i class="el-icon-download" @click="appStateUpdate(list.apkId, 0, '下线')"/></el-button>
                </el-tooltip>
                <el-tooltip v-else content="上线" placement="top-start">
                  <el-button size="mini" round><i class="el-icon-upload2" @click="appStateUpdate(list.apkId, 1, '上线')"/></el-button>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="tap2" label="基本信息">
          <div class="basic-info">
            <el-button class="updateApp" type="primary" size="mini" @click="appUpdate">更新应用信息</el-button>
            <div>
              <span class="title">应用ID</span>
              {{ basicInfo.appkey }}
            </div>
            <div>
              <span class="title">应用名称</span>
              <el-input
                v-model="basicInfo.appName"
                placeholder="请输入应用名称"/>
            </div>
            <div class="url">
              <span class="title">短链接</span>
              <el-input v-model="basicInfo.sortUrl" placeholder="请输入短链接">
                <template slot="prepend">{{ basicInfo.baseUrl }}</template>
              </el-input>
            </div>
            <div>
              <span class="title">应用图标</span>
              <el-upload
                :show-file-list="false"
                :before-upload="contraryUpload"
                action="http://test.com/"
                class="avatar-uploader">
                <img v-if="basicInfo.editAppIcon" :src="basicInfo.editAppIcon" class="app-img">
                <span class="svg-container">
                  <svg-icon icon-class="add" />
                </span>
              </el-upload>
            </div>
            <div class="tips">
              <span class="title">应用描述</span>
              <el-input
                v-model="basicInfo.describe"
                placeholder="请输入应用描述"/>
            </div>
            <div>
              <span class="title">应用截图</span>
              <div class="appScreenshot">
                <el-card v-for="(img, index) in basicInfo.appImage" :key="index" shadow="hover">
                  <img :src="img">
                  <div class="img-set-box">
                    <i class="el-icon-zoom-in" @click="handlePictureCardPreview(img)"/>
                    <i class="el-icon-close" @click="handleRemove(index)"/>
                  </div>
                </el-card>
                <el-upload
                  :before-upload="appImageUpload"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture">
                  <i class="el-icon-plus"/>
                </el-upload>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="tap3" label="应用合并">
          <el-row class="app-merge">
            <el-col :span="6" :xs="24" class="left">
              <p class="left-title">选择已有的应用进行合并</p>
              <div class="app-mini-box">
                <img v-for="(appList, index) in appMini" :src="appList.appIcon" :key="index" :class="{active: selectAppIndex === index}" @click="selectApp(index)">
              </div>
            </el-col>
            <el-col :span="12" :xs="24" :offset="2" class="right">
              <el-input
                v-model="mergeSortUrl"
                placeholder="输入需要合并的应用短链接">
                <template slot="prepend">应用短链接</template>
              </el-input>
              <el-button type="primary" @click="appMerge">
                <span class="svg-container">
                  <svg-icon icon-class="merge" />
                </span>
                应用合并
              </el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="tap4" label="数据分析">
          <div class="down-trend chart-box">
            <p class="top">
              下载趋势图
              <el-button-group>
                <el-button size="mini">近14天</el-button>
                <el-button size="mini">近7天</el-button>
                <el-button size="mini">24小时</el-button>
              </el-button-group>
            </p>
            <Chart ref="chart" :line-chart-data="lineChartData" height="300" width="100%"/>
          </div>
          <div class="position-distribution chart-box">
            <MapChart ref="mapChart" :line-chart-data="mapChartData" height="600" width="100%"/>
            <el-table
              :data="downTableData"
              highlight-current-row
              border
              style="width: 100%">
              <el-table-column
                property="city"
                label="城市"
                width="120"/>
              <el-table-column
                property="downNum"
                label="下载数量"/>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <component :is="currentRole" :dialog-visible="dialogVisible" :app-id="appId" @handleClose="handleClose"/>
    <iframe-loading v-show="isLoading" :loading-src="loadingSrc" :progress-bar="uploadPercent"/>
    <el-dialog :visible.sync="dialogImageVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getAppInfo, appVersionRemark, appStateUpdate, appUrlUpdate, appUpdate, imageUpload, userApp } from '@/api/index'
import IframeLoading from '@/components/Loading/index'
import { mapGetters } from 'vuex'
import Chart from './chart'
import MapChart from './mapChart'
import Preview from './preview'
import Upload from './upload'

export default {
  name: 'Detail',
  components: { Chart, MapChart, Preview, Upload, IframeLoading },
  data() {
    return {
      headers: {
        'token': ''
      },
      selectAppIndex: null,
      dialogImageVisible: false,
      dialogImageUrl: '',
      uploadApi: process.env.BASE_API + '/v1/appUpload',
      isLoading: false,
      uploadPercent: 0,
      loadingSrc: '/static/SvgLoading/index.html',
      loading: false,
      saveLoading: false,
      currentRole: 'preview',
      dialogVisible: false,
      file: '',
      checked: false,
      mergeSortUrl: '',
      activeName: 'tap1',
      appId: this.$route.params.id,
      basicInfo: {
        // appIcon: "http://api.ublog.top/uploads/tmp/d4c7b67c1c7c259c538be2d8704e3e46/res/mipmap-hdpi-v4/ic_launcher.png",
        // appId: "ZWE4OC8ySmJ3NWNkZHBPK0MyTk51Y0RhNE9La2VhYjNqQUYyTVl6Zg==",
        // appImage: [],
        // appName: "任车行",
        // appUrl: "http://api.ublog.top/g/38670862be59a2ead55124c5d14e8530",
        // appkey: "38670862be59a2ead55124c5d14e8530",
        // baseUrl: "http://api.ublog.top/g/",
        // describe: "",
        // package: "com.mapgoo.diruite",
        // size: "10.02MB",
        // sortUrl: "Kam5428",
        // state: 0,
        // version: "4.2.1.44.1128"
      },
      appMini: ['', '', '', '', '', '', '', '', '', '', ''],
      lineChartData: {
        legend: ['应用下载'],
        xAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        series: [{
          name: '下载量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
        }]
      },
      mapChartData: {

      },
      downTableData: [{
        city: '上海',
        downNum: 32
      }, {
        city: '北京',
        downNum: 32
      }, {
        city: '深圳',
        downNum: 32
      }]
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted() {
    this.headers.token = this.token
    this.getAppInfo()
  },
  methods: {
    appMerge() {

    },
    selectApp(index) {
      const _this = this
      _this.selectAppIndex = index
      _this.mergeSortUrl = _this.appMini[index].sortUrl
    },
    userApp() {
      const _this = this
      userApp({
        appId: _this.basicInfo.appId
      }).then(res => {
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          return
        }
        _this.appMini = result
      }).catch(error => {
        console.log(error)
      })
    },
    appUpdate() {
      const _this = this
      _this.loading = true
      appUpdate({
        appId: _this.basicInfo.appId,
        appName: _this.basicInfo.appName,
        sortUrl: _this.basicInfo.sortUrl,
        appIcon: _this.basicInfo.editAppIcon,
        describe: _this.basicInfo.describe,
        appImage: _this.basicInfo.appImageStr
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
          message: '应用信息修改成功！',
          type: 'success'
        })
        _this.basicInfo.appIcon = _this.basicInfo.editAppIcon
      }).catch(error => {
        console.log(error)
      })
    },
    appUrlUpdate() {
      const _this = this
      _this.loading = true
      appUrlUpdate({
        appId: _this.basicInfo.appId,
        appUrl: _this.basicInfo.appUrl
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
          message: '修改商店地址成功！',
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
      })
    },
    uploadApp(file) {
      // const _this = this
      // return false
    },
    uploadSuccess() {
      const _this = this
      _this.isLoading = false
      _this.uploadPercent = 0
      _this.$notify({
        title: '上传成功',
        message: '文件上传成功',
        type: 'success'
      })
      _this.getAppInfo()
    },
    uploadProgress(event, file, fileList) {
      this.isLoading = true
      this.uploadPercent = Number(file.percentage.toFixed(0))
    },
    switchTaps(el) {
      if (el.name === 'tap4') {
        this.$refs.chart.resize()
        this.$refs.mapChart.resize()
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    saveEait(apkId, remark, index) {
      this.appVersionRemark(apkId, remark, index)
    },
    getPreview() {
      this.currentRole = 'preview'
      this.dialogVisible = true
    },
    getUpload() {
      this.currentRole = 'upload'
      this.dialogVisible = true
    },
    appStateUpdate(apkId, state, text) {
      const _this = this
      _this.$confirm('确定' + text + '该版本？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true
        appStateUpdate({
          apkId: apkId,
          state: state
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
            message: text + '成功',
            type: 'success'
          })
          _this.getAppInfo()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {

      })
    },
    getAppInfo() {
      const _this = this
      _this.loading = true
      getAppInfo({
        appId: _this.appId
      }).then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '查询失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        for (var i = 0; i < result.versionList.length; i++) {
          result.versionList[i].isEdit = false
        }
        result.editAppIcon = result.appIcon
        result.appImageStr = result.appImage.join(',')
        _this.basicInfo = result
        _this.userApp()
      }).catch(error => {
        console.log(error)
      })
    },
    appVersionRemark(apkId, remark, index) {
      const _this = this
      _this.saveLoading = true
      appVersionRemark({
        apkId: apkId,
        remark: remark
      }).then(res => {
        _this.saveLoading = false
        const data = res.data
        if (data.error !== 0) {
          _this.$notify({
            title: '查询失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.$notify({
          title: '修改成功',
          message: '修改更新日志成功',
          type: 'success'
        })
        _this.basicInfo.versionList[index].isEdit = false
      }).catch(error => {
        console.log(error)
      })
    },
    uploadImg(file, fct) {
      const _this = this

      const formData = new FormData()
      formData.append('image', file) // 传文件
      imageUpload(formData).then(response => {
        const data = response.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '上传失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        if (fct) fct(result)
      }).catch(error => {
        console.log(error)
      })
    },
    contraryUpload(file) {
      const _this = this
      // return isLt2M;
      // return isJPG && isLt2M;

      if (_this.isImgFlag(file)) {
        _this.uploadImg(file, (result) => {
          _this.basicInfo.editAppIcon = result.viewUrl
        })
      }

      return false
    },
    appImageUpload(file) {
      const _this = this
      // return isLt2M;
      // return isJPG && isLt2M;

      if (_this.isImgFlag(file)) {
        _this.uploadImg(file, (result) => {
          _this.basicInfo.appImage.push(result.viewUrl)
          _this.basicInfo.appImageStr = _this.basicInfo.appImage.join(',')
        })
      }

      return false
    },
    isImgFlag(file) {
      const _this = this
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        _this.$notify({
          title: '格式错误',
          message: '上传图片必须是JPG/GIF/PNG/BMP格式!',
          type: 'error'
        })
        return false
      }

      if (!isLt2M) {
        _this.$notify({
          title: '格式错误',
          message: '上传图片必须是JPG/GIF/PNG/BMP格式!',
          type: 'error'
        })
        return false
      }

      return true
    },
    handleRemove(delIndex) {
      var temArray = []
      for (var i = 0; i < this.basicInfo.appImage.length; i++) {
        if (i !== delIndex) {
          temArray.push(this.basicInfo.appImage[i])
        }
      }
      this.basicInfo.appImage = temArray
      this.basicInfo.appImageStr = temArray.join(',')
      console.log(temArray)
    },
    handlePictureCardPreview(img) {
      this.dialogImageUrl = img
      this.dialogImageVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-detail-container {
  padding: 20px;
  .el-checkbox{
    padding-top: 15px;
  }
  .agreement-text{
    padding: 15px;
  }
  .top-app-info{
    background-color: #fff;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 0 10px #ccc;
    div{
      float: left;
    }
    &::after{
      content: '';
      display: block;
      clear: both;
    }
    .app-img{
      height: 100px;
      width: 100px;
      background-color: blue;
      border-radius: 20px;
      background-size: cover;
    }
    .app-info{
      padding-left: 50px;
      p{
        margin: 0;
      }
      .app-title{
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .app-info-cont{
        font-size: 14px;
        color: #666;
        padding-bottom: 5px;
        span{
          padding-left: 20px;
          color: #000;
        }
      }
    }
    .app-btn-box{
      padding-top: 70px;
      float: right;
    }
  }
  .app-detail-box{
    padding-top: 30px;
    .el-tabs__content{
      height: calc(100vh - 340px);
      overflow: auto;
      padding-top: 30px;
      position: relative;
    }
    //版本信息
    .app-version-list{
      padding-left: 30px;
      padding-bottom: 30px;
      border-left: 1px dotted #ccc;
      position: relative;
      .btn-box{
        padding-top: 10px;
      }
      .el-button{
        margin-left: 0;
      }
      .list-cont{
        position: relative;
        top: -10px;
      }
      p{
        margin: 0;
        padding: 5px;
        &.title{
          font-size: 16px;
          color: #333;
        }
        &.date{
          font-size: 12px;
          color: #666;
        }
        &.tips{
          font-size: 14px;
          color: #333;
        }
      }
      &:first-child{
        .title{
          margin: 0;
          padding-bottom: 30px;
        }
      }
      &::after{
        content:'';
        height: 12px;
        width: 12px;
        border-radius: 100%;
        background-color: #666;
        position: absolute;
        left: -6px;
        top: 0;
      }
      .el-input{
        width: 600px;
      }
      .edit-box{
        width: 600px;
        text-align: right;
      }
    }
    //基本信息
    .basic-info{
      color: #333;
      > div{
        padding-left: 30px;
        margin: 30px 0;
        position: relative;
        &::after{
          content:'';
          width: 8px;
          height: 8px;
          left: 0;
          top: 6px;
          position: absolute;
          background-color: #888;
          border-radius: 100%;
        }
        .title{
          display: inline-block;
          width: 160px;
        }
        .el-input{
          width: 200px;
        }
        &.url{
          .el-input{
            width: 400px;
          }
        }
        &.tips{
          .el-input{
            width: 400px;
          }
        }
        .app-img{
          display: block;
          margin-top: 30px;
          height: 80px;
          width: 80px;
          border-radius: 10px;
          background-size: cover;
        }
        .appScreenshot{
          padding: 30px 0;
          min-height: 200px;
          .avatar-uploader{
            display: inline-block;
            position: relative;
          }
          .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
          .el-icon-plus{
            font-size: 120px;
            color: #ccc;
          }
          .el-card{
            display: inline-block;
            width: 160px;
            position: relative;
            .img-set-box{
              position: absolute;
              display: none;
              top:0;
              left: 0;
              height: 100%;
              width: 100%;
              background-color: rgba(0,0,0,.3);
              i{
                margin: 0 10px;
                font-size: 50px;
                line-height: 250px;
                color: #fff;
                cursor: pointer;
              }
            }
            &:hover{
              .img-set-box{
                display:block;
              }
            }
          }
          img{
            margin-left: 15px;
            width: 120px;
            height: 200px;
            &:first-child{
              margin-left: 0;
            }
          }
        }
      }
    }
    //应用合并
    .app-merge{
      font-size: 14px;
      .left{
        border-right: 1px solid #ccc;
        .left-title{
          text-align: center;
        }
        .app-mini-box{
          cursor: pointer;
          img{
            height: 80px;
            width: 80px;
            margin-left: 15px;
            border-radius: 10px;
            &.active{
              border: 2px solid rgb(0,0,255);
            }
          }
        }
      }
      .right{
        .el-input{
          width: 240px;
        }
      }
    }
    .chart-box{
      box-shadow: 0 0 10px #ccc;
      &.position-distribution{
        margin-top: 30px;
        position: relative;
        .el-table{
          position: absolute;
          width: 240px !important;
          right: 60px;
          top: 20%;
          border-radius: 10px;
        }
      }
      .top{
        padding-top: 15px;
        padding-left: 15px;
        .el-button-group{
          float: right;
          padding-right: 15px;
        }
      }
    }
  }
}
.mobile{
  .app-detail-box{
    .el-input{
      width: 100% !important;
    }
    .edit-box{
      width: 100% !important;
    }
    .app-version-list{
    }
    .app-merge{
      .left{
        border-right: 0;
      }
      .el-input{
        width: 80% !important;
      }
    }
  }
  .app-detail-container .app-detail-box .chart-box .top .el-button-group{
    padding-top: 15px;
  }
  .app-detail-container .app-detail-box .chart-box.position-distribution .el-table{
    display: none;
  }
  .chart-container{
    height: 300px;
  }
  .el-dialog{
    margin-top: 10vh !important;
    width: 100% !important;
  }
  .app-detail-container .preview-cont{
    width: 100% !important;
  }
  .app-detail-container .top-app-info .app-img{
    display: block;
    margin: 0 auto;
  }
  .app-detail-container .top-app-info .app-info{
    padding-top: 30px;
  }
  .app-detail-container .top-app-info  {
    .app-info-cont{
      padding-bottom: 10px;
    }
    div{
      float: none;
    }
  }
  .app-detail-container .top-app-info .app-btn-box {
    padding-top: 30px;
    text-align: right;
    div{
      display: inline-block;
    }
  }
}
</style>

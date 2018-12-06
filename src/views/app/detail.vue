<template>
  <div v-loading="loading" class="app-detail-container" element-loading-text="拼命加载中">
    <div class="top-app-info">
      <div class="app-img"/>
      <div class="app-info">
        <p class="app-title">{{ appInfo.appName }}</p>
        <p class="app-info-cont">应用大小：<span class="app-text">{{ appInfo.size }}</span></p>
        <p class="app-info-cont">应用标识：<span class="app-text">{{ appInfo.package }}</span></p>
        <p class="app-info-cont">最新版本：<span class="app-text">{{ appInfo.version }}</span></p>
      </div>
      <div class="app-btn-box">
        <el-button size="mini" icon="el-icon-upload" round>上传新版本</el-button>
        <el-button type="primary" size="mini" icon="el-icon-view" round @click="getPreview">预览</el-button>
      </div>
    </div>
    <div class="app-detail-box">
      <el-tabs :value="activeName" type="border-card" @tab-click="switchTaps">
        <el-tab-pane name="tap1" label="版本记录">
          <div class="app-version-list">
            <div class="list-cont">
              <p class="title">版本更新</p>
              <el-input v-model="basicInfo.appUrl" placeholder="请输入内容">
                <template slot="prepend">商店地址</template>
              </el-input>
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
                <el-tooltip content="下载源文件" placement="top-start">
                  <el-button size="mini" round><i class="el-icon-download"/></el-button>
                </el-tooltip>
                <el-tooltip content="预览" placement="top-start">
                  <el-button size="mini" round @click="getPreview"><i class="el-icon-view"/></el-button>
                </el-tooltip>
                <el-tooltip content="上线" placement="top-start">
                  <el-button size="mini" round><i class="el-icon-upload2"/></el-button>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="tap2" label="基本信息">
          <div class="basic-info">
            <div>
              <span class="title">应用ID</span>
              {{ basicInfo.appId }}
            </div>
            <div>
              <span class="title">应用名称</span>
              <el-input
                v-model="basicInfo.appName"
                size="mini"
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
              <img :src="basicInfo.appIcon" class="app-img">
            </div>
            <div class="tips">
              <span class="title">应用描述</span>
              <el-input
                v-model="basicInfo.describe"
                size="mini"
                placeholder="请输入应用描述"/>
            </div>
            <div>
              <span class="title">应用截图</span>
              <div class="appScreenshot">
                <img v-for="(img, index) in basicInfo.appImage" :src="img" :key="index">
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="tap3" label="应用合并">
          <el-row class="app-merge">
            <el-col :span="6" :xs="24" class="left">
              <p class="left-title">选择已有的应用进行合并</p>
              <div class="app-mini-box">
                <img v-for="(img, index) in appMini" :src="img" :key="index">
              </div>
            </el-col>
            <el-col :span="12" :xs="24" :offset="2" class="right">
              <p>输入需要合并的应用的短链接</p>
              <el-input
                v-model="searchKey"
                placeholder="输入名称搜索">
                <i slot="prefix" class="el-input__icon el-icon-search"/>
              </el-input>
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
    <component :is="currentRole" :dialog-visible="dialogVisible" :preview-src="previewSrc" :preview-url="previewUrl" :upload-time="uploadTime" @handleClose="handleClose"/>
  </div>
</template>

<script>
import { getAppInfo, appVersionRemark } from '@/api/index'
import Chart from './chart'
import MapChart from './mapChart'
import Preview from './preview'
import Upload from './upload'

export default {
  name: 'Detail',
  components: { Chart, MapChart, Preview, Upload },
  data() {
    return {
      loading: false,
      saveLoading: false,
      currentRole: 'preview',
      dialogVisible: false,
      previewSrc: '',
      previewUrl: 'http://www.baidu.com/123',
      uploadTime: '2018-03-02 23:32:23',
      file: '',
      checked: false,
      searchKey: '',
      activeName: 'tap1',
      appInfo: {
        appId: this.$route.params.id,
        platform: ['android', 'ios'],
        appName: 'TEST01',
        size: '51.90MB',
        package: 'COM.APP.COM',
        version: '1.0.5（Build 5）'
      },
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
  mounted() {
    this.getAppInfo()
  },
  methods: {
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
    getAppInfo() {
      const _this = this
      _this.loading = true
      getAppInfo({
        appId: _this.appInfo.appId
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
        _this.basicInfo = result
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
        }
        .appScreenshot{
          padding: 30px 0;
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
          img{
            height: 80px;
            width: 80px;
            margin-left: 15px;
            border-radius: 10px;
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
  .app-container .app-box .app-list .app-btn-box{
    text-align: center;
    padding-top: 30px;
  }
  .app-detail-container .top-app-info .app-info{
    padding-top: 30px;
  }
  .app-detail-container .top-app-info div {
    float: none;
  }
}
</style>

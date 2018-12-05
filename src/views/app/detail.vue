<template>
  <div class="app-detail-container">
    <div class="top-app-info">
      <div class="app-img"/>
      <div class="app-info">
        <p class="app-title">{{ appInfo.name }}</p>
        <p class="app-info-cont">应用大小：<span class="app-text">{{ appInfo.size }}</span></p>
        <p class="app-info-cont">应用标识：<span class="app-text">{{ appInfo.tips }}</span></p>
        <p class="app-info-cont">最新版本：<span class="app-text">{{ appInfo.version }}</span></p>
      </div>
      <div class="app-btn-box">
        <el-button size="mini" icon="el-icon-upload" round @click="dialogVisible = true">上传新版本</el-button>
        <el-button type="primary" size="mini" icon="el-icon-view" round @click="previewVisible = true">预览</el-button>
      </div>
    </div>
    <div class="app-detail-box">
      <el-tabs :value="activeName" type="border-card" @tab-click="switchTaps">
        <el-tab-pane name="tap1" label="版本记录">
          <div class="app-version-list">
            <div class="list-cont">
              <p class="title">版本更新</p>
              <el-input v-model="appUrl" placeholder="请输入内容">
                <template slot="prepend">商店地址</template>
              </el-input>
            </div>
          </div>
          <div v-for="(list , index) in appVersionList" :key="index" class="app-version-list">
            <div class="list-cont">
              <p class="title">{{ list.name }}</p>
              <p class="date">{{ list.date }}</p>
              <p class="tips">{{ list.tips }}</p>
              <div class="btn-box">
                <el-button size="mini" round>下载</el-button>
                <el-button size="mini" round>预览</el-button>
                <el-button size="mini" round>上线</el-button>
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
              <el-input v-model="basicInfo.shortUrl" placeholder="请输入短链接">
                <template slot="prepend">{{ basicInfo.host }}</template>
              </el-input>
            </div>
            <div>
              <span class="title">应用图标</span>
              <img :src="basicInfo.appImg" class="app-img">
            </div>
            <div class="tips">
              <span class="title">应用描述</span>
              <el-input
                v-model="basicInfo.appTips"
                size="mini"
                placeholder="请输入应用描述"/>
            </div>
            <div>
              <span class="title">应用截图</span>
              <div class="appScreenshot">
                <img v-for="(img, index) in basicInfo.appScreenshot" :src="img" :key="index">
              </div>
            </div>
            <div>
              <span class="title">应用商店截图</span>
              <div class="appScreenshot">
                <img v-for="(img, index) in basicInfo.appShopScreenshot" :src="img" :key="index">
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
    <component :is="currentRole" :dialog-visible="dialogVisible" :dialog-title="dialogTitle"/>
    <el-dialog
      :visible.sync="previewVisible"
      :before-close="previewClose"
      width="45%">
      <div class="preview-cont">
        <img :src="previewSrc">
        <p class="name">TEST001</p>
        <p class="tips">扫描二维码下载</p>
        <p class="tips">或用手机浏览器输入这个网址：{{ previewUrl }}</p>
        <el-button type="primary" style="width: 180px;margin: 15px 0;" round>下载安装</el-button>
      </div>
      <div class="preview-cont-2">
        <p class="tips">1.0.5（Build 5） - 51.9KB</p>
        <p class="tips">更新于：{{ uploadTime }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Chart from './chart'
import MapChart from './mapChart'
import Upload from './upload'

export default {
  name: 'Detail',
  components: { Chart, MapChart, Upload },
  data() {
    return {
      currentRole: 'upload',
      dialogTitle: '上传新版本',
      dialogVisible: false,
      previewVisible: false,
      previewSrc: '',
      previewUrl: 'http://www.baidu.com/123',
      uploadTime: '2018-03-02 23:32:23',
      file: '',
      checked: false,
      appUrl: 'http://www.baidu.com/',
      searchKey: '',
      activeName: 'tap1',
      appInfo: {
        id: this.$route.params.id,
        type: 'ios',
        name: 'TEST03',
        size: '51.90MB',
        tips: 'COM.APP.COM',
        version: '1.0.5（Build 5）'
      },
      appVersionList: [{
        name: '5.3.2.01（Build1213）',
        date: '2018.11.11 11:11',
        tips: '编辑日志：这是测试用的第二个版本'
      }, {
        name: '5.3.2.01（Build101013）',
        date: '2018.10.10 13:13',
        tips: '编辑日志：这是测试用的第二个版本'
      }, {
        name: '5.3.2.01（Build101013）',
        date: '2018.10.10 13:13',
        tips: '编辑日志：这是测试用的第二个版本'
      }, {
        name: '5.3.2.01（Build101013）',
        date: '2018.10.10 13:13',
        tips: '编辑日志：这是测试用的第二个版本'
      }, {
        name: '5.3.2.01（Build101013）',
        date: '2018.10.10 13:13',
        tips: '编辑日志：这是测试用的第二个版本'
      }],
      basicInfo: {
        appId: 'dsafsafasdas212dsad23',
        appName: '修改应用名称',
        host: 'http://www.baidu.com/',
        shortUrl: 'detail',
        appImg: '',
        appTips: '应用描述',
        appScreenshot: ['', '', ''],
        appShopScreenshot: ['', '']
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
  created() {
  },
  methods: {
    switchTaps(el) {
      if (el.name === 'tap4') {
        this.$refs.chart.resize()
        this.$refs.mapChart.resize()
      }
    },
    previewClose() {
      this.previewVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.app-detail-container {
  padding: 20px;
  .el-checkbox{
    padding-top: 15px;
  }
  .agreement-text{
    padding: 15px;
  }
  .preview-cont{
    width: 500px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
    img{
      height: 120px;
      width: 120px;
    }
    .name{
      font-size: 20px;
      padding: 10px 0;
      color: #333;
    }
    .tips{
      font-size: 12px;
      color: #666;
    }
  }
  .preview-cont-2{
    padding-top: 30px;
    text-align: center;
    .tips{
      font-size: 12px;
      color: #666;
    }
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
        width: 500px;
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
  .app-detail-container .top-app-info .app-btn-box{
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

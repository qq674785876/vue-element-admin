<template>
  <div class="app-container">
    <el-row class="searchAndInfo">
      <el-col :span="10" :xs="24">
        <el-radio-group v-model="appType">
          <el-radio-button label="IOS">
            <span class="svg-container">
              <svg-icon icon-class="ios" />
            </span>
          </el-radio-button>
          <el-radio-button label="Android">
            <span class="svg-container android">
              <svg-icon icon-class="andriod" />
            </span>
          </el-radio-button>
        </el-radio-group>
        <el-input
          v-model="searchKey"
          placeholder="输入名称搜索">
          <i slot="prefix" class="el-input__icon el-icon-search"/>
        </el-input>
      </el-col>
      <el-col :span="14" :xs="24" class="top-info-box">
        <ul>
          <li>
            <el-tooltip content="Top Left 提示文字" placement="top-start">
              <p>可上传APP数<i class="el-icon-question"/></p>
            </el-tooltip>
            <p><span>0</span></p>
          </li>
          <li>
            <el-tooltip content="Top Left 提示文字" placement="top-start">
              <p>今日免费下载点数<i class="el-icon-question"/></p>
            </el-tooltip>
            <p><span>0</span></p>
          </li>
          <li>
            <el-tooltip content="Top Left 提示文字" placement="top-start">
              <p>剩余付费下载点数<i class="el-icon-question"/></p>
            </el-tooltip>
            <p><span>84</span></p>
          </li>
          <li class="shop">
            <el-tooltip content="Top Left 提示文字" placement="top-start">
              <p>购买点数包<i class="el-icon-question"/></p>
            </el-tooltip>
            <p>
              <el-button round>
                <span class="svg-container">
                  <svg-icon icon-class="shop" />
                </span>
              </el-button>
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="app-content">
      <el-col :span="4" :xs="24">
        <el-upload
          :headers="headers"
          :action="uploadApi"
          :show-file-list="false"
          :on-progress="uploadProgress"
          :on-success="uploadSuccess"
          :before-upload="uploadApp"
          class="upload-demo"
          drag>
          <i class="el-icon-upload"/>
          <div class="el-upload__text">点击或拖拽<br >上传您的应用</div>
        </el-upload>
      </el-col>
      <el-col :span="20" :xs="24" :loading="loading">
        <div class="app-box">
          <el-card v-for="(list, index) in applist" :key="index" :class="{'pTop': index > 3}" shadow="always" class="app-list">
            <div :class="list.type" class="app-type">
              <span class="svg-container">
                <svg-icon :icon-class="list.type"/>
              </span>
            </div>
            <div class="app-img"/>
            <div class="app-info">
              <p class="app-title">{{ list.name }}</p>
              <p class="app-info-cont">应用大小：<span class="app-text">{{ list.size }}</span></p>
              <p class="app-info-cont">应用标识：<span class="app-text">{{ list.tips }}</span></p>
              <p class="app-info-cont">最新版本：<span class="app-text">{{ list.version }}</span></p>
            </div>
            <div class="app-btn-box">
              <router-link :to="'/app/detail/' + list.id">
                <el-button size="mini" icon="el-icon-edit" round>管理</el-button>
              </router-link>
              <el-button size="mini" icon="el-icon-view" round @click="getPreview">预览</el-button>
              <el-button size="mini" icon="el-icon-delete" circle/>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <component
      :is="currentRole"
      :dialog-visible="dialogVisible"
      :preview-src="previewSrc"
      :preview-url="previewUrl"
      :upload-time="uploadTime"
      @handleClose="handleClose"
      @submitUpload="submitUpload"/>
    <iframe-loading v-if="isLoading" :loading-src="loadingSrc" :progress-bar="uploadPercent"/>
  </div>
</template>

<script>
import { getAppList } from '@/api/index'
import { mapGetters } from 'vuex'
import IframeLoading from '@/components/Loading/index'
import Preview from './preview'
import Upload from './upload'

export default {
  name: 'App',
  components: { IframeLoading, Preview, Upload, getAppList },
  data() {
    return {
      loading: true,
      currentRole: 'preview',
      dialogVisible: false,
      uploadPercent: 0,
      previewSrc: '',
      previewUrl: 'http://www.baidu.com/123',
      uploadTime: '2018-03-02 23:32:23',
      headers: {
        'token': ''
      },
      uploadApi: process.env.BASE_API + '/v1/appUpload',
      isLoading: false,
      loadingSrc: '/static/SvgLoading/index.html',
      appType: 'IOS',
      searchKey: '',
      applist: [{
        id: '1',
        type: 'ios',
        name: 'TEST01',
        size: '51.90MB',
        tips: 'COM.APP.COM',
        version: '1.0.5（Build 5）'
      }, {
        id: '2',
        type: 'andriod',
        name: 'TEST02',
        size: '51.90MB',
        tips: 'COM.APP.COM',
        version: '1.0.5（Build 5）'
      }, {
        id: '3',
        type: 'ios',
        name: 'TEST03',
        size: '51.90MB',
        tips: 'COM.APP.COM',
        version: '1.0.5（Build 5）'
      }, {
        id: '4',
        type: 'andriod',
        name: 'TEST04',
        size: '51.90MB',
        tips: 'COM.APP.COM',
        version: '1.0.5（Build 5）'
      }, {
        id: '5',
        type: 'ios',
        name: 'TEST05',
        size: '51.90MB',
        tips: 'COM.APP.COM',
        version: '1.0.5（Build 5）'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted() {
    // const _this = this
    // setInterval(function(){
    //   _this.progressBar++
    // },1000)
    this.headers.token = this.token
  },
  methods: {
    getAppList() {
      const _this = this
      getAppList({
        appName: _this.searchKey,
        platform: _this.appType,
        pageNum: 1,
        pageSize: 10
      }).then(response => {
        const data = response.data
        if (data.error !== 0) {
          _this.$notify({
            title: '实名失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
      }).catch(error => {
        console.log(error)
      })
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
      setTimeout(function() {
        _this.currentRole = 'upload'
        _this.dialogVisible = true
      }, 600)
    },
    uploadProgress(event, file, fileList) {
      this.isLoading = true
      this.uploadPercent = file.percentage.toFixed(0)
    },
    uploadBefore(file) {
      console.log(file)
    },
    handleClose() {
      this.dialogVisible = false
    },
    getPreview() {
      this.currentRole = 'preview'
      this.dialogVisible = true
    },
    getUpload() {
      this.currentRole = 'upload'
      this.dialogVisible = true
    },
    submitUpload() {

    },
    uploadApp(file) {
      // const _this = this
      // const formData = new FormData()
      // formData.append('app', file) // 传文件
      // onUploadProgress: progressEvent => {
      //   var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
      //   console.log(complete)//进度值
      // }
      // appUpload(formData, function(progressEvent){
      //   var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
      //   console.log(complete)//进度值
      // }).then(response => {
      //   const data = response.data
      //   const result = data.result
      //   if (data.error !== 0) {
      //     _this.$notify({
      //       title: '上传失败',
      //       message: data.reason,
      //       type: 'error'
      //     })
      //     return
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })

      // return false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.app-container {
  height: calc(100vh - 85px);
  overflow: hidden;
  .svg-container.android{
  }
  .el-icon-question{
    color: #666;
    padding-left: 2px;
  }
  .el-input{
    position: relative;
    top: 1px;
    margin-left: 50px;
    width: 200px;
  }
  .top-info-box{
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      float: right;
      &:after{
        content:'';
        display: block;
        clear: both;
      }
      li{
        float: left;
        padding-left: 15px;
        padding-right: 15px;
        border-right: 1px solid #ccc;
        text-align: right;
        font-size: 14px;
        p:first-child{
          margin: 0;
        }
        p:last-child{
          margin: 5px 0;
        }
        &.shop{
          border: 0;
          p{
            .el-button--medium.is-round{
              padding: 2px 12px;
            }
          }
        }
      }
    }
  }
  .app-content{
    padding-top: 30px;
  }
  .el-upload{
    width: 100%;
    .el-upload-dragger .el-icon-upload{
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -33px;
      margin-top: -53px;
    }
    .el-upload__text{
      position: absolute;
      top: 54%;
      width: 100%;
      text-align: center;
    }
    .el-upload-dragger{
      width: 100%;
      height: 75vh;
    }
  }
  .app-box{
    height: calc(100vh - 180px);
    overflow: auto;
    .app-list{
      width: 12%;
      min-width: 240px;
      min-height: 290px;
      height: 36vh;
      float: left;
      margin-left: 30px;
      position: relative;
      margin-bottom: 2.5vh;
      .app-type{
        position: absolute;
        background-color: #666;
        top: 0;
        right: 20px;
        padding: 6px 6px 18px;
        &.andriod{
          background-color: #13bd14;
        }
        .svg-icon{
          color: #fff;
        }
        &::after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width:0;
          height:0;
          border-left:14px solid transparent;
          border-right:14px solid transparent;
          border-bottom:10px solid #fff;
        }
      }
      .el-button+.el-button{
        margin-left: 2px;
      }
      .app-img{
        height: 70px;
        width: 70px;
        background-color: blue;
        border-radius: 100%;
      }
      .app-info{
        margin-top: 30px;
        p{
          margin: 0;
        }
        .app-title{
          font-size: 16px;
          padding-bottom: 10px;
        }
        .app-info-cont{
          font-size: 14px;
          color: #666;
          padding-bottom: 8px;
          span{
            padding-left: 20px;
            color: #000;
          }
        }
      }
      .app-btn-box{
        text-align: right;
        position: absolute;
        bottom: 15px;
        right: 10px;
      }
    }
  }
}
.mobile {
  .top-info-box{
    display: none;
  }
  .el-input{
    margin-left: 0;
  }
  .app-box{
    height: calc(100vh - 300px);
    overflow: auto;
    .app-list{
      margin-left: 0;
      margin-bottom: 10px;
      width: 100%;
      min-width: none;
    }
  }
  .el-upload .el-upload-dragger{
    height: 120px;
  }
}
</style>

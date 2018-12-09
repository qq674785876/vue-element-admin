<template>
  <div class="app-container">
    <el-row class="searchAndInfo">
      <el-col :span="10" :xs="24">
        <el-checkbox-group v-model="appType" @change="getAppList">
          <el-checkbox-button label="ios">
            <span class="svg-container">
              <svg-icon icon-class="ios" />
            </span>
          </el-checkbox-button>
          <el-checkbox-button label="android">
            <span class="svg-container android">
              <svg-icon icon-class="android" />
            </span>
          </el-checkbox-button>
        </el-checkbox-group>
        <el-input
          v-model="searchKey"
          placeholder="输入名称搜索"
          @keyup.enter.native="getAppList">
          <i slot="prefix" class="el-input__icon el-icon-search"/>
        </el-input>
      </el-col>
      <el-col :span="14" :xs="24" class="top-info-box">
        <ul>
          <li>
            <el-tooltip placement="top-start">
              <div slot="content"> 1.账号下所用应用共用上传次数<br>2.每日凌晨0点自动重置上传次数</div>
              <p>可上传APP数<i class="el-icon-question"/></p>
            </el-tooltip>
            <p><span>{{ userInfo.upload }}</span></p>
          </li>
          <li>
            <el-tooltip placement="top-start">
              <div slot="content"> 1.账号下所有应用共用此剩余下载次数<br>2.每日凌晨0点自动重置下载次数</div>
              <p>今日免费下载点数<i class="el-icon-question"/></p>
            </el-tooltip>
            <p><span>{{ userInfo.download }}</span></p>
          </li>
          <li>
            <el-tooltip placement="top-start">
              <div slot="content"> 1.下载次数包没有时间限制，用完为止<br>2.购买的下载次数包为总下载量，不会每日重置</div>
              <p>剩余付费下载点数<i class="el-icon-question"/></p>
            </el-tooltip>
            <p><span>{{ userInfo.surplus }}</span></p>
          </li>
          <li class="shop">
            <p>购买点数包</p>
            <p>
              <el-button round @click="getPackage">
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
      <el-col
        v-loading="loading"
        :span="20"
        :xs="24"
        element-loading-text="拼命加载中">
        <div class="app-box">
          <el-card v-for="(list, index) in applist" :key="index" shadow="hover" class="app-list">
            <div v-for="(type, typeIndex) in list.platform" :class="[type,{ two: typeIndex === 1 }]" :key="typeIndex" class="app-type">
              <span class="svg-container">
                <svg-icon :icon-class="type"/>
              </span>
            </div>
            <div :style="{ 'background-image': 'url(' + list.appIcon + ')' }" class="app-img"/>
            <div class="app-info">
              <p class="app-title">{{ list.appName }}</p>
              <p class="app-info-cont">应用大小：<span class="app-text">{{ list.size }}</span></p>
              <p class="app-info-cont">应用标识：
                <el-tooltip :content="list.package" placement="top-start">
                  <span class="app-text">{{ list.package }}</span>
                </el-tooltip>
              </p>
              <p class="app-info-cont">最新版本：<span class="app-text">{{ list.version }}</span></p>
            </div>
            <div class="app-btn-box">
              <router-link :to="'/app/detail/' + list.appId">
                <el-button size="mini" icon="el-icon-edit" round>管理</el-button>
              </router-link>
              <el-button size="mini" icon="el-icon-view" round @click="getPreview(list.appId)">预览</el-button>
              <el-button size="mini" icon="el-icon-delete" circle @click="appDelete(list.appId)"/>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <component
      :is="currentRole"
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      :app-id="appId"
      @handleClose="handleClose"
      @submitUpload="submitUpload"/>
    <iframe-loading v-show="isLoading" :loading-src="loadingSrc" :progress-bar="uploadPercent"/>
  </div>
</template>

<script>
import { getAppList, appDelete, getUserDetails } from '@/api/index'
import { mapGetters } from 'vuex'
import IframeLoading from '@/components/Loading/index'
import Preview from './preview'
import Package from './package'

export default {
  name: 'App',
  components: { IframeLoading, Preview, Package, getAppList, appDelete },
  data() {
    return {
      loading: false,
      currentRole: '',
      userInfo: {},
      dialogTitle: '',
      dialogVisible: false,
      uploadPercent: 0,
      appId: '',
      headers: {
        'token': ''
      },
      uploadApi: process.env.BASE_API + '/v1/appUpload',
      isLoading: false,
      loadingSrc: '/static/SvgLoading/index.html',
      appType: ['ios', 'android'],
      searchKey: '',
      applist: []
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
    this.getAppList()
    this.getUserDetails()
  },
  methods: {
    getUserDetails() {
      const _this = this
      _this.loading = true
      getUserDetails().then(res => {
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
        _this.userInfo = result
      }).catch(error => {
        console.log(error)
      })
    },
    appDelete(appId) {
      const _this = this
      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.loading = true
        appDelete({
          appId: appId
        }).then(res => {
          _this.loading = false
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
            title: '删除成功',
            message: '应用删除成功！',
            type: 'success'
          })
          _this.getAppList()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {

      })
    },
    goUrl(to, go, a) {
      console.log(to, go, a)
    },
    getAppList() {
      const _this = this
      let platform = _this.appType
      _this.loading = true
      if (platform.length === 2) {
        platform = ''
      } else if (platform.length === 1) {
        platform = _this.appType[0]
      }
      getAppList({
        appName: _this.searchKey,
        platform: platform,
        pageNum: 1,
        pageSize: 10
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
        _this.applist = result
      }).catch(error => {
        console.log(error)
      })
    },
    uploadSuccess(res) {
      const _this = this
      _this.isLoading = false
      _this.uploadPercent = 0
      if (res.error === 0) {
        _this.$notify({
          title: '上传成功',
          message: '文件上传成功',
          type: 'success'
        })
        _this.getAppList()
        _this.getUserDetails()
      } else {
        _this.$notify({
          title: '上传失败',
          message: res.reason,
          type: 'error'
        })
      }
    },
    uploadProgress(event, file, fileList) {
      this.isLoading = true
      this.uploadPercent = Number(file.percentage.toFixed(1))
    },
    handleClose() {
      this.currentRole = ''
      this.dialogVisible = false
      this.getUserDetails()
    },
    getPreview(appId) {
      this.appId = appId
      this.currentRole = 'preview'
      this.dialogVisible = true
    },
    getPackage() {
      this.currentRole = 'package'
      this.dialogTitle = '购买套餐'
      this.dialogVisible = true
    },
    submitUpload() {

    },
    uploadApp(file) {
      console.log(file)
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
  .searchAndInfo{
    .el-checkbox-group{
      display: inline-block;
      float: left;
    }
    .el-input{
      position: relative;
      margin-left: 10px;
      float: left;
      width: 200px;
    }
  }
  .el-icon-question{
    color: #666;
    padding-left: 2px;
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
    padding-top: 10px;
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
      margin-top: 20px;
    }
  }
  .app-box{
    height: calc(100vh - 180px);
    padding-top: 20px;
    overflow: auto;
    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
      -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
      position: relative;
      top: -2px;
      left: -2px;
    }
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
        padding: 6px 8px 18px;
        &.android{
          background-color: #13bd14;
        }
        &.two{
          right: 60px;
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
        background-size: cover;
      }
      .app-info{
        margin-top: 30px;
        p{
          margin: 0;
        }
        .app-title{
          font-size: 16px;
          padding-bottom: 20px;
        }
        .app-info-cont{
          font-size: 14px;
          color: #666;
          padding-bottom: 12px;
          span{
            width: 64%;
            float: right;
            display: inline-block;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
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
  .app-container .preview-cont{
    width: 100% !important;
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

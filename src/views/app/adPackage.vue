<template>
  <div v-loading="loading">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :oldEndTime="oldEndTime"
      :oldPackageType="oldPackageType"
      :oldTotal="oldTotal"
      :oldId="oldId"
      :oldType="oldType"
      class="packageDialog"
      width="40%">
      <div v-if="!isGet" class="packageList">
        <p v-if="oldId">已购买套餐：{{oldPackageType}}&emsp;期间展现{{oldTotal}}次&emsp;到期时间：{{oldEndTime}}</p>
        <el-row>
          <el-radio-group v-model="adType" @change="packageInfo" size="mini" :disabled="oldId !== ''">
            <el-radio-button label="0">开启广告</el-radio-button>
            <el-radio-button label="1">屏蔽广告</el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row class="package-info" v-if="adType == 0">
          <div>
            <span class="title">展示预览图</span>
            <div>
              <span>选择模式：</span>
              <el-radio-group v-model="adModelId" size="mini" @change="selectRow('adModel', adModel, adModelId)">
                <el-radio-button 
                  :label="list.propertyId" 
                  border
                  v-for="(list,index) in adModel" 
                  :key="index">{{list.name}}</el-radio-button>
              </el-radio-group>
            </div>
            <div class="appScreenshot">
              <el-card v-for="(img, index) in appImage" :key="index" shadow="hover">
                <p style="text-align: center;">{{index === 0 ? '模式一' : '模式二'}}</p>
                <img :src="img">
                <div class="img-set-box">
                  <i class="el-icon-zoom-in" @click="handlePictureCardPreview(img)"/>
                </div>
              </el-card>
            </div>
            <p style="color: red;" v-if="adType === 0 && adModel && adModelId === adModel[0].propertyId">温馨提示：模式一无法提供安卓应用的推广，如果只有安卓应用，选择模式一则没有效果。请谨慎选择。</p>
          </div>
          <div>
            <span class="title">展示时间</span>
            <el-radio-group v-model="monthId" size="mini" @change="selectRow('month', packageObj.package, monthId)" :disabled="adModelId === ''">
              <el-radio-button 
                :label="list.propertyId"
                border
                v-for="(list,index) in packageObj.package" 
                :key="index">{{list.name}}</el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <span class="title">展示频率</span>
            <el-radio-group v-model="frequencyId" size="mini" @change="selectRow('frequency', packageObj.frequency, frequencyId)" :disabled="adModelId === ''">
              <el-radio-button :label="list.propertyId" border v-for="(list,index) in packageObj.frequency" :key="index">{{list.name}}</el-radio-button>
            </el-radio-group>
            <p>频率越高，相同时间段内展现的次数越多</p>
          </div>
        </el-row>
        <el-row v-else class="package-info">
          <div>
            <span class="title">屏蔽本应用下载中的广告<i>（说明：屏蔽广告后可让本应用使用纯净模式展现给下载用户）</i></span>
            <el-radio-group v-model="monthId" size="mini" @change="selectRow('month', packageObj.package, monthId)">
              <el-radio-button 
                :label="list.propertyId" 
                border
                v-for="(list,index) in packageObj.package" 
                :key="index">{{list.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-row>
      </div>
      <div v-if="isGet && !isPuySuccess" align="center">
        <div>请用<span style="color: blue;font-size: 16px;">微信扫码</span>支付￥{{ buyPrice }}</div>
        <div class="QRCode_box" style="width: 200px;height: 200px;margin: 20px auto;">
          <img :src="qrCode" style="width: 100%;">
        </div>
        温馨提示：<p class="tips" style="color: red;">支付成功后自动刷新</p>
      </div>
      <div v-if="isPuySuccess" align="center"><i class="el-icon-success" style="font-size: 50px;color: green;"/><p>套餐购买成功</p></div>
      <span slot="footer" class="dialog-footer">
        <p v-if="!isGet && adType === 0">{{adModelPrice + '+' + monthPrice + '+' + frequencyPrice + '=' + buyPrice}}</p>
        <el-button v-if="!isGet" @click="handleClose">取 消</el-button>
        <el-button v-if="!isGet" type="primary" @click="getPackage">确 定</el-button>
        <el-button v-if="isGet" @click="prev">返 回</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogImageVisible" class="imgDialog" width="100">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { packageInfo, seoPackageBuy, checkOrderState } from '@/api/index'

export default {
  name: 'Upload',
  components: {},
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    fileName: {
      type: String,
      default: ''
    },
    oldId: {
      type: String,
      default: ''
    },
    oldEndTime: {
      type: String,
      default: ''
    },
    oldPackageType: {
      type: String,
      default: ''
    },
    oldTotal: {
      type: Number,
      default: 0
    },
    oldType: {
      type: Number,
      default: 0
    }
    // oldFrequency: {
    //   type: String,
    //   default: 0
    // }
  },
  data() {
    return {
      isGet: false,
      timer: null,
      loading: false,
      adModelId: '',
      adModel: [{
        propertyId: ''
      }],
      adModelPrice: 0,
      monthId: '',
      monthPrice: 0,
      frequencyId: '',
      frequencyPrice: 0,
      appImage: ['static/images/appImg-1.jpg','static/images/appImg-2.jpg'],
      dialogImageUrl: '',
      dialogImageVisible: false,
      templateRadio: '',
      adType: 0,
      payType: 1,
      buyPrice: 0,
      buyPackage: {},
      isPuySuccess: false,
      orderNum: '',
      qrCode: '',
      packageObj: {},
      frequency: ''
    }
  },
  mounted() {
    this.packageInfo()
    this.adType = this.oldType
  },
  methods: {
    prev() {
      const _this = this
      clearInterval(_this.timer)
      _this.isGet = false
      _this.isPuySuccess = false
      _this.packageInfo()
    },
    checkOrderState() {
      const _this = this
      checkOrderState({
        orderNum: _this.orderNum
      }).then(res => {
        _this.loading = false
        const data = res.data
        // const result = data.result
        if (data.error !== 0) {
          return
        }
        _this.$notify({
          title: '支付成功！',
          message: '已经购买成功！',
          type: 'success'
        })
        _this.isPuySuccess = true
        clearInterval(_this.timer)
      }).catch(error => {
        console.log(error)
      })
    },
    packageInfo() {
      const _this = this
      _this.isGet = false
      _this.loading = true
      _this.buyPrice = 0
      packageInfo({type: _this.adType}).then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '获取失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.adModel = result.mode
        _this.packageObj = {
          package: result.month,
          frequency: result.frequency
        }
      }).catch(error => {
        console.log(error)
      })
    },
    seoPackageBuy() {
      const _this = this
      _this.loading = true
      seoPackageBuy({
        frequency: _this.frequencyId,
        month: _this.monthId,
        mode: _this.adModelId,
        payType: _this.payType,
        id: _this.oldId
      }).then(res => {
        _this.loading = false
        const data = res.data
        const result = data.result
        if (data.error !== 0) {
          _this.$notify({
            title: '获取失败',
            message: data.reason,
            type: 'error'
          })
          return
        }
        _this.isGet = true
        _this.qrCode = result.qrCode
        _this.orderNum = result.orderNum
        _this.timer = setInterval(function() {
          _this.checkOrderState()
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    },
    selectRow(type, arr, id) {
      var _this = this, price = 0;
      for(var i = 0 ; i < arr.length ; i++){
        if(arr[i].propertyId === id){
          price = arr[i].price;
        }
      }

      if(type === 'adModel'){
        _this.adModelPrice = price;
      }else if(type === 'month'){
        _this.monthPrice = price;
      }else{
        _this.frequencyPrice = price;
      }
      _this.buyPrice = (Number(_this.adModelPrice) + Number(_this.monthPrice) + Number(_this.frequencyPrice)).toFixed(2);
    },
    getTemplateRow() {

    },
    handleClose() {
      const _this = this
      clearInterval(_this.timer)
      _this.$emit('handleClose')
    },
    getPackage() {
      const _this = this
      // if(_this.oldFrequency > _this.buyPackage.frequency){
      //   this.$message('无法降低套餐频率等级，请重新选择')
      //   return;
      // }
      if (!_this.monthId && _this.adType === 0) {
        this.$message('请选择套餐时间')
      } else if(!_this.frequencyId && _this.adType === 0) {
        this.$message('请选择套餐频率')
      }else{
        _this.seoPackageBuy()
      }
    },
    handlePictureCardPreview(img) {
      this.dialogImageUrl = img
      this.dialogImageVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.advertisement-container{
  .imgDialog{
    img{
      max-width: 300px;
    }
  }
}

.packageDialog{
  .el-dialog__body{
    padding-top: 0 !important;
  }
  .el-dialog{
    margin-top: 1vh !important;
  }
  .package-info{
    color: #333;
    & > div{
      padding-left: 20px;
      margin: 30px 0;
      position: relative;
      &::after{
        content:'';
        width: 8px;
        height: 8px;
        left: 0;
        top: 4px;
        position: absolute;
        background-color: #888;
        border-radius: 100%;
      }
      .title{
        display: block;
        width: auto;
        padding-bottom: 20px;
        i{
          font-size: 12px;
          font-style: normal;
        }
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
        .el-textarea{
          width: 400px;
          display: block;
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
        // padding: 30px 0;
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
          text-align: center;
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
          // margin-left: 15px;
          width: 120px;
          height: 200px;
          &:first-child{
            margin-left: 0;
          }
        }
      }
    }
  }
}
.el-table__row{
  cursor: pointer;
}
.el-radio__label{
  display: none;
}
.mobile{
  .el-dialog{
    width: 100% !important;
  }
}
</style>


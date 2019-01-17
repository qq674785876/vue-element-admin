<template>
  <div class="dashboard-editor-container">
    <el-row v-if="device==='mobile'" class="exhibition-box">
      <el-col
        v-for="(list, index) in exhibition"
        :span="24"
        :key="index"
        class="exhibition-list">
        <div class="exhibition-cont">
          <p class="title">{{ list.title }}</p>
          <p class="tips">{{ list.tips }}</p>
        </div>
        <div class="exhibition-cont rotate">
          <p class="tips" v-html="list.rotateTips"/>
        </div>
      </el-col>
    </el-row>

    <el-row v-if="device!=='mobile'" class="exhibition-box" justify="space-around">
      <el-col
        v-for="(list, index) in exhibition"
        :lg="{span: 4, offset: 3}"
        :md="{span: 6, offset: 4}"
        :key="index"
        class="exhibition-list">
        <div class="exhibition-cont">
          <p class="title">{{ list.title }}</p>
          <p class="tips">{{ list.tips }}</p>
        </div>
        <div class="exhibition-cont rotate">
          <p class="tips" v-html="list.rotateTips"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'DashboardAdmin',
  data() {
    return {
      gradientColor: '#ccc',
      exhibition: [{
        bgColor: 'rgb(5, 171, 191)',
        title: '立即信任',
        tips: '下载后立即信任，省略多余步骤 方便安装使用',
        rotateTips: ''
      }, {
        bgColor: 'rgb(94, 90, 226)',
        title: '大数据分析',
        tips: '内测数据监控，实时掌握测试效果 实现精准推广，让每一份广告花的更有价值',
        rotateTips: '数据柱状图 地域分析图 下载分析'
      }, {
        bgColor: 'rgb(54, 59, 61)',
        title: '多模板',
        tips: '500MB专网光纤， 多节点数据，只为快快快快！',
        rotateTips: '【几套分发模板的图片展示】 精美模板 随意选择'
      }, {
        bgColor: 'rgb(122, 46, 30)',
        title: '企业级宽带加速',
        tips: '500MB专网光纤， 多节点数据，只为快快快快！',
        rotateTips: '快，是一种态度'
      }, {
        bgColor: 'rgb(12, 202, 120)',
        title: '高级防护',
        tips: '保护客户隐私，让您测试无忧',
        rotateTips: '锁住用户的一切信息不泄露'
      }, {
        bgColor: 'rgb(160, 90, 226)',
        title: '多种套餐',
        tips: '选择最适合你的，组合最优方案 省钱，实惠',
        rotateTips: 'VIP包月套餐 <p>高级VIP：188元 上传20个app 每日200下载点数 --适合局域分发,500MB光纤加速</p> 至尊VIP：1688元 可上传100个app 每日2000下载点数--适合高压测试，用户量大，500MB专网光纤+CDN多节点加速，享受极速体验 <p>付费点数：根据实际下载量，适当购买。 25元400点数 220元 4000 2000元 50000点</p>'
      }]
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-editor-container{
  height: calc(100vh - 85px);
  overflow: auto;
  .exhibition-box{
    text-align: center;
    margin: 0 !important;
    .exhibition-list{
      height: 40vh;
      background-size: cover;
      padding: 0 1vw;
      border-radius: 10px;
      /*上面是基础样式，根据需求修改，下面的代码实现3d翻转效果*/
      -webkit-transform-style: preserve-3d;
      -moz-transform-style:preserve-3d;
      -o-transform-style:preserve-3d;
      -ms-transform-style:preserve-3d;
      transition: transform .6s;
      margin-top: 4vh;
      &:nth-of-type(1){
        background: rgb(5, 171, 191);
        background: -webkit-linear-gradient(left top, #ccc,rgb(5, 171, 191));
        background: -o-linear-gradient(bottom right,#ccc,rgb(5, 171, 191));
        background: -moz-linear-gradient(bottom right,#ccc, rgb(5, 171, 191));
        background: linear-gradient(to bottom right,#ccc,rgb(5, 171, 191));
        &:after{
          opacity: 0;
          transition: opacity .6s;
          background: url("/static/images/rotate-bg.png") center center;
          background-size: cover;
        }
      }
      &:nth-of-type(2){
        background: rgb(94, 90, 226);
        background: -webkit-linear-gradient(left top, #ccc,rgb(94, 90, 226));
        background: -o-linear-gradient(bottom right,#ccc,rgb(94, 90, 226));
        background: -moz-linear-gradient(bottom right,#ccc, rgb(94, 90, 226));
        background: linear-gradient(to bottom right,#ccc,rgb(94, 90, 226));
      }
      &:nth-of-type(3){
        background: rgb(54, 59, 61);
        background: -webkit-linear-gradient(left top, #ccc,rgb(54, 59, 61));
        background: -o-linear-gradient(bottom right,#ccc,rgb(54, 59, 61));
        background: -moz-linear-gradient(bottom right,#ccc, rgb(54, 59, 61));
        background: linear-gradient(to bottom right,#ccc,rgb(54, 59, 61));
      }
      &:nth-of-type(4){
        background: rgb(122, 46, 30);
        background: -webkit-linear-gradient(left top, #ccc,rgb(122, 46, 30));
        background: -o-linear-gradient(bottom right,#ccc,rgb(122, 46, 30));
        background: -moz-linear-gradient(bottom right,#ccc, rgb(122, 46, 30));
        background: linear-gradient(to bottom right,#ccc,rgb(122, 46, 30));
      }
      &:nth-of-type(5){
        background: rgb(12, 202, 120);
        background: -webkit-linear-gradient(left top, #ccc,rgb(12, 202, 120));
        background: -o-linear-gradient(bottom right,#ccc,rgb(12, 202, 120));
        background: -moz-linear-gradient(bottom right,#ccc, rgb(12, 202, 120));
        background: linear-gradient(to bottom right,#ccc,rgb(12, 202, 120));
      }
      &:nth-of-type(6){
        background: rgb(160, 90, 226);
        background: -webkit-linear-gradient(left top, #ccc,rgb(160, 90, 226));
        background: -o-linear-gradient(bottom right,#ccc,rgb(160, 90, 226));
        background: -moz-linear-gradient(bottom right,#ccc, rgb(160, 90, 226));
        background: linear-gradient(to bottom right,#ccc,rgb(160, 90, 226));
      }
      &:after{
        content: '';
        position: absolute;
        width:100%;
        height:100%;
        /*牌背面的图片*/
        border-radius:10px;
        /*将after伪类折叠到box的背面，作为牌的反面*/
        top:0;
        left: 0;
        -webkit-transform:rotateY(180deg);
        -moz-transform:rotateY(180deg);
        -o-transform:rotateY(180deg);
        -ms-transform:rotateY(180deg);
      }
      &:hover{
        -webkit-transform:rotateY(180deg);
        -moz-transform:rotateY(180deg);
        -o-transform:rotateY(180deg);
        -ms-transform:rotateY(180deg);
        .exhibition-cont{
          opacity: 0;
        }
        .rotate{
          opacity: 1 !important;
        }
        &:nth-of-type(1){
          &:after{
            opacity: 1;
          }
        }
      }
      .exhibition-cont{
        margin-top: 15vh;
        color: #fff;
        transition: all 1s;
        font-size: 16px;
        &.rotate{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          margin-top: 0;
          opacity: 0;
          display: table;    /*让标签元素以表格的形式呈现*/
          -webkit-transform:rotateY(180deg);
          -moz-transform:rotateY(180deg);
          -o-transform:rotateY(180deg);
          -ms-transform:rotateY(180deg);
          overflow: auto;
          .tips{
            text-align: center;
            padding: 0 1vw 0;
            display: table-cell;    /*ie7和ie6都不能识别 display: table-cell;*/
            vertical-align: middle;
          }
        }
      }
      .title{
        font-size: 26px;
      }
    }
  }
}
.mobile{
  .exhibition-box{
    padding: 0 30px !important;
    .exhibition-list{
      margin: 20px 0;
    }
  }
}

</style>

<template>
  <div class="set-container">
    <el-tabs type="border-card" class="card-box">
      <el-tab-pane label="个人信息" class="personal-info">
        <div class="module-list">
          <p class="title">基本信息</p>
          <el-row class="info-box">
            <el-col :span="12">
              <span class="name">微信：</span>
              {{ 15927888888 }}
            </el-col>
            <el-col :span="12">
              <span class="name">QQ：</span>
              {{ 15927888888 }}
            </el-col>
            <el-col :span="12">
              <span class="name">公司：</span>
              {{ 15927888888 }}
            </el-col>
            <el-col :span="12">
              <span class="name">职位：</span>
              {{ 15927888888 }}
            </el-col>
          </el-row>
          <div class="btn-box" align="right">
            <el-button type="primary" size="mini" style="margin-right: 30px;">编辑</el-button>
          </div>
        </div>
        <div class="module-list">
          <p class="title">账号信息</p>
          <el-row class="info-box">
            <el-col :span="12">
              <span class="name">密码：</span>
              {{ 15927888888 }}
              <a href="javascript:;" style="margin-left: 15px;color: blue;">修改</a>
            </el-col>
            <el-col :span="12">
              <span class="name">套餐：</span>
              {{ 15927888888 }}
              <a href="javascript:;" style="margin-left: 15px;color: blue;">修改</a>
            </el-col>
            <el-col :span="12">
              <span class="name">绑定手机：</span>
              {{ 15927888888 }}
              <a href="javascript:;" style="margin-left: 15px;color: blue;">修改</a>
            </el-col>
            <el-col :span="12">
              <span class="name">绑定邮箱：</span>
              {{ 15927888888 }}
              <a href="javascript:;" style="margin-left: 15px;color: blue;">修改</a>
            </el-col>
          </el-row>
        </div>
        <div class="module-list">
          <p class="title">实名信息</p>
          <el-row class="realName-box">
            <el-col :span="12">
              <div class="img-box">
                <img :src="personalInfo.frontImg">
              </div>
              <p>身份证正面</p>
            </el-col>
            <el-col :span="12">
              <div class="img-box">
                <img :src="personalInfo.contraryImg">
              </div>
              <p>身份证反面</p>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知管理">
        <div class="module-list">
          <p class="title">
            3项
            <a href="javascript:;" style="margin-left: 15px;color: blue;float: right;font-size: 14px;">全部标记已读</a>
          </p>
          <el-row>
            <el-table
              ref="multipleTable"
              :data="noticeList"
              tooltip-effect="dark"
              height="calc(100vh - 305px)"
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
                prop="time"
                label="发送时间"
                width="220"/>
              <el-table-column
                prop="cont"
                label="通知内容"
                show-overflow-tooltip/>
              <el-table-column
                prop="status"
                label="状态"
                show-overflow-tooltip/>
            </el-table>
            <el-pagination
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'Set',
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 9,
      personalInfo: {
        frontImg: '',
        contraryImg: ''
      },
      noticeList: [{
        time: '2018-05-03 14:20:30',
        cont: '越来越多人在使用这个平台',
        status: 1
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }, {
        time: '2018-03-03 23:20:30',
        cont: '新增更多的套餐',
        status: 0
      }, {
        time: '2018-05-03 14:20:30',
        cont: '越来越多人在使用这个平台',
        status: 1
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }, {
        time: '2018-03-03 23:20:30',
        cont: '新增更多的套餐',
        status: 0
      }, {
        time: '2018-05-03 14:20:30',
        cont: '越来越多人在使用这个平台',
        status: 1
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }, {
        time: '2018-07-03 14:20:30',
        cont: '套餐活动',
        status: 0
      }]
    }
  },
  methods: {
    handleSelectionChange() {
      console.log(1)
    },
    handleSizeChange() {
      console.log(1)
    },
    handleCurrentChange() {
      console.log(1)
    },
    indexMethod(index) {
      return index * 2
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.set-container {
	padding: 20px;
	.card-box{
		.el-tabs__content{
			max-height: calc(100vh - 165px);
			overflow: auto;
		}
	}
	.el-table{
		height: calc(100vh - 305px);
	}
	.el-pagination{
		padding-top: 30px;
	}
	.personal-info{
		.el-col{
			margin: 10px 0;
			font-size: 14px;
			color: #888;
		}
		.module-list{
			box-shadow: 0 0 10px #ccc;
			padding: 10px 20px;
			margin-bottom: 30px;
			.realName-box{
				text-align: center;
				.img-box{
					img{
						width: 300px;
						height: 200px;
					}
				}
			}
		}
	}
}
</style>

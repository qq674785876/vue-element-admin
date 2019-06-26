<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-row class="topTips">
      火柴内测分发
    </el-row>
    <el-row class="user-info-box">
      <div :style="{'background-image': 'url('+ avatar +')'}" class="user-head"/>
      <p class="user-name">{{ userInfo.email }}</p>
      <a href="javascript:;" class="user-set" @click="editPassword">密码设置</a>
    </el-row>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      text-color="#fff"
      active-text-color="#fff"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
    <component
      :is="currentRole"
      :dialog-id="dialogId"
      :dialog-title="dialogTitle"
      :dialog-visible="dialogVisible"
      @handleClose="handleClose"/>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import userInfo from '@/views/userManagement/userInfo'

export default {
  components: { SidebarItem, userInfo },
  data() {
    return {
      currentRole: '',
      dialogId: 0,
      dialogTitle: '用户信息',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'userInfo',
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    // console.log(this.userInfo)
  },
  methods: {
    editPassword(row) {
      const _this = this
      _this.dialogTitle = '修改密码'
      _this.dialogId = row.Admin_id
      _this.currentRole = 'userInfo'
      _this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
      this.currentRole = ''
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.topTips{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  background: rgba(0,0,0,.3);
}
.user-info-box{
  position: relative;
  top: 90px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  .user-head{
    height: 80px;
    width: 80px;
    border-radius: 100%;
    margin: 0 auto;
    background-size: 100% 100%;
  }
  .user-set{
    text-decoration:underline;
  }
}

</style>

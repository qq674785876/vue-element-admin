<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-row class="topTips">
      caihuoneiche.com
    </el-row>
    <el-row class="user-info-box">
      <div :style="{'background-image': 'url('+ avatar +')'}" class="user-head"/>
      <p class="user-name">{{ userInfo.email }}</p>
      <router-link :to="'/set/index'">
        <a href="javascript:;" class="user-set">账号设置</a>
      </router-link>
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
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {

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
  font-size: 20px;
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

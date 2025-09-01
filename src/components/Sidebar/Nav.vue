<template>
  <div 
    style="margin-top: 1%;
    height: 100vh;">
    <el-menu 
    class="el-menu-vertical-demo" 
    :collapse="isCollapse"
    @select="handleSelect"
    default-active="1">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" v-show="roleId === '1'">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">创建课程</span>
      </el-menu-item>
      <el-menu-item index="4" v-show="roleId === '1'">
        <i class="el-icon-menu"></i>
        <span slot="title">课程审核</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>概念管理</span>
        </template>
        <el-menu-item index="5-1">
          <span slot="title">概念审核</span>
        </el-menu-item>
        <el-menu-item index="5-2">
          <span slot="title">概念抽取</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="6" v-show="roleId === '1'">
        <i class="el-icon-menu"></i>
        <span slot="title">推荐审核</span>
      </el-menu-item>
  </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
      return {
        isCollapse: false,
        roleId: localStorage.getItem('roleId'),
      };
    },
    methods: {
      handleSelect(key) {
        console.log(key);
        switch (key) {
          case "1":
            console.log("你好");
            this.$router.push('/admin/');
            break;
          case "2":
            this.$router.push('/admin/userManagement');
            break;
          case "3":
            this.$router.push('/admin/createCourse');
            break;
          case "4":
            this.$router.push('/admin/courseAudition');
            break;
          case "5-1":
            this.$router.push('/admin/conceptAudition');
            break;
          case "5-2":
            this.$router.push('/admin/conceptExtraction');
            break;
          case "6":
            this.$router.push('/admin/recommendationAudition');
            break;
        }
      },
  },
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 199px;
  min-height: 100vh;
}
</style>
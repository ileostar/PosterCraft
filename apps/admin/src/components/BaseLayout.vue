<script setup lang="ts">
import SideMenu from './SideMenu.vue'
import HeaderNav from './HeaderNav.vue'

// 侧边栏折叠状态
const isCollapse = ref(false)
// 面包屑导航数据
const breadcrumbs = ref(['首页', '系统管理'])
</script>

<template>
  <el-container class="h-screen w-screen">
    <!-- 侧边栏 -->
    <SideMenu :is-collapse="isCollapse" />
    <el-container>
      <!-- 顶部导航 -->
      <el-header class="flex items-center justify-between border-b bg-white px-4">
        <HeaderNav :is-collapse="isCollapse" :breadcrumbs="breadcrumbs" @update:is-collapse="isCollapse = $event" />
      </el-header>

      <!-- 主要内容区 -->
      <el-main class="bg-gray-100">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-aside {
  @apply bg-[#001529];
}

.el-header {
  @apply h-16 leading-16;
}
</style>

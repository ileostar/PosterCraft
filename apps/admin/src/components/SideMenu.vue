<script setup lang="ts">
import {
  Menu as IconMenu,
  Setting as IconSetting,
} from '@element-plus/icons-vue'

// 侧边栏折叠状态，通过props接收
defineProps<{
  isCollapse: boolean
}>()
</script>

<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" class="transition-all">
    <el-menu :collapse="isCollapse" class="h-full" default-active="1" background-color="#001529" text-color="#fff">
      <div class="h-16 flex items-center justify-center bg-transparent text-xl text-white font-bold font-serif">
        <Transition name="fade-transform">
          <div v-if="isCollapse" key="logo" class="cursor-pointer">
            <img class="h-8 w-8" src="/logo.png">
          </div>
          <span v-else key="text">PosterCraft</span>
        </Transition>
      </div>
      <RouterLink to="/">
        <el-menu-item index="/">
          <el-icon>
            <IconMenu />
          </el-icon>
          <span v-if="!isCollapse">仪表盘</span>
        </el-menu-item>
      </RouterLink>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <IconSetting />
          </el-icon>
          <span>系统管理</span>
        </template>
        <RouterLink to="/user">
          <el-menu-item index="/user">
            用户管理
          </el-menu-item>
        </RouterLink>
        <RouterLink to="/poster">
          <el-menu-item index="/poster">
            海报管理
          </el-menu-item>
        </RouterLink>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

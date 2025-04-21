<script setup lang="ts">
defineOptions({
  name: 'Dashboard',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-md shadow-sm p-4">
        <h3 class="text-lg font-medium text-gray-700 mb-2">总用户数</h3>
        <p class="text-2xl font-bold text-blue-500">1,234</p>
      </div>
      <div class="bg-white rounded-md shadow-sm p-4">
        <h3 class="text-lg font-medium text-gray-700 mb-2">今日活跃</h3>
        <p class="text-2xl font-bold text-green-500">256</p>
      </div>
      <div class="bg-white rounded-md shadow-sm p-4">
        <h3 class="text-lg font-medium text-gray-700 mb-2">海报总数</h3>
        <p class="text-2xl font-bold text-purple-500">5,678</p>
      </div>
      <div class="bg-white rounded-md shadow-sm p-4">
        <h3 class="text-lg font-medium text-gray-700 mb-2">系统状态</h3>
        <p class="text-2xl font-bold text-green-500">正常</p>
      </div>
    </div>
    
    <div class="bg-white rounded-md shadow-sm p-4 mt-4">
      <h3 class="text-lg font-medium text-gray-700 mb-4">最近活动</h3>
      <div class="space-y-2">
        <div class="flex items-center justify-between p-2 border-b border-gray-100">
          <span>用户 user123 登录了系统</span>
          <span class="text-sm text-gray-500">10分钟前</span>
        </div>
        <div class="flex items-center justify-between p-2 border-b border-gray-100">
          <span>管理员更新了系统配置</span>
          <span class="text-sm text-gray-500">1小时前</span>
        </div>
        <div class="flex items-center justify-between p-2 border-b border-gray-100">
          <span>新增用户注册: newuser456</span>
          <span class="text-sm text-gray-500">3小时前</span>
        </div>
      </div>
    </div>
  </div>
</template>

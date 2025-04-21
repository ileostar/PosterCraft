<script setup lang="ts">
defineOptions({
  name: 'Dashboard',
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
      <div class="rounded-md bg-white p-4 shadow-sm">
        <h3 class="mb-2 text-lg text-gray-700 font-medium">
          总用户数
        </h3>
        <p class="text-2xl text-blue-500 font-bold">
          1,234
        </p>
      </div>
      <div class="rounded-md bg-white p-4 shadow-sm">
        <h3 class="mb-2 text-lg text-gray-700 font-medium">
          今日活跃
        </h3>
        <p class="text-2xl text-green-500 font-bold">
          256
        </p>
      </div>
      <div class="rounded-md bg-white p-4 shadow-sm">
        <h3 class="mb-2 text-lg text-gray-700 font-medium">
          海报总数
        </h3>
        <p class="text-2xl text-purple-500 font-bold">
          5,678
        </p>
      </div>
      <div class="rounded-md bg-white p-4 shadow-sm">
        <h3 class="mb-2 text-lg text-gray-700 font-medium">
          系统状态
        </h3>
        <p class="text-2xl text-green-500 font-bold">
          正常
        </p>
      </div>
    </div>

    <div class="mt-4 rounded-md bg-white p-4 shadow-sm">
      <h3 class="mb-4 text-lg text-gray-700 font-medium">
        最近活动
      </h3>
      <div class="space-y-2">
        <div class="flex items-center justify-between border-b border-gray-100 border-solid p-2">
          <span>用户 user123 登录了系统</span>
          <span class="text-sm text-gray-500">10分钟前</span>
        </div>
        <div class="flex items-center justify-between border-b border-gray-100 border-solid p-2">
          <span>管理员更新了系统配置</span>
          <span class="text-sm text-gray-500">1小时前</span>
        </div>
        <div class="flex items-center justify-between border-b border-gray-100 border-solid p-2">
          <span>新增用户注册: newuser456</span>
          <span class="text-sm text-gray-500">3小时前</span>
        </div>
      </div>
    </div>
  </div>
</template>

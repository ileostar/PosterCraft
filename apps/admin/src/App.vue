<script setup lang="ts">
const router = useRouter()
/** 校验是否登录 */
function checkLoginStatus(): void {
  // 如果没有登录且不在登录页面，则跳转到登录页
  if (!localStorage.getItem('Authorization') && router.currentRoute.value.path !== '/login') {
    setTimeout(() => {
      router.push('/login')
    }, 1000)
    ElMessage.warning('请先登录')
    return
  }
  // 如果已登录且在登录页面，则跳转到首页
  if (localStorage.getItem('Authorization') && router.currentRoute.value.path === '/login') {
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<template>
  <main class="font-sans" text="center gray-700 dark:gray-200">
    <template v-if="router.currentRoute.value.path === '/login'">
      <RouterView />
    </template>
    <BaseLayout v-else />
  </main>
</template>

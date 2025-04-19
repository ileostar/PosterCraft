<script setup lang="ts">
const router = useRouter()
const loading = ref(false)

const loginForm = reactive({
  identifier: '',
  password: '',
})

async function handleLogin() {
  try {
    loading.value = true
    const { data, token } = await auth.login({
      identifier: loginForm.identifier,
      password: loginForm.password,
    })

    const { updateUserInfos } = useStore('user')
    updateUserInfos(data)

    // 将 token 存储到本地存储中
    localStorage.setItem('Authorization', token)

    // 登录成功后跳转到首页
    ElMessage.success('登录成功')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
  catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('登录失败，请检查用户名和密码')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="w-[400px] rounded-lg bg-white p-[30px] shadow-sm">
      <h2 class="mb-[30px] text-center text-2xl text-gray-800">
        登录
      </h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-[20px]">
          <label class="mb-[8px] block text-start text-gray-600">邮箱/用户名</label>
          <input
            v-model="loginForm.identifier" type="text" placeholder="请输入邮箱或用户名"
            class="w-full border border-gray-300 rounded-md border-solid px-[10px] py-[10px] text-[14px] focus:border-blue-400 focus:outline-none"
            required
          >
        </div>
        <div class="mb-[20px]">
          <label class="mb-[8px] block text-start text-gray-600">密码</label>
          <input
            v-model="loginForm.password" type="password" placeholder="请输入密码"
            class="w-full border border-gray-300 rounded-md border-solid px-[10px] py-[10px] text-[14px] focus:border-blue-400 focus:outline-none"
            required
          >
        </div>
        <button
          type="submit" :disabled="loading"
          class="w-full rounded-md bg-blue-500 py-[12px] text-[16px] text-white transition duration-200 disabled:cursor-not-allowed disabled:bg-blue-300 hover:bg-blue-600"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

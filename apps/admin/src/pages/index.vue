<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const router = useRouter()

const name = ref('')
const { msg } = useStore('home')

/**
 * 跳转链接
 * Navigates to the "hi" route with the value of the "name" input field
 *
 * @return {void}
 */
function go(): void {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

/** 校验登录 */
function checkLogin(): void {
  if (localStorage.getItem('token'))
    return
  router.push('/login')
  ElMessage.warning('请先登录')
}
onMounted(() => {
  checkLogin()
})
</script>

<template>
  <TheStudy />
  <h2 class="m-3">
    <o-text class="read-the-docs text-6 font-bold" font="bold" size="lg" gradient="linear-gradient(to right, #0c02ba, #00ff95)">
      {{ msg }}
    </o-text>
  </h2>
  <div class="card">
    <p color-gray>
      Click on the  logos to learn more
    </p>
    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />
    <div>
      <o-button
        class="mt-2"
        type="info"
        :disabled="!name"
        @click="go"
      >
        Go
      </o-button>
    </div>
  </div>
</template>

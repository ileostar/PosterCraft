export default defineStore('home', () => {
  const count = ref(0)
  const msg = ref('Vite+Vue3+Pinia+UnoCSS+Alova+Vitest')

  const updateCount = () => {
    count.value++
  }

  return {
    count,
    msg,
    updateCount,
  }
})

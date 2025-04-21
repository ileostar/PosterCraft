import { createRouter, createWebHistory } from 'vue-router/auto'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'

import store from './store'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

store.use(piniaPluginPersistedstate)
app.use(router)
app.use(store)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')

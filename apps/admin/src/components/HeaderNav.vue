<script setup lang="ts">
import {
  Menu as IconMenu,
  User as IconUser,
} from '@element-plus/icons-vue'

// 接收父组件传递的属性
const props = defineProps<{
  isCollapse: boolean
  breadcrumbs: string[]
}>()

// 定义事件
const emit = defineEmits<{
  'update:isCollapse': [value: boolean]
}>()

// 切换侧边栏折叠状态
function toggleCollapse() {
  emit('update:isCollapse', !props.isCollapse)
}

const { userInfos } = useStore('user')
const router = useRouter()
/** 退出登录 */
function logout() {
  try {
    localStorage.clear()
    ElMessage.success('退出登录成功')
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  }
  catch {
    ElMessage.error('出错了')
  }
}
</script>

<template>
  <div class="flex items-center">
    <el-icon class="mr-4 cursor-pointer text-xl" @click="toggleCollapse">
      <IconMenu />
    </el-icon>
  </div>
  <div class="flex items-center">
    <el-dropdown>
      <span class="flex cursor-pointer items-center">
        <el-avatar size="small" class="mr-2">
          <el-icon>
            <IconUser />
          </el-icon>
        </el-avatar>
        <span class="text-sm">{{ userInfos.username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <RouterLink :to="`/user/${userInfos.userId}`">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </RouterLink>
          <RouterLink to="/auth/update">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </RouterLink>
          <el-dropdown-item divided @click="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.el-header {
  @apply h-16 leading-16;
}
</style>

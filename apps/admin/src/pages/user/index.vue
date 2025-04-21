<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import user from '@/api/methods/user'

// 定义用户接口
interface User {
  id?: number | string
  [key: string]: any
}

// 定义搜索参数接口
interface SearchParams {
  [key: string]: any
}

// 定义API响应接口
interface ApiResponse<T> {
  code: number
  data: T
  total?: number
  message?: string
}

defineOptions({
  name: 'UserPage',
})

const { allUsers, updateAllUsers } = useStore('user')
const formVisible = ref(false)
const currentUser = ref<User>({})
const loading = ref(false)

// 分页参数
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})

const isSearch = ref(false)

// 搜索参数
const searchParams = ref<SearchParams>({})

// 获取用户列表
async function getUserInfos() {
  try {
    loading.value = true
    const params = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...searchParams.value,
    }
    const res: ApiResponse<User[]> = await user.getAllUsers(params)

    if (res.code === 200) {
      updateAllUsers(res.data)
      pagination.total = res.total || res.data.length
      if (isSearch.value && (searchParams.value.username || searchParams.value.phone || searchParams.value.role)) {
        ElMessage.success('搜索成功')
      }
    }
  }
  catch (error) {
    console.error('获取用户列表失败:', error)
    ElMessage.error('获取用户列表失败')
  }
  finally {
    loading.value = false
  }
}

// 处理搜索
function handleSearch(params: SearchParams) {
  searchParams.value = params
  pagination.currentPage = 1 // 搜索时重置到第一页
  isSearch.value = true
  setTimeout(() => {
    isSearch.value = false
  }, 3000)
  getUserInfos()
}

// 处理重置
function handleReset() {
  searchParams.value = {}
  pagination.currentPage = 1
  getUserInfos()
}

// 处理分页变化
function handlePageChange(page: number) {
  pagination.currentPage = page
  getUserInfos()
}

// 处理每页条数变化
function handleSizeChange(size: number) {
  pagination.pageSize = size
  pagination.currentPage = 1
  getUserInfos()
}

// 打开新增用户表单
function handleAdd() {
  currentUser.value = {}
  formVisible.value = true
}

// 打开编辑用户表单
function handleEdit(row: User) {
  currentUser.value = { ...row }
  formVisible.value = true
}

// 处理表单提交
async function handleSubmit(userData: User) {
  try {
    if (currentUser.value.id) {
      // 编辑用户
      await user.updateUserInfo(String(currentUser.value.id), userData)
      ElMessage.success('更新用户成功')
    }
    else {
      // 添加用户
      await user.createUser({
        ...userData,
        password: userData.password === '' ? '123456' : userData.password,
      })
      ElMessage.success('添加用户成功')
    }

    // 先刷新数据，再重置表单状态
    await getUserInfos()
    formVisible.value = false
    currentUser.value = {}
  }
  catch (error: any) {
    console.error('操作失败:', error)
    ElMessage.error(`操作失败: ${error.message || '未知错误'}`)
  }
}

// 删除用户
async function handleDelete(id: number | string) {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await user.deleteUser(String(id))
    ElMessage.success('删除用户成功')
    await getUserInfos()
  }
  catch (error: any) {
    if (error !== 'cancel')
      ElMessage.error(`删除失败: ${error.message || '未知错误'}`)
  }
}

onMounted(() => {
  getUserInfos()
})
</script>

<template>
  <div class="user-page">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-bold">
        用户管理
      </h2>
      <el-button type="primary" @click="handleAdd">
        新增用户
      </el-button>
    </div>

    <!-- 搜索组件 -->
    <UserSearch
      :loading="loading"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 用户表格组件 -->
    <UserTable
      :users="allUsers"
      :loading="loading"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- 分页组件 -->
    <div class="background pagination-container mt-4 flex justify-end !p-4">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total || allUsers.length"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 用户表单组件 -->
    <UserForm
      v-model:visible="formVisible"
      :user="currentUser"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.user-page {
  min-height: calc(100vh - 120px);
  background-color: #f5f7fa;
}

.pagination-container {
  margin-top: 20px;
  padding: 10px 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>

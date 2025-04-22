<script setup lang="ts">
// 定义工作区接口
interface Work {
  workId?: string
  title?: string
  desc?: string
  isTemplate?: boolean
  isPublic?: boolean
  isHot?: boolean
  content?: any
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
  name: 'PosterPage',
})

const { allWorks, updateAllWorks } = useStore('work')
const formVisible = ref(false)
const currentWork = ref<Work>({})
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

// 获取工作区列表
async function getWorkInfos() {
  try {
    loading.value = true
    const params = {
      pageIndex: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...searchParams.value,
    }
    const res: ApiResponse<any> = await work.getWorksList(params)

    if (res.code === 200) {
      updateAllWorks(res.data)
      pagination.total = res.data.count || 0
      if (isSearch.value && searchParams.value.title) {
        ElMessage.success('搜索成功')
      }
    }
  }
  catch (error) {
    console.error('获取工作区列表失败:', error)
    ElMessage.error('获取工作区列表失败')
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
  getWorkInfos()
}

// 处理重置
function handleReset() {
  searchParams.value = {}
  pagination.currentPage = 1
  getWorkInfos()
}

// 处理分页变化
function handlePageChange(page: number) {
  pagination.currentPage = page
  getWorkInfos()
}

// 处理每页条数变化
function handleSizeChange(size: number) {
  pagination.pageSize = size
  pagination.currentPage = 1
  getWorkInfos()
}

// 打开新增工作区表单
function handleAdd() {
  currentWork.value = {}
  formVisible.value = true
}

// 打开编辑工作区表单
function handleEdit(row: Work) {
  currentWork.value = { ...row }
  formVisible.value = true
}

// 处理表单提交
async function handleSubmit(workData: Work) {
  try {
    if (currentWork.value.workId) {
      // 编辑工作区
      await work.updateWork(String(currentWork.value.workId), workData)
      ElMessage.success('更新工作区成功')
    }
    else {
      // 添加工作区
      await work.createWork(workData)
      ElMessage.success('添加工作区成功')
    }

    // 先刷新数据，再重置表单状态
    await getWorkInfos()
    formVisible.value = false
    currentWork.value = {}
  }
  catch (error: any) {
    console.error('操作失败:', error)
    ElMessage.error(`操作失败: ${error.message || '未知错误'}`)
  }
}

// 删除工作区
async function handleDelete(workId: string) {
  try {
    await ElMessageBox.confirm('确定要删除该工作区吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await work.deleteWork(workId)
    ElMessage.success('删除工作区成功')
    await getWorkInfos()
  }
  catch (error: any) {
    if (error !== 'cancel')
      ElMessage.error(`删除失败: ${error.message || '未知错误'}`)
  }
}

// 预览工作区
async function handlePreview(workId: string) {
  try {
    const res = await work.previewWork(workId)
    if (res.code === 200) {
      ElMessage.success('获取预览地址成功')
      // 可以在这里处理返回的URL，比如打开新窗口
      window.open(res.data.url, '_blank')
    }
  }
  catch (error: any) {
    ElMessage.error(`获取预览地址失败: ${error.message || '未知错误'}`)
  }
}

onMounted(() => {
  getWorkInfos()
})
</script>

<template>
  <div class="poster-page">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-bold">
        海报工作区管理
      </h2>
      <el-button type="primary" @click="handleAdd">
        新增工作区
      </el-button>
    </div>

    <!-- 搜索组件 -->
    <WorkSearch
      :loading="loading"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 工作区表格组件 -->
    <WorkTable
      :works="allWorks"
      :loading="loading"
      @edit="handleEdit"
      @delete="handleDelete"
      @preview="handlePreview"
    />

    <!-- 分页组件 -->
    <div class="background pagination-container mt-4 flex justify-end !p-4">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total || allWorks.length"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 工作区表单组件 -->
    <WorkForm
      v-model:visible="formVisible"
      :work="currentWork"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.poster-page {
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

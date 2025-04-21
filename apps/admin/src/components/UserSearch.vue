<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['search', 'reset'])

const searchForm = reactive({
  username: '',
  role: 'normal',
  phone: '',
})

// 搜索
function handleSearch() {
  emit('search', { ...searchForm })
}

// 重置
function handleReset() {
  Object.keys(searchForm).forEach((key) => {
    (searchForm as any)[key] = ''
  })
  emit('reset')
}
</script>

<template>
  <div class="search-container mb-4 rounded bg-white p-4 shadow-sm">
    <el-form :inline="true" :model="searchForm" class="flex flex-wrap items-end">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="searchForm.role" placeholder="请选择角色" clearable>
          <el-option label="管理员" value="admin" />
          <el-option label="普通用户" value="normal" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone" placeholder="请输入手机号" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="props.loading" @click="handleSearch">
          搜索
        </el-button>
        <el-button :disabled="props.loading" @click="handleReset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

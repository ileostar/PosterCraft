<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['search', 'reset'])

const searchForm = reactive({
  title: '',
  isTemplate: '',
  isPublic: '',
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
      <el-form-item label="标题">
        <el-input v-model="searchForm.title" placeholder="请输入标题" clearable />
      </el-form-item>
      <el-form-item label="是否模板">
        <el-select v-model="searchForm.isTemplate" placeholder="请选择" clearable>
          <el-option label="是" :value="true" />
          <el-option label="否" :value="false" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-select v-model="searchForm.isPublic" placeholder="请选择" clearable>
          <el-option label="是" :value="true" />
          <el-option label="否" :value="false" />
        </el-select>
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

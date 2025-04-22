<!-- eslint-disable vue/custom-event-name-casing -->
<script setup lang="ts">
interface Work {
  workId: string
  title: string
  desc?: string
  isTemplate?: boolean
  isPublic?: boolean
  isHot?: boolean
  content?: any
  author?: string
  createdAt?: string
  [key: string]: any
}

defineProps<{
  works: Work[]
  loading: boolean
}>()

const emit = defineEmits<{
  edit: [work: Work]
  delete: [workId: string]
  preview: [workId: string]
}>()

function handleEdit(row: Work) {
  emit('edit', row)
}

function handleDelete(row: Work) {
  emit('delete', row.workId)
}

function handlePreview(row: Work) {
  emit('preview', row.workId)
}
</script>

<template>
  <div class="table-container rounded bg-white shadow-sm">
    <el-table
      class="loading"
      :data="works"
      stripe
      highlight-current-row
      border
      :empty-text="loading ? '加载中...' : '暂无数据'"
    >
      <el-table-column prop="title" label="标题" min-width="120" />
      <el-table-column prop="desc" label="描述" min-width="150">
        <template #default="{ row }">
          {{ row.desc || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="isTemplate" label="是否模板" width="100">
        <template #default="{ row }">
          <el-tag :type="row.isTemplate ? 'success' : 'info'">
            {{ row.isTemplate ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isPublic" label="是否公开" width="100">
        <template #default="{ row }">
          <el-tag :type="row.isPublic ? 'success' : 'info'">
            {{ row.isPublic ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isHot" label="是否热门" width="100">
        <template #default="{ row }">
          <el-tag :type="row.isHot ? 'danger' : 'info'">
            {{ row.isHot ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" min-width="100">
        <template #default="{ row }">
          {{ row.author || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="195" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button type="info" size="small" @click="handlePreview(row)">
            预览
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.table-container {
  padding: 10px;
  overflow: hidden;
}
</style>

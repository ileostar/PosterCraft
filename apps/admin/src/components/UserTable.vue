<script setup lang="ts">
interface User {
  id: number | string
  username: string
  nickname?: string
  role: 'admin' | 'user'
  phone?: string
  email?: string
  createdAt: string
}

defineProps<{
  users: User[]
  loading: boolean
}>()

const emit = defineEmits<{
  edit: [user: User]
  delete: [id: User['id']]
}>()

function handleEdit(row: User) {
  emit('edit', row)
}

function handleDelete(row: User) {
  emit('delete', row.id)
}
</script>

<template>
  <div class="table-container rounded bg-white shadow-sm">
    <el-table
      class="loading"
      :data="users"
      stripe highlight-current-row border
      :empty-text="loading ? '加载中...' : '暂无数据'"
    >
      <el-table-column prop="username" label="用户名" min-width="120" />
      <el-table-column prop="nickname" label="昵称" min-width="120">
        <template #default="{ row }">
          {{ row.nickname || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="120">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : 'info'">
            {{ row.role === 'admin' ? '管理员' : '普通用户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" min-width="120">
        <template #default="{ row }">
          {{ row.phone || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="150">
        <template #default="{ row }">
          {{ row.email || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="180">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString('zh-CN') }}
        </template>
      </el-table-column>
      <el-table-column v-if="users.some(user => user.role !== 'admin')" label="操作" width="135" fixed="right">
        <template #default="{ row }">
          <template v-if="row.role !== 'admin'">
            <el-button type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">
              删除
            </el-button>
          </template>
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

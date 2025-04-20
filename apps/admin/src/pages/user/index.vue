<script setup lang="ts">
defineOptions({
  name: 'UserPage',
})

const { allUsers, updateAllUsers } = useStore('user')

async function getUserInfos() {
  try {
    const res = await user.getAllUsers()

    if (res.code === 200) {
      updateAllUsers(res.data)
    }
  }
  catch {
    ElMessage.error('出错了')
  }
}

onMounted(() => {
  getUserInfos()
})
</script>

<template>
  <div>
    <el-table :data="allUsers" style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称">
        <template #default="{ row }">
          {{ row.nickname || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag :type="row.role === 'admin' ? 'danger' : 'info'">
            {{ row.role === 'admin' ? '管理员' : '普通用户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="邮箱">
        <template #default="{ row }">
          {{ row.email || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template #default="{ row }">
          {{ new Date(row.createdAt).toLocaleString() }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

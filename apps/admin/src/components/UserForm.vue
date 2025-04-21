<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:visible', 'submit'])

const formRef = ref()
const form = reactive({
  username: '',
  nickname: '',
  email: '',
  phone: '',
  password: '',
  role: 'normal',
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  email: [
    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '请输入正确的邮箱地址', trigger: 'blur' },
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
}

// 监听用户数据变化，更新表单
watch(() => props.user, (newVal: Record<string, any>) => {
  if (newVal && Object.keys(newVal).length > 0) {
    (Object.keys(form) as Array<keyof typeof form>).forEach((key) => {
      if (key in newVal) {
        form[key] = newVal[key] as string
      }
    })
  }
  else {
    // 重置表单
    (Object.keys(form) as Array<keyof typeof form>).forEach((key) => {
      form[key] = key === 'role' ? 'normal' : ''
    })
  }
  // 重置表单校验状态
  formRef.value?.clearValidate()
}, { immediate: true, deep: true })

// 关闭对话框
function handleClose() {
  emit('update:visible', false)
  // 延迟重置表单，等待对话框关闭动画结束
  setTimeout(() => {
    formRef.value?.resetFields()
  }, 300)
}

// 提交表单
async function handleSubmit() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validate()
    emit('submit', { ...form })
  }
  catch (error) {
    console.error('表单验证失败:', error)
  }
}

defineExpose({
  form,
  handleSubmit,
})
</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="props.user.id ? '编辑用户' : '新增用户'"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @update:model-value="$emit('update:visible', $event)"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="right"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码，不填则初始化密码为123456"
          :disabled="!!props.user.id"
          show-password
        />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="admin" />
          <el-option label="普通用户" value="normal" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

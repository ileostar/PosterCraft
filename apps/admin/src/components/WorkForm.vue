<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  work: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:visible', 'submit'])

const formRef = ref()
const form = reactive({
  title: '',
  desc: '',
  isTemplate: false,
  isPublic: false,
  isHot: false,
  content: {},
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
}

// 监听工作区数据变化，更新表单
watch(() => props.work, (newVal: Record<string, any>) => {
  if (newVal && Object.keys(newVal).length > 0) {
    (Object.keys(form) as Array<keyof typeof form>).forEach((key) => {
      if (key in newVal) {
        form[key] = newVal[key]
      }
    })
  }
  else {
    // 重置表单
    form.title = ''
    form.desc = ''
    form.isTemplate = false
    form.isPublic = false
    form.isHot = false
    form.content = {}
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
    :title="props.work.workId ? '编辑工作区' : '新增工作区'"
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
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="是否模板">
        <el-switch v-model="form.isTemplate" />
      </el-form-item>
      <el-form-item label="是否公开">
        <el-switch v-model="form.isPublic" />
      </el-form-item>
      <el-form-item label="是否热门">
        <el-switch v-model="form.isHot" />
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

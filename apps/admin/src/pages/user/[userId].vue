<script setup lang="ts">
defineOptions({
  name: 'UserPage',
})

const params = useRoute('/user/[userId]').params
</script>

<template>
  <div>
    {{ params }}
  </div>
</template>

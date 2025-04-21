<script setup lang="ts">
defineOptions({
  name: 'UserPage',
})

const params = useRoute('/user/[userId]').params

const { userInfos } = useStore('user')
</script>

<template>
  <div>
    {{ params }}
    {{ userInfos }}
  </div>
</template>

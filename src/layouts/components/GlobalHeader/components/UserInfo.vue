<template>
    <n-space justify="space-around" align="center" style="gap:8px;margin-right: 20px;cursor: pointer;">
        <n-avatar round v-if="user.avatar" size="small" :src="user.avatar"></n-avatar>
        <n-el tag="span" v-text="user.name"></n-el>
    </n-space>
</template>
<script setup lang="ts">
import { getUserInfo } from '@/utils'
import userImg from '@/assets/images/user.png'
const user = reactive({
    avatar: userImg,
    name: ""
})
onMounted(() => {
    const data = getUserInfo() as any
    if (data.avatar) {
        user.avatar = data.avatar
    }
    user.name = data.name
})
</script>
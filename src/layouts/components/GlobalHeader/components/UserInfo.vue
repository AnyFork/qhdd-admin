<template>
    <n-space justify="space-around" align="center" style="gap: 8px; margin-right: 20px; cursor: pointer">
        <n-avatar round size="small" :src="userInfo?.avatar ?? userImg" class="mt-2"></n-avatar>
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
            <n-el tag="span" class="font-bold">{{ userInfo?.name }}</n-el>
        </n-dropdown>
        <ModifyPersonDialog v-if="modifyShow" v-model:open="modifyShow" :rowNode="userInfo!"></ModifyPersonDialog>
    </n-space>
</template>
<script setup lang="ts">
import userImg from '@/assets/images/user.png'
const modifyShow = ref(false)
const userInfo = ref<system.adminInfo>()
const options = [
    {
        label: '修改信息',
        key: 'myBaseInfo'
    }
]
const handleSelect = (_key: string | number) => {
    modifyShow.value = true
}
onMounted(() => {
    userInfo.value = getPlatformUserInfo() as system.adminInfo
})
</script>

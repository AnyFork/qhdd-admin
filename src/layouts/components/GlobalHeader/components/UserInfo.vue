<template>
    <n-space justify="space-around" align="center" style="gap: 8px; margin-right: 20px; cursor: pointer">
        <n-tag v-if="storeName && openPageUserType != 'platform'" type="primary" size="small" class="font-bold">{{ storeName }}</n-tag>
        <n-avatar round size="small" :src="userAvatar" class="mt-2"></n-avatar>
        <n-dropdown v-if="!roleName" trigger="hover" :options="options">
            <n-el tag="span" class="font-bold">{{ userName }}</n-el>
        </n-dropdown>
        <n-badge v-else :offset="[0, -2]">
            <n-el tag="span" class="font-bold">{{ userName }}</n-el>
            <template #value>
                <span class="text-10px w-30px">{{ roleName }}</span>
            </template>
        </n-badge>
        <ModifyPersonDialog v-if="modifyShow" v-model:open="modifyShow" :rowNode="(userInfo as system.adminInfo)"></ModifyPersonDialog>
    </n-space>
</template>
<script setup lang="ts">
const { userInfo, userName, userAvatar, storeName, roleName, openPageUserType } = useLoginUser()
const modifyShow = ref(false)
const options = [
    {
        label: '修改信息',
        key: 'myBaseInfo',
        props: {
            onClick: () => {
                modifyShow.value = true
            }
        }
    }
]
</script>

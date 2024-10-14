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
        <!--平台用户修改密码-->
        <ModifyPersonDialog v-if="modifyShow && showPlatformComputed" v-model:open="modifyShow" :rowNode="(userInfo as system.adminInfo)"></ModifyPersonDialog>
        <!--连锁店用户修改密码 -->
        <ModifyChainAdminDialog v-if="modifyShow && showChainComputed" v-model:open="modifyShow" :rowNode="(userInfo as chain.chainAdmin)"></ModifyChainAdminDialog>
    </n-space>
</template>
<script setup lang="ts">
const { userInfo, userName, userAvatar, storeName, roleName, openPageUserType } = useLoginUser()
console.log(userInfo.value)
const modifyShow = ref(false)
const { chainInfoFrom } = useChainInfo()
const { storeInfoFrom } = useStoreInfo()
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
const showPlatformComputed = computed(() => chainInfoFrom.value == 1 || storeInfoFrom.value == 1)
const showChainComputed = computed(() => chainInfoFrom.value == 2 || storeInfoFrom.value == 3)
</script>

<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="连锁店名称">
                <n-input v-model:value="searchForm.title" placeholder="请输入连锁店名称" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="管理员">
                <n-select v-model:value="searchForm.chainerId" :options="chainAdmin" placeholder="请选择管理员" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="连锁店状态">
                <n-select v-model:value="searchForm.status" :options="bindOptions" placeholder="请选择连锁店状态" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="getChainListInfo">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getChainListInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.clerk) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { getChainListInfo, searchForm, tableData, loading, pagination, columns } = useChain()
const { chainAdminSelect } = useChainAdmin()

/**
 * 表格高度
 */
const tableHeight = computed(() => height.value - 330)

/**
 * 连锁店管理员
 */
const chainAdmin = ref()

/**
 * 账号状态
 */
const bindOptions = [
    {
        label: '启用',
        value: 1
    },
    {
        label: '禁用',
        value: 0
    }
]

onMounted(async () => {
    searchForm.isDelete = 1
    getChainListInfo()
    chainAdmin.value = await chainAdminSelect()
})
</script>

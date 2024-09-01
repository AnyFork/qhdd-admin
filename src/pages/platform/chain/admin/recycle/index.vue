<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="管理员姓名">
                <n-input v-model:value="searchForm.realname" placeholder="请输入管理员姓名" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="管理员手机号码">
                <n-input v-model:value="searchForm.mobile" placeholder="请输入管理员手机号码" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="账号状态">
                <n-select v-model:value="searchForm.status" :options="bindOptions" placeholder="请选择账号状态" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="chainAdminList">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="chainAdminList"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.clerk) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { chainAdminList, searchForm, tableData, loading, pagination, columns } = useChainAdmin()

// 表格高度
const tableHeight = computed(() => height.value - 330)

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

onMounted(() => {
    searchForm.isDelete = 1
    chainAdminList()
})
</script>

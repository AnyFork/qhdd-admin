<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="店员姓名">
                <n-input v-model:value="searchForm.title" placeholder="请输入店员姓名" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="店员昵称">
                <n-input v-model:value="searchForm.nickname" placeholder="请输入店员昵称" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="店员手机号码">
                <n-input v-model:value="searchForm.mobile" placeholder="请输入店员手机号码" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="绑定状态">
                <n-select :default-value="searchForm.bindStoreStatus" :options="bindOptions" placeholder="请选择绑定状态" clearable class="w-180px" :onUpdateValue="changeValue" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="clerkList">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="clerkList"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.clerk) => `${rowData.id}`" :loading="loading" :min-height="tableHeight" :max-height="tableHeight" />
    <!-- 编辑平台管理员dialog -->
    <BindStoreDialog v-if="modifyShow" v-model:open="modifyShow" :storeOptions="storeOptions" :rowNode="rowNode!" @refresh="clerkList"></BindStoreDialog>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const storeOptions = ref<{ label: string; value: string }[]>([])
const { clerkList, pagination, tableData, loading, columns, modifyShow, rowNode, searchForm } = usePlatformClerk()
const { storeSelectList } = usePlatformStore()
// 表格高度
const tableHeight = computed(() => height.value - 330)
/**
 * 绑定与否option
 */
const bindOptions = [
    {
        label: '已绑定',
        value: '1'
    },
    {
        label: '未绑定',
        value: '0'
    }
]
/**
 * 值发生改变时触发
 * @param value
 */
const changeValue = (value: number | null) => {
    searchForm.bindStoreStatus = value == null ? undefined : value
}

onMounted(async () => {
    clerkList()
    storeOptions.value = await storeSelectList()
})
</script>

<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="配送员姓名">
                <n-input v-model:value="searchForm.title" placeholder="请输入配送员姓名" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="配送员昵称">
                <n-input v-model:value="searchForm.nickname" placeholder="请输入配送员昵称" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="配送员手机号码">
                <n-input v-model:value="searchForm.mobile" placeholder="请输入店员手机号码" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="账号状态">
                <n-select :default-value="searchForm.status" :options="bindOptions" placeholder="请选择账号状态" clearable class="w-180px" :onUpdateValue="changeValue" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="riderList">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="riderList"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.clerk) => `${rowData.id}`" :loading="loading" :min-height="tableHeight" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { riderList, pagination, tableData, loading, columns, searchForm } = usePlatformRider()
// 表格高度
const tableHeight = computed(() => height.value - 340)

/**
 * 账号状态
 */
const bindOptions = [
    {
        label: '正常',
        value: '1'
    },
    {
        label: '禁用',
        value: '3'
    }
]
/**
 * 值发生改变时触发
 * @param value
 */
const changeValue = (value: any) => {
    searchForm.status = value == null ? undefined : value
}

onMounted(() => {
    searchForm.status = 2
    riderList()
})
</script>

<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-button type="primary" @click="addTag" :disabled="!isAdmin">创建标签</n-button>
        <n-form :show-feedback="false" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="标签类型">
                <n-select v-model:value="searchForm.type" :options="option" placeholder="请选择标签类型" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="categoryPageList">查询</n-button>
            </div>
        </n-form>
    </n-space>
    <!--数据表格 -->
    <n-data-table striped remote :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :on-update:page="pageChange" :row-key="(rowData:store.category) => `${rowData.id}`" :loading="loading" :min-height="tableHeight" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const { categoryPageList, pagination, tableData, loading, columns, pageChange, searchForm } = usePlatformTag()
const { height } = useWindowSize()
const { isAdmin } = useLoginUser()
// 表格高度
const tableHeight = computed(() => height.value - 370)
/**
 * 下拉选项
 */
const option = [
    {
        label: '商户标签',
        value: 'TY_store_label'
    },
    {
        label: '配送标签',
        value: 'TY_delivery_label'
    },
    {
        label: '服务标签',
        value: 'TY_service_label'
    }
]
/**
 * 创建一条记录
 */
const addTag = () => {
    tableData.value.push({
        title: '',
        color: '',
        textColor: '',
        type: 'TY_delivery_label',
        displayorder: 0
    })
}

onMounted(() => {
    categoryPageList()
})
</script>

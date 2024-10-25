<template>
    <n-flex align="center" justify="space-between" class="py-2">
        <div class="flex-row-between gap-4">
            <n-form-item label="店铺名称" label-placement="left" :show-feedback="false" :size="size">
                <n-select v-model:value="searchForm.storeTitle" value-field="label" :options="allStore" filterable placeholder="请选择店铺名称" clearable class="w-200px" />
            </n-form-item>
            <n-form-item label="商品名称" label-placement="left" :show-feedback="false" :size="size">
                <n-input v-model:value="searchForm.title" placeholder="请输入商品名称" clearable class="!w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" :size="size" @click="searchData">查询</n-button>
            </div>
        </div>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="goodsListData"></TableHeaderOperation>
    </n-flex>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { goodsListData, pagination, tableData, loading, columns, searchForm } = usePlatformGoods()
const { height } = useWindowSize()
const { storeSelectList, allStore } = usePlatformStore()
// 表格高度
const tableHeight = computed(() => height.value - 350)

/**
 * 点击查询按钮,分页默认为1
 */
const searchData = () => {
    pagination.page = 1
    goodsListData()
}

onMounted(async () => {
    storeSelectList({})
    goodsListData()
})
</script>

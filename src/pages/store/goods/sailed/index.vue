<template>
    <n-space align="center" justify="space-between" class="pb-2">
        <div class="flex items-center">
            <n-form-item label="查询时间" label-placement="left" :show-feedback="false" :size="size">
                <n-date-picker v-model:value="searchForm.range" type="daterange" clearable placeholder="请选择时间区间" class="w-255px" />
            </n-form-item>
            <n-button round type="primary" :loading="loading" class="ml-4" @click="searchData">
                <template #icon>
                    <Icon icon="material-symbols-light:search"></Icon>
                </template>
                查询
            </n-button>
            <n-button round type="success" :size="size" :loading="loading" class="w-100px ml-4" @click="exportData">
                <template #icon>
                    <Icon icon="ph:export"></Icon>
                </template>
                导出
            </n-button>
        </div>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="goodsListData"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { goodsListData, pagination, tableData, loading, columns, searchForm, goodsCategoryTree, exportData } = useStoreGoodsSailed()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 390)

/**
 * 点击查询按钮,分页默认为1
 */
const searchData = () => {
    pagination.page = 1
    goodsListData()
}

onMounted(async () => {
    goodsListData()
    goodsCategoryTree()
})
</script>

<template>
    <n-flex align="center" justify="space-between" class="pb-2">
        <n-flex>
            <n-form-item label="连锁店" label-placement="left" :show-feedback="false" :size="size">
                <n-select v-model:value="searchForm.chainid" :options="chainOptions" placeholder="请选择连锁店" clearable class="w-140px" />
            </n-form-item>
            <n-form-item label="店铺名称" label-placement="left" :show-feedback="false" :size="size">
                <n-select v-model:value="searchForm.sid" :options="allStore" placeholder="请选择店铺" clearable class="w-160px" :on-update:value="onUpDateValue" />
            </n-form-item>
            <n-form-item label="下单时间" label-placement="left" :show-feedback="false" :size="size">
                <n-date-picker v-model:value="searchForm.range" type="daterange" clearable class="w-260px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" :size="size" class="w-100px" @click="getAllList">
                    <template #icon>
                        <Icon icon="material-symbols-light:search"></Icon>
                    </template>
                    查询
                </n-button>
                <n-button round type="success" :size="size" class="w-100px ml-4" @click="exportOrder(storeTitle)">
                    <template #icon>
                        <Icon icon="ph:export"></Icon>
                    </template>
                    导出
                </n-button>
            </div>
        </n-flex>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getAllList"></TableHeaderOperation>
    </n-flex>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :size="size" :columns="columns" :data="tableData" :pagination="pagination" :scroll-x="1800" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" />
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { SelectBaseOption } from 'naive-ui/es/select/src/interface'
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getAllList, pagination, tableData, loading, columns, exportOrder, searchForm, chainSelectList, chainOptions } = usePlatformOrderLog()
const { storeSelectList, allStore } = usePlatformStore()
const storeTitle = ref()

/**
 * 值更新时获取
 */
const onUpDateValue = (value: number | null, option: SelectBaseOption | null) => {
    searchForm.sid = value ?? undefined
    storeTitle.value = option?.label || undefined
}

onMounted(() => {
    getAllList()
    storeSelectList()
    chainSelectList()
})
</script>

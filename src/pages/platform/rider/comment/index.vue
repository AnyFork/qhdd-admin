<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="配送质量">
                <n-select v-model:value="searchForm.deliveryService" :options="serviceOption" placeholder="请选择配送质量" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="配送员姓名">
                <n-input v-model:value="searchForm.deliveryerTitle" placeholder="请输入配送员姓名" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="时间筛选">
                <n-date-picker v-model:value="range" type="daterange" clearable />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="getCommentListInfo">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getCommentListInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:order.comment) => `${rowData.id}`" :loading="loading" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getCommentListInfo, pagination, tableData, loading, columns, searchForm } = useRiderComment()
const range = ref<[number, number]>()

/**
 * 商品/配送质量
 */
const serviceOption = [
    {
        label: '一星',
        value: 1
    },
    {
        label: '二星',
        value: 2
    },
    {
        label: '三星',
        value: 3
    },
    {
        label: '四星',
        value: 4
    },
    {
        label: '五星',
        value: 5
    }
]

onMounted(() => {
    getCommentListInfo()
})

watchEffect(() => {
    if (range.value) {
        searchForm.addtimeStart = range.value[0] / 1000
        searchForm.addtimeEnd = range.value[1] / 1000
    } else {
        searchForm.addtimeStart = undefined
        searchForm.addtimeEnd = undefined
    }
})
</script>

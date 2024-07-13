<template>
    <n-space align="center" justify="end" class="mb-2">
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getStoreClerkList"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.clerk) => `${rowData.id}`" :loading="loading" :min-height="tableHeight" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { getStoreClerkList, pagination, tableData, loading, columns } = useStoreClerk()
// 表格高度
const tableHeight = computed(() => height.value - 340)

onMounted(async () => {
    getStoreClerkList()
})
</script>

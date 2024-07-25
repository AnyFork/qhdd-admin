<template>
    <n-space align="center" justify="end" class="my-2">
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="printerLogsInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { printerLogsInfo, tableData, loading, columns, pagination } = useStoreDeviceLog()

onMounted(async () => {
    printerLogsInfo()
})
</script>

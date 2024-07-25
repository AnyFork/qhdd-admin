<template>
    <n-space align="center" justify="space-between" class="my-2">
        <div class="flex-row-center gap-2">
            <n-button type="primary" @click="CreateShow = true">添加设备</n-button>
        </div>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="printerListInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :size="size" :columns="columns" :data="tableData" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
    <!-- 增加设备 -->
    <CreateDeviceDrawer v-if="CreateShow" v-model:active="CreateShow" @refresh="printerListInfo"></CreateDeviceDrawer>
    <!-- 修改商品 -->
    <UpdateDeviceDrawer v-if="UpdateShow" v-model:active="UpdateShow" :data="rowNode!" @refresh="printerListInfo"></UpdateDeviceDrawer>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { printerListInfo, tableData, loading, columns, CreateShow, rowNode, UpdateShow } = useStoreDevice()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 390)

onMounted(async () => {
    printerListInfo()
})
</script>

<template>
    <n-space align="center" justify="space-between" class="my-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="红包类型">
                <n-select v-model:value="searchForm.type" :options="packetTypeOption" placeholder="请选择红包类型" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="红包状态">
                <n-select v-model:value="searchForm.status" :options="packetStatusOption" placeholder="请选择红包状态" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="微信昵称">
                <n-input v-model:value="searchForm.nickname" placeholder="请输入使用者微信昵称" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="领取时间">
                <n-date-picker v-model:value="searchForm.range" type="daterange" clearable placeholder="请选择时间区间" class="w-255px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" :loading="loading" @click="searchData">
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
        </n-form>
    </n-space>
    <div class="my-1">
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="searchData"></TableHeaderOperation>
    </div>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :scroll-x="2400" :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
    <!--发送红包弹框-->
    <UpdateDeliveryPacket v-if="EditShow" v-model:showModel="EditShow" :rowData="rowNode!" @refresh="searchData"></UpdateDeliveryPacket>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { packetListData, pagination, tableData, loading, columns, rowNode, EditShow, searchForm, packetTypeOption, packetStatusOption, exportData } = usePlatformPacket()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 417)

/**
 * 点击查询进行搜索
 */
const searchData = () => {
    pagination.page = 1
    packetListData()
}
onMounted(async () => {
    packetListData()
})
</script>

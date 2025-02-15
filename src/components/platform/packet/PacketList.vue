<template>
    <n-drawer v-model:show="active" :default-width="1000" :min-width="1000" resizable placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content :title="rowData.nickname + '的红包'" closable>
            <n-space align="center" justify="space-between" class="my-2">
                <n-form :show-feedback="false" size="medium" inline :model="searchForm" label-placement="left" class="justify-end">
                    <n-form-item label="红包类型">
                        <n-select v-model:value="searchForm.type" :options="packetTypeOption" placeholder="请选择红包类型" clearable class="w-180px" />
                    </n-form-item>
                    <n-form-item label="红包状态">
                        <n-select v-model:value="searchForm.status" :options="packetStatusOption" placeholder="请选择红包状态" clearable class="w-180px" />
                    </n-form-item>
                    <div style="display: flex; justify-content: flex-end">
                        <n-button round type="primary" @click="refresh">查询</n-button>
                    </div>
                </n-form>
            </n-space>
            <!--数据表格 -->
            <n-data-table :single-line="false" striped remote :scroll-x="2400" size="medium" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" />
        </n-drawer-content>
    </n-drawer>
    <!-- 编辑门店弹窗 -->
    <UpdateDeliveryPacket v-if="EditShow" v-model:showModel="EditShow" :rowData="rowNode!" @refresh="refresh"></UpdateDeliveryPacket>
</template>

<script setup lang="ts">
const active = defineModel<boolean>('active')
const props = defineProps<{ rowData: userInfo.user }>()
const emit = defineEmits<{ refresh: [] }>()
const { packetListData, pagination, tableData, loading, columns, searchForm, EditShow, rowNode, packetTypeOption, packetStatusOption } = useCustomerPacket()

/**
 * 刷新数据
 */
const refresh = () => {
    pagination.page = 1
    searchForm.uid = props.rowData.id
    packetListData()
}

onMounted(async () => {
    refresh()
})
</script>

<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="顾客昵称">
                <n-input v-model:value="searchForm.nickname" placeholder="请输入顾客昵称" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="顾客UID">
                <n-input v-model:value="searchForm.id" placeholder="请输入顾客UID" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="配送地址手机检索">
                <n-input v-model:value="searchForm.addressMobile" placeholder="请输入配送地址手机号码" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="getCustomerListInfo">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getCustomerListInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :scroll-x="1900" border :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:userInfo.user) => `${rowData.uid}`" :loading="loading" :max-height="tableHeight" />
    <!--给某人发红包modal -->
    <DeliveryPacket v-if="distributeShow" v-model:showModel="distributeShow" :rowData="rowNode!" @refresh="getCustomerListInfo"></DeliveryPacket>
    <!--红包列表情况-->
    <PacketList v-if="showDetail" v-model:active="showDetail" :rowData="rowNode!"></PacketList>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { getCustomerListInfo, pagination, tableData, loading, columns, searchForm, distributeShow, rowNode, showDetail } = useCustomer()
// 表格高度
const tableHeight = computed(() => height.value - 340)

onMounted(() => {
    getCustomerListInfo()
})
</script>

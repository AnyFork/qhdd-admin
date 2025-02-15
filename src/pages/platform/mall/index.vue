<template>
    <n-space justify="space-between" class="mb-2">
        <n-button type="primary" class="w-100px" @click="addShow = true" :disabled="!isAdmin">创建活动</n-button>
        <div>
            <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end mb-2">
                <n-form-item label="活动类型">
                    <n-select v-model:value="searchForm.type" :options="packetTypeOption" placeholder="请选择活动类型" clearable class="w-180px" />
                </n-form-item>
                <n-form-item label="活动状态">
                    <n-select v-model:value="searchForm.status" :options="packetStatusOption" placeholder="请选择活动状态" clearable class="w-180px" />
                </n-form-item>
                <div style="display: flex; justify-content: flex-end">
                    <n-button round type="primary" @click="searchData">查询</n-button>
                </div>
            </n-form>
            <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="searchData"></TableHeaderOperation>
        </div>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :scroll-x="2400" :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
    <!--创建商城活动-->
    <createMallActivity v-if="addShow" v-model:showModel="addShow" @refresh="searchData"></createMallActivity>
    <!--编辑商城活动-->
    <updateMallActivity v-if="editShow" v-model:showModel="editShow" :rowData="rowNode!" @refresh="searchData"></updateMallActivity>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const { isAdmin } = useLoginUser()
const striped = ref(true)
const { packetListData, pagination, tableData, loading, columns, rowNode, editShow, addShow, searchForm, packetTypeOption, packetStatusOption } = usePlatformMallActivity()
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

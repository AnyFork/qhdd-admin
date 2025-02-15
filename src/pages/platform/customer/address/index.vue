<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="收货人UID">
                <n-input v-model:value="(searchForm.uid as unknown as string | undefined)" placeholder="请输入收货人UID" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="收货人姓名">
                <n-input v-model:value="searchForm.realname" placeholder="请输入收货人姓名" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="收货人电话">
                <n-input v-model:value="searchForm.mobile" placeholder="请输入收货人电话" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="收货人地址">
                <n-input v-model:value="searchForm.address" placeholder="请输入收货人地址" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="getCustomerAddress">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getCustomerAddress"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:order.comment) => `${rowData.id}`" :loading="loading" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getCustomerAddress, pagination, tableData, loading, columns, searchForm } = useAddress()

onMounted(async () => {
    getCustomerAddress()
})
</script>

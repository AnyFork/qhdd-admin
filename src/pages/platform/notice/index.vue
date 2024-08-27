<template>
    <n-space align="center" justify="end" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="公告标题">
                <n-input v-model:value="searchForm.title" placeholder="请输入公告标题" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="上架状态">
                <n-select v-model:value="searchForm.status" :options="status" placeholder="请选择上架状态" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="getNoticeListInfo">查询</n-button>
            </div>
        </n-form>
    </n-space>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-button type="primary" @click="addModal = true" :disabled="!isAdmin">创建公告</n-button>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getNoticeListInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:order.comment) => `${rowData.id}`" :loading="loading" />
    <!--新增广告-->
    <CreateNoticeDialog v-if="addModal" v-model:open="addModal" @refresh="getNoticeListInfo"></CreateNoticeDialog>
    <!--修改广告-->
    <UpdateNoticeDialog v-if="editModal" v-model:open="editModal" v-model="moduleValue" @refresh="getNoticeListInfo"></UpdateNoticeDialog>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { isAdmin } = useLoginUser()
const { getNoticeListInfo, pagination, tableData, loading, columns, searchForm, addModal, editModal, moduleValue } = useNotice()
const status = [
    {
        label: '上架',
        value: 1
    },
    {
        label: '下架',
        value: 0
    }
]

onMounted(async () => {
    getNoticeListInfo()
})
</script>

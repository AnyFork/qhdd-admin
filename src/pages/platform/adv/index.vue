<template>
    <n-space align="center" justify="end" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="广告标题">
                <n-input v-model:value="searchForm.title" placeholder="请输入广告标题" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="广告位">
                <n-select v-model:value="searchForm.positionKey" :options="(allAdv as any)" value-field="positionKey" label-field="name" placeholder="请选择广告位" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="上架状态">
                <n-select v-model:value="searchForm.status" :options="status" placeholder="请选择上架状态" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="getAdvListInfo">查询</n-button>
            </div>
        </n-form>
    </n-space>
    <n-space align="center" justify="space-between" class="mb-2">
        <div>
            <n-button type="primary" @click="addModal = true" :disabled="!isAdmin">创建广告</n-button>
            <span class="text-primary ml-10">管理后台和小程序广告展示规则一致，广告排序按照排序值递减排序</span>
        </div>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getAdvListInfo"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:order.comment) => `${rowData.id}`" :loading="loading" />
    <!--新增广告-->
    <CreateAdvDialog v-if="addModal" v-model:open="addModal" :position="allAdv" @refresh="getAdvListInfo"></CreateAdvDialog>
    <!--修改广告-->
    <UpdateAdvDialog v-if="editModal" v-model:open="editModal" v-model="moduleValue" :position="allAdv" @refresh="getAdvListInfo"></UpdateAdvDialog>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getAdvListInfo, pagination, tableData, loading, columns, searchForm, addModal, editModal, moduleValue } = useAdv()
const { allAdv, getAllAdvPosition } = useAdvPosition()
const { isAdmin } = useLoginUser()
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
    getAdvListInfo()
    getAllAdvPosition()
})
</script>

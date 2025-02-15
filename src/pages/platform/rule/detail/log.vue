<template>
    <n-space align="center" justify="space-between" class="my-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="用户UID">
                <n-input v-model:value="searchForm.uid as any" placeholder="请输入用户uid" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="searchData">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="searchData"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getMemberSignList, pagination, tableData, loading, columns, searchForm } = usePlatformSign()
const { height } = useWindowSize()
const tableHeight = computed(() => height.value - 417)

/**
 * 点击查询进行搜索
 */
const searchData = () => {
    pagination.page = 1
    getMemberSignList()
}

onMounted(async () => {
    getMemberSignList()
})
</script>

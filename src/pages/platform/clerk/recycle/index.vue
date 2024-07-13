<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="店员姓名">
                <n-input v-model:value="searchForm.title" placeholder="请输入店员姓名" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="店员昵称">
                <n-input v-model:value="searchForm.nickname" placeholder="请输入店员昵称" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="店员手机号码">
                <n-input v-model:value="searchForm.mobile" placeholder="请输入店员手机号码" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="clerkList">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="clerkList"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" :single-line="false" remote :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.clerk) => `${rowData.id}`" :loading="loading" :min-height="tableHeight" :max-height="tableHeight" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { clerkList, pagination, tableData, loading, columns, searchForm } = usePlatformClerk()
// 表格高度
const tableHeight = computed(() => height.value - 330)
onMounted(async () => {
    searchForm.isDelete = 1
    clerkList()
})
</script>

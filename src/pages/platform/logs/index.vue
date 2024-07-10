<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form ref="formRef" :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end">
            <n-form-item label="登录账号">
                <n-input v-model:value="searchForm.name" clearable placeholder="请输入登录账号" />
            </n-form-item>
            <n-form-item label="登录IP">
                <n-input v-model:value="searchForm.loginIp" clearable placeholder="请输入登录IP" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="logList">查询</n-button>
            </div>
        </n-form>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="logList"></TableHeaderOperation>
    </n-space>
    <!-- 登录日志记录数据表格-->
    <n-data-table :striped="striped" remote :size="size" :min-height="tableHeight" :max-height="tableHeight" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:system.loginLog) => `${rowData.accId}`" :loading="loading" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { logList, columns, tableData, searchForm, pagination, loading } = useLogs()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 335)

onMounted(() => {
    logList()
})
</script>

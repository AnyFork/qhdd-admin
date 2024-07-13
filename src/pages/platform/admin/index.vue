<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left">
            <n-form-item label="登录账号">
                <n-input v-model:value="searchForm.name" placeholder="请输入登录账号" clearable class="w-180px" />
            </n-form-item>
            <n-form-item label="用户角色">
                <n-select v-model:value="searchForm.roleId" :options="rolesSelectOptions" placeholder="请选择角色" clearable class="w-180px" />
            </n-form-item>
            <div style="display: flex; justify-content: flex-end">
                <n-button round type="primary" @click="adminList">查询</n-button>
            </div>
        </n-form>
        <n-button type="primary" @click="CreateShow = true">新增用户</n-button>
    </n-space>
    <n-space align="center" justify="end" class="mb-2">
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="adminList"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" :single-line="false" remote :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:system.adminInfo) => `${rowData.id}`" :loading="loading" :min-height="tableHeight" :max-height="tableHeight" />
    <!-- 增加平台管理员dialog -->
    <CreateAdminDialog v-if="CreateShow" v-model:open="CreateShow" :roleList="rolesSelectOptions" @refresh="adminList"></CreateAdminDialog>
    <!-- 编辑平台管理员dialog -->
    <ModifyAdminDialog v-if="modifyShow" v-model:open="modifyShow" :roleList="rolesSelectOptions" :rowNode="rowNode!" @refresh="adminList"></ModifyAdminDialog>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { adminList, pagination, tableData, loading, columns, CreateShow, modifyShow, getRoleList, rolesSelectOptions, rowNode, searchForm } = usePlatformAdmin()
// 表格高度
const tableHeight = computed(() => height.value - 380)
onMounted(() => {
    adminList()
    getRoleList()
})
</script>

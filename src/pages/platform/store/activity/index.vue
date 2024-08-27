<template>
    <n-space justify="space-between" class="mb-2">
        <n-button type="primary" class="w-100px" @click="createDrawer = true" :disabled="!isAdmin">创建活动</n-button>
        <div>
            <n-form :show-feedback="false" :size="size" inline :model="searchForm" label-placement="left" class="justify-end mb-2">
                <n-form-item label="店铺名称">
                    <n-select v-model:value="searchForm.sid" :options="allStore" placeholder="请选择店铺名称" clearable class="w-300px" />
                </n-form-item>
                <n-form-item label="活动类型">
                    <n-select v-model:value="searchForm.type" :options="activityTypeOptions" placeholder="请选择活动类型" clearable class="w-190px" />
                </n-form-item>
                <div style="display: flex; justify-content: flex-end">
                    <n-button round type="primary" class="w-100px" @click="getStoreActivityListInfo">查询</n-button>
                </div>
            </n-form>
            <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getStoreActivityListInfo"></TableHeaderOperation>
        </div>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:order.comment) => `${rowData.id}`" :loading="loading" />
    <!--创建活动抽屉-->
    <CreateActivityDrawer v-if="createDrawer" v-model:active="createDrawer" :store="allStore" @refresh="getStoreActivityListInfo"></CreateActivityDrawer>
</template>
<script setup lang="ts">
import { activityTypeOptions } from '@/utils/order/index'
const { isAdmin } = useLoginUser()
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getStoreActivityListInfo, pagination, tableData, loading, columns, searchForm, createDrawer } = usePlatformActivity()
const { storeSelectList, allStore } = usePlatformStore()

onMounted(() => {
    getStoreActivityListInfo()
    storeSelectList()
})
</script>

<template>
    <n-space align="center" justify="space-between" class="my-2">
        <n-button type="primary" @click="CreateShow = true" :disabled="!isAdmin">创建会员等级规则</n-button>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="searchData"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :scroll-x="2400" :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
    <!-- 增加会员等级规则 -->
    <CreateMemberDrawer v-if="CreateShow" v-model:active="CreateShow" @refresh="memberListData"></CreateMemberDrawer>
    <!-- 修改会员等级规则  -->
    <UpdateMemberDrawer v-if="EditShow" v-model:active="EditShow" :rowNode="rowNode!" @refresh="memberListData"></UpdateMemberDrawer>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const { isAdmin } = useLoginUser()
const striped = ref(true)
const { memberListData, pagination, tableData, loading, columns, CreateShow, rowNode, EditShow } = usePlatformMember()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 417)

/**
 * 点击查询进行搜索
 */
const searchData = () => {
    pagination.page = 1
    memberListData()
}
onMounted(async () => {
    memberListData()
})
</script>

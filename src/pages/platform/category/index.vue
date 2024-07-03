<template>
    <n-space align="center" justify="end" class="mb-2">
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="storeCategoryListTree"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" default-expand-all remote :size="size" :columns="columns" :data="tableData" :row-key="(rowData:system.adminInfo) => `${rowData.id}`" :loading="loading" />
    <!-- 增加子分类-->
    <CreateCategoryDialog v-if="CreateShow" v-model:open="CreateShow" :pid="moduleValue.parentid" :ptitle="moduleValue.title" :type="moduleValue.type" @refresh="storeCategoryListTree"></CreateCategoryDialog>
    <!--修改分类-->
    <ModifyCategoryDialog v-if="modifyShow" v-model:open="modifyShow" :pdata="tableData" :rowNode="rowNode" @refresh="storeCategoryListTree"></ModifyCategoryDialog>
</template>
<script setup lang="ts">
import { system } from '@/types/api'
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { storeCategoryListTree, tableData, loading, columns, CreateShow, modifyShow, rowNode, moduleValue } = useCategory()
onMounted(() => {
    storeCategoryListTree()
})
</script>

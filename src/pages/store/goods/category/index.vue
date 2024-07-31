<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-button type="primary" @click="openCategory">添加分类</n-button>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="goodsCategoryTree"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :row-key="(rowData:store.goodsCategory) => `${rowData.id}`" :loading="loading" :min-height="tableHeight" :max-height="tableHeight" />
    <!--添加商品分类-->
    <AddGoodsCategory v-if="createShow" v-model:active="createShow" :parentNode="rowNode" @refresh="goodsCategoryTree"></AddGoodsCategory>
    <!--编辑商品分类-->
    <UpdateGoodsCategory v-if="modifyShow" v-model:active="modifyShow" :parentNode="parentNode!" :node="rowNode!" @refresh="goodsCategoryTree"></UpdateGoodsCategory>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { height } = useWindowSize()
const { goodsCategoryTree, tableData, loading, columns, createShow, rowNode, modifyShow, parentNode } = useStoreGoodsCategory()
// 表格高度
const tableHeight = computed(() => height.value - 340)

const openCategory = () => {
    createShow.value = true
    rowNode.value = undefined
}

onMounted(async () => {
    goodsCategoryTree()
})
</script>

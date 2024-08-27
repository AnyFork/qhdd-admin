<template>
    <n-flex align="center" justify="end">
        <n-form-item label="商品名称" label-placement="left" :show-feedback="false" :size="size">
            <n-input v-model:value="searchForm.title" placeholder="请输入商品名称" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="商品分类" label-placement="left" :show-feedback="false" :size="size">
            <n-cascader v-model:value="searchForm.cid" placeholder="请选择商品分类" value-field="id" label-field="title" expand-trigger="click" :options="data" check-strategy="all" :show-path="true" :filterable="true" clearable @update:value="handleUpdateValue" />
        </n-form-item>
        <n-form-item label="上架状态" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.status" :options="status" placeholder="请选择上架状态" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="商品类型" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.type" :options="goodsType" placeholder="请选商品类型" clearable class="!w-180px" />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" :size="size" @click="goodsListData">查询</n-button>
        </div>
    </n-flex>
    <n-space align="center" justify="space-between" class="my-2">
        <div class="flex-row-center gap-2">
            <n-button type="primary" @click="CreateShow = true" :disabled="!isAdmin">创建商品</n-button>
        </div>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="goodsListData"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :scroll-x="2200" :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" />
    <!-- 增加商品 -->
    <CreateGoodsDrawer v-if="CreateShow" v-model:active="CreateShow" :tableData="data" @refresh="goodsListData"></CreateGoodsDrawer>
    <!-- 修改商品 -->
    <UpdateGoodsDrawer v-if="UpdateShow" v-model:active="UpdateShow" :data="rowNode!" :tableData="data" @refresh="goodsListData"></UpdateGoodsDrawer>
</template>
<script setup lang="ts">
import { CascaderOption } from 'naive-ui'
const size = ref<'small' | 'medium' | 'large'>('medium')
const { isAdmin } = useLoginUser()
const striped = ref(true)
const { goodsListData, pagination, tableData, loading, columns, CreateShow, searchForm, rowNode, UpdateShow, goodsCategoryTree, data } = useStoreGoods()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 390)
/**
 * 商品类型
 */
const goodsType = [
    {
        label: '外卖',
        value: 1
    },
    {
        label: '店内',
        value: 2
    },
    {
        label: '外卖+店内',
        value: 3
    }
]

/**
 * 显示状态
 */
const status = [
    {
        label: '不上架',
        value: 0
    },
    {
        label: '上架中',
        value: 1
    }
]

/**
 * 级联选择值发生变化触发
 * @param value 选中的节点值
 * @param option 选择的节点数据
 */
const handleUpdateValue = (value: number, option: CascaderOption) => {
    console.log(value, option)
    if (!value || !option) {
        searchForm.cid = undefined
        searchForm.childId = undefined
    } else {
        if (option.parentid == 0) {
            searchForm.cid = value
        } else {
            searchForm.cid = option.parentid as number
            searchForm.childId = option.id as number
        }
    }
}

onMounted(async () => {
    goodsListData()
    goodsCategoryTree()
})
</script>

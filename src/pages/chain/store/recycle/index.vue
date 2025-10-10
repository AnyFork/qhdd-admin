<template>
    <n-flex align="center">
        <n-form-item label="商户名称" label-placement="left" :show-feedback="false" :size="size">
            <n-input v-model:value="searchForm.title" placeholder="请输入商户名称" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="主营分类" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.cateParentid1" :options="shopCategoryOption" placeholder="请选择主营分类" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="所属区域" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.cateParentid2" :options="shopAreaOption" placeholder="请选择所属片区" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="门店类型" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.isWaimai" :options="types" placeholder="请选择门店类型" clearable class="!w-180px" />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" :size="size" @click="searchData">查询</n-button>
        </div>
    </n-flex>
    <n-space align="center" justify="end" class="my-2">
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="searchData"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :single-line="false" :striped="striped" remote :scroll-x="3200" :size="size" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:store.storeData) => `${rowData.id}`" :loading="loading" :max-height="tableHeight" @update:checked-row-keys="handleCheck" />
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
// 主营区域
const categoryRef = ref<system.category[]>()
// 所属片区
const areaRef = ref<system.category[]>()
const { storeListData, pagination, tableData, loading, columns, searchForm, handleCheck, categoryPageList } = useChainStore()
const { storeCategoryList } = usePlatformCategory()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 417)

/**
 * 门店类型
 */
const types = [
    {
        label: '餐饮',
        value: 1
    },
    {
        label: '商超',
        value: 2
    }
]

/**
 * 主营分类
 */
const shopCategoryOption = computed(() =>
    categoryRef.value?.map((item) => ({
        label: item.title,
        value: item.id!
    }))
)

/**
 * 所属片区
 */
const shopAreaOption = computed(() =>
    areaRef.value?.map((item) => ({
        label: item.title,
        value: item.id!
    }))
)

/**
 * 点击查询进行搜索
 */
const searchData = () => {
    pagination.page = 1
    storeListData()
}

onMounted(async () => {
    searchForm.status = 4
    storeListData()
    categoryPageList()
    categoryRef.value = (await storeCategoryList(1)) || []
    areaRef.value = (await storeCategoryList(2)) || []
})
</script>

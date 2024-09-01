<template>
    <n-flex align="center" justify="space-between">
        <n-form-item label="商户名称" label-placement="left" :show-feedback="false" :size="size">
            <n-input v-model:value="searchForm.title" placeholder="请输入商户名称" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="营业状态" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.businessStatus" :options="businessStatus" placeholder="请选择营业状态" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="主营分类" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.cateParentid1" :options="shopCategoryOption" placeholder="请选择主营分类" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="所属区域" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.cateParentid2" :options="shopAreaOption" placeholder="请选择所属片区" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="连锁店" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.chainid" :options="chainOptions" placeholder="请选择所连锁店" clearable class="!w-180px" />
        </n-form-item>
        <n-form-item label="是否显示" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.status" :options="status" placeholder="请选择门店状态" clearable class="!w-180px" />
        </n-form-item>
    </n-flex>
    <n-flex align="center" class="my-2">
        <n-dropdown trigger="hover" :options="selectTags">
            <div>标签筛选</div>
        </n-dropdown>
        <n-select v-model:value="searchForm.serviceLabel" :options="tagRef" placeholder="请选择标签" clearable class="!w-180px" />
        <n-form-item label="门店类型" label-placement="left" :show-feedback="false" :size="size">
            <n-select v-model:value="searchForm.isWaimai" :options="types" placeholder="请选择门店类型" clearable class="!w-180px" />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" :size="size" @click="storeListData">查询</n-button>
        </div>
    </n-flex>
    <n-space align="center" justify="space-between" class="mb-2">
        <div class="flex-row-center gap-2">
            <n-button type="primary" @click="CreateShow = true" :disabled="!isAdmin">创建商户</n-button>
            <n-dropdown trigger="hover" :options="options">
                <n-button type="error" :disabled="!isAdmin">批量处理店铺状态</n-button>
            </n-dropdown>
            <n-dropdown trigger="hover" :options="chain">
                <n-button type="warning" :disabled="!isAdmin">批量处理连锁店</n-button>
            </n-dropdown>
            <div class="text-14px text-primary">页面排序规则：优先展示营业中店铺，然后按照排序值从大到小规则进行展示，与顾客端小程序展示效果一致。</div>
        </div>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="storeListData"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table
        :single-line="false"
        :striped="striped"
        remote
        :scroll-x="3200"
        :size="size"
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :row-key="(rowData:store.storeData) => `${rowData.id}`"
        :loading="loading"
        :max-height="tableHeight"
        :checked-row-keys="checkedRowKeysRef"
        @update:checked-row-keys="handleCheck"
    />
    <!-- 增加商户 -->
    <CreateStoreDrawer
        v-if="CreateShow"
        v-model:active="CreateShow"
        :shopOption="shopOption!"
        :serviceOption="serviceOption"
        :deliveryOption="deliveryOption"
        :shopCategoryOption="shopCategoryOption"
        :shopAreaOption="shopAreaOption"
        :chainOptions="chainOptions"
        @refresh="storeListData"
    ></CreateStoreDrawer>
    <!-- 设置服务费 -->
    <SettingServiceFee v-if="feeModal && rowNode" v-model:open="feeModal" v-model="rowNode"></SettingServiceFee>
</template>
<script setup lang="ts">
const size = ref<'small' | 'medium' | 'large'>('medium')
const { isAdmin } = useLoginUser()
const striped = ref(true)
// 主营区域
const categoryRef = ref<system.category[]>()
// 所属片区
const areaRef = ref<system.category[]>()
// 标签
const tagRef = ref<
    {
        label: string
        value: number
    }[]
>()
const { storeListData, pagination, tableData, updateStoreStatusBatch, loading, columns, message, CreateShow, searchForm, handleCheck, checkedRowKeysRef, shopOption, deliveryOption, serviceOption, categoryPageList, rowNode, feeModal } = usePlatformStore()
const { storeCategoryList } = usePlatformCategory()
const { chainSelectList, chainOptions } = useChain()
const { height } = useWindowSize()
// 表格高度
const tableHeight = computed(() => height.value - 417)

/**
 * 营业状态
 */
const businessStatus = [
    {
        label: '歇业',
        value: 0
    },
    {
        label: '营业',
        value: 2
    }
]

/**
 * 显示状态
 */
const status = [
    {
        label: '隐藏',
        value: 0
    },
    {
        label: '显示',
        value: 1
    }
]

/**
 * 门店类型
 */
const types = [
    {
        label: '外卖',
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
 * 一键操作
 */
const options = [
    {
        label: '一键所有店铺营业',
        key: 'marina bay sands',
        props: {
            onClick: () => {
                updateStoreStatusBatch({ ids: -1, businessStatus: 2 })
            }
        }
    },
    {
        label: '一键所有店铺歇业',
        key: "brown's hotel, london",
        props: {
            onClick: () => {
                updateStoreStatusBatch({ ids: -1, businessStatus: 0 })
            }
        }
    },
    {
        label: '一键显示所有店铺',
        key: 'atlantis nahamas, nassau',
        props: {
            onClick: () => {
                updateStoreStatusBatch({ ids: -1, status: 1 })
            }
        }
    },
    {
        label: '一键隐藏所有店铺',
        key: 'the beverly hills hotel, los angeles',
        props: {
            onClick: () => {
                updateStoreStatusBatch({ ids: -1, status: 0 })
            }
        }
    }
]
/**
 * 连锁店
 */
const chain = computed(() => {
    if (chainOptions.value) {
        const temp = chainOptions.value.map((element: any) => {
            return {
                label: element.label,
                key: element.value,
                props: {
                    onClick: () => {
                        if (checkedRowKeysRef.value && checkedRowKeysRef.value.length > 0) {
                            updateStoreStatusBatch({ ids: checkedRowKeysRef.value.join(','), chainid: element.value })
                            checkedRowKeysRef.value = []
                        } else {
                            message.error('请先选择一项')
                        }
                    }
                }
            }
        })
        temp?.unshift({
            label: '不关联连锁店',
            key: 'remove',
            props: {
                onClick: () => {
                    if (checkedRowKeysRef.value && checkedRowKeysRef.value.length > 0) {
                        updateStoreStatusBatch({ ids: checkedRowKeysRef.value.join(','), chainid: 0 })
                        checkedRowKeysRef.value = []
                    } else {
                        message.error('请先选择一项')
                    }
                }
            }
        })
        return temp
    } else {
        return []
    }
})
const selectTags = [
    {
        label: '商户标签',
        key: 'shop',
        props: {
            onClick: () => {
                tagRef.value = shopOption.value
            }
        }
    },
    {
        label: '配送标签',
        key: 'devilry',
        props: {
            onClick: () => {
                tagRef.value = deliveryOption.value
            }
        }
    },
    {
        label: '服务标签',
        key: 'service',
        props: {
            onClick: () => {
                tagRef.value = serviceOption.value
            }
        }
    }
]
onMounted(async () => {
    storeListData()
    categoryPageList()
    chainSelectList()
    categoryRef.value = (await storeCategoryList(1)) || []
    areaRef.value = (await storeCategoryList(2)) || []
})
</script>

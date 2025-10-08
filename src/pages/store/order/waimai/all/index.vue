<template>
    <n-spin :show="loading">
        <div class="p-2 border border-solid border-#e4e7ed">
            <n-form :show-feedback="false" inline :model="searchForm" label-placement="left" class="justify-end mb-2">
                <n-flex class="mb-2">
                    <n-form-item label="订单编号">
                        <n-input v-model:value="searchForm.ordersn" placeholder="请输入订单编号" clearable class="!w-200px" />
                    </n-form-item>
                    <n-form-item label="活动类型">
                        <n-select v-model:value="searchForm.activityType" :options="activityTypeOptions" placeholder="请选择活动类型" clearable class="w-200px" />
                    </n-form-item>
                    <n-form-item label="订单状态">
                        <n-select v-model:value="searchForm.status" :options="orderStatusOption" placeholder="请选择订单状态" clearable class="w-200px" />
                    </n-form-item>
                    <n-form-item label="支付状态">
                        <n-select v-model:value="searchForm.isPay" :options="orderPayStatusOption" placeholder="请选择支付状态" clearable class="w-200px" />
                    </n-form-item>
                    <n-form-item label="订单类型">
                        <n-select v-model:value="searchForm.isReserve" :options="orderTypeOption" placeholder="请选择订单类型" clearable class="w-200px" />
                    </n-form-item>
                    <n-form-item label="就餐方式">
                        <n-select v-model:value="searchForm.deliveryType" :options="deliveryTypeOption" placeholder="请选择就餐方式" clearable class="w-200px" />
                    </n-form-item>
                    <n-form-item label="配送员" label-width="70px">
                        <n-select v-model:value="searchForm.deliveryerId" :options="allRider" label-field="title" value-field="id" placeholder="请选择配送员名称" clearable class="w-200px" />
                    </n-form-item>
                    <n-form-item label="顾客查询">
                        <div class="flex gap-1 w-430px">
                            <n-select v-model:value="searchType" :options="customerOption" placeholder="请选择查询的信息" clearable class="w-200px" />
                            <n-input v-model:value="searchForm.mutiQuery" :placeholder="searchPlaceholder" clearable class="flex-1" />
                        </div>
                    </n-form-item>
                    <n-form-item label="下单时间">
                        <n-date-picker v-model:value="searchForm.range" type="daterange" clearable placeholder="请选择时间区间" class="w-265px" />
                    </n-form-item>
                    <div style="display: flex; justify-content: flex-end">
                        <n-button round type="primary" class="w-100px" @click="getAllList">查询</n-button>
                    </div>
                </n-flex>
            </n-form>
        </div>
        <div class="mt-4">
            <StoreOrderItem v-if="tableData && tableData.length > 0" v-for="(item, index) in tableData" :key="index" :order="item" @callBack="orderCallBack" @refundBack="orderRefundBack"></StoreOrderItem>
            <div v-else class="flex-row-center mt-25">
                <img src="/images/empty.png" />
            </div>
        </div>
        <div v-if="pagination.itemCount" class="flex justify-end py-2">
            <n-pagination
                v-model:page="pagination.page"
                v-model:page-size="pagination.pageSize"
                :item-count="pagination.itemCount"
                show-size-picker
                :page-sizes="pagination.pageSizes"
                :prefix="pagination.prefix"
                :on-update:page="pagination.onChange"
                :on-update:page-size="pagination.onUpdatePageSize"
            />
        </div>
        <!--取消订单 -->
        <StoreCancelOrder v-model:show="cancelModal" :oid="order?.id" @refresh="getAllList"></StoreCancelOrder>
        <!--订单详情-->
        <StoreOrderDetail v-if="orderInfo" v-model:show="orderDetailModal" :order="orderInfo"></StoreOrderDetail>
        <!--通用提示弹框-->
        <n-modal v-model:show="modalObj.open" preset="dialog" :title="modalObj.title" :content="modalObj.content">
            <div v-if="modalObj.show">
                <n-input v-model:value="modalObj.note" type="textarea" :placeholder="modalObj.placeholder" maxlength="30" show-count :autosize="{ minRows: 3 }" />
            </div>
            <template #action>
                <div>
                    <n-button @click="modalObj.show = false" class="mr-4" :loading="loading">取消</n-button>
                    <n-button type="primary" @click="submitConfirm" :loading="loading">确定</n-button>
                </div>
            </template>
        </n-modal>
    </n-spin>
</template>

<script setup lang="ts">
import { activityTypeOptions, orderStatusOption, orderPayStatusOption, orderTypeOption, customerOption, deliveryTypeOption } from '@/utils/order/index'
const { getAllList, tableData, loading, searchForm, pagination, getOrderInfoById, orderInfo, replyRemind, printOder, handleOrder, notifyCollect, message, arbitratingOrder, agreeRefund, rejectRefund } = useStoreOrder()
const { selectRiderList, allRider } = usePlatformRider()
const searchType = ref()
//通用modal弹框
const modalObj = reactive({
    open: false,
    title: '',
    content: '',
    note: '',
    placeholder: '',
    show: false
})
const orderAction = ref<orderAction>()
// 当前操作订单信息,订单组件回调返回
const order = ref<order.orderInfo>()
// 退款记录id
const refundId = ref<number>()
// 取消订单
const cancelModal = ref(false)
// 订单详情
const orderDetailModal = ref(false)
// placeholder文本提示
const searchPlaceholder = computed(() => {
    if (searchType.value) {
        return searchType.value === 'username' ? '请输入顾客名称' : '请输入顾客电话'
    } else {
        return '请输入顾客信息'
    }
})

/**
 * 商户订单操作回调
 */
const orderCallBack = async (action: orderAction, orderInfo: order.orderInfo) => {
    // 催单操作
    if (action == 'replyRemind') {
        orderAction.value = action
        modalObj.show = true
        modalObj.title = '催单回复'
        modalObj.content = ''
        order.value = orderInfo
        modalObj.placeholder = '请输入回复内容'
        modalObj.open = true
        return
    }
    // 打印订单
    if (action == 'printOrder') {
        orderAction.value = action
        modalObj.show = false
        modalObj.title = '温馨提示'
        modalObj.content = '您确定要打印订单吗'
        order.value = orderInfo
        modalObj.open = true
        return
    }
    // 取消订单
    if (action == 'cancelOrder') {
        cancelModal.value = true
        order.value = orderInfo
        return
    }
    // 订单详情
    if (action == 'orderInfo') {
        await getOrderInfoById(orderInfo.id!)
        orderDetailModal.value = true
        return
    }
    // 商户接单
    if (action == 'handleOrder') {
        orderAction.value = action
        modalObj.show = false
        modalObj.title = '温馨提示'
        modalObj.content = '您确定要接单吗?'
        order.value = orderInfo
        modalObj.open = true
        return
    }
    // 通知配送员抢单
    if (action == 'noticeOrder') {
        orderAction.value = action
        modalObj.show = false
        modalObj.title = '温馨提示'
        modalObj.content = '您确定要通知配送员抢单吗?'
        order.value = orderInfo
        modalObj.open = true
        return
    }
}
/**
 * 商户退款操作回调
 */
const orderRefundBack = (action: orderAction, id: number) => {
    // 进行沟通
    if (action == 'arbitratingOrder') {
        orderAction.value = action
        modalObj.show = true
        modalObj.title = '与商户进行协商'
        modalObj.content = ''
        refundId.value = id
        modalObj.placeholder = '请输入协商内容'
        modalObj.open = true
        return
    }
    // 同意退款申请
    if (action == 'agreeRefund') {
        orderAction.value = action
        modalObj.show = false
        modalObj.title = '温馨提示'
        modalObj.content = '您确定要同意退款申请吗?'
        refundId.value = id
        modalObj.open = true
        return
    }
    // 绝退款申请
    if (action == 'rejectRefund') {
        orderAction.value = action
        modalObj.show = true
        modalObj.title = '绝退款申请'
        modalObj.content = ''
        refundId.value = id
        modalObj.placeholder = '请输入绝退款申请原因'
        modalObj.open = true
        return
    }
}

/**
 * 确认按钮触发
 */
const submitConfirm = async () => {
    // 回复催单
    if (orderAction.value == 'replyRemind') {
        if (!modalObj.note) {
            message.error('催单回复内容不能为空')
            return false
        }
        // 催单回复
        await replyRemind(order.value!.id, modalObj.note)
        modalObj.note = ''
        modalObj.open = false
    }

    // 打印订单
    if (orderAction.value == 'printOrder') {
        await printOder(order.value!.id)
        modalObj.open = false
    }

    // 商户接单
    if (orderAction.value == 'handleOrder') {
        await handleOrder(order.value!.id)
        modalObj.open = false
    }

    // 通知配送员抢单
    if (orderAction.value == 'noticeOrder') {
        await notifyCollect(order.value!.id)
        modalObj.open = false
    }

    // 协商沟通
    if (orderAction.value == 'arbitratingOrder') {
        if (!modalObj.note) {
            message.error('协商沟通内容不能为空')
            return false
        }
        await arbitratingOrder(refundId.value!, modalObj.note)
        modalObj.note = ''
        modalObj.open = false
    }

    // 同意退款申请
    if (orderAction.value == 'agreeRefund') {
        await agreeRefund(refundId.value!)
        modalObj.open = false
    }

    // 拒绝退款申请
    if (orderAction.value == 'rejectRefund') {
        if (!modalObj.note) {
            message.error('拒绝退款申请原因不能为空')
            return false
        }
        await rejectRefund(refundId.value!, modalObj.note)
        modalObj.note = ''
        modalObj.open = false
    }
    getAllList()
}

onMounted(() => {
    getAllList()
    selectRiderList()
})
</script>

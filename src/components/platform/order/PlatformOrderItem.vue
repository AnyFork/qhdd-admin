<template>
    <div class="mb-6 rounded w-full border border-solid border-#e4e7ed border-t-4px pr-10px" :style="{ borderTopColor: dynamicColor, '--n-indicator-color': dynamicColor + ' !important', '--n-indicator-border-color': dynamicColor }">
        <div class="flex-row-between py-10px border-b border-b-solid border-b-#e4e7ed relative">
            <div class="flex items-center gap-2">
                <div class="orderSn relative p-[2px_5px_2px_10px] mr-20px text-#fff" :style="{ backgroundColor: dynamicColor }">
                    <span>#</span>
                    <span class="text-22px">{{ serialSn }}</span>
                </div>
                <div class="text-14px font-700 flex items-center">
                    <n-image v-if="order?.store?.logo" width="30" :src="previewUrl + order?.store?.logo" lazy class="rounded" />
                    <span class="text-16px font-bold">{{ order?.store.title }}</span>
                    <span class="pr-2">({{ order.store.telephone }})</span>
                    <n-tag :color="{ borderColor: dynamicColor, textColor: dynamicColor }">{{ storeStatus[order.store.businessStatus] }}</n-tag>
                    <span class="pl-6 pr-2" :style="{ color: dynamicColor }">{{ transformTimestampsToDateString(order.deliverytime, 'YYYY-MM-DD') }}</span>
                    <span class="pr-2" :style="{ color: dynamicColor }">{{ order.deliveryTime }}</span>
                </div>
            </div>
            <!--订单费用状态-->
            <div class="absolute right-180">
                <img v-if="order.isPay == 1 && order.refundStatus == 0" src="/images/pay.png" />
                <img v-if="order.isPay == 0" src="/images/notPay.png" />
                <!--退款中-->
                <img v-if="order.refundStatus == 1 || order.refundStatus == 2 || order.refundStatus == 7 || order.refundStatus == 8" src="/images/refunding.png" />
                <!--退款失败 -->
                <img v-if="order.refundStatus == 4" src="/images/failRefund.png" />
                <!--退款成功 -->
                <img v-if="order.refundStatus == 3" src="/images/refundOk.png" />
            </div>
            <!--订单结算状态-->
            <div v-if="order.status == 5 || order.status == 6" class="absolute right-120">
                <img v-if="order.profitSharing == 0" src="/images/profitSharing.png" />
                <img v-if="order.profitSharing == 1" src="/images/profitSharinged.png" />
            </div>
            <div class="text-16px font-700">
                <span>订单状态：</span>
                <span :style="{ color: dynamicColor }">{{ orderStatus[order.status] }}</span>
            </div>
        </div>
        <!--订单退单原因以及操作人 -->
        <div v-if="order.status == 6" class="py-2 px-20px text-#fff my-2" :style="{ backgroundColor: dynamicColor }">
            <span>取消原因：{{ order?.orderRefundList[0]?.reason || '--' }}</span>
            <span v-if="order?.orderRefundList[0]?.refundData && order?.orderRefundList[0]?.refundData?.refundInfo">，{{ order?.orderRefundList[0]?.refundData?.refundInfo?.reason }}</span>
            <span class="pl-4">操作人：{{ order?.orderRefundList[0]?.orderRefundLogList[0]?.roleCn || '--' }}</span>
        </div>
        <div class="py-10px px-20px border-b border-b-solid border-b-#e4e7ed">
            <n-grid x-gap="12" :cols="3">
                <n-gi>
                    <div>
                        <span class="px-2 py-1 rounded text-#fff mr-2" :style="{ backgroundColor: dynamicColor }">订单</span>
                        <span class="font-bold text-16px pr-2">编号：{{ order?.ordersn }}</span>
                    </div>
                    <div class="py-1">
                        <span class="pr-1">下单时间：</span>
                        <span>{{ transformTimestampsToDateString(order.addtime) }}</span>
                    </div>
                    <div class="py-1">
                        <span class="pr-1">支付时间：</span>
                        <span>{{ order.paytime ? transformTimestampsToDateString(order.paytime) : '--' }}</span>
                    </div>
                    <div v-if="order.note" class="py-1">
                        <span class="pr-1">订单备注：</span>
                        <span>{{ order.note }}</span>
                    </div>
                </n-gi>
                <n-gi>
                    <div>
                        <span class="px-2 py-1 rounded text-#fff mr-2" :style="{ backgroundColor: dynamicColor }">顾客</span>
                        <span class="font-700 text-20px pr-2">{{ order?.username }}</span>
                        <span v-if="order?.sex" class="font-700 text-14px pr-2">({{ order?.sex }})</span>
                        <span class="px-2 font-700" :style="{ color: dynamicColor }">{{ order?.mobile }}</span>
                        <n-tag class="inline px-6px py-4px rounded" :color="{ borderColor: dynamicColor, textColor: dynamicColor }">本店下单{{ order.memberBuyTimes }}次</n-tag>
                    </div>
                    <div class="py-1">
                        <span class="pr-1">送餐时间：</span>
                        <span>{{ transformTimestampsToDateString(order.deliverytime, 'YYYY-MM-DD') }} {{ order.deliveryTime }}</span>
                    </div>
                    <div class="py-1">
                        <span class="pr-1">送餐地址：</span>
                        <span v-if="order.address">{{ order.address + order.number }}</span>
                    </div>
                </n-gi>
                <n-gi>
                    <div v-if="order.deliveryer">
                        <div>
                            <span class="px-2 py-1 rounded text-#fff mr-2" :style="{ backgroundColor: dynamicColor }">配送</span>
                            <span class="font-700 text-20px pr-2">{{ order.deliveryer?.title }}</span>
                            <span class="px-2 font-700" :style="{ color: dynamicColor }">{{ order.deliveryer?.mobile }}</span>
                        </div>
                        <div class="py-1">
                            <span class="pr-1">接单时间：</span>
                            <span>{{ order?.deliveryAssignTime ? transformTimestampsToDateString(order.deliveryAssignTime) : '--' }}</span>
                        </div>
                        <div class="py-1">
                            <span class="pr-1">送达时间：</span>
                            <span>{{ order?.deliverySuccessTime ? transformTimestampsToDateString(order.deliverySuccessTime) : '--' }}</span>
                        </div>
                    </div>
                </n-gi>
            </n-grid>
        </div>
        <div class="py-10px px-20px border-b border-b-solid border-b-#e4e7ed">
            <n-collapse arrow-placement="right" :on-update:expanded-names="changeStatus">
                <template #arrow>
                    <span></span>
                </template>
                <!--商品信息-->
                <n-collapse-item name="1">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <div class="font-700 text-16px mr-4">商品信息</div>
                            <div class="text-14px text-#ff6700">
                                <span class="pr-1"> {{ order.orderCart.orderCartDataList.length }} 种商品</span>
                                <span class="pr-1"> 共{{ order.orderCart.num }}件 </span>
                                <span class="pr-1"> 商品费用: ¥{{ order.orderCart.price }} </span>
                                <span class="pr-1"> 餐盒费: ¥{{ order.boxPrice }} </span>
                                <span class="pr-1"> 配送费: ¥{{ order.deliveryFee }} </span>
                                <span class="pr-1"> 合计费用: ¥{{ order.totalFee }} </span>
                                <span class="pr-1"> 已优惠: ¥{{ order.discountFee }} </span>
                                <span class="pr-1"> 顾客实付: ¥{{ order.finalFee }} </span>
                                <span v-if="order.refundFee" class="pr-1"> 退费顾客: ¥{{ order.refundFee }} </span>
                                <span class="pr-1"> 商户预计收入: ¥{{ order.storeFinalFee }} </span>
                                <span class="pr-1"> 平台预估收益: ¥{{ order.plateformServeFee }} </span>
                            </div>
                        </div>
                    </template>
                    <template #header-extra>
                        <div class="flex items-center gap-2">
                            <div class="text-16px" :style="{ color: dynamicColor }">{{ orderCollapse ? '展开' : '收起' }}</div>
                            <Icon v-if="orderCollapse" icon="ep:arrow-down" size="18px" :color="dynamicColor"></Icon>
                            <Icon v-else icon="ep:arrow-up" size="18px" :color="dynamicColor"></Icon>
                        </div>
                    </template>
                    <div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed flex items-center justify-between" v-for="(item, index) in order.orderCart.orderCartDataList" :key="'good' + index">
                            <div class="flex items-center justify-between w-900px">
                                <div class="flex items-center gap-2 w-400px">
                                    <n-image :src="previewUrl + item.thumb" lazy :width="50" class="rounded" />
                                    <div>
                                        <span>{{ item.title }} </span>
                                        <span>({{ item.titleDetail }})</span>
                                    </div>
                                </div>
                                <span>单价: ¥{{ new Decimal(item.price).dividedBy(new Decimal(item.num)) }}</span>
                                <span>数量: x{{ item.num }}</span>
                                <span>小计: ¥{{ item.price }}</span>
                            </div>
                        </div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <span>餐盒费</span>
                                <span>小计: ¥{{ order.boxPrice }}</span>
                            </div>
                        </div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed justify-between">
                            <div class="flex items-center justify-between w-900px">
                                <span>配送费</span>
                                <span>小计: ¥{{ order.deliveryFee }}</span>
                            </div>
                        </div>
                        <div v-if="order?.orderCart?.usedActivityMap?.discount?.back" class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <div>
                                    <span class="bg-#ff3333 text-#fff rounded py-2px px-4px mr-2px">减</span>
                                    <span>满减优惠</span>
                                </div>
                                <div class="span-#ff3333 font-bold">-¥{{ order?.orderCart?.usedActivityMap?.discount?.back }}</div>
                            </div>
                        </div>
                        <div v-if="order?.orderCart?.usedActivityMap?.grant?.back" class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <div>
                                    <span class="bg-primary text-#fff rounded py-2px px-4px mr-2px">赠</span>
                                    <span>满赠优惠</span>
                                </div>
                                <div class="span-#ff3333 font-bold">{{ order?.orderCart?.usedActivityMap?.grant?.back }}</div>
                            </div>
                        </div>
                        <div v-if="order?.orderCart?.usedActivityMap?.newMember?.back" class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <div>
                                    <span class="bg-#ff3333 text-#fff rounded py-2px px-4px mr-2px">新</span>
                                    <span>门店新客</span>
                                </div>
                                <div class="span-#ff3333 font-bold">-¥{{ order?.orderCart?.usedActivityMap?.newMember?.back }}</div>
                            </div>
                        </div>
                        <div v-if="order?.orderCart?.usedActivityMap?.mallNewMember?.back" class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <div>
                                    <span class="bg-#ff3333 text-#fff rounded py-2px px-4px mr-2px">新</span>
                                    <span>平台新客</span>
                                </div>
                                <div class="span-#ff3333 font-bold">-¥{{ order?.orderCart?.usedActivityMap?.mallNewMember?.back }}</div>
                            </div>
                        </div>
                        <div v-if="order?.orderCart?.usedActivityMap?.deliveryFeeDiscount?.back" class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <div>
                                    <span class="bg-#FEBE57 text-#fff rounded py-2px px-4px mr-2px">配</span>
                                    <span>满减配送费</span>
                                </div>
                                <div class="span-#ff3333 font-bold">-¥{{ order?.orderCart?.usedActivityMap?.deliveryFeeDiscount?.back }}</div>
                            </div>
                        </div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <span>小计</span>
                                <span>¥{{ order.totalFee }}</span>
                            </div>
                        </div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <span>已优惠</span>
                                <span>-¥{{ order.discountFee }}</span>
                            </div>
                        </div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <span>顾客实际支付</span>
                                <span>小计: ¥{{ order.finalFee }}</span>
                            </div>
                        </div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <span>商户预计收入</span>
                                <span>小计: ¥{{ order.storeFinalFee }}</span>
                            </div>
                        </div>
                        <div class="py-2 border-t border-t-solid border-t-#e4e7ed">
                            <div class="flex items-center justify-between w-900px">
                                <span>平台预计收入</span>
                                <span>小计: ¥{{ order.plateformServeFee }}</span>
                            </div>
                        </div>
                    </div>
                </n-collapse-item>
                <!--退单信息-->
                <n-collapse-item v-if="order.orderRefundList && order.orderRefundList?.length > 0" name="2">
                    <template #header>
                        <div class="flex items-center gap-2">
                            <div class="font-bold text-16px mr-4">退款信息</div>
                            <div class="text-14px text-#ff6700">
                                <span v-if="order.refundFee > 0">{{ order.status == 5 ? '部分退款' : '整单退款' }}</span>
                                <span v-if="order.refundFee > 0" class="pr-1"> 退款金额: ¥{{ order.refundFee }} </span>
                            </div>
                        </div>
                    </template>
                    <template #header-extra>
                        <div class="flex items-center gap-2">
                            <div class="text-16px" :style="{ color: dynamicColor }">{{ refundCollapse ? '展开' : '收起' }}</div>
                            <Icon v-if="refundCollapse" icon="ep:arrow-down" size="18px" :color="dynamicColor"></Icon>
                            <Icon v-else icon="ep:arrow-up" size="18px" :color="dynamicColor"></Icon>
                        </div>
                    </template>
                    <div v-for="(refund, idx) in order.orderRefundList" :key="'refund' + idx" class="border-t border-t-solid border-t-#e4e7ed py-2">
                        <div v-if="order?.orderRefundList?.length > 1" class="py-2 text-16px flex-row-between w-930px" :style="{ color: dynamicColor }">
                            <span>第{{ order.orderRefundList.length - idx }}次退款</span>
                            <span>退款金额：{{ refund.fee }}</span>
                        </div>
                        <n-steps vertical size="small" :current="refund.orderRefundLogList.length" status="finish">
                            <n-step v-for="(log, ix) in refund.orderRefundLogList" :key="'log' + ix" :style="{ '--n-indicator-color': dynamicColor, '--n-indicator-border-color': dynamicColor, '--n-indicator-text-color': '#fff', '--n-splitor-color': dynamicColor }">
                                <template #title>
                                    <div class="flex-row-between w-900px text-#515a6e">
                                        <span>{{ log.title }}</span>
                                        <span>{{ transformTimestampsToDateString(log.addtime) }}</span>
                                    </div>
                                </template>
                                <div class="flex-row-between text-#909399">
                                    <div v-if="ix == 0">
                                        <div v-if="refund.data">
                                            <div class="flex w-900px">
                                                <span class="pr-1 w-70px">退款商品:</span>
                                                <div class="flex-1">
                                                    <div v-for="(goods, i) in refund?.refundData?.refundGoods" :key="'good' + i">
                                                        <div class="flex-row-between">
                                                            <div class="w-400px">
                                                                <span>{{ goods.title }}</span>
                                                                <span v-if="goods.titleDetail">({{ goods.titleDetail }})</span>
                                                            </div>
                                                            <div class="w-150px">
                                                                <span class="pr-2">退: x{{ goods.num }}份</span>
                                                                <span>金额: ¥{{ goods.price }}</span>
                                                            </div>
                                                            <div>
                                                                <span class="pr-1">餐盒费:</span>
                                                                <span>¥{{ goods.boxPrice }}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span class="pr-2">退款金额：</span>
                                                <span class="font-bold" :style="{ color: dynamicColor }">¥{{ refund?.fee }}</span>
                                            </div>
                                            <div v-if="refund?.reason">
                                                <span class="pr-2">退款理由:</span>
                                                <span>{{ refund?.reason }}</span>
                                            </div>
                                            <div v-if="refund?.refundData?.refundInfo?.reason">
                                                <span class="pr-2">退款具体理由:</span>
                                                <span>{{ refund?.refundData?.refundInfo?.reason }}</span>
                                            </div>
                                            <div v-if="refund?.refundData?.refundInfo?.thumbs && refund.refundData.refundInfo.thumbs.length > 0" class="py-2">
                                                <n-image :src="previewUrl + thumb" lazy v-for="(thumb, id) in refund?.refundData.refundInfo.thumbs" :key="'thumbs' + id" width="80px"></n-image>
                                            </div>
                                        </div>
                                        <div v-else>{{ log.note }}</div>
                                    </div>
                                    <div v-if="ix != 0">{{ log.note }}</div>
                                </div>
                            </n-step>
                        </n-steps>
                        <!--退款管理员操作 -->
                        <div v-if="isAdmin && (order.refundStatus == 1 || order.refundStatus == 2 || order.refundStatus == 7 || order.refundStatus == 8)" lass="p-4">
                            <n-flex>
                                <n-button color="#ff6700" @click="emit('refundBack', 'rejectRefund', refund.id)">拒绝</n-button>
                                <n-button color="#ff6700" @click="emit('refundBack', 'agreeRefund', refund.id)">同意</n-button>
                                <n-button color="#ff6700" @click="emit('refundBack', 'arbitratingOrder', refund.id)">介入纠纷</n-button>
                                <n-button color="#ff6700" @click="emit('refundBack', 'overruleRefund', refund.id)">驳回退款申请</n-button>
                            </n-flex>
                        </div>
                    </div>
                </n-collapse-item>
            </n-collapse>
        </div>
        <div v-if="isAdmin" class="py-10px">
            <n-space justify="end">
                <n-button v-if="order.status == 1 && order.isPay == 1" :color="dynamicColor" @click="emit('callBack', 'handleOrder', order)"> 接受订单 </n-button>
                <n-button v-if="order.status == 1 && order.isPay == 1" :color="dynamicColor" @click="emit('callBack', 'noticeStoreOrder', order)"> 通知商家接单 </n-button>
                <n-button v-if="order.isRemind == 1" :color="dynamicColor" @click="emit('callBack', 'replyRemind', order)"> 回复催单 </n-button>
                <n-button v-if="order.status == 2" :color="dynamicColor" @click="emit('callBack', 'noticeOrder', order)"> 通知配送员抢单 </n-button>
                <n-button v-if="order.status == 2 || order.status == 3" :color="dynamicColor" @click="emit('callBack', 'assignOrder', order)"> 调度骑手接单 </n-button>
                <n-button v-if="(order.status == 3 || order.status == 4) && order.deliveryer" :color="dynamicColor" @click="emit('callBack', 'resetAssignOrder', order)"> 将订单重新放入待抢订单列表 </n-button>
                <n-button v-if="(order.status == 3 || order.status == 4) && order.deliveryer" :color="dynamicColor" @click="emit('callBack', 'assignOrderAgain', order)"> 重新调度骑手 </n-button>
                <n-button v-if="order.status == 4" :color="dynamicColor" @click="emit('callBack', 'finishOrder', order)"> 完成订单 </n-button>
                <n-button v-if="order.status != 5 && order.status != 6" :color="dynamicColor" @click="emit('callBack', 'cancelOrder', order)"> 取消订单并退款 </n-button>
                <n-button :color="dynamicColor" @click="emit('callBack', 'printOrder', order)"> 打印({{ order?.printNums || 0 }}) </n-button>
                <n-button v-if="order.status != 5 && order.status != 6" :color="dynamicColor" @click="emit('callBack', 'updateOrder', order)"> 修改订单 </n-button>
                <n-button :color="dynamicColor" @click="emit('callBack', 'orderInfo', order)"> 详情</n-button>
            </n-space>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { previewUrl } from '@/utils/table/renderTools'
import { transformTimestampsToDateString } from '@/utils/tools/date'
import { orderStatus, storeStatus } from '@/utils/enum/system'
import Decimal from 'decimal.js'
const { order } = defineProps<{ order: order.orderInfo }>()
const { isAdmin } = useLoginUser()
const orderCollapse = ref(true)
const refundCollapse = ref(true)
const emit = defineEmits<{ callBack: [action: orderAction, orderId: order.orderInfo]; refundBack: [action: orderAction, refundId: number] }>()

/**
 * 折叠面板状态发送变化时触发
 */
const changeStatus = (expandedNames: string[]) => {
    if (expandedNames.includes('1')) {
        orderCollapse.value = false
    } else {
        orderCollapse.value = true
    }
    if (expandedNames.includes('2')) {
        refundCollapse.value = false
    } else {
        refundCollapse.value = true
    }
}

/**
 * 动态计算当前色调
 */
const dynamicColor = computed(() => {
    if (order.isRemind == 1) {
        return '#ff2d4b'
    } else {
        if ((order.status == 6 && order.isPay == 1) || (order.refundStatus != 0 && order.refundStatus != 6 && order.refundStatus != 9)) {
            return '#ff6700'
        } else {
            return '#0093e1'
        }
    }
})
/**
 * 计算单号
 */
const serialSn = computed(() => {
    if (order.isRemind == 1) {
        return order.serialSn + '催单'
    } else {
        if (order.status == 6 && order.isPay == 1) {
            return order.serialSn + '退款'
        } else {
            if (order.isReserve == 1) {
                return order.serialSn + '预订单'
            } else {
                return order.serialSn
            }
        }
    }
})
</script>
<style scoped lang="css">
.orderSn:after {
    content: '';
    position: absolute;
    z-index: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 0;
    transform: translateX(100%);
    height: 0;
    border-top: 19px solid transparent;
    border-left: 14px solid v-bind(dynamicColor);
    border-bottom: 19px solid transparent;
}
</style>

<template>
    <n-drawer v-model:show="active" :default-width="820" resizable :min-width="820" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="订单详情" closable>
            <!--订单信息 -->
            <div>
                <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">订单信息</div>
                <div>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">下单商户：</span>
                        <span>{{ order?.store?.title }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">商户单号：</span>
                        <span>#{{ order?.serialSn }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">下单人UID：</span>
                        <span>{{ order?.uid }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">订单编号：</span>
                        <span>{{ order?.ordersn || '--' }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">本平台支付单号：</span>
                        <span>{{ order?.outTradeNo || '--' }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">第三方支付单号：</span>
                        <span>{{ order?.transactionId || '--' }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">下单时间：</span>
                        <span>{{ transformTimestampsToDateString(order!.addtime) || '--' }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">支付时间：</span>
                        <span>{{ transformTimestampsToDateString(order!.paytime) || '--' }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">订单状态：</span>
                        <span class="text-primary">{{ orderStatus[order!.status] }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">支付方式：</span>
                        <n-tag type="success">微信支付</n-tag>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">订单备注：</span>
                        <span>{{ order?.note || '--' }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">入账状态：</span>
                        <n-tag type="success">{{ order.status == 5 ? '已入账' : '未人账' }}</n-tag>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">分账状态：</span>
                        <n-tag :type="order.profitSharing == 1 ? 'success' : 'primary'">{{ order.profitSharing == 1 ? '已分账' : '未分账' }}</n-tag>
                    </n-flex>
                </div>
            </div>
            <!--配送信息-->
            <div>
                <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">配送信息</div>
                <div>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">配送时间：</span>
                        <div>
                            <span>{{ transformTimestampsToDateString(order!.deliverytime, 'YYYY-MM-DD') }}</span>
                            <span>{{ order?.deliveryTime }}</span>
                        </div>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">收货人名称：</span>
                        <span>{{ order?.username }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">收货人电话：</span>
                        <span>{{ order?.mobile }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">收货地址：</span>
                        <span>{{ order?.address + order?.number }}</span>
                    </n-flex>
                    <n-flex v-if="order?.deliveryer" class="py-1">
                        <span class="w-120px text-right">配送员名称：</span>
                        <span>{{ order?.deliveryer.title + order?.deliveryer?.nickname }}</span>
                    </n-flex>
                    <n-flex v-if="order?.deliveryer" class="py-1">
                        <span class="w-120px text-right">配送员手机号：</span>
                        <span>{{ order?.deliveryer?.mobile }}</span>
                    </n-flex>
                    <n-flex v-if="order?.deliveryer" class="py-1">
                        <span class="w-120px text-right">配送员接单时间：</span>
                        <span>{{ order?.deliveryAssignTime ? transformTimestampsToDateString(order?.deliveryAssignTime) : '-' }}</span>
                    </n-flex>
                    <n-flex v-if="order?.deliveryer" class="py-1">
                        <span class="w-120px text-right">配送员进店时间：</span>
                        <span>{{ order?.deliveryInstoreTime ? transformTimestampsToDateString(order?.deliveryInstoreTime) : '-' }}</span>
                    </n-flex>
                    <n-flex v-if="order?.deliveryer" class="py-1">
                        <span class="w-120px text-right">配送员取餐时间：</span>
                        <span>{{ order?.deliveryTakegoodsTime ? transformTimestampsToDateString(order?.deliveryTakegoodsTime) : '-' }}</span>
                    </n-flex>
                    <n-flex v-if="order?.deliveryer" class="py-1">
                        <span class="w-120px text-right">配送员送达时间：</span>
                        <span>{{ order?.deliverySuccessTime ? transformTimestampsToDateString(order?.deliverySuccessTime) : '-' }}</span>
                    </n-flex>
                </div>
            </div>
            <!--费用信息 -->
            <div>
                <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">费用信息</div>
                <div>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">商品价格：</span>
                        <span>¥{{ order?.price }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">餐盒费：</span>
                        <span>¥{{ order?.boxPrice }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">包装费：</span>
                        <span>¥{{ order?.packFee }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">配送费：</span>
                        <span>¥{{ order?.deliveryFee }}</span>
                    </n-flex>
                    <n-flex v-if="order?.orderCart?.usedActivityMap?.mallNewMember?.back" class="py-1">
                        <span class="w-120px text-right">平台新客优惠：</span>
                        <div>
                            <span>¥{{ order?.orderCart?.usedActivityMap?.mallNewMember?.back }}</span>
                            <span class="text-#999 text-14px">({{ `商户承担¥${order?.orderCart?.usedActivityMap?.mallNewMember?.store_charge}, 平台承担¥${order?.orderCart?.usedActivityMap?.mallNewMember?.plateform_charge}` }})</span>
                        </div>
                    </n-flex>
                    <n-flex v-if="order?.orderCart?.usedActivityMap?.newMember?.back" class="py-1">
                        <span class="w-120px text-right">门店新客优惠：</span>
                        <div>
                            <span>¥{{ order?.orderCart?.usedActivityMap?.newMember?.back }}</span>
                            <span class="text-#999 text-14px">({{ `商户承担¥${order?.orderCart?.usedActivityMap?.newMember?.store_charge}, 平台承担¥${order?.orderCart?.usedActivityMap?.newMember?.plateform_charge}` }})</span>
                        </div>
                    </n-flex>
                    <n-flex v-if="order?.orderCart?.usedActivityMap?.discount?.back" class="py-1">
                        <span class="w-120px text-right">满减优惠：</span>
                        <div>
                            <span>¥{{ order?.orderCart?.usedActivityMap?.discount?.back }}</span>
                            <span class="text-#999 text-14px">({{ `商户承担¥${order?.orderCart?.usedActivityMap?.discount?.store_charge}, 平台承担¥${order?.orderCart?.usedActivityMap?.discount?.plateform_charge}` }})</span>
                        </div>
                    </n-flex>
                    <n-flex v-if="order?.orderCart?.usedActivityMap?.grant?.back" class="py-1">
                        <span class="w-120px text-right">满赠优惠：</span>
                        <div>
                            <span>{{ order?.orderCart?.usedActivityMap?.grant?.back }}</span>
                            <span class="text-#999 text-14px">({{ `满¥${order?.orderCart?.usedActivityMap?.grant?.condition}, 赠送${order?.orderCart?.usedActivityMap?.grant?.back}` }})</span>
                        </div>
                    </n-flex>
                    <n-flex v-if="order?.orderCart?.usedActivityMap?.deliveryFeeDiscount" class="py-1">
                        <span class="w-120px text-right">满减配送费：</span>
                        <div>
                            <span>¥{{ order?.orderCart?.usedActivityMap?.discountDeliveryFee }}</span>
                            <span class="text-#999 text-14px">({{ `商户承担¥${order?.orderCart?.usedActivityMap?.deliveryFeeDiscount.store_charge}, 平台承担¥${order?.orderCart?.usedActivityMap?.deliveryFeeDiscount?.plateform_charge}` }})</span>
                        </div>
                    </n-flex>
                    <n-flex v-if="order?.refundFee" class="py-1">
                        <span class="w-120px text-right">订单退款：</span>
                        <span>¥{{ order?.refundFee }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">合计费用：</span>
                        <span>¥{{ order?.totalFee }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">合计优惠：</span>
                        <span>-¥{{ order?.discountFee }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">顾客实付：</span>
                        <span>¥{{ order?.finalFee }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">商户预估收入：</span>
                        <span>¥{{ order?.storeFinalFee }}</span>
                    </n-flex>
                    <n-flex class="py-1">
                        <span class="w-120px text-right">平台预估收益：</span>
                        <span>¥{{ order?.plateformServeFee }}</span>
                    </n-flex>
                </div>
            </div>
            <!--商品信息 -->
            <div>
                <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">
                    <span class="w-100px">商品信息</span>
                    <div class="flex-1 text-14px text-#ff6700 text-right">
                        <span class="pr-1"> 总商品: ¥{{ order.price }} </span>
                        <span class="pr-1"> 餐盒费: ¥{{ order.boxPrice }} </span>
                        <span class="pr-1"> 包装费: ¥{{ order.packFee }} </span>
                        <span class="pr-1"> 合计费用: ¥{{ order.totalFee }} </span>
                        <span class="pr-1"> 已优惠: ¥{{ order.discountFee }} </span>
                        <span class="pr-1"> 顾客实付: ¥{{ order.finalFee }} </span>
                    </div>
                </div>
                <div>
                    <n-table :bordered="false" :single-line="false" striped>
                        <thead>
                            <tr class="text-center">
                                <th class="w-70px">ID</th>
                                <th>图片</th>
                                <th>名称</th>
                                <th>数量</th>
                                <th>单价</th>
                                <th>餐盒费</th>
                                <th>包装费</th>
                                <th>小计</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(good, index) in order?.orderCart.orderCartDataList" :key="index" class="text-center">
                                <td>{{ good.goodsId }}</td>
                                <td><n-image :src="previewUrl + good.thumb" lazy :width="50" class="rounded" /></td>
                                <td>
                                    <div>
                                        <span>{{ good.title }} </span>
                                        <span>({{ good.titleDetail }})</span>
                                    </div>
                                </td>
                                <td>{{ good.num }}</td>
                                <td>{{ new Decimal(good.price).dividedBy(new Decimal(good.num)) }}</td>
                                <td>{{ good.boxPrice }}</td>
                                <td>{{ good.boxCost }}</td>
                                <td>{{ new Decimal(good.price).add(new Decimal(good.boxPrice)).add(new Decimal(good.boxCost)) }}</td>
                            </tr>
                        </tbody>
                    </n-table>
                </div>
            </div>
            <!--退款信息-->
            <div v-if="order.orderRefundList && order.orderRefundList?.length > 0">
                <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">
                    <span class="w-100px">退款信息</span>
                    <div class="flex-1 text-14px text-#ff6700 text-right">
                        <span>{{ order.status == 5 ? '部分退款' : '整单退款' }}</span>
                        <span v-if="order.refundFee" class="pr-1"> 退款金额: ¥{{ order.refundFee }} </span>
                    </div>
                </div>
                <div class="p-2">
                    <div v-for="(refund, idx) in order.orderRefundList" :key="'refund' + idx" :style="order.orderRefundList.length > 1 ? { borderBottom: '1px solid #e4e7ed' } : ''">
                        <div v-if="order.orderRefundList.length > 1" class="py-2 text-16px flex-row-between text-primary">
                            <span>第{{ order.orderRefundList.length - idx }}次退款</span>
                            <span>退款金额：{{ refund.fee }}</span>
                        </div>
                        <n-steps vertical size="small" :current="refund.orderRefundLogList.length" status="finish">
                            <n-step v-for="(log, ix) in refund.orderRefundLogList" :key="'log' + ix">
                                <template #title>
                                    <div class="flex-row-between text-#515a6e w-700px">
                                        <span>{{ log.title }}</span>
                                        <span>{{ transformTimestampsToDateString(log.addtime) }}</span>
                                    </div>
                                </template>
                                <div class="flex-row-between text-#909399 w-full">
                                    <div v-if="ix == 0">
                                        <div v-if="refund.data">
                                            <div class="flex">
                                                <span class="pr-1 w-70px">退款商品:</span>
                                                <div class="flex-1">
                                                    <div v-for="(goods, i) in refund?.refundData?.refundGoods" :key="'good' + i">
                                                        <div>
                                                            <span>{{ goods.title }}</span>
                                                            <span v-if="goods.titleDetail">({{ goods.titleDetail }})</span>
                                                        </div>
                                                        <div>
                                                            <span class="pr-2">退: x{{ goods.reufundNum }}份</span>
                                                            <span>金额: ¥{{ goods.price }}</span>
                                                            <span class="px-2">餐盒费:</span>
                                                            <span>¥{{ goods.boxPrice }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span class="pr-1">退款金额：</span>
                                                <span class="font-bold text-#ff3333">¥{{ refund?.fee }}</span>
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
                    </div>
                </div>
            </div>
            <!--订单日志-->
            <div v-if="order.orderStatusLogList && order.orderStatusLogList?.length > 0">
                <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">订单日志</div>
                <n-steps vertical size="small" :current="order.orderStatusLogList.length" status="finish" class="py-4">
                    <n-step v-for="(log, idx) in order.orderStatusLogList" :key="'log' + idx">
                        <template #title>
                            <div class="flex-row-between text-#515a6e w-700px">
                                <div>
                                    <span>{{ log.title }}</span>
                                    <span class="ml-6">操作人：{{ log.roleCn }}</span>
                                </div>
                                <div>{{ transformTimestampsToDateString(log.addtime) }}</div>
                            </div>
                        </template>
                        <div class="flex-row-between text-#909399">
                            {{ log.note }}
                        </div>
                    </n-step>
                </n-steps>
            </div>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import { transformTimestampsToDateString } from '@/utils/tools/date'
import { orderStatus } from '@/utils/enum/system'
import { previewUrl } from '@/utils/table/renderTools'
import Decimal from 'decimal.js'
const active = defineModel<boolean>('show')
const { order } = defineProps<{ order: order.orderInfo }>()
</script>

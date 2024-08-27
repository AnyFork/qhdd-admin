<template>
    <n-spin :show="loading" description="loading">
        <n-form ref="formRef" :label-width="350" :model="orderSetting" size="medium" label-placement="left" style="margin-top: 20px">
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">通知规则</div>
            <n-form-item label="通知店员规则">
                <div>
                    <div>
                        <div class="flex">
                            <n-input-number v-model:value="orderSetting.notify_rule_clerk.notify_delay" :min="0" clearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">下单后</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">分钟之内未接单,则微信模板消息通知</span>
                                </template>
                            </n-input-number>
                            <n-input-number v-model:value="orderSetting.notify_rule_clerk.notify_frequency" :min="0" clearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">通知频率为每</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">分钟通知一次</span>
                                </template>
                            </n-input-number>
                            <n-input-number v-model:value="orderSetting.notify_rule_clerk.notify_total" :min="0" clearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">总共通知</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">次</span>
                                </template>
                            </n-input-number>
                        </div>
                        <p class="py-1 text-14px text-#999">规则为:下单后几分钟之内未接单,通知店员,通知过第一次之后几分钟之后仍未接单,则通知第二次,以此类推.</p>
                        <p class="py-1 text-14px text-#ff3333">如需下单后立即通知店员接单，可设置为0; 注意：商家设置了自动接单后，只会通知一次; 注意:通知频率最低为1分钟 如果一个订单只需要通知一次，需要将总通知次数设置为1</p>
                    </div>
                    <div class="py-4">
                        <div class="flex">
                            <n-input-number v-model:value="orderSetting.notify_rule_clerk.notify_phonecall_time" :min="0" cearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">微信模板消息通知第</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">次时,同时电话通知</span>
                                </template>
                            </n-input-number>
                        </div>
                        <p class="py-1 text-14px text-#999">规则为:例如设置为微信模板消息通知3(不能超过微信模板消息的总次数)次时，同时电话通知，即微信模板消息通知2次后仍未接单，则微信模板消息继续通知商家，同时电话通知店员</p>
                        <p class="py-1 text-14px text-#ff3333">如需下单后立即电话通知店员接单，可设置为0</p>
                    </div>
                </div>
            </n-form-item>
            <n-form-item label="配送员规则">
                <div>
                    <div>
                        <div class="flex">
                            <n-input-number v-model:value="orderSetting.notify_rule_deliveryer.notify_delay" :min="0" clearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">下单后</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">分钟之内未接单,则微信模板消息通知</span>
                                </template>
                            </n-input-number>
                            <n-input-number v-model:value="orderSetting.notify_rule_deliveryer.notify_frequency" :min="0" clearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">通知频率为每</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">分钟通知一次</span>
                                </template>
                            </n-input-number>
                            <n-input-number v-model:value="orderSetting.notify_rule_deliveryer.notify_total" :min="0" clearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">总共通知</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">次</span>
                                </template>
                            </n-input-number>
                        </div>
                        <p class="py-1 text-14px text-#999">规则为:商户通知配送员接单后几分钟之内未接单,通知配送员,通知过第一次之后几分钟之后仍未接单,则通知第二次,以此类推.</p>
                        <p class="py-1 text-14px text-#ff3333">注意:该规则仅适用外卖单派单模式为"配送员抢单",其他模式不会生效。如需商家在通知配送员接单后立即通知配送员抢单，可设置为0; 注意:通知频率最低为1分钟。 如果一个订单只需要通知一次，需要将总通知次数设置为1</p>
                    </div>
                    <div class="py-4">
                        <div class="flex">
                            <n-input-number v-model:value="orderSetting.notify_rule_deliveryer.notify_phonecall_time" :min="0" clearable placeholder="">
                                <template #prefix>
                                    <span class="text-14px text-#999">微信模板消息通知第</span>
                                </template>
                                <template #suffix>
                                    <span class="text-14px text-#999">次时,同时电话通知</span>
                                </template>
                            </n-input-number>
                        </div>
                        <p class="py-1 text-14px text-#999">规则为:例如设置为微信模板消息通知3(不能超过微信模板消息通知的总次数)次时，同时电话通知，即微信模板消息通知2次后配送员仍未接单，则继续微信模板消息通知，同时电话通知配送员</p>
                        <p class="py-1 text-14px text-#ff3333">如需下单后立即电话通知配送员接单，可设置为0</p>
                    </div>
                </div>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">顾客相关设置</div>
            <n-form-item label="订单支付后是否允许顾客修改地址">
                <n-radio-group v-model:value="orderSetting.orderPayAllowCustomerChangeAddress">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="支付时间限制">
                <div>
                    <n-input-number v-model:value="orderSetting.pay_time_limit" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">例如:设置为15分钟,那么顾客在提交订单后15分钟内未支付,系统会自动取消该订单。如果没有支付时间限制,请设置为0 该设置仅对"外卖订单"有效.店内订单不受此设置影响</p>
                </div>
            </n-form-item>
            <n-form-item label="未支付时间提醒">
                <div>
                    <n-input-number v-model:value="orderSetting.pay_time_notice" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">例如:设置为5分钟,那么顾客在提交订单后5分钟内未支付,系统会自动发送微信模板消息提醒顾客。如果没有待支付提醒,请设置为0 该设置仅对"外卖订单"有效.店内订单不受此设置影响</p>
                </div>
            </n-form-item>
            <n-form-item label="顾客催单限制">
                <div class="flex">
                    <n-input-number v-model:value="orderSetting.deliveryer_remind_time_start" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">配送员接单</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">分钟后顾客才能催单</span>
                        </template>
                    </n-input-number>
                    <n-input-number v-model:value="orderSetting.deliveryer_remind_time_limit" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">催单时间间隔</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">分钟</span>
                        </template>
                    </n-input-number>
                </div>
            </n-form-item>
            <n-form-item label="支付后至商户未接单允许顾客取消订单">
                <div>
                    <n-radio-group v-model:value="orderSetting.cancel_order_before_accept_order">
                        <n-space>
                            <n-radio :value="1">是</n-radio>
                            <n-radio :value="0">否</n-radio>
                        </n-space>
                    </n-radio-group>
                    <p class="py-1 text-14px text-#999">设置为'是'，则只要商户未接单，顾客随时可取消订单。</p>
                </div>
            </n-form-item>
            <n-form-item label="商家接单后至通知配送之前顾客取消订单时间限制">
                <div>
                    <n-input-number v-model:value="orderSetting.cancel_after_handle" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">商家接单后多少分钟，顾客仍然可以取消订单；设置为0，则商家接单后顾客不可以取消订单.。</p>
                </div>
            </n-form-item>
            <n-form-item label="订单通知配送至订单完成之前顾客取消订单方式">
                <div>
                    <n-radio-group v-model:value="orderSetting.customerCancelOrderTypeBeforeFinish">
                        <n-space>
                            <n-radio :value="1">整单取消</n-radio>
                            <n-radio :value="2">部分退款</n-radio>
                            <n-radio :value="3">不允许</n-radio>
                        </n-space>
                    </n-radio-group>
                    <p class="py-1 text-14px text-#999">订单通知配送至订单完成之前, 是否允许顾客申请退款或整单取消.。</p>
                </div>
            </n-form-item>
            <n-form-item label="订单完成后顾客取消订单方式">
                <div>
                    <n-radio-group v-model:value="orderSetting.customerCancelOrderTypeAfterOrderFinish">
                        <n-space>
                            <n-radio :value="1">部分退款</n-radio>
                            <n-radio :value="2">不允许</n-radio>
                        </n-space>
                    </n-radio-group>
                    <p class="py-1 text-14px text-#999">订单完成后1天内, 是否允许顾客申请退款.</p>
                </div>
            </n-form-item>
            <n-form-item label="顾客申请退款后自动同意时间">
                <div>
                    <n-input-number v-model:value="orderSetting.customer_refund_auto_audittime" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">例如:设置为15分钟,那么顾客在申请退款后15分钟内未商户未处理顾客的退款申请, 系统会自动同意顾客的退款申请。设置为0, 则表示不会自动同意。</p>
                </div>
            </n-form-item>
            <n-form-item label="订单完成后顾客可退款时间限制">
                <div>
                    <n-input-number v-model:value="orderSetting.customer_refund_time_limit" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">天</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">订单完成后顾客可退款时间限制,超过设定天数，不可退款，0表示不限制</p>
                </div>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">商家相关设置</div>
            <n-form-item label="是否允许商户设置自动接单方式">
                <n-radio-group v-model:value="orderSetting.allowStoreAutoAcceptOrder">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="是否允许商户设置接单后自动通知配送员">
                <n-radio-group v-model:value="orderSetting.allowStoreAutoNotifyDeliveryer">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="商家接单后是否允许商户取消订单">
                <n-radio-group v-model:value="orderSetting.allowStoreCancelOrder">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="商家接单时间限制">
                <div>
                    <n-input-number v-model:value="orderSetting.handle_time_limit" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">例如:设置为15分钟,那么顾客支付后,商家在15分钟内未接单,系统会自动取消该订单.如果没有接单时间限制,请设置为0 该设置仅对"外卖订单"有效.店内订单不受此设置影响</p>
                </div>
            </n-form-item>
            <n-form-item label="订单完成后是否允许商家发起部分退款">
                <n-radio-group v-model:value="orderSetting.allowStorePartRefund">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="商户隐藏后是否可以继续下单">
                <n-radio-group v-model:value="orderSetting.allowOrderAfterStoreHidden">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">配送员相关设置</div>
            <n-form-item label="配送员接单时间限制">
                <div>
                    <n-input-number v-model:value="orderSetting.deliveryer_collect_time_limit" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">例如:设置为10分钟,那么商家通知配送员接单后,配送员在10分钟内未接单,系统会自动取消该订单.如果没有接单时间限制,请设置为0 该设置仅对"外卖订单"有效.店内订单不受此设置影响</p>
                </div>
            </n-form-item>
            <n-form-item label="配送员转单理由">
                <div class="w-600px">
                    <n-input v-model:value="orderSetting.deliveryer_transfer_reason" type="textarea" :autosize="{ minRows: 3 }" clearable placeholder=""> </n-input>
                    <p class="py-1 text-14px text-#999">可设置多个转单理由，用逗号分隔</p>
                </div>
            </n-form-item>
            <n-form-item label="配送员取消订单理由">
                <div class="w-600px">
                    <n-input v-model:value="orderSetting.deliveryer_cancel_reason" type="textarea" :autosize="{ minRows: 3 }" clearable placeholder=""> </n-input>
                    <p class="py-1 text-14px text-#999">可设置多个转单理由，用逗号分隔</p>
                </div>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">其他设置</div>
            <n-form-item label="预订单是否自动通知配送员">
                <n-radio-group v-model:value="orderSetting.preOrder_auto_notify_deliveryer">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="配送员接单后是否通知商户">
                <div>
                    <n-radio-group v-model:value="orderSetting.deliveryer_notify_store">
                        <n-space>
                            <n-radio :value="1">是 </n-radio>
                            <n-radio :value="0">否</n-radio>
                        </n-space>
                    </n-radio-group>
                    <p class="py-1 text-14px text-#999">此项设置配送员接单后,是否通知商户。通知方式为:微信模板消息和打印机打印(如果门店配置了打印机的话)</p>
                </div>
            </n-form-item>
            <n-form-item label="外卖订单自动完成时间节点">
                <n-radio-group v-model:value="orderSetting.takeout_order_auto_finish_time">
                    <n-space>
                        <n-radio :value="1">超过商户接单时间多久后自动完成 </n-radio>
                        <n-radio :value="2">超过定单送达时间多久后自动完成</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="外卖订单自动完成时间">
                <div>
                    <n-input-number v-model:value="orderSetting.takeout_order_auto_finish_time_limit" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">超过自动完成时间节点</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">小时自动完成</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">自动完成时间只能是整数, 如果你不需要自动完成, 可以设置为0.</p>
                </div>
            </n-form-item>
            <n-form-item label="系统/商家/顾客取消订单是否自动退款">
                <n-radio-group v-model:value="orderSetting.auto_refund_after_cancel">
                    <n-space>
                        <n-radio :value="1">是 </n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="系统/商家/顾客取消订单是否打印订单">
                <n-radio-group v-model:value="orderSetting.auto_print_order_after_cancel">
                    <n-space>
                        <n-radio :value="1">是 </n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">订单评价</div>
            <n-form-item label="订单评价时间" class="py-6">
                <div>
                    <n-input-number v-model:value="orderSetting.comment_day_limit" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">订单完成超过</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">天则不能再进行评价</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">0为不限制</p>
                </div>
            </n-form-item>
            <n-form-item>
                <n-button type="primary" class="w-680px ml-200px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
            </n-form-item>
        </n-form>
    </n-spin>
</template>

<script setup lang="ts">
import { FormInst } from 'naive-ui'
const formRef = ref<FormInst | null>(null)
const emit = defineEmits<{ refresh: [] }>()
const { isAdmin } = useLoginUser()
const { configData, getPlatformSettings, message, loading, updateSettings } = useSettings()

const orderSetting = ref<setting.takeout_order>({
    notify_rule_clerk: {
        notify_delay: 0,
        notify_frequency: 1,
        notify_total: 3,
        notify_phonecall_time: 3
    },
    notify_rule_deliveryer: {
        notify_delay: 0,
        notify_frequency: 1,
        notify_total: 3,
        notify_phonecall_time: 2
    },
    orderPayAllowCustomerChangeAddress: 1,
    pay_time_limit: 15,
    pay_time_notice: 5,
    cancel_order_before_accept_order: 1,
    deliveryer_remind_time_start: 40,
    deliveryer_remind_time_limit: 1,
    allowStoreCancelOrder: 1,
    cancel_after_handle: 1,
    customerCancelOrderTypeBeforeFinish: 2,
    customerCancelOrderTypeAfterOrderFinish: 1,
    customer_refund_auto_audittime: 120,
    customer_refund_time_limit: 1,
    allowStoreAutoAcceptOrder: 1,
    allowStoreAutoNotifyDeliveryer: 1,
    handle_time_limit: 0,
    allowStorePartRefund: 1,
    allowOrderAfterStoreHidden: 1,
    deliveryer_collect_time_limit: 0,
    deliveryer_transfer_reason: '',
    deliveryer_cancel_reason: '',
    preOrder_auto_notify_deliveryer: 0,
    deliveryer_notify_store: 0,
    takeout_order_auto_finish_time: 2,
    takeout_order_auto_finish_time_limit: 0,
    auto_refund_after_cancel: 1,
    auto_print_order_after_cancel: 1,
    comment_day_limit: 1
})

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await updateSettings({ module: 'takeout_order', config: JSON.stringify(orderSetting.value), remark: '外卖-订单设置' })
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

onMounted(async () => {
    await getPlatformSettings('takeout_order')
    orderSetting.value = JSON.parse(configData.value!.config)
})
</script>

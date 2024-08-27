<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">外卖设置</div>
        <n-form ref="formRef" :label-width="200" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="可提前几天点外卖">
                <div>
                    <n-input-number v-model:value="moduleValue.deliveryWithinDays" :min="0" :max="6" clearable placeholder="" class="!w-280px">
                        <template #suffix>
                            <span class="text-14px text-#999">天</span>
                        </template>
                    </n-input-number>
                    <p class="py-2 text-14px text-#999">如果只接受当天订单，请填写0. 最多可提前6天</p>
                </div>
            </n-form-item>
            <n-form-item label="需提前几天预定外卖">
                <div>
                    <n-input-number v-model:value="moduleValue.deliveryReserveDays" :min="0" :max="5" clearable placeholder="" class="!w-280px">
                        <template #suffix>
                            <span class="text-14px text-#999">天</span>
                        </template>
                    </n-input-number>
                    <p class="py-2 text-14px text-#999">如果不需要提前预定，请填写0. 如果设置提前1天预定, 用户今天下单后, 能选择明天的配送时间进行配送</p>
                </div>
            </n-form-item>
            <n-form-item label="非营业时间下单">
                <div>
                    <n-radio-group v-model:value="moduleValue.restCanOrder">
                        <n-space>
                            <n-radio :value="1">可非营业时间下单</n-radio>
                            <n-radio :value="0">不可非营业时间下单</n-radio>
                        </n-space>
                    </n-radio-group>
                    <p class="py-2 text-14px text-#999">如果选择“可非营业时间下单”，用户可在门店营业时间外下预订单，并选择营业时间段内的某个时间送达。请务必关注用户预订单要求的送达时间，该预订单在门店营业时间开始后5分钟还未处理将会被系统自动取消，请在营业时间开始之前及时查看预订单并处理</p>
                </div>
            </n-form-item>
            <n-form-item label="下单时间距离送达时间超过">
                <div>
                    <n-input-number v-model:value="moduleValue.dataObj!.reserve.reserve_time_limit" :min="0" clearable placeholder="" class="!w-280px">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟 属于预订单</span>
                        </template>
                    </n-input-number>
                    <p class="py-2 text-14px text-#999">如未设置(0)"下单时间距离送达时间超过多少分钟属于预定单"，系统默认该值为150分钟。也就是：当下单时间距离送达时间超过150分时,系统认为此订单为预定单</p>
                </div>
            </n-form-item>
            <n-form-item label="距离送达时间">
                <div>
                    <n-input-number v-model:value="moduleValue.dataObj!.reserve.notice_clerk_before_delivery" :min="0" clearable placeholder="" class="!w-280px">
                        <template #suffix>
                            <span class="text-14px text-#999">分钟 通知商户备餐</span>
                        </template>
                    </n-input-number>
                </div>
            </n-form-item>
            <n-form-item label="预定单打印时间点">
                <n-radio-group v-model:value="moduleValue.dataObj!.reserve_order_print_type">
                    <n-space>
                        <n-radio :value="1">支付/接单后自动打印</n-radio>
                        <n-radio :value="2">通知商户备餐时打印</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="包装费计费方式">
                <n-radio-group v-model:value="moduleValue.dataObj!.pack_price.type">
                    <n-space>
                        <n-radio :value="1">固定金额</n-radio>
                        <n-radio :value="2">按订单支付金额区间</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item v-if="moduleValue.dataObj?.pack_price?.type == 1" label="包装费">
                <n-input-number v-model:value="moduleValue.dataObj!.pack_price.fee" :min="0" clearable placeholder="请输入固定包装费" class="!w-280px">
                    <template #prefix>
                        <span class="text-14px text-#999">固定</span>
                    </template>
                    <template #suffix>
                        <span class="text-14px text-#999">元</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item v-else label="包装费">
                <div>
                    <div class="flex gap-2 py-2" v-for="(item,index) in moduleValue.dataObj!.pack_price.rules" :key="'rule' + index">
                        <n-input-number v-model:value="item.start" clearable placeholder="" class="!w-280px">
                            <template #prefix>
                                <span class="text-14px text-#999">订单金额在</span>
                            </template>
                            <template #suffix>
                                <span class="text-14px text-#999">元</span>
                            </template>
                        </n-input-number>
                        <n-input-number v-model:value="item.end" clearable placeholder="" class="!w-280px">
                            <template #prefix>
                                <span class="text-14px text-#999">至</span>
                            </template>
                            <template #suffix>
                                <span class="text-14px text-#999">元</span>
                            </template>
                        </n-input-number>
                        <n-input-number v-model:value="item.fee" clearable placeholder="" class="!w-280px">
                            <template #prefix>
                                <span class="text-14px text-#999">包装费</span>
                            </template>
                            <template #suffix>
                                <span class="text-14px text-#999">元</span>
                            </template>
                        </n-input-number>
                        <n-button type="error" size="small" @click="() => moduleValue.dataObj!.pack_price.rules?.splice(index,1)">删除</n-button>
                    </div>
                    <n-button type="primary" size="small" class="py-2" @click="() => moduleValue.dataObj!.pack_price.rules?.push({ start: 0, end: 0, fee: 0 })">添加规则</n-button>
                </div>
            </n-form-item>
            <n-form-item>
                <n-button type="primary" class="w-680px ml-200px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
            </n-form-item>
        </n-form>
    </n-spin>
</template>

<script setup lang="ts">
const emit = defineEmits<{ refresh: [] }>()
const { isAdmin } = useLoginUser()
const { formRef, moduleValue, getStoreDetailInfoBySid, loading, message, updateStoreInfo } = useStore()
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            // 数据校验
            if (!moduleValue.deliveryReserveDays) {
                moduleValue.deliveryReserveDays = 0
            }
            if (!moduleValue.deliveryWithinDays) {
                moduleValue.deliveryWithinDays = 0
            }
            if (!moduleValue.dataObj?.reserve?.reserve_time_limit) {
                moduleValue.dataObj!.reserve.reserve_time_limit = 0
            }
            if (!moduleValue.dataObj?.reserve?.notice_clerk_before_delivery) {
                moduleValue.dataObj!.reserve.notice_clerk_before_delivery = 0
            }
            if (moduleValue.dataObj?.pack_price.type == 1) {
                if (moduleValue.dataObj?.pack_price.fee == null) {
                    message.error('请填写固定包装费!')
                    return
                }
            } else {
                if (moduleValue.dataObj?.pack_price.rules?.length == 0) {
                    message.error('请添加包装费规则!')
                    return
                } else {
                    for (const rule of moduleValue.dataObj!.pack_price!.rules!) {
                        if (!rule.start || !rule.end || !rule.fee) {
                            message.error('请填写完整的包装费规则!')
                            return
                        }
                    }
                }
            }
            const { id, deliveryReserveDays, deliveryWithinDays, restCanOrder, dataObj } = moduleValue
            await updateStoreInfo({ id, deliveryReserveDays, deliveryWithinDays, restCanOrder, data: JSON.stringify(dataObj) })
            getStoreDetailInfoBySid()
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

onMounted(async () => {
    await getStoreDetailInfoBySid()
})
</script>

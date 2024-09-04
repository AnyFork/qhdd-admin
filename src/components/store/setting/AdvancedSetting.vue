<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">高级设置</div>
        <n-form ref="formRef" :label-width="200" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="打印机打印类型">
                <n-checkbox-group v-model:value="moduleValue.dataObj!.printer_perms">
                    <n-space item-style="display: flex;">
                        <n-checkbox value="orderplace" label="有新订单时打印" />
                        <n-checkbox value="orderremind" label="顾客催单时打印" />
                        <n-checkbox value="ordercancel" label="订单取消时打印" />
                        <n-checkbox value="cancelrefund" label="撤销退款申请打印" />
                    </n-space>
                </n-checkbox-group>
            </n-form-item>
            <n-form-item label="打印机打印设置">
                <n-radio-group v-model:value="moduleValue.autoPrintOrder">
                    <n-space item-style="display: flex;">
                        <n-radio :value="0" label="支付后立即打印" />
                        <n-radio :value="1" label="接单后自动打印" />
                        <n-radio :value="2" label="手动打印" />
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="自动接单方式">
                <div>
                    <n-radio-group v-model:value="moduleValue.autoHandelOrder">
                        <n-space item-style="display: flex;">
                            <n-radio :value="1" label="支付后自动接单" />
                            <n-radio :value="0" label="不自动接单" />
                        </n-space>
                    </n-radio-group>
                    <div class="py-1 text-14px text-#999">开启自动接单后, 用户下单支付后,系统会根据自动接单设置将订单设置为处理中; 自动接单方式设置为打印机出单后自动接单，则打印机默认支付后自动打印。</div>
                </div>
            </n-form-item>
            <n-form-item label="接单后自动通知配送员">
                <div>
                    <n-radio-group v-model:value="moduleValue.autoNoticeDeliveryer">
                        <n-space item-style="display: flex;">
                            <n-radio :value="1" label="开启" />
                            <n-radio :value="0" label="关闭" />
                        </n-space>
                    </n-radio-group>
                    <div class="py-1 text-14px text-#999">开启后, 店员接单后,系统会自动通知配送员进行配送(设置订单为待配送.仅对外卖订单有效).</div>
                    <div class="py-1 text-14px text-#ff3333">注意：设置支付后自动接单, 也会自动通知配送员抢单</div>
                </div>
            </n-form-item>
            <n-form-item label="自动通知配送员的时间">
                <div>
                    <div class="border border-solid border-#dcdfe6 flex-row-center h-35px">
                        <div class="px-2 h-full flex-row-center bg-#f2f2f2">商户接单</div>
                        <n-input-number v-model:value="moduleValue.dataObj!.auto_notice_deliveryer_time" clearable :min="0" class="!w-150px" placeholder="自动通知配送员的时间" />
                        <div class="px-2 h-full flex-row-center bg-#f2f2f2 w-190px">分钟后自动通知配送员配送</div>
                    </div>
                    <div class="py-1 text-14px text-#999">0表示商户自动接单后立即通知配送员配送</div>
                </div>
            </n-form-item>
            <n-form-item label="支持开发票">
                <div>
                    <n-radio-group v-model:value="moduleValue.invoiceStatus">
                        <n-space item-style="display: flex;">
                            <n-radio :value="1" label="支持" />
                            <n-radio :value="0" label="不支持" />
                        </n-space>
                    </n-radio-group>
                    <div class="py-1 text-14px text-#999">选择支持开发票后,用户在提交订单时可选择是否开发票</div>
                </div>
            </n-form-item>
            <n-form-item label="支付方式">
                <n-checkbox-group v-model:value="moduleValue.paymentStr">
                    <n-space item-style="display: flex;">
                        <n-checkbox value="wechat" label="微信支付" />
                    </n-space>
                </n-checkbox-group>
            </n-form-item>
            <n-button type="primary" class="w-620px ml-100px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
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
            const { id, autoPrintOrder, dataObj, autoHandelOrder, autoNoticeDeliveryer, invoiceStatus, paymentStr } = moduleValue
            await updateStoreInfo({ id, autoHandelOrder, autoNoticeDeliveryer, invoiceStatus, payment: paymentStr!.join(','), autoPrintOrder, data: JSON.stringify(dataObj) })
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
    console.log(moduleValue)
})
</script>

<template>
    <n-spin :show="loading" description="loading">
        <n-form ref="formRef" :label-width="250" :model="serve_fee" size="medium" label-placement="left" style="margin-top: 20px">
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">服务费率</div>
            <n-form-item label="抽成项目">
                <n-checkbox-group v-model:value="fee_items">
                    <n-space>
                        <n-checkbox value="price">商品费用</n-checkbox>
                        <n-checkbox value="box_price">餐盒费</n-checkbox>
                        <n-checkbox value="pack_fee">包装费</n-checkbox>
                    </n-space>
                </n-checkbox-group>
            </n-form-item>
            <n-form-item label="抽成比例">
                <n-input-number v-model:value="serve_fee.fee_rate" :min="0" clearable placeholder="">
                    <template #suffix>
                        <span class="text-14px text-#999">%</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item label="最低抽成金额">
                <n-input-number v-model:value="serve_fee.min_fee_rate" :min="0" clearable placeholder="">
                    <template #suffix>
                        <span class="text-14px text-#999">元</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">提现设置</div>
            <n-form-item label="提现金额">
                <div>
                    <div class="flex">
                        <n-input-number v-model:value="serve_fee.get_cash_fee_limit" :min="1" clearable placeholder="">
                            <template #prefix>
                                <span class="text-14px text-#999">最低</span>
                            </template>
                            <template #suffix>
                                <span class="text-14px text-#999">元</span>
                            </template>
                        </n-input-number>
                        <n-input-number v-model:value="serve_fee.get_cash_fee_limit_max" :min="0" clearable placeholder="">
                            <template #prefix>
                                <span class="text-14px text-#999">最高</span>
                            </template>
                            <template #suffix>
                                <span class="text-14px text-#999">元</span>
                            </template>
                        </n-input-number>
                    </div>
                    <p class="py-1 text-14px text-#999">注意:配送时间段间隔不小于15分钟. 系统将根据此项设置生成配送时间点</p>
                </div>
            </n-form-item>
            <n-form-item label="提现费率">
                <div>
                    <n-input-number v-model:value="serve_fee.get_cash_fee_rate" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">%</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">申请提现时，每笔申请提现扣除的费用，默认为空，即提现不扣费，支持填写小数</p>
                </div>
            </n-form-item>
            <n-form-item label="提现费用">
                <div>
                    <div class="flex">
                        <n-input-number v-model:value="serve_fee.get_cash_fee_min" :min="1" clearable placeholder="">
                            <template #prefix>
                                <span class="text-14px text-#999">最低</span>
                            </template>
                            <template #suffix>
                                <span class="text-14px text-#999">元</span>
                            </template>
                        </n-input-number>
                        <n-input-number v-model:value="serve_fee.get_cash_fee_max" :min="0" clearable placeholder="">
                            <template #prefix>
                                <span class="text-14px text-#999">最高</span>
                            </template>
                            <template #suffix>
                                <span class="text-14px text-#999">元</span>
                            </template>
                        </n-input-number>
                    </div>
                    <p class="py-1 text-14px text-#ff3333">最高金额设置为0， 表示不限制最高提现费用。</p>
                    <p class="py-1 text-14px text-#999">提现时，提现费用的上下限，最高为空时，表示不限制扣除的提现费用</p>
                    <p class="py-1 text-14px text-#999">例如：提现100元，费率5%，最低1元，最高2元，最终提现金额=100-2=98</p>
                    <p class="py-1 text-14px text-#999">例如：提现100元，费率5%，最低1元，最高10元，最终提现金额=100-100*5%=95</p>
                </div>
            </n-form-item>
            <n-form-item label="提现周期">
                <div>
                    <n-input-number v-model:value="serve_fee.fee_period" :min="0" clearable placeholder="">
                        <template #suffix>
                            <span class="text-14px text-#999">天</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">提现周期设置为0， 表示不限制提现周期。例如：提现周期设置为7天，即至少在上次提现7天后，才可以进行下次提现。</p>
                </div>
            </n-form-item>
            <n-form-item label="提现到账周期">
                <n-radio-group v-model:value="serve_fee.get_cash_period">
                    <n-space>
                        <n-radio :value="0">管理员审核</n-radio>
                        <n-radio :value="1">急速到账</n-radio>
                    </n-space>
                </n-radio-group>
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
const { configData, getPlatformSettings, message, loading, updateSettings } = useSettings()
const { isAdmin } = useLoginUser()
const fee_items = ref(['price', 'box_price', 'pack_fee'])
const serve_fee = ref<setting.store_serve_fee>({
    fee_rate: 4,
    fee_items: '',
    min_fee_rate: 0,
    get_cash_fee_limit: 1,
    get_cash_fee_limit_max: 0,
    get_cash_fee_rate: 0,
    get_cash_fee_min: 0,
    get_cash_fee_max: 0,
    fee_period: 7,
    get_cash_period: 0
})

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            serve_fee.value.fee_items = fee_items.value.join(',')
            await updateSettings({ module: 'store_serve_fee', config: JSON.stringify(serve_fee.value), remark: '商户-服务费' })
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

onMounted(async () => {
    await getPlatformSettings('store_serve_fee')
    serve_fee.value = JSON.parse(configData.value!.config)
    if (serve_fee.value.fee_items) {
        fee_items.value = serve_fee.value.fee_items.split(',')
    }
})
</script>

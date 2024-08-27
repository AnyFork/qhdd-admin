<template>
    <n-spin :show="loading" description="loading">
        <n-form ref="formRef" :label-width="250" :model="delivery" size="medium" label-placement="left" style="margin-top: 20px">
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">配送模式</div>
            <n-form-item label="预计送达时间">
                <n-input-number v-model:value="delivery.delivery_time" :min="0" clearable placeholder="">
                    <template #suffix>
                        <span class="text-14px text-#999">分钟</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item label="服务半径">
                <n-input-number v-model:value="delivery.serve_radius" :min="0" clearable placeholder="">
                    <template #suffix>
                        <span class="text-14px text-#999">公里</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item label="在配送半径之外是否允许下单">
                <n-radio-group v-model:value="delivery.not_in_serve_radius">
                    <n-space>
                        <n-radio :value="1">允许</n-radio>
                        <n-radio :value="0">不允许</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="配送费计费方式">
                <n-radio-group v-model:value="delivery.delivery_fee_mode" disabled>
                    <n-space>
                        <n-radio :value="1">固定计费</n-radio>
                        <n-radio :value="2">按距离收费</n-radio>
                        <n-radio :value="3">按区域收费</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="起送价">
                <n-input-number v-model:value="delivery.send_price" :min="0" clearable placeholder="">
                    <template #suffix>
                        <span class="text-14px text-#999">元</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item label="配送费每单">
                <n-input-number v-model:value="delivery.delivery_fee" :min="0" clearable placeholder="">
                    <template #suffix>
                        <span class="text-14px text-#999">元</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item label="商家额外承担配送费">
                <n-input-number v-model:value="delivery.delivery_extra.store_bear_deliveryprice" :min="0" clearable placeholder="">
                    <template #prefix>
                        <span class="text-14px text-#999">每单</span>
                    </template>
                    <template #suffix>
                        <span class="text-14px text-#999">元</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item label="平台额外补贴配送员">
                <n-input-number v-model:value="delivery.delivery_extra.plateform_bear_deliveryprice" :min="0" clearable placeholder="">
                    <template #prefix>
                        <span class="text-14px text-#999">每单</span>
                    </template>
                    <template #suffix>
                        <span class="text-14px text-#999">元</span>
                    </template>
                </n-input-number>
            </n-form-item>
            <n-form-item label="满金额免配送费由谁承担">
                <n-radio-group v-model:value="delivery.delivery_extra.delivery_free_bear">
                    <n-space>
                        <n-radio value="plateform">平台</n-radio>
                        <n-radio value="store">商家</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="配送时间段">
                <div>
                    <n-input-number v-model:value="delivery.delivery_extra.delivery_time_interval" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">间隔</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">分钟生成配送时间段</span>
                        </template>
                    </n-input-number>
                    <p class="py-1 text-14px text-#999">注意:配送时间段间隔不小于15分钟. 系统将根据此项设置生成配送时间点</p>
                </div>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">免配送费</div>
            <n-form-item label="满免配送费">
                <div class="flex">
                    <n-input-number v-model:value="delivery.delivery_free_price" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">满</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">元免配送费</span>
                        </template>
                    </n-input-number>
                </div>
            </n-form-item>
            <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">预定单设置</div>
            <n-form-item label="非营业时间下单">
                <n-radio-group v-model:value="delivery.reserve.rest_can_order">
                    <n-space>
                        <n-radio :value="1">可非营业时间下单</n-radio>
                        <n-radio :value="0">不可非营业时间下单</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="预订单设置">
                <div class="flex">
                    <n-input-number v-model:value="delivery.reserve.reserve_time_limit" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">下单时间距离送达时间超过</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">分钟 属于预定单</span>
                        </template>
                    </n-input-number>
                    <n-input-number v-model:value="delivery.reserve.notice_clerk_before_delivery" :min="0" clearable placeholder="">
                        <template #prefix>
                            <span class="text-14px text-#999">距离送达时间</span>
                        </template>
                        <template #suffix>
                            <span class="text-14px text-#999">分钟通知商户备餐</span>
                        </template>
                    </n-input-number>
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

const delivery = ref<setting.store_delivery>({
    delivery_time: 30,
    serve_radius: 1,
    not_in_serve_radius: 0,
    delivery_fee_mode: 1,
    send_price: 12,
    delivery_free_price: 0,
    delivery_fee: 1.9,
    delivery_extra: {
        store_bear_deliveryprice: 0,
        delivery_free_bear: 'store',
        plateform_bear_deliveryprice: 0,
        delivery_time_interval: 40
    },
    reserve: {
        rest_can_order: 1,
        reserve_time_limit: 60,
        notice_clerk_before_delivery: 35
    }
})

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await updateSettings({ module: 'store_delivery', config: JSON.stringify(delivery.value), remark: '商户-配送模式' })
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

onMounted(async () => {
    await getPlatformSettings('store_delivery')
    delivery.value = JSON.parse(configData.value!.config)
})
</script>

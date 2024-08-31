<template>
    <n-modal v-model:show="open" preset="card" title="设置服务费" :close-on-esc="false" class="w-500px">
        <n-form ref="formRef" :model="store" size="medium" label-placement="left" label-width="140px" style="margin-top: 20px">
            <n-form-item label="平台服务费计算方式">
                <n-radio-group v-model:value="store.dataObj.platformServiceFee.feePayType" name="radiogroup" :on-update:value="changeValue">
                    <n-space>
                        <n-radio :value="1">固定金额 </n-radio>
                        <n-radio :value="2">费率</n-radio>
                        <n-radio :value="3">固定金额 + 费率</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item v-if="store.dataObj.platformServiceFee.feePayType != 2" label="平台服务费">
                <n-input-number v-model:value="store.dataObj.platformServiceFee.feePayMoney" :min="0" placeholder="请输入平台服务费">
                    <template #suffix>元</template>
                </n-input-number>
            </n-form-item>
            <n-form-item v-if="store.dataObj.platformServiceFee.feePayType != 1" label="服务费率">
                <n-input-number v-model:value="store.dataObj.platformServiceFee.feePayPercent" :min="0" placeholder="请输入服务费率">
                    <template #suffix>%</template>
                </n-input-number>
            </n-form-item>
        </n-form>
        <template #footer>
            <div class="flex justify-end items-center gap-4">
                <n-button @click="open = false" class="!w-220px">关闭</n-button>
                <n-button type="primary" @click="submitCallback" :loading="loading" class="!w-220px">确认</n-button>
            </div>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
const { formRef, updateStoreInfo, loading, message } = usePlatformStore()
const open = defineModel<boolean>('open')
const store = defineModel<store.storeData>({ required: true })

/**
 * 值发生变还时触发
 * @param value
 */
const changeValue = (value: 1 | 2 | 3) => {
    if (value == 1) {
        store.value.dataObj.platformServiceFee.feePayPercent = 0
    }
    if (value == 2) {
        store.value.dataObj.platformServiceFee.feePayMoney = 0
    }
    store.value.dataObj.platformServiceFee.feePayType = value
}

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            console.log(store.value.dataObj.platformServiceFee.feePayMoney)
            if (store.value.dataObj.platformServiceFee.feePayType == 1) {
                if (store.value.dataObj.platformServiceFee.feePayMoney == null) {
                    message.error('请填写平台服务费!')
                    return
                }
            }
            if (store.value.dataObj.platformServiceFee.feePayType == 2) {
                if (store.value.dataObj.platformServiceFee.feePayPercent == null) {
                    message.error('请填写平台服务费费率!')
                    return
                }
            }

            if (store.value.dataObj.platformServiceFee.feePayType == 3) {
                if (store.value.dataObj.platformServiceFee.feePayMoney == null) {
                    message.error('请填写平台服务费!')
                    return
                }

                if (store.value.dataObj.platformServiceFee.feePayPercent == null) {
                    message.error('请填写平台服务费费率!')
                    return
                }
            }
            updateStoreInfo({ id: store.value.id!, data: JSON.stringify(store.value.dataObj) })
            open.value = false
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>
<style scoped>
:deep(.n-modal) {
    width: 500px !important;
}
</style>

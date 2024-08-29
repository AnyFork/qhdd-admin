<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">页面设置</div>
        <n-form ref="formRef" :label-width="250" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="进入商品列表页提示">
                <div>
                    <n-input v-model:value="moduleValue.tips" type="textarea" placeholder="进入商品列表页提示" maxlength="30" :autosize="{ minRows: 3 }" show-count class="!w-600px" />
                    <p class="py-2 text-14px text-#999">用户进入页面后, 将弹框提示设置的内容</p>
                </div>
            </n-form-item>
            <n-form-item label="订单确认页公告">
                <div>
                    <n-input v-model:value="moduleValue.dataObj!.orderCreateNotice.text" type="textarea" placeholder="订单确认页公告" maxlength="30" :autosize="{ minRows: 3 }" show-count class="!w-600px" />
                    <p class="py-2 text-14px text-#999">订单确认页顶部公告</p>
                </div>
            </n-form-item>
            <n-form-item label="订单确认页送达时间提示语">
                <div>
                    <n-input v-model:value="moduleValue.dataObj!.order_time_placeholder" type="textarea" placeholder="订单确认页送达时间提示语" maxlength="30" :autosize="{ minRows: 3 }" show-count class="!w-600px" />
                    <p class="py-2 text-14px text-#999">订单确认页送达时间的提示信息</p>
                </div>
            </n-form-item>
            <n-form-item label="店铺公告">
                <n-input v-model:value="moduleValue.notice" type="textarea" placeholder="店铺公告信息" maxlength="30" :autosize="{ minRows: 3 }" show-count class="!w-600px" />
            </n-form-item>
            <n-form-item label="订单备注是否必填">
                <n-radio-group v-model:value="moduleValue.dataObj!.order_note_status">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="提交订单时是否需要选择餐具数量">
                <n-radio-group v-model:value="moduleValue.dataObj!.order_form.person_num">
                    <n-space>
                        <n-radio :value="1">是</n-radio>
                        <n-radio :value="0">否</n-radio>
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
            const { id, tips, dataObj, notice } = moduleValue
            await updateStoreInfo({ id, tips, data: JSON.stringify(dataObj), notice: notice })
            getStoreDetailInfoBySid()
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

onMounted(() => {
    getStoreDetailInfoBySid()
})
</script>

<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">子商户号</div>
        <n-form ref="formRef" :label-width="250" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="商户账号">
                <n-input v-model:value="moduleValue.subMchId" placeholder="请输入商户账号" class="!w-300px" />
            </n-form-item>
            <n-form-item>
                <n-button type="primary" class="w-360px ml-200px mt-100px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
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
            const { id, subMchId } = moduleValue
            await updateStoreInfo({ id, subMchId })
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

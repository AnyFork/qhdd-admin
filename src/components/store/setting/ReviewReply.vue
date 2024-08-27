<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">催单回复</div>
        <n-form ref="formRef" :label-width="200" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 50px">
            <n-form-item label="自定义评价回复">
                <div>
                    <n-space v-for="(item, index) in moduleValue.commentReplyStr" :key="index" class="mb-2">
                        <n-input v-model:value="item.text" class="!w-280px" placeholder="自定义评价回复" />
                        <n-button type="error" @click="moduleValue.commentReplyStr?.splice(index, 1)">删除</n-button>
                    </n-space>
                    <n-button type="primary" @click="moduleValue.commentReplyStr!.push({ text: '' })">添加评价回复</n-button>
                </div>
            </n-form-item>
            <n-button type="primary" class="w-520px ml-100px mt-100px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
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
            const text: string[] = []
            const { id, commentReplyStr } = moduleValue
            if (commentReplyStr && commentReplyStr.length > 0) {
                commentReplyStr.forEach((item) => {
                    if (item.text) {
                        text.push(item.text)
                    }
                })
            }
            await updateStoreInfo({ id, commentReply: text.join(',') })
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

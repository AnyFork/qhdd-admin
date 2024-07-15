<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">催单回复</div>
        <n-form ref="formRef" :label-width="200" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 50px">
            <n-form-item label="可催单开始时间">
                <div>
                    <div class="border border-solid border-#dcdfe6 flex items-center h-35px w-410px">
                        <div class="px-2 h-full flex-row-center bg-#f2f2f2">用户下单后</div>
                        <n-input-number v-model:value="moduleValue.remindTimeStart" :min="0" clearable class="!w-170px" placeholder="可催单开始时间" />
                        <div class="px-2 h-full flex-row-center bg-#f2f2f2 w-150px">分钟后可以开始催单</div>
                    </div>
                    <div class="py-1 text-14px text-#999">如设置3分钟，那么用户下单后3分钟之后才可以进行催单操作。不填写为不限制。</div>
                </div>
            </n-form-item>
            <n-form-item label="催单间隔时长">
                <div>
                    <div class="border border-solid border-#dcdfe6 flex items-center h-35px w-250px">
                        <n-input-number v-model:value="moduleValue.remindTimeLimit" :min="0" clearable class="!w-170px" placeholder="催单间隔时长" />
                        <div class="px-2 h-full flex-row-center bg-#f2f2f2 w-80px">分钟</div>
                    </div>
                    <div class="py-1 text-14px text-#999">用户在下单后可进行多次催单,该项可设置催单间隔.如:用户现在进行催单,如果设置了10分钟的间隔,那么用户下次催单只能在10分钟以后</div>
                </div>
            </n-form-item>
            <n-form-item label="自定义催单回复">
                <div>
                    <n-space v-for="(item, index) in moduleValue.remindReplyStr" :key="index" class="mb-2">
                        <n-input v-model:value="item.text" class="!w-280px"  placeholder="自定义催单回复"/>
                        <n-button type="error" @click="moduleValue.remindReplyStr?.splice(index, 1)">删除</n-button>
                    </n-space>
                    <n-button type="primary" @click="moduleValue.remindReplyStr!.push({ text: '' })">添加催单回复</n-button>
                </div>
            </n-form-item>
            <n-button type="primary" class="w-520px ml-100px mt-100px" @click="submitCallback" :loading="loading">保存</n-button>
        </n-form>
    </n-spin>
</template>

<script setup lang="ts">
const emit = defineEmits<{ refresh: [] }>()
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
            const { id, remindTimeStart, remindTimeLimit, remindReplyStr } = moduleValue
            if (remindReplyStr && remindReplyStr.length > 0) {
                remindReplyStr.forEach((item) => {
                    if (item.text) {
                        text.push(item.text)
                    }
                })
            }
            await updateStoreInfo({ id, remindTimeStart, remindTimeLimit, remindReply: text.join(',') })
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

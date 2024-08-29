<template>
    <n-drawer v-model:show="open" :width="700" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="修改协议内容" closable>
            <n-form ref="formRef" :label-width="80" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item label="协议标题">
                    <n-input v-model:value="moduleValue.title" placeholder="请输入协议标题" />
                </n-form-item>
                <n-form-item label="协议内容">
                    <DefaultEditor v-model="moduleValue.value"></DefaultEditor>
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui'
const { formRef, moduleValue, updateAgreementById, loading, message } = useAgreement()
const open = defineModel<boolean>('open')
const props = defineProps<{ data: Partial<agreement> }>()
const emit = defineEmits<{ refresh: [] }>()

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            const { id, title, value } = moduleValue.value
            await updateAgreementById({ id, title, value })
            open.value = false
            emit('refresh')
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
onMounted(() => {
    moduleValue.value.id = props.data.id
    moduleValue.value.value = props.data.value
    moduleValue.value.title = props.data.title
})
</script>

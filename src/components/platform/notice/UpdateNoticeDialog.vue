<template>
    <n-drawer v-model:show="open" :width="800" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="修改公告" closable>
            <n-form ref="formRef" :label-width="100" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="公告标题" path="title">
                    <n-input v-model:value="moduleValue.title" clearable placeholder="请输入公告名称" maxlength="50" show-count />
                </n-form-item>
                <!-- <n-form-item show-require-mark label="公告详情" path="content">
                    <DefaultEditor v-model="moduleValue.content"></DefaultEditor>
                </n-form-item> -->
                <n-form-item label="上架状态">
                    <n-switch v-model:value="moduleValue.status" :checkedValue="1" :uncheckedValue="0">
                        <template #checked> 上架 </template>
                        <template #unchecked> 下架 </template>
                    </n-switch>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="moduleValue.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" />
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
const open = defineModel<boolean>('open')
const moduleValue = defineModel<Partial<notice>>({ required: true })
const { formRef, rules, updateNoticeInfo, loading, message } = useNotice()
const emit = defineEmits<{ refresh: [] }>()

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            await updateNoticeInfo(moduleValue.value)
            open.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

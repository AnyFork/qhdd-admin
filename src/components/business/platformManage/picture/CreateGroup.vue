<template>
    <n-modal v-model:show="open" preset="dialog" title="创建分组" :close-on-esc="false">
        <n-form ref="formRef" :show-label="false" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item path="name">
                <n-input v-model:value="moduleValue.name" placeholder="请输入分组名称" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
const { formRef, rules, moduleValue, addPicture, loading, message } = usePictureGroup()
const open = defineModel<boolean>('open')
const emit = defineEmits<{ refresh: [] }>()
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await addPicture()
            open.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.name = ''
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

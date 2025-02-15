<template>
    <n-drawer v-model:show="open" :width="700" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="创建广告" closable>
            <n-form ref="formRef" :label-width="100" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="广告名称" path="title">
                    <n-input v-model:value="moduleValue.title" clearable placeholder="请输入广告名称" />
                </n-form-item>
                <n-form-item show-require-mark label="广告位" path="positionKey">
                    <n-select v-model:value="moduleValue.positionKey" :options="(position as any)" value-field="positionKey" label-field="name" placeholder="请选择广告位" clearable class="w-180px" />
                </n-form-item>
                <n-form-item show-require-mark label="广告图片" path="img">
                    <UploadAvatar v-model:url="moduleValue.img"></UploadAvatar>
                </n-form-item>
                <n-form-item label="广告地址">
                    <n-input v-model:value="moduleValue.link" placeholder="请输入广告地址" clearable class="w-180px" />
                </n-form-item>
                <n-form-item label="上架状态">
                    <n-switch v-model:value="moduleValue.status" :checkedValue="1" :uncheckedValue="0">
                        <template #checked> 上架 </template>
                        <template #unchecked> 下架 </template>
                    </n-switch>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="moduleValue.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" />
                </n-form-item>
                <n-form-item show-require-mark label="广告内容">
                    <DefaultEditor v-model="moduleValue.content"></DefaultEditor>
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
defineProps<{ position: system.advPosition[] }>()
const { formRef, rules, moduleValue, addAdvInfo, loading, message } = useAdv()
const emit = defineEmits<{ refresh: [] }>()

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            await addAdvInfo(moduleValue.value)
            open.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

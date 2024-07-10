<template>
    <n-modal v-model:show="open" preset="dialog" title="绑定店铺" :close-on-esc="false">
        <n-form ref="formRef" :label-width="80" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="店员信息">
                <div>{{ rowNode.title }}({{ rowNode.mobile }})</div>
            </n-form-item>
            <n-form-item label="绑定门店">
                <n-select v-model:value="moduleValue.sid" :options="storeOptions" clearable placeholder="请选择门店" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import { store } from '@/types/api'
const { addStoreClerkInfo, updateStoreClerkInfo, loading, message, formRef, rules, moduleValue } = useStoreClerk()
const open = defineModel<boolean>('open')
const props = defineProps<{ storeOptions: []; rowNode: store.clerk }>()
const emit = defineEmits<{ refresh: [] }>()
watchEffect(() => {
    moduleValue.id = props.rowNode.id
    moduleValue.sid = props.rowNode.store?.id
    console.log(props.storeOptions)
})

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            if (props.rowNode.store?.id != moduleValue.sid) {
                if (props.rowNode.store) {
                    await updateStoreClerkInfo({ id: props.rowNode.storeClerk.id, sid: moduleValue.sid, clerkId: props.rowNode.id, role: 'clerk' })
                } else {
                    await addStoreClerkInfo({ sid: moduleValue.sid, clerkId: props.rowNode.id, role: 'clerk' })
                }
            }
            open.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.id = undefined
            moduleValue.sid = undefined
            moduleValue.clerkId = undefined
            moduleValue.role = undefined
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

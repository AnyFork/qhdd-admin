<template>
    <n-modal v-model:show="show" preset="dialog" title="取消订单" :close-on-esc="false">
        <n-form ref="formRef" :label-width="100" :model="modelValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="退款理由" path="reason">
                <n-select v-model:value="modelValue.reason" :options="options" clearable placeholder="请选择退款原因" />
            </n-form-item>
            <n-form-item label="填写备注">
                <n-input v-model:value="modelValue.remark" type="textarea" placeholder="请输入备注信息" maxlength="30" show-count :autosize="{ minRows: 3 }" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import { FormInst, FormItemRule } from 'naive-ui'
const formRef = ref<FormInst | null>(null)
const show = defineModel<boolean>('show')
const props = defineProps<{ oid?: number }>()
const emit = defineEmits<{ refresh: [] }>()
const { cancelOrder, message, loading } = usePlatformOrder()
const modelValue = reactive({
    reason: undefined,
    remark: ''
})
const options = [
    { value: '用户信息不符合', label: '用户信息不符合' },
    { value: '商品已经售完', label: '商品已经售完' },
    { value: '商家已经打烊', label: '商家已经打烊' },
    { value: '超出配送范围', label: '超出配送范围' },
    { value: '商家现在太忙', label: '商家现在太忙' },
    { value: '用户申请取消', label: '用户申请取消' },
    { value: '用户选错了不想要了', label: '用户选错了不想要了' },
    { value: '配送出现问题', label: '配送出现问题' },
    { value: '不满足起送要求', label: '不满足起送要求' }
]

/**
 * 表单校验规则
 */
const rules = {
    reason: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (_rule: FormItemRule, value: string) => {
            if (!value) {
                return new Error('退款理由不能为空')
            } else {
                return true
            }
        }
    }
}
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const { reason, remark } = modelValue
            const content = remark ? `${reason},${remark}` : reason
            await cancelOrder(props.oid!, content!)
            show.value = false
            emit('refresh')
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

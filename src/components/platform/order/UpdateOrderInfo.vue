<template>
    <n-modal v-model:show="show" preset="dialog" title="修改订单信息" :close-on-esc="false">
        <n-form ref="formRef" :label-width="100" :model="modelValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="收货人姓名" path="username">
                <n-input v-model:value="modelValue!.username" clearable placeholder="请输入收货人姓名" />
            </n-form-item>
            <n-form-item label="收货地址" path="address">
                <n-input v-model:value="modelValue!.address" clearable placeholder="请输入收货地址" />
            </n-form-item>
            <n-form-item label="门牌号" path="number">
                <n-input v-model:value="modelValue!.number" clearable placeholder="请输入收货人门牌号" />
            </n-form-item>
            <n-form-item label="电话号码" path="mobile">
                <n-input v-model:value="modelValue!.mobile" clearable placeholder="请输入收货人电话号码" />
            </n-form-item>
            <n-form-item label="备注">
                <n-input v-model:value="modelValue!.note" clearable placeholder="请输入订单备注" />
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
const props = defineProps<{ order?: order.orderInfo }>()
const emit = defineEmits<{ refresh: [] }>()
const { updateOrder, message, loading } = usePlatformOrder()
const modelValue = ref<order.orderInfo>()
watchEffect(() => {
    if (props.order) {
        modelValue.value = JSON.parse(JSON.stringify(props.order))
    }
})

/**
 * 表单校验规则
 */
const rules = {
    username: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (_rule: FormItemRule, value: string) => {
            if (!value) {
                return new Error('收货人名称不能为空')
            } else {
                return true
            }
        }
    },
    address: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (_rule: FormItemRule, value: number) => {
            if (!value) {
                return new Error('收货人地址不能为空')
            } else {
                return true
            }
        }
    },
    number: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (_rule: FormItemRule, value: string) => {
            if (!value) {
                return new Error('收货人详细门牌号不能为空')
            } else {
                return true
            }
        }
    },
    mobile: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (_rule: FormItemRule, value: string) => {
            if (!value) {
                return new Error('收货人电话号码不能为空')
            } else if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
                // 电话号码正则校验
                return new Error('请输入合法的电话号码')
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
            const { id, username, address, number, mobile, note } = modelValue.value!
            await updateOrder({ id, username, address, number, mobile, note })
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

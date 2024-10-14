<template>
    <n-modal v-model:show="open" preset="dialog" title="修改我的信息" :close-on-esc="false">
        <n-form ref="formRef" :label-width="80" :model="userInfo" :rules="formRules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="用户名" path="realname" show-require-mark>
                <n-input v-model:value="userInfo!.realname" placeholder="输入用户名(用于连锁店登录)" />
            </n-form-item>
            <n-form-item label="密码">
                <n-input v-model:value="userInfo!.password" type="password" clearable placeholder="请输入密码" />
            </n-form-item>
            <n-form-item label="手机号" path="mobile" :show-require-mark="false">
                <n-input v-model:value="userInfo!.mobile" placeholder="输入手机号码" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import { FormRules, NButton } from 'naive-ui'
const { formRef, updateChain, loading, message } = useChainLogin()
const open = defineModel<boolean>('open')
const { rowNode } = defineProps<{ rowNode: chain.chainAdmin }>()
const show = ref(false)
const userInfo = ref<Partial<chain.chainAdmin>>({
    id: undefined,
    realname: '',
    password: undefined,
    mobile: ''
})

const formRules: FormRules = {
    realname: [
        {
            required: true,
            message: '请输入账号',
            trigger: ['input', 'blur']
        }
    ],
    mobile: [
        {
            required: true,
            message: '请输入电话号码!',
            trigger: ['blur', 'change']
        },
        {
            // 自定义验证函数
            // @ts-ignore
            validator: (rule, value, callback) => {
                // 电话号码正则校验
                if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
                    return false
                }
                return true
            },
            message: '电话号码格式错误!',
            trigger: ['blur']
        }
    ]
}

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await updateChain(userInfo.value)
            open.value = false
            //清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
onMounted(() => {
    userInfo.value.id = rowNode?.id
    userInfo.value.realname = rowNode!.realname
    userInfo.value.mobile = rowNode?.mobile
    userInfo.value.password = undefined
    show.value = true
})
</script>

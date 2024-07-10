<template>
    <n-modal v-model:show="open" preset="dialog" title="创建用户" :close-on-esc="false">
        <n-form ref="formRef" :label-width="80" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="用户名" path="name">
                <n-input v-model:value="moduleValue.name" placeholder="输入用户名(用于平台登录)" />
            </n-form-item>
            <n-form-item label="手机号" path="phone" :show-require-mark="false">
                <n-input v-model:value="moduleValue.phone" placeholder="输入手机号码" />
            </n-form-item>
            <n-form-item label="用户图像">
                <UploadAvatar v-model:url="moduleValue.avatar"></UploadAvatar>
            </n-form-item>
            <n-form-item label="密码" path="password">
                <n-input v-model:value="moduleValue.password" placeholder="输入密码" type="password" @input="handlePasswordInput" />
            </n-form-item>
            <n-form-item label="确认密码" path="reenteredPassword" first ref="rPasswordFormItemRef">
                <n-input v-model:value="moduleValue.reenteredPassword" placeholder="输入确认密码" type="password" :disabled="!moduleValue.password" />
            </n-form-item>
            <n-form-item label="角色" path="roleId">
                <n-select v-model:value="moduleValue.roleId" :options="roleList" placeholder="选择角色" clearable />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import { FormItemInst, NButton } from 'naive-ui'
const { roleList = [] } = defineProps<{ roleList: Array<{}> }>()
const { formRef, rules, moduleValue, addAdminInfo, loading, message } = usePlatformAdmin()
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const open = defineModel<boolean>('open')
const emit = defineEmits<{ refresh: [] }>()
const handlePasswordInput = () => {
    if (moduleValue.reenteredPassword) {
        rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
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
            await addAdminInfo()
            open.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.password = ''
            moduleValue.name = ''
            moduleValue.reenteredPassword = ''
            moduleValue.roleId = undefined
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

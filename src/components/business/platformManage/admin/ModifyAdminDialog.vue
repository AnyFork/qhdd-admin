<template>
    <n-modal v-model:show="open" preset="dialog" title="修改用户" :close-on-esc="false">
        <n-form ref="formRef" :label-width="80" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="用户名" path="name" show-require-mark>
                <n-input v-model:value="moduleValue.name" placeholder="输入用户名(用于平台登录)" />
            </n-form-item>
            <n-form-item label="密码">
                <n-input v-model:value="moduleValue.password" type="password" clearable placeholder="请输入密码" />
            </n-form-item>
            <n-form-item label="手机号" path="phone" :show-require-mark="false">
                <n-input v-model:value="moduleValue.phone" placeholder="输入手机号码" />
            </n-form-item>
            <n-form-item label="用户图像">
                <UploadAvatar v-if="show" v-model:url="moduleValue.avatar"></UploadAvatar>
            </n-form-item>
            <n-form-item label="角色" path="roleId" show-require-mark>
                <n-select v-model:value="moduleValue.roleId" :options="roleList" placeholder="选择角色" clearable />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import { system } from '@/types/api';
import { NButton } from 'naive-ui'
const { formRef, rules, moduleValue, updateAdminInfo, loading, message } = useAdmin()
const open = defineModel<boolean>('open')
const { roleList = [], rowNode } = defineProps<{ roleList: Array<{}>; rowNode: system.adminInfo }>()
const emit = defineEmits<{ refresh: [] }>()
const show = ref(false)

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const { id, name, avatar, phone, roleId, password } = moduleValue
            await updateAdminInfo({ id, name, avatar, phone, roleId, password })
            open.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.id = undefined
            moduleValue.avatar = ''
            moduleValue.phone = ''
            moduleValue.name = ''
            moduleValue.roleId = undefined
            //清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
onMounted(() => {
    moduleValue.id = rowNode?.id
    moduleValue.name = rowNode!.name
    moduleValue.avatar = rowNode?.avatar
    moduleValue.phone = rowNode?.phone
    moduleValue.roleId = rowNode?.roleId
    moduleValue.password = undefined
    show.value = true
})
</script>

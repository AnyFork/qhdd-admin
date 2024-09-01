<template>
    <n-drawer v-model:show="active" :default-width="500" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="创建连锁店管理员" closable>
            <n-form ref="formRef" :label-width="120" :model="model" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="管理员名称" path="realname">
                    <n-input v-model:value="model.realname" placeholder="请输入管理员名称" clearable />
                </n-form-item>
                <n-form-item show-require-mark label="电话号码" path="mobile">
                    <n-input v-model:value="model.mobile" placeholder="请输入电话号码" clearable />
                </n-form-item>
                <n-form-item show-require-mark label="登录密码" path="password">
                    <n-input v-model:value="model.password" placeholder="请输入登录密码" clearable />
                </n-form-item>
                <n-form-item label="是否启用">
                    <n-radio-group v-model:value="model.status">
                        <n-space>
                            <n-radio :key="1" :value="1"> 允许 </n-radio>
                            <n-radio :key="0" :value="0"> 禁止 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="model.displayorder" :min="0" placeholder="请输入排序" clearable />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
const { addChainAdminInfo, loading, message, model, rules } = useChainAdmin()
const active = defineModel<boolean>('open')
const emit = defineEmits<{ refresh: [] }>()
const formRef = ref()

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            const { realname, mobile, password, status, displayorder } = model
            await addChainAdminInfo({ realname, mobile, password, status, displayorder })
            active.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

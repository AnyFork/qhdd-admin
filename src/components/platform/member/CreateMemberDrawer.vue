<template>
    <n-drawer v-model:show="active" :width="520" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="创建会员等级规则" closable>
            <n-form ref="formRef" :label-width="130" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="等级名称" path="level">
                    <n-input-number v-model:value="moduleValue.level" :min="1" clearable placeholder="请输入会员等级名称">
                        <template #suffix> 级 </template>
                    </n-input-number>
                </n-form-item>
                <n-form-item label="条件类型">
                    <n-radio-group v-model:value="moduleValue.conditionType">
                        <n-space>
                            <n-radio :value="1">消费金额</n-radio>
                            <n-radio :value="2">消费次数</n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item show-require-mark label="条件值" path="conditionValue">
                    <n-input-number v-model:value="moduleValue.conditionValue" :min="0" clearable placeholder="请输入满足会员等级的条件值" />
                </n-form-item>
                <n-form-item show-require-mark label="条件描述" path="conditionDesp">
                    <n-input v-model:value="moduleValue.conditionDesp" type="textarea" placeholder="请输入会员等级条件描述信息" clearable />
                </n-form-item>
                <n-form-item show-require-mark label="可领取红包次数" path="redpacketCount">
                    <n-input-number v-model:value="moduleValue.redpacketCount" :min="1" clearable placeholder="请输入会员可领取红包次数" />
                </n-form-item>
                <n-form-item show-require-mark label="可领取红包金额" path="redpacketAmount">
                    <n-input-number v-model:value="moduleValue.redpacketAmount" :min="0" clearable placeholder="请输入会员可领取红包金额" />
                </n-form-item>
                <n-form-item show-require-mark label="红包有效期天数" path="redpacketDayLimit">
                    <n-input-number v-model:value="moduleValue.redpacketDayLimit" :min="1" clearable placeholder="请输入会员领取红包有效期天数" />
                </n-form-item>
                <n-form-item show-require-mark label="红包使用金额限制" path="redpacketUseAmountLimit">
                    <n-input-number v-model:value="moduleValue.redpacketUseAmountLimit" :min="0" clearable placeholder="请输入红包使用金额限制" />
                </n-form-item>
                <n-form-item show-require-mark label="权益数量" path="benefitsCount">
                    <n-input-number v-model:value="moduleValue.benefitsCount" :min="1" clearable placeholder="请输入会员权益数量" />
                </n-form-item>
                <n-form-item show-require-mark label="权益描述" path="benefitsDesp">
                    <n-input v-model:value="moduleValue.benefitsDesp" type="textarea" clearable placeholder="请输入会员等级权益描述" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
const active = defineModel<boolean>('active')
const emit = defineEmits<{ refresh: [] }>()
const { formRef, moduleValue, rules, addMemberInfo, loading, message } = usePlatformMember()
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await addMemberInfo(moduleValue)
            active.value = false
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

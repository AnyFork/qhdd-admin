<template>
    <n-form ref="formRef" :label-width="200" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
        <n-form-item show-require-mark label="单日签到积分(按序逗号分隔)" path="dayScoreSplits">
            <n-input v-model:value="moduleValue.dayScoreSplits" clearable placeholder="单日签到积分(按序逗号分隔)" maxlength="50" show-count />
        </n-form-item>
        <n-form-item show-require-mark label="持续签到积分" path="continueScore">
            <n-input-number v-model:value="moduleValue.continueScore" clearable placeholder="请输入持续签到积分" min="1" />
        </n-form-item>
        <n-form-item show-require-mark label="规则描述" path="desp">
            <DefaultEditor v-model="moduleValue.desp"></DefaultEditor>
        </n-form-item>
        <n-row :gutter="[0, 24]">
            <n-col :span="24">
                <div style="display: flex; justify-content: flex-end">
                    <n-button v-if="moduleValue.id" round type="error" class="mr-6" :loading="loading" @click="deleteSigninRuleInfo">删除</n-button>
                    <n-button round type="primary" :loading="loading" @click="submitCallback">保存</n-button>
                </div>
            </n-col>
        </n-row>
    </n-form>
</template>

<script setup lang="ts">
import { FormItemRule, NButton } from 'naive-ui'
import { addSignRule, signRuleList, updateSignRule, deleteSigninRule } from '@/service/platform/rule'
const message = useMessage()
const loading = ref(false)
const formRef = ref()
const moduleValue = reactive<activity.signinRule>({
    id: undefined,
    dayScoreSplits: undefined,
    continueScore: undefined,
    desp: undefined
})

/**
 * 表单校验规则
 */
const rules = {
    dayScoreSplits: [
        {
            validator(_rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请输入单日签到积分')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    continueScore: [
        {
            validator(_rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请输入持续签到积分')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    desp: [
        {
            validator(_rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请输入规则描述')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ]
}

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            try {
                if (moduleValue.id) {
                    await updateSignRuleInfo(moduleValue)
                } else {
                    await addSignRuleInfo(moduleValue)
                }
            } catch (e: any) {
                loading.value = false
                message.error(e.message)
                console.log(e)
            }
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

/**
 * 创建签到规则
 */
const addSignRuleInfo = async (params: Partial<activity.signinRule>) => {
    try {
        loading.value = true
        const { data } = await addSignRule(params)
        loading.value = false
        if (data.code == 200) {
            message.success('创建成功!', {
                onLeave() {
                    signRuleData()
                }
            })
        } else {
            message.error(data.msg)
        }
    } catch (e: any) {
        loading.value = false
        message.error(e.message)
        console.log(e)
    }
}

/**
 * 获取签到列表数据
 */
const signRuleData = async () => {
    try {
        loading.value = true
        const { data } = await signRuleList({ pageNo: 1, pageSize: 10 })
        loading.value = false
        if (data.code == 200) {
            if (data.data && data.data.length > 0) {
                const result = data.data[0] as activity.signinRule
                moduleValue.id = result.id
                moduleValue.dayScoreSplits = result.dayScoreSplits
                moduleValue.continueScore = result.continueScore
                moduleValue.desp = result.desp
                moduleValue.createTime = result.createTime
            }
        } else {
            message.error(data.msg)
        }
    } catch (e: any) {
        loading.value = false
        message.error(e.message)
        console.log(e)
    }
}

/**
 * 编辑签到规则
 */
const updateSignRuleInfo = async (params: Partial<activity.signinRule>) => {
    try {
        loading.value = true
        const { data } = await updateSignRule(params)
        loading.value = false
        if (data.code == 200) {
            message.success('修改成功!', {
                onLeave() {
                    signRuleData()
                }
            })
        } else {
            message.error(data.msg)
        }
    } catch (e: any) {
        loading.value = false
        message.error(e.message)
        console.log(e)
    }
}

/**
 * 删除商城活动
 * @param 红包id
 */
const deleteSigninRuleInfo = async () => {
    try {
        loading.value = true
        const { data } = await deleteSigninRule(moduleValue.id!)
        loading.value = false
        if (data.code == 200) {
            message.success('删除成功!', {
                onLeave() {
                    signRuleData()
                }
            })
        } else {
            message.error(data.msg)
        }
    } catch (e: any) {
        loading.value = false
        message.error(e.message)
        console.log(e)
    }
}
onMounted(() => {
    signRuleData()
})
</script>

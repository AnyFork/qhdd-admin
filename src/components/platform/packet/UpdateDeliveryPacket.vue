<template>
    <n-modal v-model:show="showModel" preset="dialog" :showIcon="false" :title="modelTitle" :close-on-esc="false" class="!w-500px">
        <n-form ref="formRef" :label-width="80" :model="packet" :rules="formRules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="红包名称">
                <n-input v-model:value="packet!.name" placeholder="请输入红包名称" />
            </n-form-item>
            <n-form-item label="红包金额" path="amount" show-require-mark>
                <n-input-number v-model:value="packet!.amount" min="0" placeholder="请输入红包金额" class="w-full" />
            </n-form-item>
            <n-form-item label="红包类型" path="type" show-require-mark>
                <n-select v-model:value="packet!.type" :options="typeOption" placeholder="请选择红包类型"> </n-select>
            </n-form-item>
            <n-form-item label="使用金额限制/满X元可使用" path="useAmountLimit">
                <n-input-number v-model:value="packet!.useAmountLimit" min="0" placeholder="使用金额限制/满X元可使用" class="w-full" />
            </n-form-item>
            <n-form-item label="红包过期天数" path="limitDay">
                <n-input-number v-model:value="packet!.limitDay" min="1" placeholder="请输入红包过期天数" class="w-full" />
            </n-form-item>
            <n-form-item label="备注">
                <n-input v-model:value="packet!.remark" type="textarea" clearable placeholder="请输入红包备注" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="error" @click="submitCallback" :loading="loading">发红包</n-button>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { updatePacket } from '@/service/platform/customer'
import { FormRules } from 'naive-ui'
const showModel = defineModel<boolean>('showModel')
const props = defineProps<{ rowData: member.redPacket }>()
const emit = defineEmits<{ refresh: [] }>()
const modelTitle = computed(() => `修改给 ${props.rowData.nickname}发送的红包`)
const message = useMessage()
const loading = ref(false)
const formRef = ref()
const typeOption = [
    {
        label: '慢必赔',
        value: 'slow'
    },
    {
        label: '通用红包',
        value: 'common'
    }
]
const packet = ref<Partial<member.redPacket>>({
    uid: props.rowData.id,
    name: '',
    amount: undefined,
    type: 'common',
    useAmountLimit: undefined,
    limitDay: undefined,
    remark: ''
})

const formRules: FormRules = {
    amount: [
        {
            required: true,
            type: 'number',
            message: '请输入红包金额!',
            trigger: ['blur', 'change']
        }
    ],
    useAmountLimit: [
        {
            required: true,
            type: 'number',
            message: '请输入红包使用金额限制/满X元可使用!',
            trigger: ['blur', 'change']
        }
    ],
    limitDay: [
        {
            required: true,
            type: 'number',
            message: '请输入红包过期天数',
            trigger: ['blur', 'change']
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
                loading.value = true
                const { data } = await updatePacket(packet.value)
                loading.value = false
                if (data.code == 200) {
                    message.success('红包修改成功')
                    showModel.value = false
                    emit('refresh')
                    //清空表单校验
                    formRef.value?.restoreValidation()
                } else {
                    message.error(data.msg)
                }
            } catch (e: any) {
                loading.value = false
                message.error(e.message as string)
                console.log(e)
            }
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

onMounted(() => {
    // 初始赋值
    packet.value.id = props.rowData.id
    packet.value.name = props.rowData.name
    packet.value.amount = props.rowData.amount
    packet.value.type = props.rowData.type
    packet.value.useAmountLimit = props.rowData.useAmountLimit
    packet.value.limitDay = (props.rowData.endTime - props.rowData.startTime) / 3600 / 24
    packet.value.remark = props.rowData.remark
    packet.value.uid = props.rowData.uid
})
</script>

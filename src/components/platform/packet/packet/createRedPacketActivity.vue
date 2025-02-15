<template>
    <n-modal v-model:show="showModel" preset="dialog" :showIcon="false" title="创建红包活动" :close-on-esc="false" class="!w-500px">
        <n-form ref="formRef" :label-width="80" :model="packet" :rules="formRules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="红包名称">
                <n-input v-model:value="packet!.title" placeholder="请输入红包名称" />
            </n-form-item>
            <n-form-item label="红包金额" path="amount" show-require-mark>
                <n-input-number v-model:value="packet!.amount" min="0" placeholder="请输入红包金额" class="w-full" />
            </n-form-item>
            <n-form-item label="红包类型" path="type" show-require-mark>
                <n-select v-model:value="packet!.type" :options="typeOption" placeholder="请选择红包类型"> </n-select>
            </n-form-item>
            <n-form-item v-if="packet.type == 'store'" label="商家名称">
                <n-select v-model:value="packet!.sid" :options="stores" filterable placeholder="请选择商家名称" clearable />
            </n-form-item>
            <n-form-item v-if="packet.type == 'store'" label="商家承担">
                <n-input-number v-model:value="packet!.storeAmount" min="0" placeholder="请输入商家承担费用" class="w-full" />
            </n-form-item>
            <n-form-item label="使用金额限制/满X元可使用" path="useAmountLimit">
                <n-input-number v-model:value="packet!.useAmountLimit" min="0" placeholder="使用金额限制/满X元可使用" class="w-full" />
            </n-form-item>
            <n-form-item label="红包过期天数" path="dayLimit">
                <n-input-number v-model:value="packet!.dayLimit" min="1" placeholder="请输入红包过期天数" class="w-full" />
            </n-form-item>
            <n-form-item label="红包库存" path="total">
                <n-input-number v-model:value="packet!.total" min="1" placeholder="请输入红包库存" class="w-full" />
            </n-form-item>
            <n-form-item label="活动状态">
                <n-switch v-model:value="packet!.status" :checked-value="1" :unchecked-value="2"></n-switch>
            </n-form-item>
            <n-form-item label="备注">
                <n-input v-model:value="packet!.remark" type="textarea" clearable placeholder="请输入红包备注" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="error" @click="submitCallback" :loading="loading">创建活动</n-button>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { FormRules } from 'naive-ui'
const showModel = defineModel<boolean>('showModel')
const { addPacketList } = usePlatformRedPacketActivity()
const props = defineProps<{ stores: { label: string; value: number }[] }>()
const emit = defineEmits<{ refresh: [] }>()
const message = useMessage()
const loading = ref(false)
const formRef = ref()
const typeOption = [
    {
        label: '社群红包',
        value: 'group'
    },
    {
        label: '商家红包',
        value: 'store'
    }
]

const packet = ref<Partial<activity.redPacket>>({
    sid: undefined,
    storeTitle: undefined,
    title: '',
    amount: undefined,
    type: undefined,
    useAmountLimit: undefined,
    dayLimit: undefined,
    remark: '',
    storeAmount: undefined,
    status: 1,
    total: undefined
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
    dayLimit: [
        {
            required: true,
            type: 'number',
            message: '请输入红包过期天数',
            trigger: ['blur', 'change']
        }
    ],
    total: [
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
                if (packet.value.type == 'store') {
                    if (!packet.value.sid) {
                        message.error('请选择商家名称!')
                        return
                    }
                    if (packet.value.storeAmount == undefined) {
                        message.error('请填写商家承担费用!')
                        return
                    }
                    packet.value.storeTitle = props.stores.find((item) => item.value === packet.value.sid)?.label || ''
                }
                loading.value = true
                await addPacketList(packet.value)
                loading.value = false
                showModel.value = false
                emit('refresh')
                //清空表单校验
                formRef.value?.restoreValidation()
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
</script>

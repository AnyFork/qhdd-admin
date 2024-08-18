<template>
    <n-space align="center" justify="space-between" class="mb-2">
        <n-button type="primary" @click="openModal = true">创建广告位</n-button>
        <TableHeaderOperation v-model:columns="columns" v-model:size="size" v-model:striped="striped" :loading="loading" @refresh="getAdvPosition"></TableHeaderOperation>
    </n-space>
    <!--数据表格 -->
    <n-data-table :striped="striped" remote :size="size" :single-line="false" :columns="columns" :data="tableData" :pagination="pagination" :row-key="(rowData:order.comment) => `${rowData.id}`" :loading="loading" />
    <n-modal v-model:show="openModal" preset="dialog" title="创建广告位" :close-on-esc="false">
        <n-form ref="formRef" :label-width="100" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item show-require-mark label="广告位名称" path="name">
                <n-input v-model:value="moduleValue.name" placeholder="输入广告位名称" clearable />
            </n-form-item>
            <n-form-item show-require-mark label="广告位标识" path="positionKey">
                <n-input v-model:value="moduleValue.positionKey" placeholder="输入广告位标识" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
</template>
<script setup lang="ts">
import { FormItemRule } from 'naive-ui'
const size = ref<'small' | 'medium' | 'large'>('medium')
const striped = ref(true)
const { getAdvPosition, pagination, tableData, loading, columns, message, addAdvPositionInfo, openModal } = useAdvPosition()
const formRef = ref()
const moduleValue = reactive({
    name: '',
    positionKey: ''
})

/**
 * 表单校验规则
 */
const rules = {
    name: [
        {
            validator(_rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请输入广告位名称')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    positionKey: [
        {
            validator(_rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请输入广告位标识')
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
            addAdvPositionInfo(moduleValue)
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}

onMounted(async () => {
    getAdvPosition()
})
</script>

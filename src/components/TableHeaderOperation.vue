<template>
    <NSpace align="center" wrap justify="end" class="lt-sm:w-200px">
        <slot name="prefix"></slot>
        <n-tooltip trigger="hover">
            <template #trigger>
                <n-switch v-model:value="striped" :size="size" />
            </template>
            表格斑马线
        </n-tooltip>
        <n-popselect v-model:value="size" :options="options" trigger="click">
            <n-button :size="size">
                <template #icon>
                    <icon-fluent-mdl2:padding class="text-[18px]" />
                </template>
                密度
            </n-button>
        </n-popselect>
        <NButton :size="size" @click="emit('refresh')">
            <template #icon>
                <icon-mdi-refresh class="text-[18px]" :class="{ 'animate-spin': loading }" />
            </template>
            刷新
        </NButton>
        <NPopover placement="bottom-end" trigger="click">
            <template #trigger>
                <NButton :size="size">
                    <template #icon>
                        <icon-ant-design-setting-outlined class="text-[18px]" />
                    </template>
                    列设置
                </NButton>
            </template>
            <VueDraggable v-model="columns" :animation="150" filter=".none_draggable" class="w-[200px] max-h-400px overflow-y-scroll">
                <n-space align="center" justify="space-between" class="h-36px border-b border-b-[#f5f5f5] border-b-solid">
                    <n-checkbox v-model:checked="checkValue" @click="checkAllOrNot"> 列展示 </n-checkbox>
                    <n-button size="small" text :bordered="false" @click="reset"> 重置 </n-button>
                </n-space>
                <div v-for="(item, idx) in checkedColumns" :key="idx" class="h-36px flex-y-center rd-4px hover:bg-primary">
                    <icon-ant-design:drag-outlined class="mr-8px h-full cursor-move text-icon" />
                    <NCheckbox v-model:checked="item.checked" class="none_draggable flex-1" @click="checkBox(item, idx)">
                        <span class="hover:text-[#fff]"> {{ item.title }}</span>
                    </NCheckbox>
                </div>
            </VueDraggable>
        </NPopover>
        <slot name="suffix"></slot>
    </NSpace>
</template>

<script setup lang="ts">
import { DataTableColumns } from 'naive-ui/es/components'
import { VueDraggable } from 'vue-draggable-plus'
const emit = defineEmits<{ (event: 'refresh'): void }>()
const columns = defineModel<DataTableColumns<any>>('columns', { required: true })
const size = defineModel<'small' | 'medium' | 'large'>('size', { required: true })
const striped = defineModel<boolean>('striped', { required: true })
const originColumns = ref(columns.value)
const checkedKeys = ref<Array<string>>([])
defineProps<{ loading: boolean }>()
const checkValue = ref(true)
const options = [
    {
        label: '紧凑',
        value: 'small'
    },
    {
        label: '默认',
        value: 'medium'
    },
    {
        label: '宽松',
        value: 'large'
    }
]
/**
 * 初始化checkColumns
 * @returns
 */
const initCheckColumns = () => {
    const checks: { title: string; key: string; checked: boolean }[] = []
    originColumns.value.forEach((item: any) => {
        checks.push({
            title: item.title,
            key: item.key,
            checked: true
        })
        checkedKeys.value.push(item.key)
    })
    return checks
}
const checkedColumns = ref(initCheckColumns())
/**
 * 点击选项时触发
 */
const checkBox = (item: any, idx: number): void => {
    if (item.checked) {
        checkedKeys.value.push(item.key)
        checkedColumns.value[idx].checked = true
    } else {
        checkedKeys.value.splice(
            checkedKeys.value.findIndex((i) => i === item.key),
            1
        )
        checkedColumns.value[idx].checked = false
    }
    columns.value = originColumns.value.filter((it: any) => checkedKeys.value.includes(it.key))
}
/**
 * 全选或者非全选
 */
const checkAllOrNot = () => {
    console.log(checkValue.value)
    if (checkValue.value) {
        columns.value = originColumns.value
        checkedColumns.value = initCheckColumns()
    } else {
        checkedColumns.value.forEach((item) => (item.checked = false))
        checkedKeys.value = []
        columns.value = []
    }
}
/**
 * 重置
 */
const reset = () => {
    checkedColumns.value = initCheckColumns()
    columns.value = originColumns.value
    checkValue.value = true
}
</script>

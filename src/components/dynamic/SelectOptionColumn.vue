<template>
    <div @click="show" class="flex-row-center">
        <n-select v-if="isEdit" ref="selectRef" v-model:value="selectValue" :options="option" placeholder="请选择分类" :on-update:value="changeValue" :on-blur="() => (isEdit = false)" />
        <n-tag v-else round :color="{ color: bgColor, textColor: textColor, borderColor: bgColor }" class="w-100px flex-row-center cursor-pointer">{{ label }}</n-tag>
    </div>
</template>

<script setup lang="ts">
import { store } from '@/types/api'
const props = defineProps<{
    value: store.category['type']
    bgColor: string
    textColor: string
    editable: boolean
    onUpdateValue: (value: store.category['type']) => void
}>()
const isEdit = ref(props.editable)
const selectValue = ref(props.value)
const selectRef = ref()
const show = () => {
    isEdit.value = true
    nextTick(() => {
        selectRef.value.focus()
    })
}
/**
 * 下拉选项
 */
const option = [
    {
        label: '商户标签',
        value: 'TY_store_label'
    },
    {
        label: '配送标签',
        value: 'TY_delivery_label'
    },
    {
        label: '服务标签',
        value: 'TY_service_label'
    }
]

/**
 * 值发生改变事触发
 * @param value
 */
const changeValue = (value: store.category['type']) => {
    props.onUpdateValue(value)
    selectValue.value = value
}
const label = computed(() => option.find((item) => item.value === selectValue.value)?.label)
</script>

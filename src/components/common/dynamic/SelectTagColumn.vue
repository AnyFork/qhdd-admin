<template>
    <div @click="show" class="flex-row-center">
        <n-select v-if="isEdit" ref="selectRef" v-model:value="selectValue" :options="option" clearable laceholder="请选择标签" :on-update:value="changeValue" :on-blur="() => (isEdit = false)" />
        <div v-else>
            <n-tag v-if="label" round :color="{ color: bgColor, textColor: textColor, borderColor: bgColor }" class="w-100px flex-row-center cursor-pointer">{{ label }}</n-tag>
            <span v-else>无</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    value?: number
    editable: boolean
    bgColor?: string
    textColor?: string
    option: { label: string; value: number }[]
    onUpdateValue: (value: number | null) => void
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
watchEffect(() => {
    selectValue.value = props.value
})
/**
 * 值发生改变事触发
 * @param value
 */
const changeValue = (value: number) => {
    props.onUpdateValue(value)
}
const label = computed(() => props.option.find((item) => item.value === props.value)?.label)
</script>

<template>
    <div class="min-h-22px flex-row-center" @click="handleOnClick">
        <n-input v-if="isEdit" v-model:value="inputValue" ref="inputRef" :on-blur="changeValue" :on-change="changeValue" :placeholder="placeholder" />
        <n-tag v-else round :color="{ color: bgColor, textColor: textColor, borderColor: bgColor }" class="w-100px flex-row-center cursor-pointer">{{ value }}</n-tag>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: string
    bgColor: string
    textColor: string
    editable: boolean
    placeholder: string
    onUpdateValue: (value: string) => void
}>()
const isEdit = ref(props.editable)
const inputValue = ref(props.value)
const inputRef = ref()
const handleOnClick = () => {
    isEdit.value = true
    nextTick(() => {
        inputRef.value.focus()
    })
}
const changeValue = () => {
    props.onUpdateValue(inputValue.value)
    isEdit.value = false
}
</script>

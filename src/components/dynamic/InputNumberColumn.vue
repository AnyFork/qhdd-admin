<template>
    <div class="min-h-22px" @click="handleOnClick">
        <n-input-number v-if="isEdit" v-model:value="inputValue" ref="inputRef" :min="0" :max="9999" :on-blur="changeValue" />
        <span v-else>{{ value }}</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: number
    editable: boolean
    onUpdateValue: (value: number) => void
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

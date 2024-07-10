<template>
    <n-color-picker v-model:value="color" :modes="['hex', 'rgb']" :show-preview="true" :actions="['clear']" show-alpha :swatches="['#FFFFFF', '#18A058', '#2080F0', '#F0A020', 'rgba(208, 48, 80, 1)', '#4DBAFD']" :on-update:value="changeValue" />
</template>

<script setup lang="ts">
const props = defineProps<{
    value: string
    onUpdateValue: (value: string) => void
}>()
const color = ref(props.value)
/**
 * 值发生改变事触发
 * @param value
 */
const changeValue = (value: string) => {
    props.onUpdateValue(value)
    color.value = value
}
</script>

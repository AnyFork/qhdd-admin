<template>
    <n-button type="primary" @click="open = true">打开</n-button>
    <SelectImageDialog v-if="open" v-model:open="open" v-model:node="node"></SelectImageDialog>
    {{ JSON.stringify(node) }}
</template>
<script setup lang="ts">
import { system } from '@/types/api'
const open = ref(false)
const node = ref<system.attachment>()
</script>

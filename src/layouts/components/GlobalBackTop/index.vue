<template>
    <n-back-top :show="show" class="z-1000" />
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
const { y: scrollY } = useWindowScroll()
const show = computed(() => scrollY.value > 180)
</script>

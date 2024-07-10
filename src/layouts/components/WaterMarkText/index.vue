<template>
    <n-watermark v-if="app.waterMark.showWatermark" :content="app.waterMark.contents" :cross="true" fullscreen :font-size="app.waterMark.fontSize" :line-height="16" :width="384" :height="384" :x-offset="100" :y-offset="100" :rotate="app.waterMark.rotate" :z-index="1200" />
</template>

<script setup lang="ts">
const app = useAppStore()
</script>

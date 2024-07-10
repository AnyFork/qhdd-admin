<template>
    <div class="relative w-60px h-60px flex flex-col justify-end">
        <div v-if="tag" class="w-30px text-[#fff] text-[12px] absolute top-0 right-0 rounded-tr-6px" :style="{ color: tag?.color, backgroundColor: tag.bgColor }">{{ tag.text }}</div>
        <n-image :src="src" class="rounded-6px w-60px h-60px" width="100%"></n-image>
        <div v-if="!business" class="bg-[#666] w-60px text-[#fff] text-[12px] absolute rounded-b-6px">休息中</div>
    </div>
</template>

<script setup lang="ts">
const { business = false } = defineProps<{ src: string; tag?: { text: string; color: string; bgColor: string }; business?: boolean }>()
</script>

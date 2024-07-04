<template>
    <div class="relative w-60px h-60px flex flex-col justify-end">
        <n-image :src="src" class="rounded-6px w-60px h-60px"></n-image>
        <div class="bg-[#666] w-60px text-[#fff] text-[12px] py-1 absolute rounded-b-6px">休息中</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ src: string }>()
</script>

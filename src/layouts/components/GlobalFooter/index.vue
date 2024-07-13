<template>
    <n-layout-footer bordered class="bottom-0 border-l-0 ml-[2px]" :inverted="theme.footer.inverted" :style="{ height: theme.footer.height + 'px' }">
        <div class="flex-row-center h-full">Copyright ©2024 泉海点点送管理后台</div>
    </n-layout-footer>
</template>

<script setup lang="ts">
const theme = useThemeStore()
</script>

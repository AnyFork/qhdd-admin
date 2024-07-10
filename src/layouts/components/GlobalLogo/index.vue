<template>
    <router-link to="/" class="flex-row-center nowrap-hidden" :style="logoStyle">
        <n-image width="100" height="56" object-fit="cover" preview-disabled src="/qhdd/logo.jpg" class="mt-12px" />
    </router-link>
</template>

<script setup lang="ts">
defineProps<{ showTitle: boolean }>()
const theme = useThemeStore()
const app = useAppStore()
const logoStyle = computed(() => {
    if (theme.layout.mode == 'horizontal' || theme.layout.mode == 'horizontal-mix') {
        return { width: theme.sider.width + 'px', height: theme.header.height + 'px' }
    } else {
        return { width: app.siderCollapse ? theme.sider.collapsedWidth + 'px' : '100%', height: theme.header.height + 'px' }
    }
})
</script>

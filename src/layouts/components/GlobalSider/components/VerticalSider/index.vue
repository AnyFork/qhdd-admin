<template>
    <dark-mode-container class="flex-col-stretch" :inverted="theme.sider.inverted">
        <global-logo v-if="!isHorizontalMix" :show-title="showTitle" :style="{ height: theme.header.height + 'px' }" />
        <vertical-menu />
    </dark-mode-container>
</template>

<script setup lang="ts">
const app = useAppStore()
const theme = useThemeStore()
const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix')
const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix')
</script>

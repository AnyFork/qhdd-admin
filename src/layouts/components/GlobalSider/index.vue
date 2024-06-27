<template>
  <n-layout-sider
    v-if="siderVisible"
    class="fixed h-screen z-1000"
    bordered
    show-trigger
    collapse-mode="width"
    :collapsed-width="siderCollapsedWidth"
    :width="siderWidth"
    :inverted="theme.sider.inverted"
    @update:collapsed="app.setSiderCollapse">
    <vertical-sider v-if="layoutMode == 'horizontal-mix' || layoutMode == 'vertical'" />
    <vertical-mix-sider v-if="layoutMode == 'vertical-mix'" />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/composables';
const app = useAppStore()
const theme = useThemeStore()
defineOptions({ name: "GlobalSider" })
const { layoutMode, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();
</script>
<style scoped>
:deep(.n-scrollbar-content) {
  height: 100%;
}
</style>

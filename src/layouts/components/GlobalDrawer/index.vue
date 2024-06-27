<template>
  <n-drawer :show="app.settingDrawerVisible" display-directive="show" :width="330" @mask-click="app.closeSettingDrawer">
    <n-drawer-content title="主题配置" :native-scrollbar="false">
      <DarkMode />
      <LayoutMode />
      <ThemeColorSelect />
      <SurfaceSetting />
      <SurfaceShow />
    </n-drawer-content>
  </n-drawer>
  <DarwerButton />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
const app = useAppStore();
defineOptions({ name:'GlobalDrewerSetting'})
</script>

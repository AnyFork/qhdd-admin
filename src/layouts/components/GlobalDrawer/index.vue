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
  <DrawerButton />
</template>

<script setup lang="ts">
defineOptions({ name:'GlobalDrawerSetting'})
const app = useAppStore();
</script>

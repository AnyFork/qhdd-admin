<template>
  <n-layout-header bordered class="z-50 flex" :style="{ height: theme.header.height + 'px' }"
    :inverted="theme.header.inverted">
    <global-logo v-if="headerProps.showLogo" :show-title="true"></global-logo>
    <div v-if="horizontalFlag" class="flex-row-between flex-1">
      <HorizontalMenu />
      <div class="flex px-[30px] items-center">
        <UserInfo></UserInfo>
        <LockScreen v-if="useLockScreen.isLockScreen" />
        <FullScreen v-if="app.showHeaderFullScreenBtn" />
        <ThemeMode v-if="app.showHeaderThemeBtn" />
        <LogOut></LogOut>
      </div>
    </div>
    <div v-else class="flex-row-end flex-1 px-[30px]">
      <UserInfo></UserInfo>
      <LockScreen v-if="useLockScreen.isLockScreen" />
      <FullScreen v-if="app.showHeaderFullScreenBtn" />
      <ThemeMode v-if="app.showHeaderThemeBtn" />
      <LogOut></LogOut>
    </div>
  </n-layout-header>
</template>
<script setup lang="ts">
import { useBasicLayout } from "@/composables";
import { useThemeStore, useAppStore, useLockScreenstore } from "@/store";
defineOptions({ name: "GlobalHeader" });
const theme = useThemeStore();
const app = useAppStore();
const useLockScreen = useLockScreenstore();
const horizontalFlag = computed(() => theme.layout.mode == "horizontal" || theme.layout.mode == "horizontal-mix");
const { headerProps } = useBasicLayout();
</script>

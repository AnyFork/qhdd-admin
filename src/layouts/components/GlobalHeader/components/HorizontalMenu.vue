<template>
  <div class="flex-1 overflow-hidden h-full px-10px">
    <n-scrollbar :x-scrollable="true" class="flex-1 overflow-hidden h-full" content-class="h-full">
      <div class="flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
        <n-menu :value="activeKey" mode="horizontal" :options="menus" :inverted="theme.header.inverted"
          @update:value="handleUpdateMenu" />
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { useRouteStore, useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';
import { getUserInfo } from '@/utils'
defineOptions({ name: 'HorizontalMenu' });
//获取当前用户信息
const user = getUserInfo() as any
const route = useRoute();
const routeStore = useRouteStore();
const theme = useThemeStore();
const { routerPush } = useRouterPush();
const menus = computed(() => {
  let menu = routeStore.menus as GlobalMenuOption[]
  if (user && user.roleName != '系统管理员') {
    menu = menu.slice(0, -1)
  }
  return menu
});
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);
function handleUpdateMenu(_key: string, item: MenuOption) {
  const menuItem = item as GlobalMenuOption;
  routerPush(menuItem.routePath);
}
</script>

<style scoped>
:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}
</style>

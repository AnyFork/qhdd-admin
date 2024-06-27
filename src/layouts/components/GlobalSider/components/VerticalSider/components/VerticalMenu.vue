<template>
  <n-scrollbar class="flex-1-hidden">
    <n-menu :value="activeKey" :collapsed="app.siderCollapse" :collapsed-width="theme.sider.collapsedWidth"
      :collapsed-icon-size="20" :options="menu" :expanded-keys="expandedKeys" :indent="18"
      :inverted="theme.sider.inverted" @update:value="handleUpdateMenu"
      @update:expanded-keys="handleUpdateExpandedKeys" />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { useAppStore, useThemeStore, useRouteStore } from '@/store';
import { useRouterPush } from '@/composables';
import { getActiveKeyPathsOfMenus, getUserInfo } from '@/utils';
const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
//获取当前用户信息
const user = getUserInfo() as any
const routeStore = useRouteStore();
//菜单数据
const menu = ref([{}])
//监听值变化
watch(() => user.roleName, (val, oldValue) => {
  menu.value = routeStore.menus
}, { immediate: true })
const { routerPush } = useRouterPush();
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string);
const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(_key: string, item: MenuOption) {
  // eslint-disable-next-line no-undef
  const menuItem = item as GlobalMenuOption;
  routerPush(menuItem.routePath);
}

function handleUpdateExpandedKeys(keys: string[]) {
  expandedKeys.value = keys;
}

watch(
  () => route.name,
  () => {
    expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, routeStore.menus);
  },
  { immediate: true }
);
</script>

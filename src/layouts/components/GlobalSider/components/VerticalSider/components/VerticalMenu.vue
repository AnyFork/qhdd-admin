<template>
    <n-scrollbar class="flex-1-hidden">
        <n-menu
            :value="activeKey"
            :collapsed="app.siderCollapse"
            :collapsed-width="theme.sider.collapsedWidth"
            :collapsed-icon-size="20"
            :options="menu"
            :expanded-keys="expandedKeys"
            :indent="18"
            :inverted="theme.sider.inverted"
            @update:value="handleUpdateMenu"
            @update:expanded-keys="handleUpdateExpandedKeys"
        />
    </n-scrollbar>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
const route = useRoute()
const app = useAppStore()
const theme = useThemeStore()
//获取当前用户信息
const user = getPlatformUserInfo() as any
const routeStore = useRouteStore()
//菜单数据
const menu = ref([{}])
const { routerPush } = useRouterPush()
//监听值变化
watch(
    () => user?.roleName,
    (val, oldValue) => {
        menu.value = routeStore.menus
    },
    { immediate: true }
)

const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string)
const expandedKeys = ref<string[]>([])
/**
 * 菜单点击时进行跳转
 * @param _key d
 * @param item
 */
const handleUpdateMenu = (_key: string, item: MenuOption) => {
    const menuItem = item as GlobalMenuOption
    routerPush(menuItem.routePath)
}
/**
 * 菜单展开触发
 */
const handleUpdateExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys
}

watch(
    () => route.name,
    () => {
        expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, routeStore.menus)
    },
    { immediate: true }
)
</script>

<template>
    <div class="flex-1 overflow-hidden h-full px-10px">
        <n-scrollbar :x-scrollable="true" class="flex-1 overflow-hidden h-full" content-class="h-full">
            <div class="flex-y-center h-full" :style="{ justifyContent: theme.menu.horizontalPosition }">
                <n-menu :value="activeKey" mode="horizontal" :options="menus" :inverted="theme.header.inverted" @update:value="handleUpdateMenu" />
            </div>
        </n-scrollbar>
    </div>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
defineOptions({ name: 'HorizontalMenu' })
const route = useRoute()
const routeStore = useRouteStore()
const theme = useThemeStore()
const { routerPush } = useRouterPush()
const menus = computed(() => routeStore.menus as GlobalMenuOption[])
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string)
const handleUpdateMenu = (_key: string, item: MenuOption) => {
    const menuItem = item as GlobalMenuOption
    routerPush(menuItem.routePath)
}
</script>

<style scoped>
:deep(.n-menu-item-content-header) {
    overflow: inherit !important;
}
</style>

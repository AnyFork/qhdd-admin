<template>
    <div class="flex wh-full absolute justify-center" @mouseleave="resetFirstDegreeMenus">
        <div class="flex flex-1 flex-col items-stretch items-center">
            <global-logo :show-title="false" :style="{ height: theme.header.height + 'px' }" />
            <n-scrollbar class="flex-1 overflow-hidden">
                <mix-menu-detail v-for="item in firstDegreeMenus" :key="item.routeName" :route-name="item.routeName" :active-route-name="activeParentRouteName" :label="item.label" :icon="item.icon" :is-mini="app.siderCollapse" @click="handleMixMenu(item.routeName, item.hasChildren)" />
            </n-scrollbar>
        </div>
        <mix-menu-drawer :visible="drawerVisible" :menus="activeChildMenus" />
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'VerticalMixSider' })
//获取当前用户信息
const user = getPlatformUserInfo() as any
const route = useRoute()
const app = useAppStore()
const theme = useThemeStore()
const routeStore = useRouteStore()
const { routerPush } = useRouterPush()
const { bool: drawerVisible, setTrue: openDrawer, setFalse: hideDrawer } = useBoolean()
/**激活的路由名称 */
const activeParentRouteName = ref('')
const setActiveParentRouteName = (routeName: string) => {
    activeParentRouteName.value = routeName
}
/**一级菜单数据*/
const firstDegreeMenus = computed(() => {
    let menu = routeStore.menus
    if (user && user.roleName != '系统管理员') {
        menu = menu.slice(0, -1)
    }
    return menu.map((item) => {
        const { routeName, label } = item
        const icon = item?.icon
        const hasChildren = Boolean(item.children && item.children.length)
        return { routeName, label, icon, hasChildren }
    })
}) as any

/**获取当前active路由路径*/
const getActiveParentRouteName = () => {
    firstDegreeMenus.value.some((item: { routeName: string }) => {
        const routeName = (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
        const flag = routeName?.includes(item.routeName)
        if (flag) {
            setActiveParentRouteName(item.routeName)
        }
        return flag
    })
}

/**点击打开子菜单 */
const handleMixMenu = (routeName: string, hasChildren: boolean) => {
    setActiveParentRouteName(routeName)
    if (hasChildren) {
        openDrawer()
    } else {
        routerPush({ name: routeName })
    }
}

/**关闭子菜单窗口,重置数据*/
const resetFirstDegreeMenus = () => {
    getActiveParentRouteName()
    hideDrawer()
}

/**子菜单*/
const activeChildMenus = computed(() => {
    const menus: GlobalMenuOption[] = []
    routeStore.menus.some((item) => {
        const flag = item.routeName === activeParentRouteName.value && Boolean(item.children?.length)
        if (flag) {
            menus.push(...(item.children || []))
        }
        return flag
    })
    return menus
})

/**监听路由变化*/
watch(
    () => route.name,
    () => {
        getActiveParentRouteName()
    },
    { immediate: true }
)
</script>

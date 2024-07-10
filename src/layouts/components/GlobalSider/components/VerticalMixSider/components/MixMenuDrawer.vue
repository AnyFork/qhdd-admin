<template>
    <div class="relative h-full transition-all duration-300 ease-in-out z-50" :style="{ width: app.mixSiderFixed ? theme.sider.mixChildMenuWidth + 'px' : '0px' }">
        <dark-mode-container class="drawer-shadow absolute-lt flex-col items-stretch h-full nowrap-hidden" :style="{ width: showDrawer ? theme.sider.mixChildMenuWidth + 'px' : '0px' }">
            <header class="header-height flex-y-center justify-between" :style="{ height: theme.header.height + 'px' }">
                <h2 class="text-primary pl-8px text-16px font-bold">{{ title }}</h2>
                <div class="px-8px text-16px text-gray-600 cursor-pointer" @click="app.toggleMixSiderFixed">
                    <icon-mdi-pin-off v-if="app.mixSiderFixed" />
                    <icon-mdi-pin v-else />
                </div>
            </header>
            <n-scrollbar class="flex-1 overflow-hidden">
                <n-menu :value="activeKey" :options="menus" :expanded-keys="expandedKeys" :indent="18" @update:value="handleUpdateMenu" @update:expanded-keys="handleUpdateExpandedKeys" />
            </n-scrollbar>
        </dark-mode-container>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
defineOptions({ name: 'MixMenuDrawer' })
const props = defineProps<{
    /** 菜单抽屉可见性 */
    visible: boolean
    /** 子菜单数据 */
    menus: GlobalMenuOption[]
}>()
const route = useRoute()
const app = useAppStore()
const theme = useThemeStore()
const { routerPush } = useRouterPush()
const { title } = useAppInfo()
/**二级菜单抽屉开关*/
const showDrawer = computed(() => (props.visible && props.menus.length) || app.mixSiderFixed)
/**当前激活的路由名称*/
const activeKey = computed(() => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string)
const expandedKeys = ref<string[]>([])
/**路由跳转*/
const handleUpdateMenu = (_key: string, item: MenuOption) => {
    const menuItem = item as GlobalMenuOption
    routerPush(menuItem.routePath)
}
/**展开的子菜单标识符数组*/
const handleUpdateExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys
}
/**监听路由变化*/
watch(
    () => route.name,
    () => {
        expandedKeys.value = []
    },
    { immediate: true }
)
</script>

<style scoped>
.drawer-shadow {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>

import router from '@/router'
import { constantRoutes } from '@/router/staticRoute'
import { AuthRoute } from '@/types/route'
import { RouteRecordRaw } from 'vue-router'

/**
 * 路由store
 */
export const useRouteStore = defineStore('route-store', () => {
    /**
     * 是否初始化过权限路由
     */
    const isInitAuthRoute = ref(false)
    /**
     * 菜单路由地址
     */
    const menus = ref<GlobalMenuOption[]>([])
    /**
     * 缓存的路由
     */
    const cacheRoutes = ref([])

    /**
     * 重置路由，保存固定路由
     */
    const resetRoutes = () => {
        const routes = router.getRoutes()
        const constantRouteNames = getConstantRouteNames(constantRoutes as AuthRoute.Route[])
        routes.forEach(route => {
            const name = (route.name || 'root') as string
            if (!constantRouteNames.includes(name)) {
                router.removeRoute(name)
            }
        })
    }
    /**
     * 处理权限路由
     */
    const handleAuthRoutes = (routes: RouteRecordRaw[]) => {
        menus.value = transformAuthRouteToMenu(routes)
    }
    /**
     * 初始化权限路由
     */
    const initAuthRoute = (routes: RouteRecordRaw[]) => {
        handleAuthRoutes(routes)
        isInitAuthRoute.value = true
    }

    return { menus, cacheRoutes, resetRoutes, handleAuthRoutes, isInitAuthRoute, initAuthRoute, router }
})

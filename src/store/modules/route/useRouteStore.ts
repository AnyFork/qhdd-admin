import router from '@/router'
import { constantRoutes } from '@/router/staticRoute'
import routes from '@/router/modules'

/**
 * 路由store
 */
export const useRouteStore = defineStore('route-store', () => {
    /**
     * 是否初始化过权限路由
     */
    const isInitAuthRoute = ref(false)
    /**
     * 首页路由path
     */
    const routeHomePath = ref(import.meta.env.VITE_ROUTE_HOME_PATH)
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
        const constantRouteNames = getConstantRouteNames(constantRoutes)
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
    const handleAuthRoutes = () => {
        // 将权限理由转换成菜单
        menus.value = transformAuthRouteToMenu(routes)
        console.log(menus.value)
    }
    /**
     * 初始化权限路由
     */
    const initAuthRoute = () => {
        handleAuthRoutes()
        isInitAuthRoute.value = true
    }

    return { routeHomePath, menus, cacheRoutes, resetRoutes, handleAuthRoutes, isInitAuthRoute, initAuthRoute }
},
    { persist: false }
)

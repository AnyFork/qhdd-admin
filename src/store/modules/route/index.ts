import { defineStore } from 'pinia'
import { router, rootRoute as root, constantRoutes, routes as staticRoutes } from '@/router'
import {
  transformAuthRouteToMenu,
  transformAuthRoutesToVueRoutes,
  transformAuthRouteToVueRoute,
  transformAuthRoutesToSearchMenus,
  getCacheRoutes,
  filterAuthRoutesByUserPermission,
  transformRoutePathToRouteName,
  transformRouteNameToRoutePath,
  getConstantRouteNames
} from '@/utils'

export const useRouteStore = defineStore('route-store', {
  state: (): AuthRoute.RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    searchMenus: [],
    cacheRoutes: []
  }),
  actions: {
    /** 重置路由的store */
    resetRouteStore() {
      this.resetRoutes()
      this.$reset()
    },
    /** 重置路由数据，保留固定路由 */
    resetRoutes() {
      const routes = router.getRoutes()
      const constantRouteNames = getConstantRouteNames(constantRoutes)
      routes.forEach((route) => {
        const name: AuthRoute.RouteKey = (route.name || 'root') as AuthRoute.RouteKey
        if (!constantRouteNames.includes(name)) {
          router.removeRoute(name)
        }
      })
    },
    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    handleAuthRoutes(routes: AuthRoute.Route[]) {
      this.menus = transformAuthRouteToMenu(routes)
      this.searchMenus = transformAuthRoutesToSearchMenus(routes)
      const vueRoutes = transformAuthRoutesToVueRoutes(routes)
      vueRoutes.forEach((route) => {
        router.addRoute(route)
      })
      this.cacheRoutes = getCacheRoutes(vueRoutes)
    },
    /** 动态路由模式下：更新根路由的重定向 */
    handleUpdateRootRedirect(routeKey: AuthRoute.RouteKey) {
      if (routeKey === 'root' || routeKey === 'not-found-page') {
        throw Error('routeKey的值不能为root或者not-found-page')
      }
      const rootRoute: AuthRoute.Route = { ...root, redirect: transformRouteNameToRoutePath(routeKey) }
      const rootRouteName: AuthRoute.RouteKey = 'root'
      router.removeRoute(rootRouteName)
      const rootVueRoute = transformAuthRouteToVueRoute(rootRoute)[0]
      router.addRoute(rootVueRoute)
    },
    /** 初始化动态路由 */
    async initDynamicRoute() {
      console.log('xxxxxxxxxxxxx')
    },
    /** 初始化静态路由 */
    async initStaticRoute() {
      const auth = 'super'
      const routes = filterAuthRoutesByUserPermission(staticRoutes, auth)
      this.handleAuthRoutes(routes)
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      await this.initStaticRoute()
      this.isInitAuthRoute = true
    }
  }
})

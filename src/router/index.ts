import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { transformRouteNameToRoutePath, transformAuthRoutesToVueRoutes } from '@/utils'
import { constantRoutes } from './staticRoute'
import { createRouterGuard } from './routeGuard'
export * from './modules'
export * from './staticRoute'

//获取路由模式和项目baseUrl
const { VITE_HASH_ROUTE = 'false', VITE_BASE_URL } = import.meta.env

/**
 * 定义返回模块
 */
export const router = createRouter({
    history: VITE_HASH_ROUTE === 'true' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
    routes: transformAuthRoutesToVueRoutes(constantRoutes)
})
// 创建路由守卫
createRouterGuard(router)
/** 路由名称 */
export const routeName = (key: AuthRoute.RouteKey) => key

/** 根据路由名称获取路由路径 */
export const routePath = (key: Exclude<AuthRoute.RouteKey, 'not-found-page'>) => transformRouteNameToRoutePath(key)

export default router


import { createRouter, createWebHistory } from 'vue-router'
import routes from './modules'
import { constantRoutes } from './staticRoute'
import { createRouterGuard } from './routeGuard'

/**
 * 创建路由实例
 */
export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: [...routes, ...constantRoutes]
})

//创建路由守卫
createRouterGuard(router)

export default router


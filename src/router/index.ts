import { createRouter, createWebHistory } from 'vue-router'
import routes from './modules'
import { constantRoutes } from './staticRoute'
import { createRouterGuard } from './routeGuard'

console.log(routes, constantRoutes)

//获取路由模式和项目baseUrl
const { VITE_BASE_URL } = import.meta.env

/**
 * 创建路由实例
 */
export const router = createRouter({
    history: createWebHistory(VITE_BASE_URL),
    routes: routes.concat(constantRoutes)
})

//创建路由守卫
createRouterGuard(router)

export default router


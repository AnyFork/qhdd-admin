import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
// import { createDynamicRouteGuard } from './dynamic'

/** 
 * 处理路由页面的权限
 */
export const createPermissionGuard = async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const route = useRouteStore()
  /**
   * 获取当前用户的token，判断当前用户是否登录
   */
  const isLogin = Boolean(getPlatformToken())
  // 首次进入路由，获取初始权限路由
  if (!route.isInitAuthRoute) {
    //初始化权限路由
    route.initAuthRoute()
  }
  /**
     * 未登录情况下直接回到登录页，登录成功后再加载权限路由
     */
  if (!isLogin) {
    if (to.name === 'login-platform' || to.name === 'login-store') {
      next()
    } else {
      const redirect = to.fullPath
      next({ name: 'login-platform', query: { redirect } })
    }
    return false
  } else {
    next()
  }
}

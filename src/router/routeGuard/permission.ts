import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { routeName } from '@/router'
import { exeStrategyActions, getToken } from '@/utils'
import { createDynamicRouteGuard } from './dynamic'

/** 处理路由页面的权限 */
export async function createPermissionGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  // 动态路由
  const permission = await createDynamicRouteGuard(to, from, next)
  if (!permission) return

  const isLogin = Boolean(getToken())
  const needLogin = false
  const hasPermission = true

  const actions: Common.StrategyAction[] = [
    // 已登录状态跳转登录页，跳转至首页
    [
      isLogin && to.name === routeName('login'),
      () => {
        next({ name: routeName('root') })
      }
    ],
    // 不需要登录权限的页面直接通行
    [
      !needLogin,
      () => {
        next()
      }
    ],
    // 未登录状态进入需要登录权限的页面
    [
      !isLogin && needLogin,
      () => {
        const redirect = to.fullPath
        next({ name: routeName('login'), query: { redirect } })
      }
    ],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [
      isLogin && needLogin && hasPermission,
      () => {
        next()
      }
    ],
    [
      // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
      isLogin && needLogin && !hasPermission,
      () => {
        next({ name: routeName('no-permission') })
      }
    ]
  ]

  exeStrategyActions(actions)
}

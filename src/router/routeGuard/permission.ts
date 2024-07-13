import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import platformRoutes from "@/router/modules/platform"
import storeRoutes from "@/router/modules/store"

/** 
 * 处理路由页面的权限
 */
export const createPermissionGuard = async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  console.log(to, _from)
  const route = useRouteStore()
  const tab = useTabStore()
  // 首次进入路由，获取初始权限路由
  if (!route.isInitAuthRoute) {
    //初始化权限路由
    if (to.path.startsWith('/platform')) {
      route.router.addRoute(
        {
          name: 'root',
          path: '/',
          redirect: import.meta.env.VITE_PLATFORM_ROUTE_HOME_PATH,
          meta: {
            title: 'Root'
          }
        }
      )
      tab.homeTab = {
        name: import.meta.env.VITE_PLATFORM_ROUTE_HOME_PATH.substring(1).replaceAll("/", "-"),
        fullPath: '/',
        meta: {
          title: 'Root'
        },
        scrollPosition: {
          left: 0,
          top: 0
        }
      }
      route.initAuthRoute(platformRoutes)
    } else if (to.path.startsWith('/store')) {
      route.router.addRoute(
        {
          name: 'root',
          path: '/',
          redirect: import.meta.env.VITE_STORE_ROUTE_HOME_PATH,
          meta: {
            title: 'Root'
          }
        }
      )
      tab.homeTab = {
        name: import.meta.env.VITE_STORE_ROUTE_HOME_PATH.substring(1).replaceAll("/", "-"),
        fullPath: '/',
        meta: {
          title: 'Root'
        },
        scrollPosition: {
          left: 0,
          top: 0
        }
      }
      route.initAuthRoute(storeRoutes)
    }

  }
  // 通过路由前缀进行区分登录类型 platform 平台管理员用户 store 商户店员
  if (to.path.startsWith(`/platform`)) {
    // 判断平台用户是否登录
    const isLogin = Boolean(getPlatformToken())
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      if (to.name === 'login-platform') {
        next()
      } else {
        const redirect = to.fullPath
        next({ name: 'login-platform', query: { redirect } })
      }
    } else {
      next()
    }
  } else if (to.path.startsWith(`/store`)) {
    // 判断商户店员是否登录或者平台管理员是否登录
    const isLogin = Boolean(getStoreToken()) || Boolean(getPlatformToken())
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      if (to.name === 'login-store') {
        next()
      } else {
        const redirect = to.fullPath
        next({ name: 'login-store', query: { redirect } })
      }
    } else {
      next()
    }
  } else {
    next()
  }
}

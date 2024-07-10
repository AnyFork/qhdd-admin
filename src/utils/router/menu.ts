import { RouteRecordRaw } from 'vue-router'
import { iconifyRender } from '../common'
import { AuthRoute } from '@/types/route'

/** 
 * 路由不转换菜单
 */
function hideInMenu(route: RouteRecordRaw) {
  return Boolean(route.meta?.hide)
}

/** 
 * 给菜单添加可选属性
 */
const addPartialProps = (menuItem: GlobalMenuOption, icon?: string, children?: GlobalMenuOption[]) => {
  const item = { ...menuItem }
  if (icon) {
    Object.assign(item, { icon: iconifyRender(icon) })
  }
  if (children) {
    Object.assign(item, { children })
  }
  return item
}

/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export const transformAuthRouteToMenu = (routes: RouteRecordRaw[]): GlobalMenuOption[] => {
  const globalMenu: GlobalMenuOption[] = []
  routes.forEach((route) => {
    const { name, path, meta } = route
    const routeName = name as string
    let menuChildren: GlobalMenuOption[] | undefined
    if (route.children) {
      menuChildren = transformAuthRouteToMenu(route.children)
    }
    const menuItem: GlobalMenuOption = addPartialProps(
      {
        key: routeName,
        label: meta!.title as string,
        routeName,
        routePath: path
      },
      meta?.icon as string,
      menuChildren
    )

    if (!hideInMenu(route)) {
      globalMenu.push(menuItem)
    }
  })
  return globalMenu
}

/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由的key
 * @param menus - 菜单数据
 */
export function getActiveKeyPathsOfMenus(activeKey: string, menus: GlobalMenuOption[]) {
  return menus.map((menu) => getActiveKeyPathsOfMenu(activeKey, menu)).flat(1)
}

const getActiveKeyPathsOfMenu = (activeKey: string, menu: GlobalMenuOption) => {
  const keys: string[] = []
  if (activeKey.includes(menu.routeName)) {
    keys.push(menu.routeName)
  }
  if (menu.children) {
    keys.push(...menu.children.map((item) => getActiveKeyPathsOfMenu(activeKey, item)).flat(1))
  }
  return keys
}

/**
 * 获取所有静态路由的名称集合
 * @param routes - 固定路由
 */
export const getConstantRouteNames = (routes: AuthRoute.Route[]) => {
  return routes.map((route) => getConstantRouteName(route)).flat(1)
}

/**
 * 获取所有静态路由的名称集合
 * @param route - 固定路由
 */
const getConstantRouteName = (route: AuthRoute.Route) => {
  const names = [route.name]
  if (Boolean(route.children && route.children.length)) {
    names.push(...route.children!.map((item) => getConstantRouteName(item)).flat(1))
  }
  return names
}
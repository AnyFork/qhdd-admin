import type { Component } from 'vue'
//vue页面组件类型
type ViewComponent = Record<string, () => Promise<Component>>
// 动态加载pages页面下所有的index.vue页面
const importViews: Record<string, () => Promise<Component>> = import.meta.glob('./**/index.vue')
// 页面组件key  
const COMPONENTS_KEY = 'components'
// 页面路径前缀
const PREFIX = './'
// 页面路径后缀
const SUFFIX = '/index.vue'
// 页面路径分隔符
const PATH_SPLIT_MARK = '/'
// 路由路径分割符
const ROUTE_KEY_SPLIT_MARK = '_'
/** 系统的内置路由，该文件夹名称不作为RouteKey */
const SYSTEM_VIEW = 'system_'

/** 过滤掉组件文件 */
const viewKeys = Object.keys(importViews).filter((key) => !key.includes(COMPONENTS_KEY))

function getViewComponent() {
  const components: ViewComponent = {}
  viewKeys.forEach((key) => {
    const routeKey: string = key.replace(PREFIX, '').replace(SUFFIX, '').replace(new RegExp(PATH_SPLIT_MARK, 'g'), ROUTE_KEY_SPLIT_MARK).replace(SYSTEM_VIEW, '')
    components[routeKey] = importViews[key]
  })
  return components
}

export const views = getViewComponent()

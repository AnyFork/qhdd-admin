import { blankLayout, basicLayout } from '@/utils/common/useLayout';
/** 
 * 权限路由相关类型
 */
declare namespace AuthRoute {
  /** 
   * 路由描述
   */
  type RouteMeta = {
    /**
     *  路由标题(可用来作document.title或者菜单的名称)
     */
    title: string
    /** 
     * 缓存页面
     */
    keepAlive?: boolean
    /** 
     * 菜单和面包屑对应的图标
     */
    icon?: string
    /** 
     * 是否在菜单中隐藏(一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中)
     */
    hide?: boolean
    /** 
     * 外链链接
     */
    href?: string
    /** 
     * 路由顺序，可用于菜单的排序
     */
    order?: number
  }

  /** 
   * 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由)
   */
  interface Route {
    /** 
     * 路由名称(路由唯一标识)
     */
    name: string
    /** 
     * 路由路径
     */
    path: string
    /** 路由重定向 */
    redirect?: string
    /**
     * 路由组件
     */
    component?: typeof blankLayout | typeof basicLayout
    /** 
     * 子路由
     */
    children?: Route[]
    /** 
     * 路由描述
     */
    meta: RouteMeta
    /** 
     * 路由属性
     */
    props?: boolean | Record<string, any> | ((to: any) => Record<string, any>)
  }
}

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/** vue 的defineExpose导出的类型 */
declare namespace Expose {
  interface BetterScroll {
    instance: import('@better-scroll/core').BScrollInstance
  }
}

interface ImportMetaEnv {
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string
  /** 项目名称 */
  readonly VITE_APP_NAME: string
  /** 项目标题 */
  readonly VITE_APP_TITLE: string
  /** 项目描述 */
  readonly VITE_APP_DESC: string
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic'
  /** 路由首页的路径 */
  readonly VITE_ROUTE_HOME_PATH: Exclude<AuthRoute.RoutePath, '/not-found-page' | '/:pathMatch(.*)*'>
  /** vite环境类型 */
  readonly VITE_ENV_TYPE?: EnvType
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: 'true' | 'false'
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER?: 'true' | 'false'
  /** 是否开启打包压缩 */
  readonly VITE_COMPRESS?: 'true' | 'false'
  /** 压缩算法类型 */
  readonly VITE_COMPRESS_TYPE?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const defineOptions: (params: any) => {}

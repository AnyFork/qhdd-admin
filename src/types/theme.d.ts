/** 
 * 枚举的key类型
 */
declare namespace EnumType {
  /** 
   * 布局组件名称
   */
  type LayoutComponentName = keyof typeof import('../utils/enum').EnumLayoutComponentName

  /** 
   * 布局模式
   */
  type ThemeLayoutMode = keyof typeof import('../utils/enum').EnumThemeLayoutMode

  /** 
   * 多页签风格
   */
  type ThemeTabMode = keyof typeof import('../utils/enum').EnumThemeTabMode

  /** 
   * 水平模式的菜单位置
   */
  type ThemeHorizontalMenuPosition = keyof typeof import('../utils/enum').EnumThemeHorizontalMenuPosition

  /** 
   * 过渡动画
   */
  type ThemeAnimateMode = keyof typeof import('../utils/enum').EnumThemeAnimateMode

  /** 
   * 登录模块
   */
  type LoginModuleKey = keyof typeof import('../utils/enum').EnumLoginModule
}

/** 
 * 主题相关类型
 */
declare namespace Theme {
  /** 
   * 主题配置
   */
  interface Setting {
    /** 
     * 暗黑模式
     */
    darkMode: boolean
    /** 
     * 是否自动跟随系统主题
     */
    followSystemTheme: boolean
    /** 
     * 布局样式
     */
    layout: Layout
    /** 
     * 主题颜色
     */
    themeColor: string
    /** 
     * 主题颜色列表
     */
    themeColorList: string[]
    /** 
     * 其他颜色
     */
    otherColor: OtherColor
    /** 
     * 是否自定义info的颜色(默认取比主题色深一级的颜色)
     */
    isCustomizeInfoColor: boolean
    /**
     * 显示重载按钮
     */
    showReload: boolean
    /** 
     * 头部样式
     */
    header: Header
    /** 
     * 标多页签样式
     */
    tab: Tab
    /** 
     * 侧边栏样式
     */
    sider: Sider
    /** 
     * 菜单样式
     */
    menu: Menu
    /** 
     * 底部样式
     */
    footer: Footer
    /** 
     * 页面样式
     */
    page: Page
  }
  /** 
   * 布局样式
   */
  interface Layout {
    /** 
     * 最小宽度
     */
    minWidth: number
    /** 
     * 布局模式
     */
    mode: EnumType.ThemeLayoutMode
    /** 
     * 布局模式列表
     */
    modeList: LayoutModeList[]
  }
  /**
   * 布局模式下拉框
   */
  interface LayoutModeList {
    value: EnumType.ThemeLayoutMode
    label: import('../utils/enum').EnumThemeLayoutMode
  }

  /** 
   * 其他主题颜色
   */
  interface OtherColor {
    /** 
     * 信息
     */
    info: string
    /** 
     * 成功
     */
    success: string
    /** 
     * 警告
     */
    warning: string
    /** 
     * 错误
     */
    error: string
  }

  /** 
   * 头部样式
   */
  interface Header {
    /** 
     * 头部反转色
     */
    inverted: boolean
    /** 
     * 头部高度
     */
    height: number
    /** 
     * 面包屑样式
     */
    crumb: Crumb
    /** 
     * 固定头部和多页签
     */
    fixedHeaderAndTab: boolean
  }
  /** 
   * 面包屑样式
   */
  interface Crumb {
    /** 
     * 面包屑可见
     */
    visible: boolean
    /** 
     * 显示图标
     */
    showIcon: boolean
  }

  /** 
   * 标多页签样式
   */
  export interface Tab {
    /** 
     * 多页签可见
     */
    visible: boolean
    /** 
     * 多页签高度
     */
    height: number
    /** 
     * 多页签风格
     */
    mode: EnumType.ThemeTabMode
    /** 
     * 多页签风格列表
     */
    modeList: ThemeTabModeList[]
    /** 
     * 开启多页签缓存
     */
    isCache: boolean
  }

  /** 
   * 多页签风格列表
   */
  interface ThemeTabModeList {
    value: EnumType.ThemeTabMode
    label: import('../utils/enum').EnumThemeTabMode
  }

  /** 
   * 侧边栏样式
   */
  interface Sider {
    /** 
     * 侧边栏反转色
     */
    inverted: boolean
    /** 
     * 侧边栏宽度
     */
    width: number
    /** 
     * 侧边栏折叠时的宽度
     */
    collapsedWidth: number
    /** 
     * vertical-mix模式下侧边栏宽度
     */
    mixWidth: number
    /** 
     * vertical-mix模式下侧边栏折叠时的宽度
     */
    mixCollapsedWidth: number
    /**
     * vertical-mix模式下侧边栏的子菜单的宽度
     */
    mixChildMenuWidth: number
  }

  /** 
   * 菜单样式
   */
  interface Menu {
    /** 
     * 水平模式的菜单的位置
     */
    horizontalPosition: EnumType.ThemeHorizontalMenuPosition
    /** 
     * 水平模式的菜单的位置列表
     */
    horizontalPositionList: HorizontalMenuPositionList[]
  }
  /** 
   * 水平模式的菜单的位置列表
   */
  interface HorizontalMenuPositionList {
    value: EnumType.ThemeHorizontalMenuPosition
    label: import('../utils/enum').EnumThemeHorizontalMenuPosition
  }

  /** 
   * 底部样式
   */
  interface Footer {
    /** 
     * 是否固定底部
     */
    fixed: boolean
    /** 
     * 底部高度
     */
    height: number
    /** 
     * 底部反转色
     */
    inverted: boolean
  }

  /** 
   * 页面样式
   */
  interface Page {
    /** 
     * 页面是否开启动画
     */
    animate: boolean
    /** 
     * 动画类型
     */
    animateMode: EnumType.ThemeAnimateMode
    /** 
     * 动画类型列表
     */
    animateModeList: AnimateModeList[]
  }
  /** 
   * 动画类型列表
   */
  interface AnimateModeList {
    value: EnumType.ThemeAnimateMode
    label: import('../utils/enum').EnumThemeAnimateMode
  }

  /**
   * 中国传统颜色明细
   */
  interface TraditionColorDetail {
    label: string
    color: string
  }
  /**
   * 中国传统颜色
   */
  interface TraditionColor {
    label: string
    data: TraditionColorDetail[]
  }
}

/** 
 * 全局头部属性
 */
interface GlobalHeaderProps {
  /** 
   * 显示logo
   */
  showLogo: boolean
  /** 
   * 显示头部菜单
   */
  showHeaderMenu: boolean
  /** 
   * 显示菜单折叠按钮
   */
  showMenuCollapse: boolean
}

/** 
 * 菜单项配置
 */
type GlobalMenuOption = {
  key: string
  label: string
  routeName: string
  routePath: string
  icon?: () => import('vue').VNodeChild
  children?: GlobalMenuOption[]
}

/** 
 * 面包屑
 */
type GlobalBreadcrumb = import('naive-ui').DropdownOption & {
  key: string
  label: string
  disabled: boolean
  routeName: string
  hasChildren: boolean
  children?: GlobalBreadcrumb[]
}

/** 
 * 多页签Tab的路由
 */
interface GlobalTabRoute extends Pick<import('vue-router').RouteLocationNormalizedLoaded, 'name' | 'fullPath' | 'meta'> {
  /** 滚动的位置 */
  scrollPosition: {
    left: number
    top: number
  }
}

declare namespace SystemInfo {
  interface AppInfo {
    /** 项目名称 */
    name: string
    /** 项目标题 */
    title: string
    /** 项目描述 */
    desc: string
  }
  interface AppState {
    /** 重载页面(控制页面的显示) */
    reloadFlag: boolean
    /** 项目配置的抽屉可见状态 */
    settingDrawerVisible: boolean
    /** 侧边栏折叠状态 */
    siderCollapse: boolean
    /** vertical-mix模式下 侧边栏的固定状态 */
    mixSiderFixed: boolean
    /**水印 */
    waterMark: WaterMark
    /**是否展示header主题切换开关 */
    showHeaderThemeBtn: boolean
    /**是否展示全屏按钮 */
    showHeaderFullScreenBtn: boolean
  }
  interface WaterMark {
    /**是否显示水印 */
    showWatermark: boolean
    /**水印内容 */
    contents: string
    /**水印字体大小 */
    fontSize: number
    /**水印旋转角度 */
    rotate: number
  }
}

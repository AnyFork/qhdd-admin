import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useAppStore, useThemeStore } from '@/store'

type LayoutMode = 'vertical' | 'horizontal'
type LayoutHeaderProps = Record<EnumType.ThemeLayoutMode, GlobalHeaderProps>

export function useBasicLayout() {
  const app = useAppStore()
  const theme = useThemeStore()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  /**layout大的布局模式,水平或垂直*/
  const mode = computed(() => {
    const vertical: LayoutMode = 'vertical'
    const horizontal: LayoutMode = 'horizontal'
    return theme.layout.mode.includes(vertical) ? vertical : horizontal
  })
  /** layout布局风格 */
  const layoutMode = computed(() => theme.layout.mode)
  const isMobile = breakpoints.smaller('sm')
  /**不同布局风格下header参数 */
  const layoutHeaderProps: LayoutHeaderProps = {
    vertical: {
      showLogo: false,
      showHeaderMenu: false,
      showMenuCollapse: true
    },
    'vertical-mix': {
      showLogo: false,
      showHeaderMenu: false,
      showMenuCollapse: false
    },
    horizontal: {
      showLogo: true,
      showHeaderMenu: true,
      showMenuCollapse: false
    },
    'horizontal-mix': {
      showLogo: true,
      showHeaderMenu: false,
      showMenuCollapse: true
    }
  }
  /**获取不同布局模式下对应的header参数 */
  const headerProps = computed(() => layoutHeaderProps[theme.layout.mode])
  /**左侧侧边栏是否显示 */
  const siderVisible = computed(() => theme.layout.mode !== 'horizontal')
  /**左侧侧边栏宽度参数 */
  const siderWidth = computed(() => {
    const { width, mixWidth, mixChildMenuWidth } = theme.sider
    /**左侧垂直混合模式*/
    const isVerticalMix = theme.layout.mode === 'vertical-mix'
    let w = isVerticalMix ? mixWidth : width
    if (isVerticalMix && app.mixSiderFixed) {
      w += mixChildMenuWidth
    }
    return w
  })
  /**左侧侧边栏折叠后宽度参数 */
  const siderCollapsedWidth = computed(() => {
    const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = theme.sider
    /**左侧垂直混合模式*/
    const isVerticalMix = theme.layout.mode === 'vertical-mix'
    let w = isVerticalMix ? mixCollapsedWidth : collapsedWidth
    if (isVerticalMix && app.mixSiderFixed) {
      w += mixChildMenuWidth
    }
    return w
  })

  return {
    mode,
    layoutMode,
    isMobile,
    headerProps,
    siderVisible,
    siderWidth,
    siderCollapsedWidth
  }
}

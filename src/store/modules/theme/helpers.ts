import { watch, onUnmounted } from 'vue'
import { GlobalThemeOverrides, useOsTheme } from 'naive-ui'
import { cloneDeep, kebabCase } from 'lodash-es'
import { useElementSize } from '@vueuse/core'

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type ColorKey = `${ColorType}Color${ColorScene}`
type ThemeColor = Partial<Record<ColorKey, string>>
type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>
type ThemeVarsKeys = keyof ThemeVars

interface ColorAction {
  scene: ColorScene
  handler: (color: string) => string
}

/**
 * css暗黑模式
 * @returns css暗黑模式方法
 */
const handleCssDarkMode = () => {
  const DARK_CLASS = 'dark'
  function addDarkClass() {
    document.documentElement.classList.add(DARK_CLASS)
  }
  function removeDarkClass() {
    document.documentElement.classList.remove(DARK_CLASS)
  }
  return { addDarkClass, removeDarkClass }
}

/**
 * 添加css vars至html
 * @param themeVars 主题变量
 */
const addThemeCssVarsToHtml = (themeVars: ThemeVars) => {
  const keys = Object.keys(themeVars) as ThemeVarsKeys[]
  const style: string[] = []
  keys.forEach((key) => {
    style.push(`--${kebabCase(key)}: ${themeVars[key]}`)
  })
  const styleStr = style.join(';')
  document.documentElement.style.cssText += styleStr
}

/**
 * @param colors
 * @returns 获取主题颜色的各种场景对应的颜色
 */
const getThemeColors = (colors: [ColorType, string][]) => {
  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: (color) => getColorPalette(color, 7) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) }
  ]
  const themeColor: ThemeColor = {}
  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color
      const colorKey: ColorKey = `${colorType}Color${action.scene}`
      themeColor[colorKey] = action.handler(colorValue)
    })
  })
  return themeColor
}

/**
 * 监听主题模式和主题变量变化
 * @param themeStore 主题store对象
 */
export const subcribeWatch = (themeStore: any) => {
  //跟随系统主题，返回dark或light
  const osTheme = useOsTheme()
  const { width } = useElementSize(document.documentElement)
  //结构css变量处理方法
  const { addDarkClass, removeDarkClass } = handleCssDarkMode()

  // 监听naiveUI themeOverrides
  const stopThemeOverrides = watch(
    () => themeStore.naiveThemeOverrides,
    (newValue) => {
      if (newValue.common) {
        addThemeCssVarsToHtml(newValue.common)
        //将主题颜色存放localStrage中，用于index.html初始化主题色控制
        localStorage.setItem(EnumStorageKey['theme-color'], newValue.common.primaryColor)
      }
    },
    { immediate: true }
  )

  // 监听暗黑模式
  const stopDarkMode = watch(
    () => themeStore.darkMode,
    (newValue) => {
      newValue ? addDarkClass() : removeDarkClass()
    },
    {
      immediate: true
    }
  )

  // 监听操作系统主题模式
  const stopOsTheme = watch(
    osTheme,
    (newValue) => {
      themeStore.setAutoFollowSystemMode(newValue === 'dark')
    },
    { immediate: true }
  )

  // 禁用横向滚动(页面切换时,过渡动画会产生水平方向的滚动条, 小于最小宽度时，不禁止)
  const stopWidth = watch(width, (newValue) => {
    if (newValue < themeStore.layout.minWidth) {
      document.documentElement.style.overflowX = 'auto'
    } else {
      document.documentElement.style.overflowX = 'hidden'
    }
  })

  //卸载监听
  onUnmounted(() => {
    stopThemeOverrides()
    stopDarkMode()
    stopOsTheme()
    stopWidth()
  })
}

/**
 * @returns 获取主题初始化默认配置
 */
export function getThemeSettings() {
  //初始化主题颜色
  const themeColor = themeSetting.themeColor
  const info = themeSetting.isCustomizeInfoColor ? themeSetting.otherColor.info : getColorPalette(themeColor, 7)
  const otherColor = { ...themeSetting.otherColor, info }
  const setting = cloneDeep({ ...themeSetting, themeColor, otherColor })
  return setting
}

/**
 * @param colors
 * @returns 获取naive的主题颜色
 */
export function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
  const { primary, success, warning, error } = colors
  const info = themeSetting.isCustomizeInfoColor ? colors.info : getColorPalette(primary, 7)
  const themeColors = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error]
  ])
  const colorLoading = primary
  return {
    common: {
      ...themeColors
    },
    LoadingBar: {
      colorLoading
    }
  }
}

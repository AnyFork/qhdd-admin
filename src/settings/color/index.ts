import colorJson from './color.json'

/** 中国传统颜色 */
export const traditionColors = colorJson as Theme.TraditionColor[]

export function isInTraditionColors(color: string) {
  return traditionColors.some((item) => {
    return item.data.some((v) => v.color === color)
  })
}

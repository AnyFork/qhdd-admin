import animate from './animate.json'
/**
 * 动画类型下拉数据转换
 */
export const animateTypeToSelection = (animate: Array<Animate.animateClassArray>): Array<Animate.animateSelect> => {
  return animate.map((item) => {
    return { value: item.alias, label: item.name }
  })
}
/**
 * 出入场动画类型class下拉数据转换
 */
export const animateClassToSelection = (animate: Array<string>): Array<Animate.animateSelect> => {
  return animate.map((item) => {
    return { value: item, label: item }
  })
}
export const animateAllData = animate as Array<Animate.animateClassArray>

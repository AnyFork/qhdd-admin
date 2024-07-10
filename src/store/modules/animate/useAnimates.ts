
/**
 * 动画效果store
 */
export const useAnimates = defineStore('animate-store', () => {
  const animate = reactive<Animate.animateStore>({
    isShowAnimation: true,
    selectAnimateType: animateAllData[0].alias,
    selectAnimateInClass: animateAllData[0].entrances[0],
    selectAnimateOutClass: animateAllData[0].exits[0],
    animateAliasAllData: animateTypeToSelection(animateAllData),
    animateInData: animateClassToSelection(animateAllData[0].entrances),
    animateOutData: animateClassToSelection(animateAllData[0].exits)
  })
  /**
   * 动画类型切换，更改进出场数据 
  */
  const changeAnimationInAndOutClass = (value: string) => {
    const { entrances, exits } = animateAllData.find((item) => item.alias === value) as Animate.animateClassArray
    animate.animateInData = animateClassToSelection(entrances)
    animate.animateOutData = animateClassToSelection(exits)
    //进出场出厂动画默认选中第一项
    animate.selectAnimateOutClass = exits[0]
    animate.selectAnimateInClass = entrances[0]
  }
  return { animate, changeAnimationInAndOutClass }
},
  { persist: true }
)

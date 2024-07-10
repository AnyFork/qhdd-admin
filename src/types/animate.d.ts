/**
 * 动画类型声明 
*/
declare namespace Animate {
  /**
   *  animateCss 类名
   */
  interface animateClassArray {
    /**
     * 名称
    */
    name: string
    /**
     * 中文别名
     */
    alias: string
    /**
     * 入场类名集合
     */
    entrances: Array<string>
    /**
     * 出厂类名集合
     */
    exits: Array<string>
  }
  /** 
   * useAnimate类型
   */
  interface animateStore {
    /**
     * 是否显示动画
    */
    isShowAnimation: boolean
    /**
     * 选中的动画类型
    */
    selectAnimateType: string
    /**
     * 对应选中动画类型的入场动画
     */
    animateInData: Array<animateSelect>
    /**
     * 对应选中动画类型的出厂动画类名
     */
    animateOutData: Array<animateSelect>
    /**
     * 选中入场动画类名
     */
    selectAnimateInClass: string
    /**
     * 选中的出厂动画类名
     */
    selectAnimateOutClass: string
    /**
     * 动画类型数据
     */
    animateAliasAllData: Array<animateSelect>
  }
  /**
   * 下拉框类型
  */
  interface animateSelect {
    /**
     * 下拉框值key
     */
    value: string
    /**
     * 下拉框option label
     */
    label: string
  }
}

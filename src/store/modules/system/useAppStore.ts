/**
 * 系统配置store
 */
export const useAppStore = defineStore('app-store', () => {
  const reloadFlag = ref(true)
  const settingDrawerVisible = ref(false)
  const siderCollapse = ref(false)
  const mixSiderFixed = ref(false)
  const showHeaderThemeBtn = ref(true)
  const showHeaderFullScreenBtn = ref(true)
  const waterMark = reactive({
    showWatermark: true,
    contents: '泉海点点送管理平台',
    fontSize: 14,
    rotate: -15
  })
  /**
   * 重载页面
   * @param duration - 重载的延迟时间(ms)
   */
  const reloadPage = async (duration = 500) => {
    reloadFlag.value = false
    await nextTick()
    if (duration) {
      setTimeout(() => {
        reloadFlag.value = true
      }, duration)
    } else {
      reloadFlag.value = true
    }
    setTimeout(() => {
      document.documentElement.scrollTo({ left: 0, top: 0 })
    }, 100)
  }
  /** 
   * 打开设置抽屉
   */
  const openSettingDrawer = () => {
    settingDrawerVisible.value = true
  }
  /** 
   * 关闭设置抽屉
   */
  const closeSettingDrawer = () => {
    settingDrawerVisible.value = false
  }
  /** 
   * 切换抽屉可见状态
   */
  const toggleSettingDrawerVisible = () => {
    settingDrawerVisible.value = !settingDrawerVisible.value
  }
  /** 
   * 设置侧边栏折叠状态
   */
  const setSiderCollapse = (collapse: boolean) => {
    siderCollapse.value = collapse
  }
  /** 
   * 折叠/展开 侧边栏折叠状态
   */
  const toggleSiderCollapse = () => {
    siderCollapse.value = !siderCollapse.value
  }
  /** 
   * 设置 vertical-mix模式下 侧边栏的固定状态
   */
  const setMixSiderIsFixed = (isFixed: boolean) => {
    mixSiderFixed.value = isFixed
  }
  /** 
   * 设置 vertical-mix模式下 侧边栏的固定状态
   */
  const toggleMixSiderFixed = () => {
    mixSiderFixed.value = !mixSiderFixed
  }
  /**
   * 是否显示水印 
  */
  const setWaterMarkShow = (show: boolean) => {
    waterMark.showWatermark = show
  }
  /**
   * 设置水印文本
   */
  const setWaterMarkContent = (text: string) => {
    waterMark.contents = text
  }
  return {
    openSettingDrawer, reloadPage, setWaterMarkContent, setWaterMarkShow, toggleMixSiderFixed, setMixSiderIsFixed, toggleSiderCollapse, setSiderCollapse,
    toggleSettingDrawerVisible, closeSettingDrawer, waterMark, showHeaderThemeBtn, showHeaderFullScreenBtn, siderCollapse, reloadFlag, settingDrawerVisible, mixSiderFixed
  }
},
  { persist: true }
)

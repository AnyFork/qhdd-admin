// 反色模式模式
export default function useColorWeak(initColorInvertMode = false) {
  const colorInvertMode = ref<boolean>(initColorInvertMode)
  /**开启反色 */
  const enableColorInvert = () => {
    colorInvertMode.value = true
  }
  /**禁用反色*/
  const disableColorInvert = () => {
    colorInvertMode.value = false
  }
  /**反色切换*/
  const toggleColorInvert = () => {
    colorInvertMode.value = !colorInvertMode.value
  }

  //监听色弱模式
  const stopInvertWatch = watch(
    colorInvertMode,
    (newValue) => {
      newValue ? document.body.classList.add('gray-mode') : document.body.classList.remove('gray-mode')
    },
    { immediate: true }
  )
  onUnmounted(() => {
    stopInvertWatch()
  })

  return {
    colorInvertMode,
    enableColorInvert,
    disableColorInvert,
    toggleColorInvert
  }
}

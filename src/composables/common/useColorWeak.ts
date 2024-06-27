// 色弱模式
export default function useColorWeak(initColorWeakMode = false) {
  const weakMode = ref<boolean>(initColorWeakMode)
  /**开启色弱 */
  const enableColorWeak = () => {
    weakMode.value = true
  }
  /**关闭色弱 */
  const disableColorWeak = () => {
    weakMode.value = false
  }
  /**色弱切换 */
  const toggleColorWeak = () => {
    weakMode.value = !weakMode.value
  }

  //监听色弱模式
  const stopWeakWatch = watch(
    weakMode,
    (newValue) => {
      newValue ? document.body.classList.add('color-weak') : document.body.classList.remove('color-weak')
    },
    { immediate: true }
  )
  onUnmounted(() => {
    stopWeakWatch()
  })

  return {
    weakMode,
    enableColorWeak,
    disableColorWeak,
    toggleColorWeak,
    stopWeakWatch
  }
}

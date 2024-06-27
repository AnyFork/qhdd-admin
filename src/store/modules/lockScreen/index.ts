import { defineStore } from 'pinia'
import { RouteRecordName } from 'vue-router'

export const useLockScreenstore = defineStore(
  'lock-store',
  () => {
    /**锁屏密码 */
    const lockScreenPassword = ref('')
    /**是否开启锁屏功能,控制锁屏按钮显示 */
    const isLockScreen = ref(true)
    /**是否正在锁屏 */
    const isLocking = ref(false)
    /**锁屏前路由地址 */
    const lastRouteName = ref<RouteRecordName | null | undefined>('')
    /**修改锁屏密码 */
    const changeLockPassword = (password: string) => {
      isLocking.value = true
      lockScreenPassword.value = password
    }
    /**获取锁屏密码 */
    const getLockScreen = () => {
      return lockScreenPassword.value
    }
    /**重置锁屏状态 */
    const resetLockScreen = () => {
      lockScreenPassword.value = ''
      isLocking.value = false
      lastRouteName.value = ''
    }
    /**获取锁屏状态 */
    const getLockScreenStatus = () => {
      return isLocking
    }
    return { isLockScreen, isLocking, lockScreenPassword, lastRouteName, changeLockPassword, getLockScreen, resetLockScreen, getLockScreenStatus }
  },
  { persist: true }
)

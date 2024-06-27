import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { useAppInfo } from '@/composables'
import { createPermissionGuard } from './permission'
import { useLockScreenstore } from '@/store'
const { title } = useAppInfo()

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    window.$loadingBar?.start()
    /**判断当前是否锁屏状态 */
    const useLockScreen = useLockScreenstore()
    if (useLockScreen.isLocking && to.name != 'lockScreen') {
      next('lockScreen')
    }
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next)
  })
  router.afterEach((to) => {
    // 设置document title
    useTitle(to.meta.title as string + "—" + title)
    // 结束 loadingBar
    window.$loadingBar?.finish()
  })
}

//https://www.npmjs.com/package/pinia-plugin-persistedstate
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(
  /**pinia 全局持久化配置，会覆盖默认配置，但也会被单个store的persist配置覆盖 */
  createPersistedState({
    storage: sessionStorage,
    beforeRestore: (_context) => {
    },
    afterRestore: (_context) => {
    }
  })
)

export default pinia

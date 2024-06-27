// 封装getCurrentInstance，解决ts针对getCurrentInstance()类型识别null问题
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
const useInstance = () => {
    const { appContext, emit } = getCurrentInstance() as ComponentInternalInstance
    const { $axios } = appContext.config.globalProperties
    return { $axios, $emit: emit }
}
export { useInstance }

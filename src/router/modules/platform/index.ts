import { RouteRecordRaw } from "vue-router"

/**
 * 批量导入modules下面子目录中的路由配置文件
 */
const modules = import.meta.glob('./**/*.ts', { eager: true })
/**
 * 平台路由集合
 */
let platformRoutes: RouteRecordRaw[] = []
/**
 * 遍历modules，解下路由数据
 */
Object.keys(modules).forEach(key => {
    platformRoutes = platformRoutes.concat((modules[key] as any).default)
})

export default platformRoutes
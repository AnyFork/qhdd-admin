import { RouteRecordRaw } from "vue-router"

/**
 * 批量导入modules下面子目录中的路由配置文件
 */
const modules = import.meta.glob('./**/*.ts', { eager: true })
/**
 * 路由集合
 */
let routes: RouteRecordRaw[] = []
/**
 * 遍历modules，解下路由数据
 */
Object.keys(modules).forEach(key => {
    routes = routes.concat((modules[key] as any).default)
})

export default routes
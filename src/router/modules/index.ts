import { RouteRecordRaw } from "vue-router"
import platformRoutes from "./platform"
import storeRoutes from "./store"

/**
 * 路由集合
 */
let routes: RouteRecordRaw[] = [...platformRoutes, ...storeRoutes]

export default routes
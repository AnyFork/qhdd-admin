import { RouteRecordRaw } from "vue-router"
import platformRoutes from "./platform"
import storeRoutes from "./store"
import chainRoutes from "./chain"

/**
 * 路由集合
 */
let routes: RouteRecordRaw[] = [...platformRoutes, ...storeRoutes, ...chainRoutes]

export default routes
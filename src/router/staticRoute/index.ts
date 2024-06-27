/**
 * 根路由
 */
export const rootRoute: AuthRoute.Route = {
    name: 'root',
    path: '/',
    redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
    meta: {
        title: 'Root'
    }
}
/**
 * 系统静态路由
 */
export const constantRoutes: Array<AuthRoute.Route> = [
    rootRoute,
    {
        name: 'login',
        path: '/login',
        component: 'self',
        meta: {
            title: '系统登录',
            singleLayout: 'blank'
        }
    },
    {
        name: 'lockScreen',
        path: '/lockScreen',
        component: 'self',
        meta: {
            title: '系统锁屏',
            singleLayout: 'blank'
        }
    },
    {
        name: 'no-permission',
        path: '/no-permission',
        component: 'self',
        meta: {
            title: '无权限',
            singleLayout: 'blank'
        }
    },
    {
        name: 'not-found',
        path: '/not-found',
        component: 'self',
        meta: {
            title: '未找到',
            singleLayout: 'blank'
        }
    },
    {
        name: 'service-error',
        path: '/service-error',
        component: 'self',
        meta: {
            title: '服务器错误',
            singleLayout: 'blank'
        }
    },
    // 匹配无效路径的路由
    {
        name: 'not-found-page',
        path: '/:pathMatch(.*)*',
        component: 'blank',
        meta: {
            title: '未找到',
            singleLayout: 'blank'
        }
    }
]

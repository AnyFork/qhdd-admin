import { RouteRecordRaw } from "vue-router"
/**
 * 系统静态路由
 */
export const constantRoutes: RouteRecordRaw[] = [
    {
        name: 'login-parent',
        path: '/login/parent',
        component: blankLayout,
        redirect: "/login/platform",
        children: [
            {
                name: 'login-platform',
                path: '/login/platform',
                component: () => import('@/pages/system/loginModule/platform.vue'),
                meta: {
                    title: '平台管理员登录'
                }
            },
            {
                name: 'login-store',
                path: '/login/store',
                component: () => import('@/pages/system/loginModule/store.vue'),
                meta: {
                    title: '平台商户登录'
                }
            },
            {
                name: 'login-chain',
                path: '/login/chain',
                component: () => import('@/pages/system/loginModule/chain.vue'),
                meta: {
                    title: '连锁店管理员登录'
                }
            }
        ],
        meta: {
            title: '用户登录'
        }
    },
    {
        name: 'lockScreen-parent',
        path: '/lockScreen/parent',
        component: blankLayout,
        redirect: "/lockScreen",
        children: [
            {
                name: 'lockScreen',
                path: '/lockScreen',
                component: () => import('@/pages/system/lockScreen/index.vue'),
                meta: {
                    title: '系统锁屏'
                }
            }
        ],
        meta: {
            title: '系统锁屏'
        }
    },
    {
        name: 'aut-confirm',
        path: '/auth/confirm',
        component: blankLayout,
        redirect: "/auth",
        children: [
            {
                name: 'auth',
                path: '/auth',
                component: () => import('@/pages/auth/index.vue'),
                meta: {
                    title: '平台授权'
                }
            }
        ],
        meta: {
            title: '平台授权'
        }
    },
    {
        name: 'no-permission-parent',
        path: '/no-permission/parent',
        component: blankLayout,
        redirect: "/no-permission",
        children: [
            {
                name: 'no-permission',
                path: '/no-permission',
                component: () => import('@/pages/system/no-permission/index.vue'),
                meta: {
                    title: '无权限访问'
                }
            }
        ],
        meta: {
            title: '无权限访问'
        }
    },
    {
        name: 'not-found-parent',
        path: '/not-found/parent',
        component: blankLayout,
        redirect: "/not-found",
        children: [
            {
                name: 'not-found',
                path: '/not-found',
                component: () => import('@/pages/system/not-found/index.vue'),
                meta: {
                    title: '404页面未找到'
                }
            }
        ],
        meta: {
            title: '404页面未找到'
        }
    },
    {
        name: 'service-error-parent',
        path: '/service-error/parent',
        component: blankLayout,
        redirect: "/service-error",
        children: [
            {
                name: 'service-error',
                path: '/service-error',
                component: () => import('@/pages/system/service-error/index.vue'),
                meta: {
                    title: '服务错误'
                }
            }
        ],
        meta: {
            title: '服务错误'
        }
    },
    // 匹配无效路径的路由
    {
        name: 'not-found-page',
        path: '/:pathMatch(.*)*',
        redirect: "/not-found",
        meta: {
            title: '404页面未找到'
        }
    }
]

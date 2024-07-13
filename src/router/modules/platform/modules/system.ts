import { AuthRoute } from '@/types/route'

const system: AuthRoute.Route[] = [{
    name: "platform-system",
    path: "/platform/system",
    component: basicLayout,
    redirect: "/platform/system/user",
    children: [{
        name: "platform-system-user",
        path: "/platform/system/user",
        component: () => import('@/pages/platform/admin/index.vue'),
        meta: {
            title: '平台用户列表',
            icon: 'mdi:users-outline'
        }
    },
    {
        name: "platform-system-logs",
        path: "/platform/system/logs",
        component: () => import('@/pages/platform/logs/index.vue'),
        meta: {
            title: '用户登录日志',
            icon: 'tabler:logs'
        }
    }],
    meta: {
        title: "系统管理",
        icon: "mingcute:windows-fill"
    }
}]
export default system
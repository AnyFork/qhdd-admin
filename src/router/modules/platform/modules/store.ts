import { AuthRoute } from '@/types/route'

const store: AuthRoute.Route[] = [{
    name: "platform-store",
    path: "/platform/store",
    component: basicLayout,
    redirect: "/platform/store/list",
    children: [{
        name: "platform-store-list",
        path: "/platform/store/list",
        component: () => import('@/pages/platform/store/list/index.vue'),
        meta: {
            title: '商户列表',
            icon: 'tabler:logs'
        }
    },
    {
        name: "platform-store-tag",
        path: "/platform/store/tag",
        component: () => import('@/pages/platform/store/tag/index.vue'),
        meta: {
            title: '标签配置',
            icon: 'fluent:tag-lock-20-regular'
        }
    },
    {
        name: "platform-store-activity",
        path: "/platform/store/activity",
        component: () => import('@/pages/platform/store/activity/index.vue'),
        meta: {
            title: '商户活动',
            icon: 'maki:gift'
        }
    }],
    meta: {
        title: '商户信息管理',
        icon: 'mdi:store-cog-outline'
    }
}]
export default store
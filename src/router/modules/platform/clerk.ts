import { AuthRoute } from '@/types/route'

const clerk: AuthRoute.Route[] = [{
    name: "platform-clerk",
    path: "/platform/clerk",
    component: basicLayout,
    redirect: "/platform/clerk/list",
    children: [{
        name: "platform-clerk-list",
        path: "/platform/clerk/list",
        component: () => import('@/pages/platform/clerk/list/index.vue'),
        meta: {
            title: '店员列表',
            icon: 'tabler:logs'
        }
    },
    {
        name: "platform-clerk-recycle",
        path: "/platform/clerk/recycle",
        component: () => import('@/pages/platform/clerk/recycle/index.vue'),
        meta: {
            title: '店员回收站',
            icon: 'fluent:bin-recycle-24-regular'
        }
    }],
    meta: {
        title: '店员信息管理',
        icon: 'tdesign:usergroup'
    }
}]
export default clerk
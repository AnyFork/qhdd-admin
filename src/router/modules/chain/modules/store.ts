import { AuthRoute } from '@/types/route'

const chainStore: AuthRoute.Route[] = [{
    name: "chain-store",
    path: "/chain/store",
    component: basicLayout,
    redirect: "/chain/store/list",
    children: [{
        name: "chain-store-list",
        path: "/chain/store/list",
        component: () => import('@/pages/chain/store/list/index.vue'),
        meta: {
            title: '商户信息列表',
            icon: 'tabler:logs'
        }
    },
    {
        name: "chain-store-recycle",
        path: "/chain/store/recycle",
        component: () => import('@/pages/chain/store/recycle/index.vue'),
        meta: {
            title: '商户回收站',
            icon: 'tabler:logs'
        }
    }],
    meta: {
        title: '商户信息管理',
        icon: 'mdi:store-cog-outline'
    }
}]

export default chainStore
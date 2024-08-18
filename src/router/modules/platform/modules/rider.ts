import { AuthRoute } from '@/types/route'

const rider: AuthRoute.Route[] = [{
    name: "platform-rider",
    path: "/platform/rider",
    component: basicLayout,
    redirect: "/platform/rider/list",
    children: [{
        name: "platform-rider-list",
        path: "/platform/rider/list",
        component: () => import('@/pages/platform/rider/list/index.vue'),
        meta: {
            title: '配送员列表',
            icon: 'tabler:logs'
        }
    },
    {
        name: "platform-rider-recycle",
        path: "/platform/rider/recycle",
        component: () => import('@/pages/platform/rider/recycle/index.vue'),
        meta: {
            title: '配送员回收站',
            icon: 'fluent:bin-recycle-24-regular'
        }
    },
    {
        name: "platform-rider-comment",
        path: "/platform/rider/comment",
        component: () => import('@/pages/platform/rider/comment/index.vue'),
        meta: {
            title: '配送员评价',
            icon: 'material-symbols-light:comment-outline'
        }
    }],
    meta: {
        title: '配送员管理',
        icon: 'mdi:delivery-dining-outline'
    }
}]
export default rider
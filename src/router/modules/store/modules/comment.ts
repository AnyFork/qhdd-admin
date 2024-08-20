import { AuthRoute } from '@/types/route'

const service: AuthRoute.Route[] = [{
    name: "store-service",
    path: "/store/service",
    component: basicLayout,
    redirect: "/store/service/comment",
    children: [{
        name: "store-service-comment",
        path: "/store/service/comment",
        component: () => import('@/pages/store/comment/index.vue'),
        meta: {
            title: '顾客评价',
            icon: 'material-symbols-light:comment-outline'
        }
    }],
    meta: {
        title: '售后管理',
        icon: 'ri:customer-service-2-line'
    }
}]
export default service
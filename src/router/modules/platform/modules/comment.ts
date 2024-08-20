import { AuthRoute } from '@/types/route'

const service: AuthRoute.Route[] = [{
    name: "platform-service",
    path: "/platform/service",
    component: basicLayout,
    redirect: "/platform/service/comment",
    children: [{
        name: "platform-service-comment",
        path: "/platform/service/comment",
        component: () => import('@/pages/platform/comment/index.vue'),
        meta: {
            title: '顾客评价',
            icon: 'material-symbols-light:comment-outline'
        }
    }],
    meta: {
        title: '售后信息管理',
        icon: 'ri:customer-service-2-line'
    }
}]
export default service
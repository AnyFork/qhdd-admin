import { AuthRoute } from '@/types/route'

const customer: AuthRoute.Route[] = [{
    name: "platform-customer",
    path: "/platform/customer",
    component: basicLayout,
    redirect: "/platform/customer/list",
    children: [{
        name: "platform-customer-list",
        path: "/platform/customer/list",
        component: () => import('@/pages/platform/customer/list/index.vue'),
        meta: {
            title: '顾客列表',
            icon: 'tabler:logs'
        }
    }, {
        name: "platform-customer-address",
        path: "/platform/customer/address",
        component: () => import('@/pages/platform/customer/address/index.vue'),
        meta: {
            title: '地址列表',
            icon: 'mdi:address-marker-outline'
        }
    }],
    meta: {
        title: '顾客信息管理',
        icon: 'mingcute:user-4-line'
    }
}]
export default customer
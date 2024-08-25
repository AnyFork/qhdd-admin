import { AuthRoute } from '@/types/route'

const order: AuthRoute.Route[] = [{
    name: "store-order",
    path: "/store/order",
    component: basicLayout,
    redirect: "store-order-waimai-all",
    children: [{
        name: "store-order-waimai-all",
        path: "/store/order/waimai/all",
        component: () => import('@/pages/store/order/waimai/all/index.vue'),
        meta: {
            title: '所有订单',
            icon: 'carbon:list'
        }
    },
    {
        name: "store-order-waimai-process",
        path: "/store/order/waimai/process",
        component: () => import('@/pages/store/order/waimai/process/index.vue'),
        meta: {
            title: '进行中订单',
            icon: 'carbon:list'
        }
    },
    {
        name: "store-order-waimai-refund",
        path: "/store/order/waimai/refund",
        component: () => import('@/pages/store/order/waimai/refund/index.vue'),
        meta: {
            title: '退款订单',
            icon: 'carbon:list'
        }
    }, {
        name: "store-order-waimai-remind",
        path: "/store/order/waimai/remind",
        component: () => import('@/pages/store/order/waimai/remind/index.vue'),
        meta: {
            title: '催单订单',
            icon: 'carbon:list'
        }
    }],
    meta: {
        title: '订单管理',
        icon: 'lets-icons:order-duotone-line'
    }
}]
export default order
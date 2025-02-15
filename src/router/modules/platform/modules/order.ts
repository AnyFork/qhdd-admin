import { AuthRoute } from '@/types/route'

const order: AuthRoute.Route[] = [{
    name: "platform-order",
    path: "/platform/order",
    component: basicLayout,
    redirect: "/platform/order/waimai/all",
    children: [{
        name: "platform-order-waimai-all",
        path: "/platform/order/waimai/all",
        component: () => import('@/pages/platform/order/waimai/all/index.vue'),
        meta: {
            title: '所有订单',
            icon: 'carbon:list'
        }
    },
    {
        name: "platform-order-waimai-process",
        path: "/platform/order/waimai/process",
        component: () => import('@/pages/platform/order/waimai/process/index.vue'),
        meta: {
            title: '进行中订单',
            icon: 'carbon:list'
        }
    },
    {
        name: "platform-order-waimai-refund",
        path: "/platform/order/waimai/refund",
        component: () => import('@/pages/platform/order/waimai/refund/index.vue'),
        meta: {
            title: '退款订单',
            icon: 'carbon:list'
        }
    }, {
        name: "platform-order-waimai-remind",
        path: "/platform/order/waimai/remind",
        component: () => import('@/pages/platform/order/waimai/remind/index.vue'),
        meta: {
            title: '催单订单',
            icon: 'carbon:list'
        }
    }],
    meta: {
        title: '订单信息管理',
        icon: 'lets-icons:order-duotone-line'
    }
}]
export default order
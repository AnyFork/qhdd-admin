import { AuthRoute } from '@/types/route'

const order: AuthRoute.Route[] = [{
    name: "platform-order",
    path: "/platform/order",
    component: basicLayout,
    redirect: "/platform/order/waimai",
    children: [{
        name: "platform-order-waimai",
        path: "/platform/order/waimai",
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
            title: '订单管理',
            icon: 'material-symbols-light:order-approve-outline'
        }
    },
    {
        name: "platform-order-dispatch",
        path: "/platform/order/dispatch",
        redirect: "/platform/order/dispatch/map",
        children: [
            {
                name: "platform-order-dispatch-map",
                path: "/platform/order/dispatch/map",
                component: () => import('@/pages/platform/order/dispatch/map/index.vue'),
                meta: {
                    title: '调度中心',
                    icon: 'carbon:list'
                }
            }, {
                name: "platform-order-dispatch-stat",
                path: "/platform/order/dispatch/stat",
                component: () => import('@/pages/platform/order/dispatch/stat/index.vue'),
                meta: {
                    title: '接单统计',
                    icon: 'carbon:list'
                }
            },
            {
                name: "platform-order-dispatch-record",
                path: "/platform/order/dispatch/record",
                component: () => import('@/pages/platform/order/dispatch/record/index.vue'),
                meta: {
                    title: '接单记录',
                    icon: 'carbon:list'
                }
            }],
        meta: {
            title: '调度中心',
            icon: 'mage:layout-center'
        }
    }],
    meta: {
        title: '订单信息管理',
        icon: 'lets-icons:order-duotone-line'
    }
}]
export default order
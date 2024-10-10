import { AuthRoute } from '@/types/route'

const finance: AuthRoute.Route[] = [{
    name: "platform-finance",
    path: "/platform/finance",
    component: basicLayout,
    redirect: "platform-finance-orderLog",
    children: [{
        name: "platform-finance-orderLog",
        path: "/platform/finance/order/log",
        component: () => import('@/pages/platform/finance/orderlog.vue'),
        meta: {
            title: '交易记录',
            icon: 'carbon:list'
        }
    }, {
        name: "platform-finance-stat",
        path: "/platform/finance/stat",
        component: () => import('@/pages/platform/finance/stat.vue'),
        meta: {
            title: '营收统计',
            icon: 'lets-icons:stat'
        }
    }],
    meta: {
        title: '财务信息管理',
        icon: 'fluent-emoji-high-contrast:money-bag'
    }
}]

export default finance
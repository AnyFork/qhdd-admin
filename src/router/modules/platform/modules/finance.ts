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
    }],
    meta: {
        title: '财务信息管理',
        icon: 'fluent-emoji-high-contrast:money-bag'
    }
}]

export default finance
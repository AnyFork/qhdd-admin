import { AuthRoute } from '@/types/route'

const finance: AuthRoute.Route[] = [{
    name: "store-finance",
    path: "/store/finance",
    component: basicLayout,
    redirect: "store-finance-orderLog",
    children: [{
        name: "store-finance-orderLog",
        path: "/store/finance/order/log",
        component: () => import('@/pages/store/finance/orderlog.vue'),
        meta: {
            title: '交易记录',
            icon: 'carbon:list'
        }
    }, {
        name: "store-finance-stat",
        path: "/store/finance/stat",
        component: () => import('@/pages/store/finance/stat.vue'),
        meta: {
            title: '经营数据',
            icon: 'carbon:list'
        }
    }],
    meta: {
        title: '财务管理',
        icon: 'fluent-emoji-high-contrast:money-bag'
    }
}]

export default finance
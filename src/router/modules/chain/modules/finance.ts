import { AuthRoute } from '@/types/route'

const chainFinance: AuthRoute.Route[] = [{
    name: "chain-finance",
    path: "/chain/finance",
    component: basicLayout,
    redirect: "chain-finance-orderLog",
    children: [{
        name: "chain-finance-orderLog",
        path: "/chain/finance/order/log",
        component: () => import('@/pages/chain/finance/orderlog.vue'),
        meta: {
            title: '交易记录',
            icon: 'carbon:list'
        }
    }, {
        name: "chain-finance-stat",
        path: "/chain/finance/stat",
        component: () => import('@/pages/chain/finance/stat.vue'),
        meta: {
            title: '数据统计',
            icon: 'lets-icons:stat'
        }
    }],
    meta: {
        title: '财务信息管理',
        icon: 'fluent-emoji-high-contrast:money-bag'
    }
}]

export default chainFinance
import { AuthRoute } from '@/types/route'

const goods: AuthRoute.Route[] = [{
    name: "store-goods",
    path: "/store/goods",
    component: basicLayout,
    redirect: "/store/goods/category",
    children: [{
        name: "store-goods-category",
        path: "/store/goods/category",
        component: () => import('@/pages/store/goods/category/index.vue'),
        meta: {
            title: '商品分类',
            icon: 'iconamoon:category-thin'
        }
    },
    {
        name: "store-goods-list",
        path: "/store/goods/list",
        component: () => import('@/pages/store/goods/list/index.vue'),
        meta: {
            title: '商品列表',
            icon: 'ic:baseline-list'
        }
    },
    {
        name: "store-goods-sailed",
        path: "/store/goods/sailed",
        component: () => import('@/pages/store/goods/sailed/index.vue'),
        meta: {
            title: '商品销量',
            icon: 'solar:chart-outline'
        }
    }],
    meta: {
        title: '商品管理',
        icon: 'ep:goods'
    }
}]
export default goods
import { AuthRoute } from '@/types/route'

const shop: AuthRoute.Route[] = [{
    name: "store-shop",
    path: "/store/shop",
    component: basicLayout,
    redirect: "/store/shop/settings",
    children: [{
        name: "store-shop-settings",
        path: "/store/shop/settings",
        redirect: "/store/shop/settings/list",
        children: [{
            name: "store-shop-settings-list",
            path: "/store/shop/settings/list",
            component: () => import('@/pages/store/shop/setting/list/index.vue'),
            meta: {
                title: '商户设置',
                icon: 'solar:shop-2-outline'
            }
        }],
        meta: {
            title: '门店设置',
            icon: 'material-symbols-light:settings-outline'
        }
    },
    {
        name: "store-shop-clerk",
        path: "/store/shop/clerk",
        component: () => import('@/pages/store/shop/clerk/index.vue'),
        meta: {
            title: '店员列表',
            icon: 'tdesign:usergroup'
        }
    }],
    meta: {
        title: '门店管理',
        icon: 'mdi:store-cog-outline'
    }
}]
export default shop
import { AuthRoute } from '@/types/route'

const platform: AuthRoute.Route[] = [{
    name: "platform-info",
    path: "/platform/info",
    component: basicLayout,
    redirect: "/platform/info/category",
    children: [{
        name: "platform-info-category",
        path: "/platform/info/category",
        component: () => import('@/pages/platform/category/index.vue'),
        meta: {
            title: '分类导航',
            icon: 'iconamoon:category'
        }
    },
    {
        name: "platform-info-picture",
        path: "/platform/info/picture",
        component: () => import('@/pages/platform/picture/index.vue'),
        meta: {
            title: '图片资源',
            icon: 'gravity-ui:picture'
        }
    },
    {
        name: "platform-info-position",
        path: "/platform/info/position",
        component: () => import('@/pages/platform/adv/position.vue'),
        meta: {
            title: '广告位置',
            icon: 'material-symbols-light:shelf-position-outline'
        }
    },
    {
        name: "platform-info-adv",
        path: "/platform/info/adv",
        component: () => import('@/pages/platform/adv/index.vue'),
        meta: {
            title: '广告列表',
            icon: 'ri:advertisement-line'
        }
    }, {
        name: "platform-info-notice",
        path: "/platform/info/notice",
        component: () => import('@/pages/platform/notice/index.vue'),
        meta: {
            title: '平台公告',
            icon: 'icon-park-twotone:volume-notice'
        }
    }, {
        name: "platform-info-platform",
        path: "/platform/info/platform",
        redirect: "/platform/info/platform/basic",
        children: [{
            name: "platform-info-platform-basic",
            path: "/platform/info/platform/basic",
            component: () => import('@/pages/platform/setting/platform/basic/index.vue') as any,
            meta: {
                title: '基础设置',
                icon: 'uil:setting'
            }
        },
        {
            name: "platform-info-platform-agreement",
            path: "/platform/info/platform/agreement",
            component: () => import('@/pages/platform/setting/platform/agreement/index.vue'),
            meta: {
                title: '服务协议',
                icon: 'icon-park-outline:agreement'
            }
        }],
        meta: {
            title: '平台设置',
            icon: 'game-icons:flat-platform'
        }
    },
    {
        name: "platform-info-waimai",
        path: "/platform/info/waimai",
        redirect: "/platform/info/waimai/order",
        children: [{
            name: "platform-info-waimai-order",
            path: "/platform/info/waimai/order",
            component: () => import('@/pages/platform/setting/waimai/order/index.vue'),
            meta: {
                title: '订单设置',
                icon: 'lets-icons:order-light'
            }
        }],
        meta: {
            title: '外卖设置',
            icon: 'ic:twotone-delivery-dining'
        }
    }, {
        name: "platform-info-shop",
        path: "/platform/info/shop",
        redirect: "/platform/info/shop/delivery",
        children: [{
            name: "platform-info-shop-delivery",
            path: "/platform/info/shop/delivery",
            component: () => import('@/pages/platform/setting/shop/delivery/index.vue'),
            meta: {
                title: '配送模式',
                icon: 'lets-icons:order-light'
            }
        },
        {
            name: "platform-info-shop-serviceFee",
            path: "/platform/info/shop/serviceFee",
            component: () => import('@/pages/platform/setting/shop/serviceFee/index.vue'),
            meta: {
                title: '服务费率',
                icon: 'tabler:heart-rate-monitor'
            }
        }],
        meta: {
            title: '商户设置',
            icon: 'iconamoon:store-light'
        }
    },
    {
        name: "platform-info-hot",
        path: "/platform/info/hot",
        component: () => import('@/pages/platform/hot/index.vue'),
        meta: {
            title: '爆品设置',
            icon: 'mdi:hot'
        }
    }],
    meta: {
        title: '平台信息管理',
        icon: 'tdesign:control-platform'
    }
}]
export default platform
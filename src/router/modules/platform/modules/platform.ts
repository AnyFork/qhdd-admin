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
            title: '平台分类导航',
            icon: 'iconamoon:category'
        }
    },
    {
        name: "platform-info-picture",
        path: "/platform/info/picture",
        component: () => import('@/pages/platform/picture/index.vue'),
        meta: {
            title: '图片资源管理',
            icon: 'gravity-ui:picture'
        }
    },
    {
        name: "platform-info-position",
        path: "/platform/info/position",
        component: () => import('@/pages/platform/adv/position.vue'),
        meta: {
            title: '广告位设置',
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
    }],
    meta: {
        title: '平台信息管理',
        icon: 'tdesign:control-platform'
    }
}]
export default platform
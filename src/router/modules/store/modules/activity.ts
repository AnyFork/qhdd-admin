import { AuthRoute } from '@/types/route'

const activity: AuthRoute.Route[] = [{
    name: "store-activity",
    path: "/store/activity",
    component: basicLayout,
    redirect: "/store/activity/shop",
    children: [{
        name: "store-activity-shop",
        path: "/store/activity/shop",
        redirect: "/store/activity/shop/list",
        children: [{
            name: "store-activity-shop-newMember",
            path: "/store/activity/shop/newMember",
            component: () => import('@/pages/store/activity/shop/newMember.vue'),
            meta: {
                title: '新用户立减',
                icon: 'carbon:list'
            }
        },
        {
            name: "store-activity-shop-discount",
            path: "/store/activity/shop/discount",
            component: () => import('@/pages/store/activity/shop/discount.vue'),
            meta: {
                title: '满减优惠',
                icon: 'carbon:list'
            }
        }, {
            name: "store-activity-shop-grant",
            path: "/store/activity/shop/grant",
            component: () => import('@/pages/store/activity/shop/grant.vue'),
            meta: {
                title: '满赠优惠',
                icon: 'carbon:list'
            }
        }],
        meta: {
            title: '门店活动',
            icon: 'maki:gift'
        }
    },
    {
        name: "store-activity-platform",
        path: "/store/activity/platform",
        redirect: "/store/activity/platform/newMember",
        children: [{
            name: "store-activity-platform-newMember",
            path: "/store/activity/platform/newMember",
            component: () => import('@/pages/store/activity/platform/newMember.vue'),
            meta: {
                title: '平台新用户',
                icon: 'carbon:list'
            }
        }],
        meta: {
            title: '平台活动',
            icon: 'maki:gift'
        }
    }],
    meta: {
        title: '营销活动',
        icon: 'ph:gift'
    }
}]
export default activity
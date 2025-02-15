import { AuthRoute } from '@/types/route'

const store: AuthRoute.Route[] = [{
    name: "platform-activity",
    path: "/platform/activity",
    component: basicLayout,
    redirect: "/platform/store/activity",
    children: [
        {
            name: "platform-activity-discount",
            path: "/platform/activity/discount",
            component: () => import('@/pages/platform/store/activity/index.vue'),
            meta: {
                title: '满减活动',
                icon: 'maki:gift'
            }
        },
        {
            name: "platform-activity-packet",
            path: "/platform/activity/packet",
            component: () => import('@/pages/platform/store/packet/index.vue'),
            meta: {
                title: '红包活动',
                icon: 'ri:red-packet-fill'
            }
        },
        {
            name: "platform-activity-mall",
            path: "/platform/activity/mall",
            component: () => import('@/pages/platform/mall/index.vue'),
            meta: {
                title: '商城活动',
                icon: 'icon-park-outline:mall-bag'
            }
        },
        {
            name: "platform-activity-packet-log",
            path: "/platform/activity/packet/log",
            component: () => import('@/pages/platform/customer/packet/index.vue'),
            meta: {
                title: '红包记录',
                icon: 'mingcute:red-packet-line'
            }
        },
        {
            name: "platform-activity-sign-rule",
            path: "/platform/activity/sign/rule",
            component: () => import('@/pages/platform/rule/index.vue'),
            meta: {
                title: '签到活动',
                icon: 'carbon:rule'
            }
        },
        {
            name: "platform-activity-sign-logs",
            path: "/platform/activity/sign/logs",
            component: () => import('@/pages/platform/rule/detail/log.vue'),
            meta: {
                title: '签到记录',
                icon: 'lucide:logs'
            }
        }
    ],
    meta: {
        title: '活动信息管理',
        icon: 'material-symbols-light:local-activity-sharp'
    }
}]
export default store
/**
 * 商户模块路由
 */
const store = {
    name: 'store',
    path: '/store',
    component: 'basic',
    children: [
        {
            name: 'store_manage',
            path: '/store_manage',
            component: 'multi',
            meta: {
                title: '商户管理',
                requiresAuth: true,
                icon: 'iconamoon:store'
            },
            children: [
                {
                    name: 'store_manage_list',
                    path: '/store/manage/list',
                    component: 'self',
                    meta: {
                        title: '商户列表',
                        requiresAuth: true,
                        icon: 'tabler:logs'
                    }
                },
                {
                    name: 'store_manage_account',
                    path: '/store/manage/account',
                    component: 'self',
                    meta: {
                        title: '商户账号',
                        requiresAuth: true,
                        icon: 'hugeicons:user-account'
                    }
                }
            ]
        },
        {
            name: 'store_activity',
            path: '/store/activity',
            component: 'multi',
            meta: {
                title: '商户活动',
                requiresAuth: true,
                icon: 'material-symbols:local-activity-outline'
            },
            children: [
                {
                    name: 'store_activity_list',
                    path: '/store/activity/list',
                    component: 'self',
                    meta: {
                        title: '商户活动',
                        requiresAuth: true,
                        icon: 'tabler:logs'
                    }
                },
                {
                    name: 'store_activity_setting',
                    path: '/store/activity/setting',
                    component: 'self',
                    meta: {
                        title: '活动设置',
                        requiresAuth: true,
                        icon: 'uil:setting'
                    }
                }
            ]
        },
        {
            name: 'store_advertisement',
            path: '/store/advertisement',
            component: 'self',
            meta: {
                title: '广告列表',
                requiresAuth: true,
                icon: 'ri:advertisement-line'
            }
        },
        {
            name: 'store_notice',
            path: '/store/notice',
            component: 'self',
            meta: {
                title: '公告列表',
                requiresAuth: true,
                icon: 'icon-park-twotone:volume-notice'
            }
        },
        {
            name: 'store_complain',
            path: '/store/complain',
            component: 'self',
            meta: {
                title: '投诉列表',
                requiresAuth: true,
                icon: 'ic:outline-report'
            }
        }
    ],
    meta: {
        title: '商户信息管理',
        icon: 'mdi:store-cog-outline',
        order: 2
    }
}

export default store

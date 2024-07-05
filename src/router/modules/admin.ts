/**
 * 平台模块路由
 */
const platform = {
    name: 'platform',
    path: '/platform',
    component: 'basic',
    children: [
        {
            name: 'platform_clerk',
            path: '/platform/clerk',
            component: 'multi',
            meta: {
                title: '店员管理',
                requiresAuth: true,
                icon: 'tdesign:usergroup'
            },
            children: [
                {
                    name: 'platform_clerk_list',
                    path: '/platform/clerk/list',
                    component: 'self',
                    meta: {
                        title: '店员列表',
                        requiresAuth: true,
                        icon: 'tabler:logs'
                    }
                },
                {
                    name: 'platform_clerk_recycle',
                    path: '/platform/clerk/recycle',
                    component: 'self',
                    meta: {
                        title: '店员回收站',
                        requiresAuth: true,
                        icon: 'fluent:bin-recycle-24-regular'
                    }
                },
                {
                    name: 'platform_clerk_link',
                    path: '/platform/clerk/link',
                    component: 'self',
                    meta: {
                        title: '登录入口',
                        requiresAuth: true,
                        icon: 'solar:link-square-linear'
                    }
                }
            ]
        },
        {
            name: 'platform_category',
            path: '/platform/category',
            component: 'self',
            meta: {
                title: '平台分类导航',
                requiresAuth: true,
                icon: 'iconamoon:category'
            }
        },
        {
            name: 'platform_picture',
            path: '/platform/picture',
            component: 'self',
            meta: {
                title: '图片资源管理',
                requiresAuth: true,
                icon: 'gravity-ui:picture'
            }
        },
        {
            name: 'platform_admin',
            path: '/platform/admin',
            component: 'self',
            meta: {
                title: '平台用户列表',
                requiresAuth: true,
                icon: 'mdi:users-outline'
            }
        },
        {
            name: 'platform_logs',
            path: '/platform/logs',
            component: 'self',
            meta: {
                title: '用户登录日志',
                requiresAuth: true,
                icon: 'tabler:logs'
            }
        }
    ],
    meta: {
        title: '平台信息管理',
        icon: 'tdesign:control-platform',
        order: 1
    }
}

export default platform

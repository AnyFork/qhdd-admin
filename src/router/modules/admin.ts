/**
 * 平台模块路由
 */
const platform = {
    name: 'platform',
    path: '/platform',
    component: 'basic',
    children: [
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

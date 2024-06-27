const dashboard = {
    name: 'platform',
    path: '/platform',
    component: 'basic',
    children: [
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
        icon: 'icon-park-outline:workbench',
        order: 2
    }
}

export default dashboard

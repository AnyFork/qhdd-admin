const tdkMeun: any = {
    name: 'seo',
    path: '/seo',
    component: 'basic',
    children: [
        {
            name: 'seo_pc',
            path: '/seo_pc',
            component: 'multi',
            meta: {
                title: 'PC设置',
                requiresAuth: true,
                icon: 'mingcute:computer-line'
            },
            children: [
                {
                    name: 'seo_pc_global',
                    path: '/seo/pc/global',
                    component: 'self',
                    meta: {
                        title: '全局SEO设置',
                        requiresAuth: true,
                        icon: 'icon-park-outline:seo'
                    }
                },
                {
                    name: 'seo_pc_module',
                    path: '/seo/pc/module',
                    component: 'self',
                    meta: {
                        title: '栏目SEO设置',
                        requiresAuth: true,
                        icon: 'icon-park-outline:seo'
                    }
                },
                {
                    name: 'seo_pc_detail',
                    path: '/seo/pc/detail',
                    component: 'self',
                    meta: {
                        title: '详情SEO设置',
                        requiresAuth: true,
                        icon: 'icon-park-outline:seo'
                    }
                }
            ]
        },
        {
            name: 'seo_h5',
            path: '/seo_h5',
            component: 'multi',
            meta: {
                title: 'H5设置',
                requiresAuth: true,
                icon: 'clarity:mobile-line'
            },
            children: [
                {
                    name: 'seo_h5_global',
                    path: '/seo/h5/global',
                    component: 'self',
                    meta: {
                        title: '全局SEO设置',
                        requiresAuth: true,
                        icon: 'icon-park-outline:seo'
                    }
                },
                {
                    name: 'seo_h5_module',
                    path: '/seo/h5/module',
                    component: 'self',
                    meta: {
                        title: '栏目SEO设置',
                        requiresAuth: true,
                        icon: 'icon-park-outline:seo'
                    }
                },
                {
                    name: 'seo_h5_detail',
                    path: '/seo/h5_detail',
                    component: 'self',
                    meta: {
                        title: '详情SEO设置',
                        requiresAuth: true,
                        icon: 'icon-park-outline:seo'
                    }
                }
            ]
        },
    ],
    meta: {
        title: 'SEO信息管理',
        icon: 'tabler:seo',
        order: 1
    }
}

export default tdkMeun

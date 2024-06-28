/**
 * 统计模块路由
 */
const statistics = {
    name: 'statistics',
    path: '/statistics',
    component: 'basic',
    children: [
        {
            name: 'statistics_talkout',
            path: '/statistics_talkout',
            component: 'multi',
            meta: {
                title: '外卖数据',
                requiresAuth: true,
                icon: 'fluent:data-trending-16-filled'
            },
            children: [
                {
                    name: 'statistics_talkout_talkOutStatistics',
                    path: '/statistics/talkout/talkOutStatistics',
                    component: 'self',
                    meta: {
                        title: '外卖统计',
                        requiresAuth: true,
                        icon: 'ri:takeaway-line'
                    }
                }
            ]
        },
        {
            name: 'statistics_distribution',
            path: '/statistics_distribution',
            component: 'multi',
            meta: {
                title: '配送数据',
                requiresAuth: true,
                icon: 'majesticons:data'
            },
            children: [
                {
                    name: 'statistics_distribution_distributionStatistics',
                    path: '/statistics/distribution/distributionStatistics',
                    component: 'self',
                    meta: {
                        title: '配送统计',
                        requiresAuth: true,
                        icon: 'fluent-emoji:person-biking-light'
                    }
                }
            ]
        }
    ],
    meta: {
        title: '平台数据统计',
        icon: 'fluent:data-histogram-16-regular',
        order: 3
    }
}

export default statistics

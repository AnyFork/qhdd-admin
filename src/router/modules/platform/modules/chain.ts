import { AuthRoute } from '@/types/route'

const chain: AuthRoute.Route[] = [{
    name: "platform-chain",
    path: "/platform/chain",
    component: basicLayout,
    redirect: "/platform/chain/list",
    children: [{
        name: "platform-chain-list",
        path: "/platform/chain/list",
        redirect: "/platform/chain/store/list",
        children: [{
            name: "platform-chain-list-store",
            path: "/platform/chain/list/store",
            component: () => import('@/pages/platform/chain/chain/list/index.vue'),
            meta: {
                title: '连锁店列表',
                icon: 'carbon:list'
            }
        }, {
            name: "platform-chain-list-recycle",
            path: "/platform/chain/list/recycle",
            component: () => import('@/pages/platform/chain/chain/recycle/index.vue'),
            meta: {
                title: '回收站',
                icon: 'carbon:list'
            }
        }],
        meta: {
            title: '连锁店',
            icon: 'mage:shop'
        }
    }, {
        name: "platform-chain-admin",
        path: "/platform/chain/admin",
        redirect: "/platform/chain/admin/list",
        children: [{
            name: "platform-chain-admin-list",
            path: "/platform/chain/admin/list",
            component: () => import('@/pages/platform/chain/admin/list/index.vue'),
            meta: {
                title: '管理员列表',
                icon: 'carbon:list'
            }
        }, {
            name: "platform-chain-admin-recycle",
            path: "/platform/chain/admin/recycle",
            component: () => import('@/pages/platform/chain/admin/recycle/index.vue'),
            meta: {
                title: '回收站',
                icon: 'carbon:list'
            }
        }],
        meta: {
            title: '管理员',
            icon: 'ri:admin-line'
        }
    }],
    meta: {
        title: '连锁店信息管理',
        icon: 'iconoir:shop'
    }
}]
export default chain
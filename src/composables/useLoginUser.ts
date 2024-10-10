import userImg from '@/assets/images/user.png'
/**
 * 登录用户
 * @returns 
 */
export const useLoginUser = () => {

    /**
     * 当前路由
     */
    const route = useRoute()

    /**
     * 当前店铺信息
     */
    const { storeInfo, storeInfoFrom } = useStoreInfo()

    /**
     * 当前连锁店信息
     */
    const { chainInfo, chainInfoFrom } = useChainInfo()

    /**
     * 当前登录用户
     */
    const userInfo = computed(() => {
        if (route.path.startsWith("/platform")) {
            return getPlatformUserInfo()
        } else if (route.path.startsWith("/store")) {
            if (storeInfoFrom.value == 1) {
                return getPlatformUserInfo()
            }
            if (storeInfoFrom.value == 2) {
                return getStoreUserInfo()
            }
            if (storeInfoFrom.value == 3) {
                return getChainUserInfo()
            }
        } else if (route.path.startsWith('/chain')) {
            return chainInfoFrom.value == 1 ? getPlatformUserInfo() : getChainUserInfo()
        }
    })

    /**
     * 判断当前用户是否是管理员
     */
    const isAdmin = computed(() => {
        if (route.path.startsWith("/platform")) {
            const info = userInfo.value as system.adminInfo
            return info.roleName == "系统管理员"
        } else if (route.path.startsWith("/store")) {
            const info = userInfo.value as any
            if (storeInfoFrom.value == 1) {
                return info.roleName == "系统管理员"
            }
            if (storeInfoFrom.value == 2) {
                return info?.storeClerk?.role == "manager" || info?.roleName == "系统管理员"
            }
            if (storeInfoFrom.value == 3) {
                return true
            }
        } else if (route.path.startsWith("/chain")) {
            return true
        }
    })

    /**
     * 用户名称
     */
    const userName = computed(() => (userInfo.value as system.adminInfo)?.name || (userInfo.value as store.clerk)?.title || (userInfo.value as chain.chainAdmin)?.realname)

    /**
     * 用户图像
     */
    const userAvatar = computed(() => {
        if (route.path.startsWith("/platform")) {
            return (userInfo.value as system.adminInfo)?.avatar || userImg
        } else if (route.path.startsWith("/store")) {
            return (userInfo.value as store.clerk)?.avatar || userImg
        } else if (route.path.startsWith('/chain')) {
            return userImg
        }
    })

    /**
     * 商户名称
     */
    const storeName = computed(() => {
        console.log(chainInfo.value)
        if (storeInfoFrom.value == 1) {
            if (route.path.startsWith("/store")) {
                return storeInfo.value?.title
            } else if (route.path.startsWith('/chain')) {
                return chainInfo.value?.title
            }
        }
        if (storeInfoFrom.value == 2) {
            return (userInfo.value as store.clerk)?.store?.title
        }
        if (storeInfoFrom.value == 3) {
            if (route.path.startsWith("/store")) {
                return storeInfo.value?.title
            } else if (route.path.startsWith('/chain')) {
                return chainInfo.value?.title
            }
        }
        return chainInfo.value?.title
    })

    /**
     * 当前系统登录用户
     */
    const openPageUserType = computed(() => {
        if (route.path.startsWith("/platform")) {
            return "platform"
        } else if (route.path.startsWith("/store")) {
            return "store"
        } else if (route.path.startsWith("/chain")) {
            return "chain"
        }
    })

    /**
     * 店员角色名称
     */
    const roleName = computed(() => {
        const role = (userInfo.value as store.clerk)?.storeClerk?.role
        if (role) {
            return role == "clerk" ? "店员" : "管理员"
        } else {
            return null
        }
    })

    /**
     * 退出系统
     */
    const loginOut = computed(() => {
        if (route.path.startsWith("/platform")) {
            return usePlatformLogOut().logOut
        } else if (route.path.startsWith("/store")) {
            return useStoreLogOut().logOut
        } else if (route.path.startsWith("/chain")) {
            return useChainLogOut().logOut
        }
    })

    return { userInfo, isAdmin, userName, userAvatar, loginOut, storeName, roleName, openPageUserType }
}
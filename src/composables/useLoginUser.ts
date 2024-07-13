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
     * 当前登录用户
     */
    const userInfo = computed(() => {
        if (route.path.startsWith("/platform")) {
            return getPlatformUserInfo()
        } else if (route.path.startsWith("/store")) {
            return storeInfoFrom.value == 1 ? getPlatformUserInfo() : getStoreUserInfo()
        } else {
            return null
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
            return storeInfoFrom.value == 1 ? info.roleName == "系统管理员" : (info?.storeClerk?.role == "manager" || info?.roleName == "系统管理员")
        } else {
            return false
        }
    })
    /**
     * 用户名称
     */
    const userName = computed(() => (userInfo.value as system.adminInfo)?.name || (userInfo.value as store.clerk)?.title)

    /**
     * 用户图像
     */
    const userAvatar = computed(() => userInfo.value?.avatar ?? userImg)

    /**
     * 商户名称
     */
    const storeName = computed(() => (userInfo.value as store.clerk)?.store?.title || storeInfo.value.title)

    /**
     * 当前系统登录用户
     */
    const openPageUserType = computed(() => {
        if (route.path.startsWith("/platform")) {
            return "platform"
        } else if (route.path.startsWith("/store")) {
            return "store"
        } else {
            return
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
        }
    })

    return { userInfo, isAdmin, userName, userAvatar, loginOut, storeName, roleName, openPageUserType }
}
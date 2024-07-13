
/**
 * 获取平台用户信息
 * @returns 用户信息
 */
export const getPlatformUserInfo = () => {
    return getLocal<system.adminInfo>(EnumStorageKey["platform-user-info"])
}

/**
 * 获取商户用户信息
 * @returns 用户信息
 */
export const getStoreUserInfo = () => {
    return getLocal<store.clerk>(EnumStorageKey["store-user-info"])
}

/**
 * 设置平台用户信息
 */
export function setPlatformUserInfo(userInfo: system.adminInfo) {
    setLocal(EnumStorageKey["platform-user-info"], userInfo)
}

/**
 * 设置商户用户信息
 */
export function setStoreUserInfo(userInfo: any) {
    setLocal(EnumStorageKey["store-user-info"], userInfo)
}


/**
 * 清除平台用户信息
 */
export function removePlatformUserInfo() {
    removeLocal(EnumStorageKey["platform-user-info"])
}

/**
 * 清除商家用户信息
 */
export function removeStoreUserInfo() {
    removeLocal(EnumStorageKey["store-user-info"])
}


/**
 * 清除平台用户相关缓存
 */
export function clearPlatformAuthStorage() {
    removePlatformToken()
    removePlatformUserInfo()
}

/**
 * 清除商家用户相关缓存
 */
export function clearStoreAuthStorage() {
    removeStoreToken()
    removeStoreUserInfo()
}

/**
 * 设置平台用户token
 */
export function setPlatformToken(token: string) {
    setSession(EnumStorageKey["platform-token"], token)
}


/**
 * 设置商家用户token
 */
export function setStoreToken(token: string) {
    setSession(EnumStorageKey["store-token"], token)
}

/**
 * 获取平台用户token
 */
export function getPlatformToken() {
    return getSession<any>(EnumStorageKey["platform-token"])
}

/**
 * 获取商户token
 */
export function getStoreToken() {
    return getSession<any>(EnumStorageKey["store-token"])
}

/**
 * 清除平台token
 */
export function removePlatformToken() {
    removeSession(EnumStorageKey["platform-token"])
}

/**
 * 清除商户token
 */
export function removeStoreToken() {
    removeSession(EnumStorageKey["store-token"])
}


/**
 * 获取平台用户信息
 * @returns 用户信息
 */
export const getPlatformUserInfo = () => {
    return getSession<system.adminInfo>(EnumStorageKey["platform-user-info"])
}

/**
 * 获取商户用户信息
 * @returns 用户信息
 */
export const getStoreUserInfo = () => {
    return getSession<system.adminInfo>(EnumStorageKey["store-user-info"])
}

/**
 * 设置平台用户信息
 */
export function setPlatformUserInfo(userInfo: system.adminInfo) {
    setSession(EnumStorageKey["platform-user-info"], userInfo)
}

/**
 * 设置商户用户信息
 */
export function setUserInfo(userInfo: any) {
    setSession(EnumStorageKey["store-user-info"], userInfo)
}


/**
 * 清除平台用户信息
 */
export function removePlatformUserInfo() {
    removeSession(EnumStorageKey["platform-user-info"])
}

/**
 * 清除商家用户信息
 */
export function removeStoreUserInfo() {
    removeSession(EnumStorageKey["store-user-info"])
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

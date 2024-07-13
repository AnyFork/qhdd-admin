
/**
 * 设置平台用户token
 */
export function setPlatformToken(token: string) {
    setLocal(EnumStorageKey["platform-token"], token)
}


/**
 * 设置商家用户token
 */
export function setStoreToken(token: string) {
    setLocal(EnumStorageKey["store-token"], token)
}

/**
 * 获取平台用户token
 */
export function getPlatformToken() {
    return getLocal<any>(EnumStorageKey["platform-token"])
}

/**
 * 获取商户token
 */
export function getStoreToken() {
    return getLocal<any>(EnumStorageKey["store-token"])
}

/**
 * 清除平台token
 */
export function removePlatformToken() {
    removeLocal(EnumStorageKey["platform-token"])
}

/**
 * 清除商户token
 */
export function removeStoreToken() {
    removeLocal(EnumStorageKey["store-token"])
}
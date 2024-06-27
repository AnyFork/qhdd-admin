import { EnumStorageKey } from '@/enum'
import { setSession, getSession, removeSession } from '../storage'

/**
 * 设置token
 */
export function setToken(token: string) {
    setSession(EnumStorageKey.token, token)
}

/**
 * 获取token
 */
export function getToken() {
    return getSession<any>(EnumStorageKey.token)
}

/**
 * 清除token
 */
export function removeToken() {
    removeSession(EnumStorageKey.token)
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const getUserInfo = () => {
    return getSession<system.adminInfo>(EnumStorageKey['user-info'])
}

/**
 * 设置用户信息
 */
export function setUserInfo(userInfo: system.adminInfo) {
    setSession(EnumStorageKey['user-info'], userInfo)
}

/**
 * 清除用户信息
 */
export function removeUserInfo() {
    removeSession(EnumStorageKey['user-info'])
}

/**
 * 清除用户相关缓存
 */
export function clearAuthStorage() {
    removeToken()
    removeUserInfo()
}

import qs from 'qs'
import { storeLoginApi, storeLogOutApi, scanLoginApi, getLoginUserApi } from '../api'
/**
 * 店员临时登录
 * @returns 
 */
export const storeLogin = async (clerkId: string) => await storeAxios.get(`${storeLoginApi}?${qs.stringify({ clerkId })}`)

/**
 * 店员扫码登录,返回二进制流,返回blob类型
 * @returns 
 */
export const scanLogin = async () => await storeAxios.get(`${scanLoginApi}`, { responseType: "blob" })

/**
 * 获取店员信息
 * @returns 
 */
export const getLoginUser = async (scene_store: string) => await storeAxios.get(`${getLoginUserApi}?${qs.stringify({ scene_store })}`)

/**
 * 店员退出系统
 * @returns 
 */
export const storeLogOut = async () => await storeAxios.get(storeLogOutApi)
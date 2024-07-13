import qs from 'qs'
import { storeLoginApi, storeLogOutApi } from '../api'
/**
 * 店员临时登录
 * @returns 
 */
export const storeLogin = async (clerkId: string) => await storeAxios.get(`${storeLoginApi}?${qs.stringify({ clerkId })}`)

/**
 * 店员退出系统
 * @returns 
 */
export const storeLogOut = async () => await storeAxios.get(storeLogOutApi)
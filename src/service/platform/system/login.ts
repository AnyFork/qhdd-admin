import { loginPlatformApi, logOutPlatformApi } from '../api'
/**
 * 平台用户登录
 * @param key 账号
 * @param password 密码
 * @returns 
 */
export const loginPlatform = async (key: string, password: string) => await platformAxios.post(loginPlatformApi, { key, password }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

/**
 * 平台用户退出系统
 * @returns 
 */
export const logOutPlatform = async () => await platformAxios.get(logOutPlatformApi)
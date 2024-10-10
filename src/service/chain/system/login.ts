import { chainAdminLogInApi, chainAdminLogOutApi } from '../api'
/**
 * 连锁店管理员登录
 * @param key 账号
 * @param password 密码
 * @returns 
 */
export const loginChain = async (mobile: string, password: string) => await chainAxios.post(chainAdminLogInApi, { mobile, password })

/**
 * 连锁店管理员退出系统
 * @returns 
 */
export const logOutChain = async () => await chainAxios.get(chainAdminLogOutApi)
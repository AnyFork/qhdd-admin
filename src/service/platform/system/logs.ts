import { platformLoginLogApi } from '../api'
/**
 * 平台管理员登录日志
 * @returns 
 */
export const platformLoginLog = async (params: Record<string, any>) => await platformAxios.post(platformLoginLogApi, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
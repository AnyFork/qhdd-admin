import qs from 'qs'
import { getClerkPlatformApi, removeClerkPlatformApi, updateClerkPlatformApi } from '../api'
/**
 * 获取店员列表
 * @returns 
 */
export const getClerkPlatform = async (params: Record<string, any>) => await platformAxios.get(`${getClerkPlatformApi}?${qs.stringify(params)}`)

/**
 * 彻底删除店员
 * @returns 
 */
export const removeClerkPlatform = async (id: number) => await platformAxios.get(`${removeClerkPlatformApi}?${qs.stringify({ id })}`)

/**
 * 修改店员信息
 * @returns 
 */
export const updateClerkPlatform = async (params: Partial<store.clerk>) => await platformAxios.post(updateClerkPlatformApi, params)


import qs from 'qs'
import { getRiderListApi, updateRiderInfoApi, removeRiderInfoApi } from '../api'

/**
 * 获取配送员列表
 * @returns 
 */
export const getRiderList = async (params: Record<string, any>) => await platformAxios.get(`${getRiderListApi}?${qs.stringify(params)}`)

/**
 * 彻底删除配送员
 * @returns 
 */
export const removeRiderInfo = async (id: number) => await platformAxios.get(`${removeRiderInfoApi}?${qs.stringify({ id })}`)

/**
 * 修改配送员信息
 * @returns 
 */
export const updateRiderInfo = async (params: Partial<rider.riderInfo>) => await platformAxios.post(updateRiderInfoApi, params)


import qs from 'qs'
import { storeListPlatformApi, removeStorePlatformApi, updateStorePlatformApi, addStorePlatformApi, modifyStoreBatchPlatformApi } from '../../platform/api'

/**
 * 获取商户列表数据
 * @returns 
 */
export const storeListPlatform = async (params: Record<string, any>) => await chainAxios.get(`${storeListPlatformApi}?${qs.stringify(params)}`)

/**
 * 获取商户选择框数据
 * @returns 
 */
export const storeListPlatformSelect = async (params?: Partial<order.orderInfo>) => await chainAxios.get(`${storeListPlatformApi}?${qs.stringify({ pageNo: 1, pageSize: 1000, ...params })}`)

/**
 * 删除商户
 * @returns 
 */
export const removeStorePlatform = async (id: number) => await chainAxios.get(`${removeStorePlatformApi}?${qs.stringify({ id })}`)

/**
 * 修改商户信息
 * @returns 
 */
export const updateStorePlatform = async (params: Partial<store.storeData>) => await chainAxios.post(updateStorePlatformApi, params)

/**
 * 一键修改商户状态
 * @returns 
 */
export const modifyStoreBatchPlatform = async (params: { ids: -1, status: 0 | 1 } | { ids: -1, businessStatus: 0 | 2 } | { ids: string, chainid: number }) => await chainAxios.post(modifyStoreBatchPlatformApi, params)

/**
 * 新增商户
 * @returns 
 */
export const addStorePlatform = async (params: Record<string, any>) => await chainAxios.post(addStorePlatformApi, params)


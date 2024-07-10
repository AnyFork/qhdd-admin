import qs from 'qs'
import { bindStoreClerkApi, updateBindStoreClerkApi, removeStoreClerkApi } from '../api'
/**
 * 绑定店员信息
 * @returns 
 */
export const bindStoreClerkInfo = async (params: Record<string, any>) => await platformAxios.post(bindStoreClerkApi, params)

/**
 * 解绑店员
 * @returns 
 */
export const removeStoreClerkInfo = async (id: number) => await platformAxios.get(`${removeStoreClerkApi}?${qs.stringify({ id })}`)

/**
 * 修改店员绑定关系信息
 * @returns 
 */
export const updateBindStoreClerkInfo = async (params: Partial<store.storeClerk>) => await platformAxios.post(updateBindStoreClerkApi, params)


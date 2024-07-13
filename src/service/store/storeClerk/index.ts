import qs from 'qs'
import { bindStoreClerkApi, updateBindStoreClerkApi, removeStoreClerkApi, storeClerkListApi, updateStoreAccountStatusApi } from '../api'
/**
 * 绑定店员信息
 * @returns 
 */
export const bindStoreClerkInfo = async (params: Record<string, any>) => await storeAxios.post(bindStoreClerkApi, params)

/**
 * 解绑店员
 * @returns 
 */
export const removeStoreClerkInfo = async (id: number) => await storeAxios.get(`${removeStoreClerkApi}?${qs.stringify({ id })}`)

/**
 * 修改店员绑定关系信息
 * @returns 
 */
export const updateBindStoreClerkInfo = async (params: Partial<store.storeClerk>) => await storeAxios.post(updateBindStoreClerkApi, params)


/**
 * 店员店铺绑定关系列表
 * @returns 
 */
export const storeClerkList = async (params: Record<string, any>) => await storeAxios.get(`${storeClerkListApi}?${qs.stringify(params)}`)

/**
 * 修改店员账号状态
 * @returns 
 */
export const updateStoreAccountStatus = async (id: number, status: 0 | 1) => await storeAxios.post(updateStoreAccountStatusApi, { id, status })


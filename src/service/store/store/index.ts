import qs from 'qs'
import { getStoreInfoBySidApi, updateStoreInfoBySidApi } from '../api'

/**
 * 获取商户详细信息
 * @param id 商户id
 * @returns 
 */
export const getStoreInfoBySid = async (id: number) => await storeAxios.get(`${getStoreInfoBySidApi}?${qs.stringify({ id })}`)


/**
 * 修改商户信息
 * @returns 
 */
export const updateStoreInfoBySid = async (params: Partial<store.storeData>) => await storeAxios.post(updateStoreInfoBySidApi, params)



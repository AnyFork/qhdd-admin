import qs from 'qs'
import { getChainListApi } from '../api'
/**
 * 获取连锁店列表
 * @returns 
 */
export const getChainPageList = async (params: Record<string, any>) => await storeAxios.get(`${getChainListApi}?${qs.stringify(params)}`)

/**
 * 获取连锁店下拉框
 * @returns 
 */
export const getChainPageListSelect = async () => await storeAxios.get(`${getChainListApi}?${qs.stringify({ pageNo: 1, pageSize: 100, status: 1, isDelete: 0 })}`)


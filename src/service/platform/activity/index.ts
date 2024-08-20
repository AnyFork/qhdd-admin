import qs from 'qs'
import { getStoreActivityListApi, deleteStoreActivityApi, addActivityBatchInfoApi } from '../api'

/**
 * 获取商户活动列表信息
 * @returns 
 */
export const getStoreActivityList = async (params: Record<string, any>) => await platformAxios.get(`${getStoreActivityListApi}?${qs.stringify(params)}`)

/**
 * 删除商户活动
 * @returns 
 */
export const deleteStoreActivity = async (id: number) => await platformAxios.get(`${deleteStoreActivityApi}?${qs.stringify({ id })}`)

/**
 * 平台批量创建活动
 * @returns 
 */
export const addActivityBatchInfo = async (params: Partial<store.activity>) => await platformAxios.post(addActivityBatchInfoApi, params)


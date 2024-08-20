import qs from 'qs'
import { getStoreActivityListApi, addStoreActivityApi, updateActivityApi, deleteActivityApi } from '../api'

/**
 * 获取商户参与的活动列表
 * @returns 
 */
export const getStoreActivityList = async (params: Record<string, any>) => await storeAxios.get(`${getStoreActivityListApi}?${qs.stringify(params)}`)

/**
 * 新增活动
 * @returns 
 */
export const addStoreActivity = async (params: Partial<store.activity>) => await storeAxios.post(addStoreActivityApi, params)

/**
 * 更新活动
 * @returns 
 */
export const updateActivity = async (params: Partial<store.activity>) => await storeAxios.post(updateActivityApi, params)

/**
 * 获取商户参与的活动列表
 * @returns 
 */
export const deleteActivity = async (id: number) => await storeAxios.get(`${deleteActivityApi}?${qs.stringify({ id })}`)


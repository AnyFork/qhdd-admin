import qs from 'qs'
import { addAdvPositionApi, getAdvPositionListApi, getAdvListApi, addAdvApi, updateAdvApi, deleteAdvApi, deleteAdvPositionApi } from '../api'

/**
 * 广告位列表
 * @returns 
 */
export const getAdvPositionList = async (params: Record<string, any>) => await platformAxios.get(`${getAdvPositionListApi}?${qs.stringify(params)}`)

/**
 * 增加广告位
 */
export const addAdvPosition = async (params: Partial<system.advPosition>) => await platformAxios.post(addAdvPositionApi, params)


/**
 * 广告列表
 * @returns 
 */
export const getAdvList = async (params: Record<string, any>) => await platformAxios.get(`${getAdvListApi}?${qs.stringify(params)}`)

/**
 * 增加广告
 */
export const addAdv = async (params: Partial<system.adv>) => await platformAxios.post(addAdvApi, params)

/**
 * 更新广告
 */
export const updateAdv = async (params: Partial<system.adv>) => await platformAxios.post(updateAdvApi, params)

/**
 * 删除广告
 * @returns 
 */
export const deleteAdv = async (id: number) => await platformAxios.get(`${deleteAdvApi}?${qs.stringify({ id })}`)

/**
 * 删除广告位
 * @returns 
 */
export const deleteAdvPosition = async (id: number) => await platformAxios.get(`${deleteAdvPositionApi}?${qs.stringify({ id })}`)


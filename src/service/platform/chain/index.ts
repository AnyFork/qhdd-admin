import qs from 'qs'
import { getChainAdminListApi, updateChainApi, getChainListApi, deleteChainAdminApi, addChainAdminApi, deleteChainApi, updateChainAdminApi, addChainApi } from '../api'

/**
 * 获取连锁店管理员
 * @returns 
 */
export const getChainAdminList = async (params: Record<string, any>) => await platformAxios.get(`${getChainAdminListApi}?${qs.stringify(params)}`)


/**
 * 更新门店管理员信息
 * @returns 
 */
export const updateChainAdmin = async (params: Partial<chain.chainAdmin>) => await platformAxios.post(updateChainAdminApi, params)

/**
 * 删除连锁店管理员
 * @returns 
 */
export const deleteChainAdmin = async (id: number) => await platformAxios.get(`${deleteChainAdminApi}?${qs.stringify({ id })}`)


/**
 * 新增连锁店管理员
 * @returns 
 */
export const addChainAdmin = async (params: Partial<chain.chainAdmin>) => await platformAxios.post(addChainAdminApi, params)


/**
 * 获取连锁店列表
 * @returns 
 */
export const getChainList = async (params?: Record<string, any>) => await platformAxios.get(`${getChainListApi}?${qs.stringify(params)}`)

/**
 * 删除连锁店
 * @returns 
 */
export const deleteChain = async (id: number) => await platformAxios.get(`${deleteChainApi}?${qs.stringify({ id })}`)


/**
 * 更新连锁店信息
 * @returns 
 */
export const updateChain = async (params: Partial<chain.chainInfo>) => await platformAxios.post(updateChainApi, params)

/**
 * 新增连锁店
 * @returns 
 */
export const addChain = async (params: Partial<chain.chainInfo>) => await platformAxios.post(addChainApi, params)


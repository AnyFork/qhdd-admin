import qs from 'qs'
import { platformCategoryTreeApi, addPlatformCategoryApi, removePlatformCategoryApi, updatePlatformCategoryApi, storePlatformCategoryApi } from '../api'
/**
 * 获取平台分类数据列表(树形结构)
 * @returns 
 */
export const platformCategoryTree = async (params: Record<string, any>) => await platformAxios.get(`${platformCategoryTreeApi}?${qs.stringify(params)}`)

/**
 * 获取平台子分类数据列表
 * @returns 
 */
export const storePlatformCategory = async (parentid: 1 | 2 | 3) => await platformAxios.get(`${storePlatformCategoryApi}?${qs.stringify({ pageNo: 1, pageSize: 100, sortType: 14, parentid })}`)

/**
 * 删除平台分类
 * @returns 
 */
export const removePlatformCategory = async (id: number) => await platformAxios.get(`${removePlatformCategoryApi}?${qs.stringify({ id })}`)

/**
 * 修改平台分类
 * @returns 
 */
export const updatePlatformCategory = async (params: Partial<system.category>) => await platformAxios.post(updatePlatformCategoryApi, params)

/**
 * 新增平台管理员用户
 * @returns 
 */
export const addPlatformCategory = async (params: Partial<system.category>) => await platformAxios.post(addPlatformCategoryApi, params)


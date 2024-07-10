import qs from 'qs'
import { categoryListPlatformApi, deleteCategoryPlatformApi, createCategoryPlatformApi, modifyCategoryPlatformApi } from '../api'
/**
 * 获取标签列表
 * @returns 
 */
export const categoryListPlatform = async (params: Record<string, any>) => await platformAxios.get(`${categoryListPlatformApi}?${qs.stringify(params)}`)

/**
 * 删除标签信息
 * @returns 
 */
export const deleteCategoryPlatform = async (id: number) => await platformAxios.get(`${deleteCategoryPlatformApi}?${qs.stringify({ id })}`)

/**
 * 修改标签
 * @returns 
 */
export const modifyCategoryPlatform = async (params: Partial<store.category>) => await platformAxios.post(modifyCategoryPlatformApi, params)

/**
 * 新增标签信息
 * @returns 
 */
export const createCategoryPlatform = async (params: Partial<store.category>) => await platformAxios.post(createCategoryPlatformApi, params)


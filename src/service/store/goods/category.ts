import qs from 'qs'
import { getGoodsCategoryListApi, addGoodsCategoryApi, updateGoodsCategoryApi, removeGoodsCategoryApi } from '../api'
/**
 * 商品分类列表
 * @returns 
 */
export const getGoodsCategoryList = async (params: Record<string, any>) => await storeAxios.get(`${getGoodsCategoryListApi}?${qs.stringify(params)}`)

/**
 * 新增商品类目
 * @returns 
 */
export const addGoodsCategory = async (params: Partial<store.goodsCategory>) => await storeAxios.post(addGoodsCategoryApi, params)

/**
 * 修改商品类目
 * @returns 
 */
export const updateGoodsCategory = async (params: Partial<store.goodsCategory>) => await storeAxios.post(updateGoodsCategoryApi, params)

/**
 * 删除商品分类
 * @returns 
 */
export const removeGoodsCategory = async (id: number) => await storeAxios.get(`${removeGoodsCategoryApi}?${qs.stringify({ id })}`)


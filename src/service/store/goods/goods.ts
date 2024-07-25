import qs from 'qs'
import { goodsListApi, addGoodsApi, removeGoodsApi, updateGoodsApi } from '../api'
/**
 * 商品列表
 * @returns 
 */
export const goodsList = async (params: Record<string, any>) => await storeAxios.get(`${goodsListApi}?${qs.stringify(params)}`)

/**
 * 新增商品
 * @returns 
 */
export const addGoods = async (params: Partial<store.goods>) => await storeAxios.post(addGoodsApi, params)

/**
 * 修改商品类目
 * @returns
 */
export const updateGoods = async (params: Partial<store.goods>) => await storeAxios.post(updateGoodsApi, params)

/**
 * 删除商品
 * @returns
 */
export const removeGoods = async (id: number) => await storeAxios.get(`${removeGoodsApi}?${qs.stringify({ id })}`)


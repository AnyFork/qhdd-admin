import qs from 'qs'
import { hotGoodsInfoApi, updateGoodsApi } from '../api'
/**
 * 爆品商品列表
 * @returns 
 */
export const hotGoodsList = async (params: Record<string, any>) => await platformAxios.get(`${hotGoodsInfoApi}?${qs.stringify(params)}`)

/**
 * 修改商品
 * @returns
 */
export const updateGoods = async (params: Partial<store.goods>) => await platformAxios.post(updateGoodsApi, params)


import qs from 'qs'
import { getCustomerListApi } from '../api'

/**
 * 获取顾客列表信息
 * @returns 
 */
export const getCustomerList = async (params: Record<string, any>) => await platformAxios.get(`${getCustomerListApi}?${qs.stringify(params)}`)


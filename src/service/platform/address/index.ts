import qs from 'qs'
import { getCustomerAddressListApi } from '../api'

/**
 * 获取顾客地址列表信息
 * @returns 
 */
export const getCustomerAddressList = async (params: Record<string, any>) => await platformAxios.get(`${getCustomerAddressListApi}?${qs.stringify(params)}`)


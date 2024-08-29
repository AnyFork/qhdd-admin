import qs from 'qs'
import { getAgreementListApi, updateAgreementApi } from '../api'
/**
 * 获取协议列表
 * @returns 
 */
export const getAgreementList = async (params: Record<string, any>) => await platformAxios.get(`${getAgreementListApi}?${qs.stringify(params)}`)

/**
 * 修改平台分类
 * @returns 
 */
export const updateAgreement = async (params: Partial<agreement>) => await platformAxios.post(updateAgreementApi, params)


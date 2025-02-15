import qs from 'qs'
import { signRuleListApi, deleteSigninRuleApi, addSignRuleApi, updateSigninRuleApi } from '../api'

/**
 * 签到活动规则
 * @returns 
 */
export const signRuleList = async (params: Record<string, any>) => await platformAxios.get(`${signRuleListApi}?${qs.stringify(params)}`)

/**
 * 删除签到规则
 * @returns 
 */
export const deleteSigninRule = async (id: number) => await platformAxios.get(`${deleteSigninRuleApi}?${qs.stringify({ id })}`)

/**
 * 创建签到规则
 * @returns 
 */
export const addSignRule = async (params: Partial<activity.signinRule>) => await platformAxios.post(addSignRuleApi, params)


/**
 * 编辑签到规则
 * @returns 
 */
export const updateSignRule = async (params: Partial<activity.signinRule>) => await platformAxios.post(updateSigninRuleApi, params)

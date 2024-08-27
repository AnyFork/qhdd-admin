import qs from 'qs'
import { getPlatformSettingsListApi, updateSettingsInfoApi } from '../api'

/**
 * 获取平台参数配置
 * @returns 
 */
export const getPlatformSettingsList = async (module: setting.modules) => await platformAxios.get(`${getPlatformSettingsListApi}?${qs.stringify({ module })}`)

/**
 * 修改平台参数配置
 * @returns 
 */
export const updateSettingsInfo = async (params: setting.result) => await platformAxios.post(`${updateSettingsInfoApi}`, params)
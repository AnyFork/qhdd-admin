import qs from 'qs'
import { getNoticeListApi, addNoticeInfoApi, updateNoticeApi, deleteNoticeApi } from '../api'

/**
 * 平台公告
 * @returns 
 */
export const getNoticeList = async (params: Record<string, any>) => await platformAxios.get(`${getNoticeListApi}?${qs.stringify(params)}`)

/**
 * 增加公告
 */
export const addNoticeInfo = async (params: Partial<notice>) => await platformAxios.post(addNoticeInfoApi, params)

/**
 * 更新公告
 */
export const updateNotice = async (params: Partial<notice>) => await platformAxios.post(updateNoticeApi, params)

/**
 * 删除公告
 * @returns 
 */
export const deleteNotice = async (id: number) => await platformAxios.get(`${deleteNoticeApi}?${qs.stringify({ id })}`)


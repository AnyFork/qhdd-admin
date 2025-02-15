import qs from 'qs'
import {
    getStoreActivityListApi, deleteStoreActivityApi, addActivityBatchInfoApi, redPacketActivityListApi,
    deletePacketActivityListApi, addPacketActivityApi, updatePacketActivityApi, mallActivityListApi,
    deleteMallActivityApi, addMallActivityApi, updateMallActivityApi, getMemberSignLogsApi
} from '../api'

/**
 * 获取商户活动列表信息
 * @returns 
 */
export const getStoreActivityList = async (params: Record<string, any>) => await platformAxios.get(`${getStoreActivityListApi}?${qs.stringify(params)}`)

/**
 * 删除商户活动
 * @returns 
 */
export const deleteStoreActivity = async (id: number) => await platformAxios.get(`${deleteStoreActivityApi}?${qs.stringify({ id })}`)

/**
 * 平台批量创建活动
 * @returns 
 */
export const addActivityBatchInfo = async (params: Partial<store.activity>) => await platformAxios.post(addActivityBatchInfoApi, params)


/**
 * 获取红包活动列表
 * @returns 
 */
export const redPacketActivityList = async (params: Record<string, any>) => await platformAxios.get(`${redPacketActivityListApi}?${qs.stringify(params)}`)

/**
 * 删除红包活动
 * @returns 
 */
export const deletePacketActivity = async (id: number) => await platformAxios.get(`${deletePacketActivityListApi}?${qs.stringify({ id })}`)

/**
 * 平台创建红包活动
 * @returns 
 */
export const addPacketActivity = async (params: Partial<activity.redPacket>) => await platformAxios.post(addPacketActivityApi, params)


/**
 * 平台编辑红包活动
 * @returns 
 */
export const updatePacketActivity = async (params: Partial<activity.redPacket>) => await platformAxios.post(updatePacketActivityApi, params)


/**
 * 商城活动列表
 * @returns 
 */
export const mallActivityList = async (params: Record<string, any>) => await platformAxios.get(`${mallActivityListApi}?${qs.stringify(params)}`)


/**
 * 删除商城活动
 * @returns 
 */
export const deleteMallActivity = async (id: number) => await platformAxios.get(`${deleteMallActivityApi}?${qs.stringify({ id })}`)


/**
 * 平台创建商城活动
 * @returns 
 */
export const addMallActivity = async (params: Partial<activity.mall>) => await platformAxios.post(addMallActivityApi, params)


/**
 * 平台编辑商城活动
 * @returns 
 */
export const updateMallActivity = async (params: Partial<activity.mall>) => await platformAxios.post(updateMallActivityApi, params)


/**
 * 会员签到记录
 * @returns 
 */
export const getMemberSignLogs = async (params: Record<string, any>) => await platformAxios.get(`${getMemberSignLogsApi}?${qs.stringify(params)}`)


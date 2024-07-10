import qs from 'qs'
import {
    attachmentPlatformGroupListApi, attachmentPlatformListApi, addPlatformAttachmentGroupApi, updatePlatformAttachmentInfoApi,
    updatePlatformAttachmentGroupApi, deletePlatformAttachmentGroupApi, deletePlatformAttachmentInfoApi, deletePlatformAttachmentBatchApi, movePlatformAttachmentGroupApi
} from '../api'
/**
 * 获取图片分组
 * @returns 
 */
export const attachmentPlatformGroupList = async () => await platformAxios.get(`${attachmentPlatformGroupListApi}?${qs.stringify({ pageNo: 1, pageSize: 500 })}`)

/**
 * 根据分组获取图片列表
 * @returns 
 */
export const attachmentPlatformList = async (params: Record<string, any>) => await platformAxios.get(`${attachmentPlatformListApi}?${qs.stringify(params)}`)

/**
 * 批量移动图片
 * @returns 
 */
export const movePlatformAttachmentGroup = async (params: Record<string, any>) => await platformAxios.get(`${movePlatformAttachmentGroupApi}?${qs.stringify(params)}`)

/**
 * 删除分组
 * @returns 
 */
export const deletePlatformAttachmentGroup = async (id: number) => await platformAxios.get(`${deletePlatformAttachmentGroupApi}?${qs.stringify({ id })}`)

/**
 * 删除单个图片
 * @returns 
 */
export const deletePlatformAttachmentInfo = async (id: number) => await platformAxios.get(`${deletePlatformAttachmentInfoApi}?${qs.stringify({ id })}`)

/**
 * 批量删除图片
 * @returns 
 */
export const deletePlatformAttachmentBatch = async (ids: string) => await platformAxios.get(`${deletePlatformAttachmentBatchApi}?${qs.stringify({ ids })}`)

/**
 * 修改图片分组
 * @returns 
 */
export const updatePlatformAttachmentGroup = async (id: number, name: string) => await platformAxios.post(updatePlatformAttachmentGroupApi, { id, name })

/**
 * 新增图片分组
 * @returns 
 */
export const addPlatformAttachmentGroup = async (params: Record<string, any>) => await platformAxios.post(addPlatformAttachmentGroupApi, params)

/**
 * 修改附件名称
 * @returns 
 */
export const updatePlatformAttachmentInfo = async (id: number, filename: string) => await platformAxios.post(updatePlatformAttachmentInfoApi, { id, filename })


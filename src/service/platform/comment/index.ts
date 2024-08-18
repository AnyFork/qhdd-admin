import qs from 'qs'
import { getCommentListApi, updateCommentApi, deleteCommentApi } from '../api'

/**
 * 获取顾客评论
 * @returns 
 */
export const getCommentList = async (params: Record<string, any>) => await platformAxios.get(`${getCommentListApi}?${qs.stringify(params)}`)

/**
 * 删除评论
 * @returns 
 */
export const deleteComment = async (id: number) => await platformAxios.get(`${deleteCommentApi}?${qs.stringify({ id })}`)

/**
 * 修改评论
 * @returns 
 */
export const updateComment = async (params: Partial<order.comment>) => await platformAxios.post(updateCommentApi, params)


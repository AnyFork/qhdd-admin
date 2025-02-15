import qs from 'qs'
import { getCustomerListApi, getMemberListApi, addMemberApi, updateMemberApi, deleteMemberApi, packetListApi, deletePacketApi, sendPacketApi, updatePacketApi, updateMemberInfoApi, exportRedPacketInfoApi } from '../api'

/**
 * 获取顾客列表信息
 * @returns 
 */
export const getCustomerList = async (params: Record<string, any>) => await platformAxios.get(`${getCustomerListApi}?${qs.stringify(params)}`)

/**
 * 获取会员规则列表信息
 * @returns 
 */
export const getMemberList = async (params: Record<string, any>) => await platformAxios.get(`${getMemberListApi}?${qs.stringify(params)}`)


/**
 * 增加会员等级规则
 * @returns 
 */
export const addMember = async (params: Partial<member.level>) => await platformAxios.post(`${addMemberApi}`, params)



/**
 * 修改会员等级规则
 * @returns 
 */
export const updateMember = async (params: Partial<member.level>) => await platformAxios.post(`${updateMemberApi}`, params)



/**
 * 删除会员等级规则
 * @returns 
 */
export const deleteMember = async (id: number) => await platformAxios.get(`${deleteMemberApi}?${qs.stringify({ id })}`)


/**
 * 获取红包记录列表
 * @returns 
 */
export const packetList = async (params: Record<string, any>) => await platformAxios.get(`${packetListApi}?${qs.stringify(params)}`)

/**
 * 删除会员红包
 * @returns 
 */
export const deletePacket = async (id: number) => await platformAxios.get(`${deletePacketApi}?${qs.stringify({ id })}`)

/**
 * 给用户发送红包
 * @returns 
 */
export const sendPacket = async (params: Partial<member.redPacket>) => await platformAxios.post(`${sendPacketApi}`, params)

/**
 * 修改给用户发送红包
 * @returns 
 */
export const updatePacket = async (params: Partial<member.redPacket>) => await platformAxios.post(`${updatePacketApi}`, params)


/**
 * 修改会员信息
 * @returns 
 */
export const updateMemberInfo = async (params: Partial<userInfo.user>) => await platformAxios.post(`${updateMemberInfoApi}`, params)

/**
 * 平台红包导出
 */
export const exportRedPacket = async (startTimeStart?: number, startTimeEnd?: number) => await platformAxios.get(`${exportRedPacketInfoApi}?${qs.stringify({ startTimeStart, startTimeEnd })}`, {
    responseType: 'blob',
})


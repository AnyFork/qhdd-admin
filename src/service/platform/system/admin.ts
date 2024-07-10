import qs from 'qs'
import { platformAdminListApi, deletePlatformAdminApi, updatePlatformAdminApi, addPlatformAdminApi, platformRoleListApi } from '../api'
/**
 * 平台管理员列表
 * @returns 
 */
export const platformAdminList = async (params: Record<string, any>) => await platformAxios.post(platformAdminListApi, params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

/**
 * 删除平台管理员用户
 * @returns 
 */
export const deletePlatformAdmin = async (id: number) => await platformAxios.get(`${deletePlatformAdminApi}?${qs.stringify({ id })}`)

/**
 * 修改平台管理员用户
 * @returns 
 */
export const updatePlatformAdmin = async (params: Partial<system.adminInfo>) => await platformAxios.post(updatePlatformAdminApi, params, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

/**
 * 新增平台管理员用户
 * @returns 
 */
export const addPlatformAdmin = async (params: Partial<system.adminInfo>) => await platformAxios.post(addPlatformAdminApi, params, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

/**
 * 获取平台管理员角色列表
 * @returns 
 */
export const platformRoleList = async () => await platformAxios.get(platformRoleListApi)


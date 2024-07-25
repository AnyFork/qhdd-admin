import qs from 'qs'
import { printerLogsApi } from '../api'
/**
 * 打印机打印日志列表
 * @returns 
 */
export const printerLogs = async (params: Record<string, any>) => await storeAxios.get(`${printerLogsApi}?${qs.stringify(params)}`)


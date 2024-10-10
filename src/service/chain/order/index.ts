import qs from 'qs'
import { searchAllOrdersInfoApi, exportOrderInfoApi } from '../../platform/api'
import { todayStatInfoApi, historyStatInfoApi } from '../../store/api'

/**
 * 获取所有订单信息
 * @returns 
 */
export const searchAllOrdersInfo = async (params: Record<string, any>) => await chainAxios.get(`${searchAllOrdersInfoApi}?${qs.stringify(params)}`)


/**
 * 导出订单
 * @returns
 */
export const exportOrderInfo = async (params: { sid: number; statDayStart?: number; statDayEnd?: number, chainid?: number }) => await chainAxios.get(`${exportOrderInfoApi}?${qs.stringify(params)}`, {
    responseType: 'blob',
})

/**
 * 今日订单数据统计
 * @returns 
 */
export const todayStatInfo = async (sid?: number) => await chainAxios.get(`${todayStatInfoApi}?${qs.stringify({ sid })}`)


/**
 * 历史数据统计
 * @returns 
 */
export const historyStatInfo = async (sid?: number, statDayStart?: number, statDayEnd?: number) => await chainAxios.get(`${historyStatInfoApi}?${qs.stringify({ statDayStart, statDayEnd, sid })}`)


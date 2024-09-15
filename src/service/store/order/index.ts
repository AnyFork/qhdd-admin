import qs from 'qs'
import { agreeRefundInfoApi, cancelOrderInfoApi, chatWithRefundInfoApi, exportOrderInfoApi, getAllOrderInfoApi, getOrderInfoByIdInfoApi, handleOrderInfoApi, historyStatInfoApi, notifyCollectInfoApi, printOderInfoApi, rejectRefundInfoApi, replyRemindInfoApi, todayStatInfoApi } from '../api'

/**
 * 获取所有订单信息
 * @returns 
 */
export const searchAllStoreOrdersInfo = async (params: Record<string, any>) => await storeAxios.get(`${getAllOrderInfoApi}?${qs.stringify(params)}`)

/**
 * 平台回复催单
 * @returns
 */
export const storeReplyRemindInfo = async (oid: number, note: string, sid: number) => await storeAxios.post(`${replyRemindInfoApi}`, { oid, note, sid })

/**
 * 商户打印订单信息
 * @returns
 */
export const storePrintOderInfo = async (orderId: number, sid: number) => await storeAxios.post(`${printOderInfoApi}`, { orderId, sid })

/**
 * 商户取消订单
 * @returns
 */
export const storeCancelOrderInfo = async (orderId: number, reason: string, sid: number) => await storeAxios.post(`${cancelOrderInfoApi}`, { orderId, reason, sid })

/**
 * 获取订单详情
 * @returns
 */
export const storeGetOrderInfoByIdInfo = async (id: number, sid: number) => await storeAxios.get(`${getOrderInfoByIdInfoApi}?${qs.stringify({ id, sid })}`)


/**
 * 商户管理员接单
 * @returns
 */
export const storeHandleOrderInfo = async (orderId: number, sid: number) => await storeAxios.post(`${handleOrderInfoApi}`, { id: orderId, sid })

/**
 * 商家通知配送员抢单
 * @returns
 */
export const storeNotifyCollectInfo = async (orderId: number, sid: number) => await storeAxios.post(`${notifyCollectInfoApi}`, { id: orderId, sid })


/**
 * 商户同意退款申请
 * @returns
 */
export const storeAgreeRefundInfo = async (refundId: number, sid: number) => await storeAxios.post(`${agreeRefundInfoApi}`, { refundId, sid })


/**
 * 平台拒绝退款
 * @returns
 */
export const storeRejectRefundInfo = async (refundId: number, note: string, sid: number) => await storeAxios.post(`${rejectRefundInfoApi}`, { refundId, note, sid })

/**
 * 退款沟通
 * @returns
 */
export const chatWithRefundInfo = async (refundId: number, note: string, sid: number) => await storeAxios.post(`${chatWithRefundInfoApi}`, { refundId, note, sid })


/**
 * 导出订单
 * @returns
 */
export const exportOrderInfo = async (params: { sid: number; statDayStart?: number; statDayEnd?: number }) => await storeAxios.get(`${exportOrderInfoApi}?${qs.stringify(params)}`, {
    responseType: 'blob',
})

/**
 * 今日订单数据统计
 * @returns 
 */
export const todayStatInfo = async (sid: number) => await storeAxios.get(`${todayStatInfoApi}?${qs.stringify({ sid })}`)


/**
 * 历史数据统计
 * @returns 
 */
export const historyStatInfo = async (sid: number, statDayStart?: number, statDayEnd?: number) => await storeAxios.get(`${historyStatInfoApi}?${qs.stringify({ statDayStart, statDayEnd, sid })}`)


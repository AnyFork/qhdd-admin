import qs from 'qs'
import { searchAllOrdersInfoApi, replyRemindInfoApi, updateOrderInfoApi, printOderInfoApi, cancelOrderInfoApi, getOrderInfoByIdInfoApi, handleOrderInfoApi, notifyCollectInfoApi, noticeStoreOrderInfoApi, assignOrderInfoApi, resetAssignOrderInfoApi, finishSendOrderInfoApi, arbitratingOrderInfoApi, overruleRefundInfoApi, agreeRefundInfoApi, rejectRefundInfoApi, exportOrderInfoApi } from '../api'
import { todayStatInfoApi, historyStatInfoApi } from '../../store/api'
/**
 * 获取所有订单信息
 * @returns 
 */
export const searchAllOrdersInfo = async (params: Record<string, any>) => await platformAxios.get(`${searchAllOrdersInfoApi}?${qs.stringify(params)}`)

/**
 * 平台回复催单
 * @returns 
 */
export const replyRemindInfo = async (oid: number, note: string) => await platformAxios.post(`${replyRemindInfoApi}`, { oid, note })

/**
 * 平台更新订单信息
 * @returns 
 */
export const updateOrderInfo = async (params: Partial<order.orderInfo>) => await platformAxios.post(`${updateOrderInfoApi}`, params)

/**
 * 平台更新订单信息
 * @returns 
 */
export const printOderInfo = async (orderId: number) => await platformAxios.post(`${printOderInfoApi}`, { orderId })

/**
 * 平台取消订单
 * @returns 
 */
export const cancelOrderInfo = async (orderId: number, reason: string) => await platformAxios.post(`${cancelOrderInfoApi}`, { orderId, reason })

/**
 * 获取订单详情
 * @returns 
 */
export const getOrderInfoByIdInfo = async (id: number) => await platformAxios.get(`${getOrderInfoByIdInfoApi}?${qs.stringify({ id })}`)


/**
 * 平台管理员接单
 * @returns 
 */
export const handleOrderInfo = async (orderId: number) => await platformAxios.post(`${handleOrderInfoApi}`, { id: orderId })

/**
 * 平台管理员通知配送员抢单
 * @returns 
 */
export const notifyCollectInfo = async (orderId: number) => await platformAxios.post(`${notifyCollectInfoApi}`, { id: orderId })


/**
 * 平台管理员通知商户接单
 * @returns 
 */
export const noticeStoreOrderInfo = async (orderId: number) => await platformAxios.post(`${noticeStoreOrderInfoApi}`, { id: orderId })

/**
 * 平台管理员调度骑手接单
 * @returns 
 */
export const assignOrderInfo = async (orderId: number, deliveryerId: number) => await platformAxios.post(`${assignOrderInfoApi}`, { id: orderId, deliveryerId })


/**
 * 平台管理员将订单重新列入待抢列表
 * @returns 
 */
export const resetAssignOrderInfo = async (orderId: number) => await platformAxios.post(`${resetAssignOrderInfoApi}`, { id: orderId })

/**
 * 平台管理员完成订单
 * @returns 
 */
export const finishSendOrderInfo = async (orderId: number) => await platformAxios.post(`${finishSendOrderInfoApi}`, { id: orderId })


/**
 * 平台管理员介入退单纠纷
 * @returns 
 */
export const arbitratingOrderInfo = async (refundId: number, note: string) => await platformAxios.post(`${arbitratingOrderInfoApi}`, { refundId, note })


/**
 * 平台管理员驳回退款申请
 * @returns 
 */
export const overruleRefundInfo = async (refundId: number) => await platformAxios.post(`${overruleRefundInfoApi}`, { refundId })

/**
 * 平台管理员同意退款申请
 * @returns 
 */
export const agreeRefundInfo = async (refundId: number) => await platformAxios.post(`${agreeRefundInfoApi}`, { refundId })


/**
 * 平台管理员拒绝退款
 * @returns 
 */
export const rejectRefundInfo = async (refundId: number, note: string) => await platformAxios.post(`${rejectRefundInfoApi}`, { refundId, note })


/**
 * 导出订单
 * @returns
 */
export const exportOrderInfo = async (params: { sid: number; statDayStart?: number; statDayEnd?: number, chainid?: number }) => await platformAxios.get(`${exportOrderInfoApi}?${qs.stringify(params)}`, {
    responseType: 'blob',
})

/**
 * 今日订单数据统计
 * @returns 
 */
export const todayStatInfo = async (sid?: number) => await platformAxios.get(`${todayStatInfoApi}?${qs.stringify({ sid })}`)


/**
 * 历史数据统计
 * @returns 
 */
export const historyStatInfo = async (sid?: number, statDayStart?: number, statDayEnd?: number) => await platformAxios.get(`${historyStatInfoApi}?${qs.stringify({ statDayStart, statDayEnd, sid })}`)



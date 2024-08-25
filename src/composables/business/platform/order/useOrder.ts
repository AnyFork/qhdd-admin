import { agreeRefundInfo, arbitratingOrderInfo, assignOrderInfo, cancelOrderInfo, finishSendOrderInfo, getOrderInfoByIdInfo, handleOrderInfo, noticeStoreOrderInfo, notifyCollectInfo, overruleRefundInfo, printOderInfo, rejectRefundInfo, replyRemindInfo, resetAssignOrderInfo, searchAllOrdersInfo, updateOrderInfo } from "@/service/platform/order"

/**
 * 订单模块
 */
export const usePlatformOrder = () => {
    const tableData = ref<order.orderInfo[]>([])
    const message = useMessage()
    const loading = ref(false)
    /**
     * 订单详情
     */
    const orderInfo = ref<order.orderInfo>()

    /**
     * 表格分页配置
     */
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
        showSizePicker: true,
        pageSizes: [10, 15, 20, 25, 30],
        onChange: (page: number) => {
            pagination.page = page
            getAllList()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getAllList()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<order.orderInfo & { activityType?: string } & { range?: [number, number] }>>({
        sid: undefined,
        activityType: undefined,
        status: undefined,
        isPay: undefined,
        isReserve: undefined,
        ordersn: undefined,
        mutiQuery: undefined,
        range: undefined,
        addtimeStart: undefined,
        addtimeEnd: undefined,
        deliveryerId: undefined,
        haveRefund: undefined,
        isRemind: undefined,
        statusEnd: undefined,
        refundStatus: undefined
    })

    /**
     * 获取订单列表
     */
    const getAllList = async () => {
        try {
            loading.value = true
            if (searchForm.range && searchForm.range.length > 0) {
                searchForm.addtimeStart = Math.round(searchForm.range[0] / 1000)
                searchForm.addtimeEnd = Math.round(searchForm.range[1] / 1000)
            } else {
                searchForm.addtimeStart = undefined
                searchForm.addtimeEnd = undefined
            }
            const { data } = await searchAllOrdersInfo({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                const result = data.data as order.orderInfo[]
                result.forEach(element => {
                    element.orderRefundList?.forEach(item => {
                        if (item.data) {
                            item.refundData = JSON.parse(item.data)
                        }
                    })
                });
                tableData.value = result
                pagination.itemCount = data.dataCount
                console.log(result)
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台回复催单
     */
    const replyRemind = async (oid: number, note: string) => {
        try {
            loading.value = true
            const { data } = await replyRemindInfo(oid, note)
            loading.value = false
            if (data.code == 200) {
                message.success("催单回复成功")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台更新订单信息
     */
    const updateOrder = async (params: Partial<order.orderInfo>) => {
        try {
            loading.value = true
            const { data } = await updateOrderInfo(params)
            loading.value = false
            if (data.code == 200) {
                message.success("订单信息更新成功")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
    * 平台打印订单
    */
    const printOder = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await printOderInfo(orderId)
            loading.value = false
            if (data.code == 200) {
                message.success("订单打印成功")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台取消订单
     */
    const cancelOrder = async (orderId: number, reason: string) => {
        try {
            loading.value = true
            const { data } = await cancelOrderInfo(orderId, reason)
            loading.value = false
            if (data.code == 200) {
                message.success("订单取消成功")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 获取订单详情
     */
    const getOrderInfoById = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await getOrderInfoByIdInfo(orderId)
            loading.value = false
            if (data.code == 200) {
                const result = data.data as order.orderInfo
                result.orderRefundList?.forEach(item => {
                    if (item.data) {
                        item.refundData = JSON.parse(item.data)
                    }
                })
                orderInfo.value = data.data as order.orderInfo
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员接单
     */
    const handleOrder = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await handleOrderInfo(orderId)
            loading.value = false
            if (data.code == 200) {
                message.success("接单成功")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员通知配送员抢单
     */
    const notifyCollect = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await notifyCollectInfo(orderId)
            loading.value = false
            if (data.code == 200) {
                message.success("已通知配送员抢单,请耐心等待配送员抢单")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员通知商户接单
     */
    const noticeStoreOrder = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await noticeStoreOrderInfo(orderId)
            loading.value = false
            if (data.code == 200) {
                message.success("已通知商户接单")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员调度骑手接单
     */
    const assignOrder = async (orderId: number, deliveryerId: number) => {
        try {
            loading.value = true
            const { data } = await assignOrderInfo(orderId, deliveryerId)
            loading.value = false
            if (data.code == 200) {
                message.success("调度骑手接单成功")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员将订单重新列入待抢
     */
    const resetAssignOrder = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await resetAssignOrderInfo(orderId)
            loading.value = false
            if (data.code == 200) {
                message.success("通知配送员抢单成功,请耐心等待配送员接单")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员完成订单
     */
    const finishSendOrder = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await finishSendOrderInfo(orderId)
            loading.value = false
            if (data.code == 200) {
                message.success("订单配送完成")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员介入退款纠纷
     */
    const arbitratingOrder = async (refundId: number, note: string) => {
        try {
            loading.value = true
            const { data } = await arbitratingOrderInfo(refundId, note)
            loading.value = false
            if (data.code == 200) {
                message.success("平台已介入退款纠纷")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 平台管理员驳回申请
     */
    const overruleRefund = async (refundId: number) => {
        try {
            loading.value = true
            const { data } = await overruleRefundInfo(refundId)
            loading.value = false
            if (data.code == 200) {
                message.success("订单退款申请已驳回")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
    * 平台管理员同意退款申请
    */
    const agreeRefund = async (refundId: number) => {
        try {
            loading.value = true
            const { data } = await agreeRefundInfo(refundId)
            loading.value = false
            if (data.code == 200) {
                message.success("平台已同意退款申请，退款金额将在1-3个工作日原路返回")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
    * 平台管理员拒绝退款
    */
    const rejectRefund = async (refundId: number, note: string) => {
        try {
            loading.value = true
            const { data } = await rejectRefundInfo(refundId, note)
            loading.value = false
            if (data.code == 200) {
                message.success("平台已拒绝退款")
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }


    return {
        getAllList, tableData, loading, message, searchForm, pagination, replyRemind, updateOrder,
        printOder, cancelOrder, getOrderInfoById, orderInfo, handleOrder, notifyCollect, noticeStoreOrder, assignOrder,
        resetAssignOrder, finishSendOrder, arbitratingOrder, overruleRefund, agreeRefund, rejectRefund
    }

}
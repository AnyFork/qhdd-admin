import { chatWithRefundInfo, historyStatInfo, searchAllStoreOrdersInfo, storeAgreeRefundInfo, storeCancelOrderInfo, storeGetOrderInfoByIdInfo, storeHandleOrderInfo, storeNotifyCollectInfo, storePrintOderInfo, storeRejectRefundInfo, storeReplyRemindInfo, todayStatInfo } from "@/service/store/order"

/**
 * 订单模块
 */
export const useStoreOrder = () => {
    const tableData = ref<order.orderInfo[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { storeInfo } = useStoreInfo()

    /**
     * 今日订单信息统计
     */
    const todayStatData = ref<stat.todayDataStat>()

    /**
     * 今日订单信息统计
     */
    const historyStatData = ref<stat.todayDataStat>()

    /**
     * 当前店铺id
     */
    const sid = computed(() => storeInfo.value.id)

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
        sid: sid.value,
        activityType: undefined,
        status: undefined,
        isPay: undefined,
        isReserve: undefined,
        ordersn: undefined,
        mutiQuery: undefined,
        range: transformCurrentTimestampsToRange(),
        addtimeStart: undefined,
        addtimeEnd: undefined,
        deliveryerId: undefined,
        haveRefund: undefined,
        isRemind: undefined,
        statusEnd: undefined,
        refundStatus: undefined,
        deliveryType: undefined
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
            const { data } = await searchAllStoreOrdersInfo({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
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
            const { data } = await storeReplyRemindInfo(oid, note, sid.value!)
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
    * 商户打印订单
    */
    const printOder = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await storePrintOderInfo(orderId, sid.value!)
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
     * 商户取消订单
     */
    const cancelOrder = async (orderId: number, reason: string) => {
        try {
            loading.value = true
            const { data } = await storeCancelOrderInfo(orderId, reason, sid.value!)
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
            const { data } = await storeGetOrderInfoByIdInfo(orderId, sid.value!)
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
     * 商户员接单
     */
    const handleOrder = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await storeHandleOrderInfo(orderId, sid.value!)
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
     * 商户通知配送员抢单
     */
    const notifyCollect = async (orderId: number) => {
        try {
            loading.value = true
            const { data } = await storeNotifyCollectInfo(orderId, sid.value!)
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
     * 商户顾客进行协商
     */
    const arbitratingOrder = async (refundId: number, note: string) => {
        try {
            loading.value = true
            const { data } = await chatWithRefundInfo(refundId, note, sid.value!)
            loading.value = false
            if (data.code == 200) {
                message.success("协商内容已发送,等待顾客下一步处理")
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
     * 商户同意退款申请
     */
    const agreeRefund = async (refundId: number) => {
        try {
            loading.value = true
            const { data } = await storeAgreeRefundInfo(refundId, sid.value!)
            loading.value = false
            if (data.code == 200) {
                message.success("您已同意退款申请，退款金额将在1-3个工作日原路返回")
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
     * 商户拒绝退款
     */
    const rejectRefund = async (refundId: number, note: string) => {
        try {
            loading.value = true
            const { data } = await storeRejectRefundInfo(refundId, note, sid.value!)
            loading.value = false
            if (data.code == 200) {
                message.success("您已成功拒绝退款，等待顾客下一步操作")
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
     * 店铺今日订单数据
     */
    const todayStat = async () => {
        try {
            loading.value = true
            const { data } = await todayStatInfo(sid.value!)
            loading.value = false
            if (data.code == 200) {
                todayStatData.value = data.data
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
    * 店铺历史订单数据
    */
    const historyStat = async (statDayStart?: number, statDayEnd?: number) => {
        try {
            loading.value = true
            const { data } = await historyStatInfo(sid.value!, statDayStart, statDayEnd)
            loading.value = false
            if (data.code == 200) {
                historyStatData.value = data.data
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
        getAllList, tableData, loading, message, searchForm, pagination, replyRemind, todayStat, todayStatData, historyStat, historyStatData,
        printOder, cancelOrder, getOrderInfoById, orderInfo, handleOrder, notifyCollect, arbitratingOrder, agreeRefund, rejectRefund
    }

}
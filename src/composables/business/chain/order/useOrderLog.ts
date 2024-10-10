import { exportOrderInfo, searchAllOrdersInfo } from '@/service/chain/order'
import { DataTableColumns } from 'naive-ui'

/**
 * 平台商家订单记录
 * @returns 
 */
export const useChainOrderLog = () => {
    const tableData = ref<order.orderInfo[]>([])
    const message = useMessage()
    const loading = ref(false)
    const range = ref<[number, number] | undefined>()
    const { chainInfo } = useChainInfo()

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
    const searchForm = reactive<Partial<order.orderInfo & { activityType?: string } & { chainid?: number }>>({
        sid: undefined,
        isPay: 1,
        statDayStart: undefined,
        statDayEnd: undefined,
        statusStart: 5,
        chainid: undefined,
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<order.orderInfo>>([
        {
            title: '序号',
            width: 70,
            align: 'center',
            key: 'key',
            render: (_rowData, index: number) => {
                return `${(pagination.page - 1) * pagination.pageSize + index + 1}`
            }
        },
        {
            title: '连锁店',
            width: 140,
            align: 'center',
            key: 'chainId',
            render: (_rowData, _index: number) => {
                return chainInfo.value.title;
            }
        },
        {
            title: '店铺名称',
            width: 260,
            align: 'center',
            key: 'store',
            render: (_rowData, _index: number) => {
                return _rowData.store.title
            }
        },
        {
            title: '订单编号',
            width: 220,
            align: 'center',
            key: 'ordersn'
        },
        {
            title: '下单时间',
            align: 'center',
            width: 200,
            key: 'addtime',
            render: (_rowData, _index: number) => {
                return transformTimestampsToDateString(_rowData.addtime)
            }
        },
        {
            title: '订单状态',
            align: 'center',
            key: 'status',
            render: (_rowData, _index: number) => {
                return orderStatus[_rowData.status]
            }
        },
        {
            title: '订单金额',
            align: 'center',
            key: 'totalFee',
            render: (_rowData, _index: number) => {
                return h('div', { style: { color: "#13ce66" } }, { default: () => "+ ¥" + _rowData.totalFee })
            }
        },
        {
            title: '用户支付',
            align: 'center',
            key: 'finalFee',
            render: (_rowData, _index: number) => {
                return h('div', { style: { color: "#13ce66" } }, { default: () => "+ ¥" + _rowData.finalFee })
            }
        },
        {
            title: '商家补贴',
            align: 'center',
            key: 'storeDiscountFee',
            render: (_rowData, _index: number) => {
                return h('div', { style: { color: "#ff3333" } }, { default: () => "- ¥" + _rowData.storeDiscountFee })
            }
        },
        {
            title: '平台服务费',
            align: 'center',
            key: 'plateformServeFee',
            render: (_rowData, _index: number) => {
                return h('div', { style: { color: "#ff3333" } }, { default: () => "- ¥" + _rowData.plateformServeFee })
            }
        },
        {
            title: '平台配送费',
            align: 'center',
            key: 'deliveryFee',
            render: (_rowData, _index: number) => {
                return h('div', { style: { color: "#ff3333" } }, { default: () => "- ¥" + _rowData.deliveryFee })
            }
        },
        {
            title: "实际到账",
            align: 'center',
            key: 'storeFinalFee',
            render: (_rowData, _index: number) => {
                return h('div', { style: { color: "#ff3333" } }, { default: () => "- ¥" + _rowData.storeFinalFee })
            }
        },
    ])

    /**
     * 获取订单列表
     */
    const getAllList = async () => {
        try {
            loading.value = true
            if (range.value && range.value?.length > 0) {
                searchForm.statDayStart = Number(transformTimestampsToDateString(Math.round(range.value[0] / 1000), "YYYYMMDD"))
                searchForm.statDayEnd = Number(transformTimestampsToDateString(Math.round(range.value[1] / 1000), "YYYYMMDD"))
            } else {
                searchForm.statDayStart = undefined
                searchForm.statDayEnd = undefined
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
     * 导出订单信息
     */
    const exportOrder = async (storeTitle: string) => {
        let fileName = ''
        try {
            loading.value = true
            if (range.value && range.value?.length > 0) {
                searchForm.statDayStart = Number(transformTimestampsToDateString(Math.round(range.value[0] / 1000), "YYYYMMDD"))
                searchForm.statDayEnd = Number(transformTimestampsToDateString(Math.round(range.value[1] / 1000), "YYYYMMDD"))
                fileName = storeTitle ? `${storeTitle}${searchForm.statDayStart}-${searchForm.statDayEnd}订单详情.xlsx` : `${searchForm.statDayStart}-${searchForm.statDayEnd}订单详情.xlsx`
            } else {
                searchForm.statDayStart = undefined
                searchForm.statDayEnd = undefined
                fileName = storeTitle ? `${storeTitle}${transformTimestampsToDateString(Math.round(Date.now() / 1000), "YYYYMMDD")}订单详情.xlsx` : `${transformTimestampsToDateString(Math.round(Date.now() / 1000), "YYYYMMDD")}订单详情.xlsx`
            }
            const { data } = await exportOrderInfo({ sid: searchForm.sid!, statDayStart: searchForm.statDayStart, statDayEnd: searchForm.statDayEnd, chainid: chainInfo.value.id })
            // 创建一个临时的URL指向Blob对象
            const blobUrl = window.URL.createObjectURL(new Blob([data]));
            // 创建一个a标签用于下载
            const link = document.createElement('a');
            link.href = blobUrl;
            // 下载文件的名称
            link.setAttribute('download', fileName);
            // 触发下载
            document.body.appendChild(link);
            link.click();
            // 清理并移除元素和对象URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            loading.value = false
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
        }
    }

    return { getAllList, pagination, tableData, loading, columns, message, searchForm, exportOrder, chainInfo, range }
}


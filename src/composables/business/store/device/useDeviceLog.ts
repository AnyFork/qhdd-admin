import { printerLogs } from '@/service/store/device/logs'
import { DataTableColumns } from 'naive-ui'

/**
 * 商家设备打印日志
 * @returns 
 */
export const useStoreDeviceLog = () => {
    const tableData = ref<store.storeData[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { storeInfo } = useStoreInfo()

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
            printerLogsInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            printerLogsInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })


    /**
     * 当前店铺id
     */
    const sid = computed(() => storeInfo.value.id)

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<store.printerLog>>([
        {
            title: '打印单ID',
            width: 100,
            align: 'center',
            key: 'id'
        },
        {
            title: '订单ID',
            width: 100,
            align: 'center',
            key: 'orderId',
        },
        {
            title: '打印机ID',
            width: 100,
            align: 'center',
            key: 'printerId'
        },
        {
            title: '打印单类型',
            align: 'center',
            width: 100,
            key: 'type',
            render(rowData, _rowIndex) {
                return rowData.type === 'waimai' ? "外卖" : ''
            }
        },
        {
            title: '打印返回值',
            align: 'center',
            key: 'response',
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: "打印标签数据",
            align: 'center',
            key: 'data',
            ellipsis: {
                tooltip: true
            }
        },
        {
            title: "打印时间",
            align: 'center',
            width: 200,
            key: 'addtime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.addtime)
            }
        }
    ])

    /**
     * 获取打印机打印日志数据
     */
    const printerLogsInfo = async () => {
        try {
            loading.value = true
            const { data } = await printerLogs({ pageNo: pagination.page, pageSize: pagination.pageSize, sid: sid.value })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data
                pagination.itemCount = data.dataCount
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message)
            console.log(e)
        }
    }

    return { printerLogsInfo, tableData, loading, columns, pagination }
}
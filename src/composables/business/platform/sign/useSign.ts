import { getMemberSignLogs } from '@/service/platform/activity'
import { DataTableColumns } from 'naive-ui'

/**
 * 红包领取记录
 * @returns 
 */
export const usePlatformSign = () => {
    const tableData = ref<activity.signRecord[]>([])
    const message = useMessage()
    const loading = ref(false)

    /**
     * 表格分页配置
     */
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
        showSizePicker: true,
        pageSizes: [10, 15, 20, 25, 30, 50, 100, 200, 1000],
        onChange: (page: number) => {
            pagination.page = page
            getMemberSignList()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getMemberSignList()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<activity.signRecord>>({
        uid: undefined
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<activity.signRecord>>([
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
            title: 'UID',
            align: 'center',
            key: 'uid'
        },
        {
            title: '签到情况',
            align: 'center',
            key: 'signStatus'
        },
        {
            title: '年与周',
            align: 'center',
            key: 'yearWeek'
        },
        {
            title: '签到次数',
            align: 'center',
            key: 'signTimes'
        },
        {
            title: '起始签到日期',
            align: 'center',
            key: 'signStartTime'
        },
        {
            title: '最新签到日期',
            align: 'center',
            key: 'signLastTime'
        }
    ])

    /**
     * 获取签到记录
     */
    const getMemberSignList = async () => {
        try {
            loading.value = true
            const { data } = await getMemberSignLogs({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
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

    return { getMemberSignList, pagination, tableData, loading, columns, message, searchForm }
}
import { getCommentList } from '@/service/platform/comment';
import { DataTableColumns, NAvatar, NButton, NRate } from 'naive-ui'

/**
 * 配送员评论模块
 * @returns 
 */
export const useRiderComment = () => {
    const tableData = ref<order.comment[]>([])
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
        pageSizes: [10, 15, 20, 25, 30],
        onChange: (page: number) => {
            pagination.page = page
            getCommentListInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getCommentListInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<order.comment>>({
        deliveryService: undefined,
        addtimeStart: undefined,
        addtimeEnd: undefined,
        deliveryerTitle: undefined
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<order.comment>>([
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
            title: '订单ID',
            align: 'center',
            key: 'oid'
        },
        {
            title: '配送员图像',
            align: 'center',
            key: 'avatar',
            render: (_rowData, index: number) => {
                return h(NAvatar, { src: _rowData?.deliveryer?.avatar, round: true, fallbackSrc: getAssetsImages('empty-user.png') }, {})
            }
        },
        {
            title: '配送员姓名',
            align: 'center',
            key: 'deliveryer',
            render: (rowData, index: number) => {
                return rowData?.deliveryer?.title || "-"
            }
        },
        {
            title: '顾客姓名',
            align: 'center',
            key: 'username'
        },
        {
            title: '顾客电话',
            align: 'center',
            key: 'mobile'
        },
        {
            title: '评价星级',
            align: 'center',
            key: 'level',
            render: (rowData, index: number) => {
                return h(NRate, { size: "small", defaultValue: rowData?.deliveryService }, {})
            }
        },
        {
            title: '评价日期',
            align: 'center',
            key: 'addtime',
            render(rowData, _rowIndex) {
                return rowData.addtime ? transformTimestampsToDateString(rowData.addtime) : "-"
            },
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 180,
            render(_rowData) {
                return h(NButton, { type: 'primary' }, { default: () => "查看订单" })
            }
        }
    ])

    /**
     * 获取顾客评论列表
     */
    const getCommentListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getCommentList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                const comment = data.data as order.comment[]
                comment.forEach(item => {
                    if (item.thumbs) {
                        try {
                            item.thumbArray = JSON.parse(item.thumbs).map((item: string) => previewUrl + item) || []
                        } catch (e) {
                            item.thumbArray = []
                        }
                    }
                })
                tableData.value = comment
                pagination.itemCount = data.dataCount
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    return { getCommentListInfo, pagination, tableData, loading, columns, message, searchForm }
}

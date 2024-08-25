import { DataTableColumns, NTag, NButton } from 'naive-ui'
import { getStoreActivityList, deleteStoreActivity, addActivityBatchInfo } from '@/service/platform/activity';
/**
 * 平台商户活动模块
 * @returns 
 */
export const usePlatformActivity = () => {
    const tableData = ref<store.activity[]>([])
    const message = useMessage()
    const loading = ref(false)
    const dialog = useDialog()
    const createDrawer = ref(false)

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
            getStoreActivityListInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getStoreActivityListInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<store.activity>>({
        sid: undefined,
        type: undefined
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<store.activity>>([
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
            title: '门店',
            align: 'center',
            key: 'uid',
            render: (row: store.activity) => {
                return row.store.title
            }
        },
        {
            title: '活动类型',
            align: 'center',
            key: 'type',
            render: (row: store.activity) => {
                if (ActivityType[row.type]) {
                    return h(NTag, { color: { color: "#ff4d4f", borderColor: '#ff4d4f', textColor: '#fff' }, round: true }, { default: () => ActivityType[row.type] })
                }
            }
        },
        {
            title: '活动内容',
            align: 'center',
            key: 'title'
        },
        {
            title: '开始时间',
            align: 'center',
            key: 'starttime',
            render: (row: store.activity) => {
                return transformTimestampsToDateString(row.starttime)
            }
        },
        {
            title: '结束时间',
            align: 'center',
            key: 'endtime',
            render: (row: store.activity) => {
                return transformTimestampsToDateString(row.endtime)
            }
        },
        {
            title: '活动状态',
            align: 'center',
            key: 'status',
            render: (row: store.activity) => {
                return h(NTag, { color: { color: "#ff4d4f", borderColor: '#ff4d4f', textColor: '#fff' }, round: true }, { default: () => ActivityStatus[row.status] })
            }
        },
        {
            title: '创建时间',
            align: 'center',
            key: 'addtime',
            render: (row: store.activity) => {
                return transformTimestampsToDateString(row.addtime)
            }
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            render(_rowData) {
                return h(NButton, {
                    color: '#ff4d4f', onClick: () => {
                        dialog.warning({
                            title: '温馨提示',
                            content: '您确定要撤销此店铺的活动吗?',
                            positiveText: '确定',
                            negativeText: '取消',
                            onPositiveClick: () => {
                                deleteActivityInfo(_rowData.id!)
                            }
                        })
                    }
                }, { default: () => "撤销活动" })
            }
        }
    ])

    /**
     * 获取商户活动列表信息
     */
    const getStoreActivityListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getStoreActivityList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as store.activity[]
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

    /**
     * 删除商户活动
     * @param params 
     */
    const deleteActivityInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteStoreActivity(id)
            loading.value = false
            if (data.code == 200) {
                message.success('活动删除成功', {
                    onLeave() {
                        getStoreActivityListInfo()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message)
            console.log(e)
        }
    }

    /**
     * 平台批量创建活动
     * @param params 
     */
    const addActivityBatch = async (params: Partial<store.activity>, fn: Function) => {
        try {
            loading.value = true
            const { data } = await addActivityBatchInfo(params)
            loading.value = false
            if (data.code == 200) {
                message.success('活动创建成功', {
                    onLeave() {
                        fn && fn()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message)
            console.log(e)
        }
    }

    return { getStoreActivityListInfo, pagination, tableData, loading, columns, message, searchForm, addActivityBatch, createDrawer }
}

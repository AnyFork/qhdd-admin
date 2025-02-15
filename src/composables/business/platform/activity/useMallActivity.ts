import { mallActivityList, deleteMallActivity, addMallActivity, updateMallActivity } from '@/service/platform/activity'
import { DataTableColumns, NButton, NPopconfirm, NPopover, NTag, NImage } from 'naive-ui'

/**
 * 商城活动
 * @returns 
 */
export const usePlatformMallActivity = () => {
    const tableData = ref<activity.mall[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()

    /**
     * 红包信息
     */
    const rowNode = ref<activity.mall>()

    /**
     * 创建红包活动
    */
    const addShow = ref(false)

    /**
     * 编辑红包活动
     */
    const editShow = ref(false)

    /**
     * 红包状态
     */
    const packetStatusOption = [{
        label: "上架",
        value: 1
    }, {
        label: "下架",
        value: 2
    }]

    /**
    * 红包类型
    */
    const packetTypeOption = [{
        label: "红包",
        value: "redpacket"
    }, {
        label: "实物",
        value: "real"
    }]


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
            packetListData()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            packetListData()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<activity.mall>>({
        type: undefined,
        status: undefined
    })

    /**
     * 删除红包按钮
     * @param rowData 
     * @returns 
     */
    const deletePacketBtn = (rowData: activity.mall) => {
        if (isAdmin.value) {
            return h(
                NPopconfirm,
                {
                    onPositiveClick: () => {
                        deletePacketActivityInfo(rowData.id)
                    }
                },
                {
                    default: () => '您确定要删除此活动吗?',
                    trigger: () =>
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'error',
                                style: {
                                    marginLeft: '10px'
                                }
                            },
                            { default: () => '删除' }
                        )
                }
            )
        } else {
            return h(
                NPopover,
                {},
                {
                    default: () => '非管理员账号禁止删除',
                    trigger: () =>
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'error',
                                style: {
                                    marginLeft: '10px',
                                    cursor: 'not-allowed',
                                    opacity: 0.5
                                }
                            },
                            { default: () => '删除' }
                        )
                }
            )
        }
    }

    /**
    * 编辑红包按钮
    * @param rowData 
    * @returns 
    */
    const editPacketBtn = (rowData: activity.mall) => {
        if (isAdmin.value) {
            return h(
                NButton,
                {
                    size: 'small',
                    type: 'primary',
                    onClick: () => {
                        rowNode.value = rowData
                        editShow.value = true
                    }
                },
                { default: () => '编辑' }
            )
        } else {
            return h(
                NPopover,
                {},
                {
                    default: () => '非系统管理员账号禁止编辑',
                    trigger: () =>
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'primary',
                                style: {
                                    marginLeft: '10px',
                                    cursor: 'not-allowed',
                                    opacity: 0.5
                                }
                            },
                            { default: () => '编辑' }
                        )
                }
            )
        }
    }

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<activity.mall>>([
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
            title: '商品名称',
            width: 140,
            align: 'center',
            fixed: 'left',
            key: 'title'
        },
        {
            title: '缩略图',
            align: 'center',
            width: 100,
            key: 'logo',
            render: (rowData, _index: number) => {
                if (rowData.type == "real") {
                    return h(NImage, { src: previewUrl + rowData.thumb, width: 50, height: 50, class: 'rounded-6px' }, {})
                } else {
                    return "--"
                }
            }
        },
        {
            title: '类型',
            width: 100,
            align: 'center',
            key: 'type',
            render: (rowData, _index: number) => {
                if (rowData.type == "redpacket") {
                    return "商城红包"
                }
                if (rowData.type == "real") {
                    return "实物"
                }
            }
        },
        {
            title: '金额',
            width: 100,
            align: 'center',
            fixed: 'left',
            key: 'amount',
            render: (rowData, _index: number) => {
                return rowData.amount + "元"
            }
        },
        {
            title: '使用金额限制',
            width: 100,
            align: 'center',
            key: 'useAmountLimit',
            render: (rowData, _index: number) => {
                return "满" + rowData.useAmountLimit + "元可使用 "
            }
        },
        {
            title: '兑换积分',
            width: 100,
            align: 'center',
            key: 'score'
        },
        {
            title: '活动状态',
            width: 120,
            align: 'center',
            key: 'status',
            render: (rowData, _index: number) => {
                if (rowData.status == 1) {
                    return h(NTag, { type: 'success', round: true }, { default: () => "上架" })
                }
                if (rowData.status == 2) {
                    return h(NTag, { type: 'error', round: true }, { default: () => "下架" })
                }
            }
        },
        {
            title: '总数',
            width: 100,
            align: 'center',
            key: 'total'
        },
        {
            title: '已兑换',
            width: 100,
            align: 'center',
            key: 'exchangeCount'
        },
        {
            title: '有效天数',
            width: 100,
            align: 'center',
            key: 'dayLimit'
        },
        {
            title: '备注',
            width: 100,
            align: 'center',
            key: 'remark'
        },
        {
            title: '创建日期',
            width: 100,
            align: 'center',
            key: 'createTime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.createTime)
            }
        },
        {
            title: '过期日期',
            width: 100,
            align: 'center',
            key: 'endTime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.createTime + 3600 * 24 * rowData.dayLimit)
            }
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 120,
            render(rowData) {
                return [editPacketBtn(rowData), deletePacketBtn(rowData)]
            }
        }
    ])

    /**
     * 获取红包活动列表
     */
    const packetListData = async () => {
        try {
            loading.value = true
            const { data } = await mallActivityList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
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

    /**
    * 创建商城活动
    */
    const addPacketList = async (params: Partial<activity.mall>) => {
        try {
            loading.value = true
            const { data } = await addMallActivity(params)
            loading.value = false
            if (data.code == 200) {
                message.success('创建成功!')
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
     * 编辑红包活动
     */
    const updatePacketList = async (params: Partial<activity.mall>) => {
        try {
            loading.value = true
            const { data } = await updateMallActivity(params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!')
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
     * 删除商城活动
     * @param 红包id
     */
    const deletePacketActivityInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteMallActivity(id)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        packetListData()
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

    return { packetListData, pagination, tableData, loading, columns, message, editShow, addShow, searchForm, rowNode, packetTypeOption, packetStatusOption, addPacketList, updatePacketList }
}
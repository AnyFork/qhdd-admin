import { deletePacket, packetList, exportRedPacket } from '@/service/platform/customer'
import { DataTableColumns, NButton, NPopconfirm, NPopover, NTag } from 'naive-ui'

/**
 * 红包领取记录
 * @returns 
 */
export const usePlatformPacket = () => {
    const tableData = ref<member.redPacket[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()

    /**
     * 红包信息
     */
    const rowNode = ref<member.redPacket>()

    /**
     * 红包状态
     */
    const packetStatusOption = [{
        label: "未使用",
        value: 1
    }, {
        label: "已使用",
        value: 2
    }, {
        label: "已过期",
        value: 3
    }]

    /**
    * 红包类型
    */
    const packetTypeOption = [{
        label: "会员尊享",
        value: "member_level"
    }, {
        label: "社群红包",
        value: "group"
    }, {
        label: "商家红包",
        value: "store"
    }, {
        label: "商城红包",
        value: "score_mall"
    }, {
        label: "慢必赔",
        value: "slow"
    }, {
        label: "通用红包",
        value: "common"
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
    const searchForm = reactive<Partial<member.redPacket> & { range?: [number, number], startTimeStart?: number, startTimeEnd?: number }>({
        type: undefined,
        status: undefined,
        nickname: undefined,
        range: undefined,
        startTimeStart: undefined,
        startTimeEnd: undefined
    })

    /**
     * 编辑drawer状态
     */
    const EditShow = ref(false)

    /**
     * 删除红包按钮
     * @param rowData 
     * @returns 
     */
    const deletePacketBtn = (rowData: member.redPacket) => {
        if (isAdmin.value) {
            // 未消费的非会员尊享红包才能被删除
            if (rowData.type != 'member_level' && rowData.status == 1) {
                return h(
                    NPopconfirm,
                    {
                        onPositiveClick: () => {
                            deletePacketInfo(rowData.id)
                        }
                    },
                    {
                        default: () => '您确定要删除此用户的红包吗?',
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
                        default: () => rowData.type == 'member_level' ? '会员尊享红包禁止删除' : "已使用或已过期红包禁止删除",
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
    const editPacketBtn = (rowData: member.redPacket) => {
        if (isAdmin.value) {
            // 未消费的非会员尊享红包才能被编辑
            if (rowData.type != 'member_level' && rowData.status == 1) {
                return h(
                    NButton,
                    {
                        size: 'small',
                        type: 'primary',
                        onClick: () => {
                            rowNode.value = rowData
                            EditShow.value = true
                        }
                    },
                    { default: () => '编辑' }
                )
            } else {
                return h(
                    NPopover,
                    {},
                    {
                        default: () => rowData.type == 'member_level' ? '会员尊享红包禁止编辑' : "已使用或已过期红包禁止编辑",
                        trigger: () =>
                            h(
                                NButton,
                                {
                                    size: 'small',
                                    type: 'primary',
                                    style: {
                                        cursor: 'not-allowed',
                                        opacity: 0.5
                                    }
                                },
                                { default: () => '编辑' }
                            )
                    }
                )
            }

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
    const columns = ref<DataTableColumns<member.redPacket>>([
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
            title: '红包名称',
            width: 100,
            align: 'center',
            fixed: 'left',
            key: 'name'
        },
        {
            title: '红包金额',
            width: 100,
            align: 'center',
            fixed: 'left',
            key: 'amount',
            render: (rowData, _index: number) => {
                return rowData.amount + "元"
            }
        },
        {
            title: '红包类型',
            width: 100,
            align: 'center',
            key: 'type',
            render: (rowData, _index: number) => {
                if (rowData.type == "member_level") {
                    return "会员尊享"
                }
                if (rowData.type == "group") {
                    return "社群红包"
                }
                if (rowData.type == "store") {
                    return "商家红包"
                }
                if (rowData.type == "score_mall") {
                    return "商城红包"
                }
                if (rowData.type == "slow") {
                    return "慢必赔"
                }
                if (rowData.type == "common") {
                    return "通用红包"
                }
            }
        },
        {
            title: '红包状态',
            width: 120,
            align: 'center',
            key: 'status',
            render: (rowData, _index: number) => {
                if (rowData.status == 1) {
                    return h(NTag, { type: 'success', round: true }, { default: () => "未使用" })
                }
                if (rowData.status == 2) {
                    return h(NTag, { type: 'error', round: true }, { default: () => "已使用" })
                }
                if (rowData.status == 3) {
                    return h(NTag, { type: 'warning', round: true }, { default: () => "已过期" })
                }
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
            title: '红包备注',
            width: 100,
            align: 'center',
            key: 'remark'
        },
        {
            title: '使用人微信昵称',
            width: 100,
            align: 'center',
            key: 'nickname',
        },
        {
            title: '使用日期',
            width: 100,
            align: 'center',
            key: 'useTime',
            render(rowData, _rowIndex) {
                return rowData.useTime == 0 ? "" : transformTimestampsToDateString(rowData.useTime)
            }
        },
        {
            title: '领取日期',
            width: 100,
            align: 'center',
            key: 'startTime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.startTime)
            }
        },
        {
            title: '过期日期',
            width: 100,
            align: 'center',
            key: 'endTime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.endTime)
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
     * 获取红包列表
     */
    const packetListData = async () => {
        try {
            loading.value = true
            if (searchForm.range && searchForm.range.length > 0) {
                searchForm.startTimeStart = Number(transformTimestampsToDateString(searchForm.range[0] / 1000, 'YYYYMMDD'))
                searchForm.startTimeEnd = Number(transformTimestampsToDateString(searchForm.range[1] / 1000, 'YYYYMMDD'))
            } else {
                searchForm.startTimeStart = undefined
                searchForm.startTimeEnd = undefined
            }
            const { type, status, nickname, startTimeStart, startTimeEnd } = searchForm
            const { data } = await packetList({ pageNo: pagination.page, pageSize: pagination.pageSize, type, status, nickname, startTimeStart, startTimeEnd })
            console.log(data)
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
     * 删除会员红包
     * @param 红包id
     */
    const deletePacketInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deletePacket(id)
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

    /**
     * 导出红包记录
    */
    const exportData = async () => {
        let fileName = ''
        try {
            loading.value = true
            if (searchForm.range && searchForm.range?.length > 0) {
                searchForm.startTimeStart = Number(transformTimestampsToDateString(Math.round(searchForm.range[0] / 1000), "YYYYMMDD"))
                searchForm.startTimeEnd = Number(transformTimestampsToDateString(Math.round(searchForm.range[1] / 1000), "YYYYMMDD"))
                fileName = `${searchForm.startTimeStart}-${searchForm.startTimeEnd}红包记录导出详情.xlsx`
            } else {
                searchForm.startTimeStart = undefined
                searchForm.startTimeEnd = undefined
                fileName = `${transformTimestampsToDateString(Math.round(Date.now() / 1000), "YYYYMMDD")}红包记录导出详情.xlsx`
            }
            const { data } = await exportRedPacket(searchForm.startTimeStart, searchForm.startTimeEnd)
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

    return { packetListData, pagination, tableData, loading, columns, message, EditShow, searchForm, rowNode, packetTypeOption, packetStatusOption, exportData }
}
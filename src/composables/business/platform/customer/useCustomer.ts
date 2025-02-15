import { getCustomerList, updateMemberInfo } from '@/service/platform/customer';
import { DataTableColumns, NButton, NPopover, NAvatar, NPopconfirm, NSwitch } from 'naive-ui'
/**
 * 顾客模块
 * @returns 
 */
export const useCustomer = () => {
    const tableData = ref<userInfo.user[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()

    /**
     * 发红包modal状态
     */
    const distributeShow = ref(false)

    /**
     * 用户信息
     */
    const rowNode = ref<userInfo.user>()


    /**
     * 查看详情drawer状态
     */
    const showDetail = ref(false)

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
            getCustomerListInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getCustomerListInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive({
        nickname: undefined,
        id: undefined,
        addressMobile: undefined
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<userInfo.user>>([
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
            width: 100,
            align: 'center',
            key: 'id'
        },
        {
            title: '微信图像',
            align: 'center',
            width: 100,
            key: 'avatar',
            fixed: 'left',
            render: (_rowData, _index: number) => {
                return h(NAvatar, { src: _rowData.avatar, round: true, fallbackSrc: getAssetsImages('empty-user.png') }, {})
            }
        },
        {
            title: '顾客昵称',
            align: 'center',
            key: 'nickname'
        },
        {
            title: '会员等级',
            width: 100,
            align: 'center',
            key: 'level',
            render(rowData, _rowIndex) {
                return rowData.level + '级'
            },
        },
        {
            title: '累计消费金额(元)',
            width: 140,
            align: 'center',
            key: 'successPrice'
        },
        {
            title: '红包总数量',
            width: 100,
            align: 'center',
            key: 'redpacketCount',
            render(rowData, _rowIndex) {
                return rowData.redpacketStat.redpacketCount
            },
        },
        {
            title: '(已使用/未使用)红包总数量',
            width: 200,
            align: 'center',
            key: 'num1',
            render(rowData, _rowIndex) {
                return rowData.redpacketStat.usedRedpacketCount + "/" + rowData.redpacketStat.notUsedRedpacketCount
            },
        },
        {
            title: '(已获取/未获取)等级红包总数量',
            width: 230,
            align: 'center',
            key: 'num2',
            render(rowData, _rowIndex) {
                return rowData.redpacketStat.getLevelRedpacketCountTotal + "/" + rowData.redpacketStat.levelRedpacketCountTotal
            },
        },
        {
            title: '已过期红包总数量',
            width: 150,
            align: 'center',
            key: 'expiredRedpacketCount',
            render(rowData, _rowIndex) {
                return rowData.redpacketStat.expiredRedpacketCount
            },
        },
        {
            title: '社群分享权限',
            width: 120,
            align: 'center',
            key: 'isSpread',
            render(rowData, _rowIndex) {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.isSpread == 0) {
                                    updateMember({ id: rowData.id, isSpread: 1 })
                                } else {
                                    updateMember({ id: rowData.id, isSpread: 0 })
                                }
                            }
                        },
                        {
                            default: () => (rowData.isSpread == 1 ? '关闭后用户无权分享社群红包' : '您确定开启吗,开启后用户有权限分享社群红包'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isSpread }, {
                                checked: () => "有权限",
                                unchecked: () => "无权限"
                            })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isSpread, disabled: true }, {}) })
                }
            }
        },
        {
            title: '加入日期',
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
            render(rowData) {
                if (isAdmin.value) {
                    return [h(
                        NButton,
                        {
                            size: 'small',
                            type: 'error',
                            onClick: () => {
                                rowNode.value = rowData
                                distributeShow.value = true
                            }
                        },
                        { default: () => '发红包' }
                    ), h(
                        NButton,
                        {
                            size: 'small',
                            type: 'success',
                            style: {
                                marginLeft: '10px'
                            },
                            onClick: () => {
                                rowNode.value = rowData
                                showDetail.value = true
                            }
                        },
                        { default: () => '红包详情' }
                    )]
                } else {
                    return [h(
                        NPopover,
                        {},
                        {
                            default: () => '非管理员账号禁止发红包',
                            trigger: () =>
                                h(
                                    NButton,
                                    {
                                        size: 'small',
                                        type: 'error',
                                        style: {
                                            cursor: 'not-allowed',
                                            opacity: 0.5
                                        }
                                    },
                                    { default: () => '发红包' }
                                )
                        }
                    ), h(
                        NButton,
                        {
                            size: 'small',
                            type: 'success',
                            style: {
                                marginLeft: '10px'
                            },
                            onClick: () => {
                                rowNode.value = rowData
                                showDetail.value = true
                            }
                        },
                        { default: () => '红包详情' }
                    )]
                }
            }
        }
    ])

    /**
     * 获取顾客信息列表
     */
    const getCustomerListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getCustomerList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as userInfo.user[]
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
     * 修改用户信息
     */
    const updateMember = async (params: Partial<userInfo.user>) => {
        try {
            loading.value = true
            const { data } = await updateMemberInfo(params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功')
                getCustomerListInfo()
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    return { getCustomerListInfo, pagination, tableData, loading, columns, message, searchForm, distributeShow, rowNode, showDetail }
}

import { getRiderList, removeRiderInfo, updateRiderInfo } from '@/service/platform/rider';
import { DataTableColumns, NAvatar, NButton, NPopconfirm, NPopover, NSwitch } from 'naive-ui'
/**
 * 配送员模块
 * @returns 
 */
export const usePlatformRider = () => {
    const tableData = ref<rider.riderInfo[]>([])
    const allRider = ref<rider.riderInfo[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()

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
            riderList()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            riderList()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<rider.riderInfo>>({
        nickname: undefined,
        title: undefined,
        mobile: undefined,
        status: undefined
    })

    /**
     * 修改dialog状态
     */
    const modifyShow = ref(false)

    /**
     * 当前选中的节点
     */
    const rowNode = ref<rider.riderInfo>()

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<rider.riderInfo>>([
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
            title: '微信图像',
            align: 'center',
            key: 'avatar',
            render: (_rowData, _index: number) => {
                return h(NAvatar, { src: _rowData.avatar, round: true, fallbackSrc: getAssetsImages('empty-user.png') }, {})
            }
        },
        {
            title: '微信昵称',
            align: 'center',
            key: 'nickname'
        },
        {
            title: '姓名',
            align: 'center',
            key: 'title'
        },
        {
            title: '电话号码',
            align: 'center',
            key: 'mobile'
        },
        {
            title: '年龄',
            align: 'center',
            key: 'age'
        },
        {
            title: '性别',
            align: 'center',
            key: 'sex'
        },
        {
            title() {
                return searchForm.status != 2 ? renderEditableTitle("工作状态", "可编辑列") : "工作状态"
            },
            key: 'workStatus',
            align: 'center',
            render: (rowData, _index: number) => {
                if (isAdmin.value && searchForm.status != 2) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.workStatus == 1) {
                                    updateRider({ id: rowData.id, workStatus: 0 })
                                } else {
                                    updateRider({ id: rowData.id, workStatus: 1 })
                                }
                            }
                        },
                        {
                            default: () => '您确定修改此配送员工作状态吗?',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.workStatus }, {
                                checked: () => "正常",
                                unchecked: () => "休息"
                            })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.workStatus, disabled: true }, {}) })
                }
            }
        },
        {
            title() {
                return searchForm.status != 2 ? renderEditableTitle("账号状态", "可编辑列") : "账号状态"
            },
            key: 'status',
            align: 'center',
            render: (rowData, _index: number) => {
                if (isAdmin.value && searchForm.status != 2) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.workStatus == 1) {
                                    updateRider({ id: rowData.id, status: 3 })
                                } else {
                                    updateRider({ id: rowData.id, status: 1 })
                                }
                            }
                        },
                        {
                            default: () => rowData.workStatus == 1 ? '您确定禁用此账号状态吗,禁止后配送员无法登录配送员小程序' : '您确定恢复此账号状态吗,恢复后配送员将正常登录配送员小程序',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 3, value: rowData.status }, {
                                checked: () => "正常",
                                unchecked: () => "禁用"
                            })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 3, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '创建日期',
            align: 'center',
            key: 'addtime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.addtime)
            },
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 180,
            render(rowData) {
                if (isAdmin.value) {
                    return [
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'primary',
                                style: {
                                    marginLeft: '10px'
                                },
                                onClick: () => {
                                    if (searchForm.status !== 2) {
                                        rowData.permCancelObj = rowData.permCancel ? JSON.parse(rowData.permCancel) : {
                                            status_takeout: 1
                                        }
                                        rowData.permTransferObj = rowData.permTransfer ? JSON.parse(rowData.permTransfer) : {
                                            status_takeout: 1
                                        }
                                        rowNode.value = rowData
                                        modifyShow.value = true
                                    } else {
                                        updateRider({ id: rowData.id, status: 1 })
                                    }

                                }
                            },
                            { default: () => searchForm.status != 2 ? "设置" : "恢复" }
                        ),
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    if (searchForm.status != 2) {
                                        updateRider({ id: rowData.id, status: 2 })
                                    } else {
                                        deleteRider(rowData.id)
                                    }
                                }
                            },
                            {
                                default: () => searchForm.status != 2 ? '您确定要删除此配送员吗,删除后数据将进入回收站。' : '您确定要彻底删除此配送员吗?',
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
                                        { default: () => searchForm.status != 2 ? '删除' : "彻底删除" }
                                    )
                            }
                        )
                    ]
                } else {
                    return [
                        h(
                            NPopover,
                            {},
                            {
                                default: () => '非管理员账号禁止操作',
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
                                        { default: () => '设置' }
                                    )
                            }
                        ),
                        h(
                            NPopover,
                            {},
                            {
                                default: () => '非管理员账号禁止操作',
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
                    ]
                }
            }
        }
    ])

    /**
     * 获取配送员列表
     */
    const riderList = async () => {
        try {
            loading.value = true
            const { data } = await getRiderList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as rider.riderInfo[]
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
     * 获取所有配送员列表
     */
    const selectRiderList = async () => {
        try {
            loading.value = true
            const { data } = await getRiderList({ pageNo: 1, pageSize: 1000, status: 1 })
            loading.value = false
            if (data.code == 200) {
                allRider.value = data.data as rider.riderInfo[]
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
     * 修改配送员信息
     * @param params 配送员信息
     */
    const updateRider = async (params: Partial<rider.riderInfo>) => {
        try {
            loading.value = true
            const { data } = await updateRiderInfo(params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!', {
                    onLeave() {
                        riderList()
                    },
                })
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
     * 彻底删除配送员
     * @param ID 配送员id
     */
    const deleteRider = async (id: number) => {
        try {
            loading.value = true
            const { data } = await removeRiderInfo(id)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        riderList()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    return { riderList, updateRider, deleteRider, pagination, tableData, loading, columns, message, rowNode, modifyShow, searchForm, selectRiderList, allRider }
}

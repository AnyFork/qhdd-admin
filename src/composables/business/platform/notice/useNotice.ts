import { addNoticeInfo, deleteNotice, getNoticeList, updateNotice } from '@/service/platform/notice'
import { DataTableColumns, FormItemRule, NPopconfirm, NSwitch, NPopover, NButton } from 'naive-ui'
/**
 * 公告模块
 * @returns 
 */
export const useNotice = () => {
    const tableData = ref<notice[]>([])
    const message = useMessage()
    const loading = ref(false)
    const formRef = ref()
    const { isAdmin } = useLoginUser()

    /**
     * 新增modal
     */
    const addModal = ref(false)

    /**
    * 修改modal
    */
    const editModal = ref(false)

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
            getNoticeListInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getNoticeListInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = ref<Partial<notice>>({
        title: undefined,
        status: undefined,
    })

    /**
     * 表单数据
     */
    const moduleValue = ref<Partial<notice>>({
        content: undefined,
        title: undefined,
        status: 1,
        displayorder: 0
    })

    /**
     * 表单校验规则
     */
    const rules = {
        title: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入公告标题')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        content: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入公告内容')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ]
    }

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<notice>>([
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
            title: '公告标题',
            align: 'center',
            key: 'title'
        },
        {
            title: '上架状态',
            align: 'center',
            key: 'status',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: async () => {
                                if (rowData.status == 1) {
                                    await updateNoticeInfo({ id: rowData.id, status: 0 })
                                    getNoticeListInfo()
                                } else {
                                    await updateNoticeInfo({ id: rowData.id, status: 1 })
                                    getNoticeListInfo()
                                }
                            }
                        },
                        {
                            default: () => (rowData.status == 1 ? '您确定下架此公告吗,下架后将无法在小程序展示' : '您确定上架此公告吗,上架后将正常显示在小程序'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, {})
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '发布时间',
            align: 'center',
            key: 'addtime'
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            className: 'flex-row-center',
            render(rowData) {
                if (isAdmin.value) {
                    return h('div', {}, {
                        default: () =>
                            [
                                h(
                                    NButton,
                                    {
                                        size: 'small',
                                        type: 'primary',
                                        style: {
                                            marginLeft: '10px',
                                            width: '60px !important'
                                        },
                                        onClick: () => {
                                            editModal.value = true
                                            moduleValue.value = rowData
                                        }
                                    },
                                    { default: () => '修改' }
                                ),
                                h(
                                    NPopconfirm,
                                    {
                                        onPositiveClick: () => {
                                            deleteNoticeInfo(rowData.id)
                                        }
                                    },
                                    {
                                        default: () => '您确定要删除此公告吗?',
                                        trigger: () =>
                                            h(
                                                NButton,
                                                {
                                                    size: 'small',
                                                    type: 'error',
                                                    style: {
                                                        marginLeft: '10px',
                                                        width: '60px !important'
                                                    }
                                                },
                                                { default: () => '删除' }
                                            )
                                    }
                                )
                            ]
                    })
                } else {
                    return h('div', {}, {
                        default: () =>
                            [
                                h(
                                    NButton,
                                    {
                                        size: 'small',
                                        type: 'primary',
                                        style: {
                                            marginLeft: '10px',
                                            cursor: 'not-allowed',
                                            opacity: 0.5,
                                            width: '60px !important'
                                        }
                                    },
                                    { default: () => '修改' }
                                ),
                                h(
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
                                                        opacity: 0.5,
                                                        marginRight: '15px',
                                                        width: '60px !important'
                                                    }
                                                },
                                                { default: () => '删除' }
                                            )
                                    }
                                )
                            ]
                    })
                }
            }
        }
    ])

    /**
     * 获取公告信息
     */
    const getNoticeListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getNoticeList({ pageNo: pagination.page, pageSize: pagination.pageSize })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as notice[]
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
     * 新增公告信息
     */
    const addNoticeInfoInfo = async (params: Partial<notice>) => {
        try {
            loading.value = true
            const { data } = await addNoticeInfo(params)
            loading.value = false
            if (data.code == 200) {
                message.success("创建成功")
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
    * 更新公告信息
    */
    const updateNoticeInfo = async (params: Partial<notice>) => {
        try {
            loading.value = true
            const { data } = await updateNotice(params)
            loading.value = false
            if (data.code == 200) {
                message.success("修改成功")
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
     * 删除公告信息
     */
    const deleteNoticeInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteNotice(id)
            loading.value = false
            if (data.code == 200) {
                message.success("删除成功", {
                    onLeave: () => {
                        getNoticeListInfo()
                    }
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

    return { getNoticeListInfo, pagination, tableData, loading, columns, message, addModal, editModal, searchForm, moduleValue, formRef, rules, addNoticeInfoInfo, updateNoticeInfo }
}

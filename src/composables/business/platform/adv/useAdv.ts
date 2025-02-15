import { addAdv, updateAdv, getAdvList, deleteAdv } from '@/service/platform/adv'
import { DataTableColumns, FormItemRule, NImage, NPopconfirm, NSwitch, NPopover, NButton } from 'naive-ui'
import InputNumberColumn from '@/components/dynamic/InputNumberColumn.vue'
/**
 * 广告模块
 * @returns 
 */
export const useAdv = () => {
    const tableData = ref<system.adv[]>([])
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
            getAdvListInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getAdvListInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = ref<Partial<system.adv>>({
        positionKey: undefined,
        title: undefined,
        status: undefined,
        sortType: 5
    })

    /**
     * 表单数据
     */
    const moduleValue = ref<Partial<system.adv>>({
        positionKey: undefined,
        img: undefined,
        link: undefined,
        title: undefined,
        content: undefined,
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
                        return new Error('请输入广告标题')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        positionKey: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请选择广告位')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        img: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入广告图片')
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
    const columns = ref<DataTableColumns<system.adv>>([
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
            title: '广告名称',
            align: 'center',
            key: 'title'
        },
        {
            title: '广告位标识',
            align: 'center',
            key: 'positionKey'
        },
        {
            title: '广告',
            align: 'center',
            key: 'img',
            render: (row: system.adv, _index: number) => {
                return h(NImage, { src: row.img, width: 150, height: 50 })
            }
        },
        {
            title() {
                return renderEditableTitle("排序", "可编辑列")
            },
            width: 160,
            align: 'center',
            key: 'displayorder',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(InputNumberColumn, {
                        value: rowData.displayorder,
                        editable: false,
                        onUpdateValue: (value: number) => {
                            if (rowData.displayorder !== value) {
                                updateAdvInfo({ id: rowData.id, displayorder: value })
                            }
                        }
                    })
                } else {
                    return rowData.displayorder
                }
            }
        },
        {
            title() {
                return renderEditableTitle("上架状态", "可编辑列")
            },
            align: 'center',
            key: 'status',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: async () => {
                                if (rowData.status == 1) {
                                    await updateAdvInfo({ id: rowData.id, status: 0 })
                                    getAdvListInfo()
                                } else {
                                    await updateAdvInfo({ id: rowData.id, status: 1 })
                                    getAdvListInfo()
                                }
                            }
                        },
                        {
                            default: () => (rowData.status == 1 ? '您确定下架此广告吗,下架后将无法在小程序展示' : '您确定上架此广告吗,上架后将正常显示在小程序'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, {})
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '最后修改时间',
            align: 'center',
            key: 'createTime'
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
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
                                            deleteAdvInfo(rowData.id)
                                        }
                                    },
                                    {
                                        default: () => '您确定要删除此广告?',
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
     * 获取广告信息
     */
    const getAdvListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getAdvList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm.value })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as system.adv[]
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
     * 新增广告信息
     */
    const addAdvInfo = async (params: Partial<system.adv>) => {
        try {
            loading.value = true
            const { data } = await addAdv(params)
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
    * 更新广告信息
    */
    const updateAdvInfo = async (params: Partial<system.adv>) => {
        try {
            loading.value = true
            const { data } = await updateAdv(params)
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
     * 删除广告信息
     */
    const deleteAdvInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteAdv(id)
            loading.value = false
            if (data.code == 200) {
                message.success("删除成功", {
                    onLeave: () => {
                        getAdvListInfo()
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

    return { getAdvListInfo, pagination, tableData, loading, columns, message, addModal, editModal, searchForm, moduleValue, formRef, rules, addAdvInfo, updateAdvInfo }
}

import { addAdvPosition, getAdvPositionList, deleteAdvPosition } from '@/service/platform/adv'
import { DataTableColumns, NPopconfirm, NButton, NPopover } from 'naive-ui'
/**
 * 广告位模块
 * @returns 
 */
export const useAdvPosition = () => {
    const tableData = ref<system.advPosition[]>([])
    const allAdv = ref<system.advPosition[]>([])
    const message = useMessage()
    const loading = ref(false)
    const openModal = ref(false)
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
            getAdvPosition()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getAdvPosition()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<system.advPosition>>([
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
            title: '广告位标识',
            align: 'center',
            key: 'positionKey'
        },
        {
            title: '广告位名称',
            align: 'center',
            key: 'name'
        },
        {
            title: '创建时间',
            align: 'center',
            key: 'createTime'
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            className: 'flex-row-center',
            render(rowData) {
                if (isAdmin.value) {
                    return h('div', {}, {
                        default: () => [
                            h(
                                NPopconfirm,
                                {
                                    onPositiveClick: () => {
                                        deleteAdvPositionInfo(rowData.id)
                                    }
                                },
                                {
                                    default: () => '您确定要删除此广告位?',
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
                            )]
                    })
                } else {
                    return h('div', {}, {
                        default: () =>
                            [h(
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
                            )]
                    })
                }
            }
        }
    ])

    /**
     * 获取广告位信息
     */
    const getAdvPosition = async () => {
        try {
            loading.value = true
            const { data } = await getAdvPositionList({ pageNo: pagination.page, pageSize: pagination.pageSize })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as system.advPosition[]
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
    * 获取所有广告位信息
    */
    const getAllAdvPosition = async () => {
        try {
            loading.value = true
            const { data } = await getAdvPositionList({ pageNo: 1, pageSize: 100 })
            loading.value = false
            if (data.code == 200) {
                allAdv.value = data.data as system.advPosition[]
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
     * 新增广告位信息
     */
    const addAdvPositionInfo = async (params: Partial<system.advPosition>) => {
        try {
            loading.value = true
            const { data } = await addAdvPosition(params)
            loading.value = false
            if (data.code == 200) {
                message.success("创建成功", {
                    onLeave: () => {
                        openModal.value = false
                        getAdvPosition()
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

    /**
    * 删除广告位
    */
    const deleteAdvPositionInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteAdvPosition(id)
            loading.value = false
            if (data.code == 200) {
                message.success("删除成功", {
                    onLeave: () => {
                        getAdvPosition()
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

    return { getAdvPosition, pagination, tableData, loading, columns, message, addAdvPositionInfo, openModal, getAllAdvPosition, allAdv }
}

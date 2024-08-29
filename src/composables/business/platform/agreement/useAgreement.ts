import { getAgreementList, updateAgreement } from '@/service/platform/agreement'
import { DataTableColumns, NButton, NTag } from 'naive-ui'
/**
 * 协议模块
 * @returns 
 */
export const useAgreement = () => {
    const tableData = ref<agreement[]>([])
    const message = useMessage()
    const loading = ref(false)
    const formRef = ref()
    const { isAdmin } = useLoginUser()

    /**
     * 预览modal
     */
    const previewModal = ref(false)

    /**
    * 修改modal
    */
    const editModal = ref(false)

    /**
     * 表单数据
     */
    const moduleValue = ref<Partial<agreement>>({
        id: undefined,
        title: undefined,
        value: undefined,
        name: undefined,
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<agreement>>([
        {
            title: '序号',
            width: 70,
            align: 'center',
            key: 'key',
            render: (_rowData, index: number) => {
                return `${index + 1}`
            }
        },
        {
            title: '协议标题',
            align: 'center',
            key: 'title'
        },
        {
            title: '协议类型',
            align: 'center',
            key: 'type',
            render(rowData, _rowIndex) {
                return AgreementType[rowData.name]
            }
        },
        {
            title: '协议标识',
            align: 'center',
            key: 'name'
        },
        {
            title: '是否有协议内容',
            align: 'center',
            key: 'value',
            render(rowData, _rowIndex) {
                return rowData.value.replace(/<[^>]+>/g, "") ? h(NTag, { type: 'primary' }, { default: () => '有内容' }) : '无内容'
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
                                    NButton,
                                    {
                                        size: 'small',
                                        type: 'success',
                                        style: {
                                            marginLeft: '10px',
                                            width: '60px !important'
                                        },
                                        onClick: () => {
                                            previewModal.value = true
                                            moduleValue.value = rowData
                                        }
                                    },
                                    { default: () => '预览' }
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
                                    NButton,
                                    {
                                        size: 'small',
                                        type: 'success',
                                        style: {
                                            marginLeft: '10px',
                                            width: '60px !important'
                                        },
                                        onClick: () => {
                                            previewModal.value = true
                                            moduleValue.value = rowData
                                        }
                                    },
                                    { default: () => '预览' }
                                )
                            ]
                    })
                }
            }
        }
    ])

    /**
     * 获取协议列表信息
     */
    const getAgreementListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getAgreementList({ pageNo: 1, pageSize: 20 })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as agreement[]
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
    * 更新协议信息
    */
    const updateAgreementById = async (params: Partial<agreement>) => {
        try {
            loading.value = true
            const { data } = await updateAgreement(params)
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

    return { getAgreementListInfo, tableData, loading, columns, message, previewModal, editModal, moduleValue, formRef, updateAgreementById }
}

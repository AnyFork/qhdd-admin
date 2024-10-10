import { addChain, deleteChain, getChainList, updateChain } from "@/service/platform/chain"
import { getChainPageList, getChainPageListSelect } from "@/service/store/chain"
import { DataTableColumns, NPopconfirm, NPopover, NSwitch, NButton, FormItemRule, NImage } from "naive-ui"
import InputNumberColumn from '@/components/dynamic/InputNumberColumn.vue'

/**
 * 连锁店模块
 * @returns 
 */
export const useChain = () => {
    const tableData = ref([])
    const chainOptions = ref()
    const message = useMessage()
    const loading = ref(false)
    const { routerPush } = useRouterPush()
    const { isAdmin } = useLoginUser()
    const { storeInfoFrom } = useStoreInfo()
    const { chainInfo, chainInfoFrom } = useChainInfo()
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 新增
     */
    const createModal = ref(false)

    /**
     * 修改
     */
    const updateModal = ref(false)

    /**
     * 当前选中row的对象
     */
    const rowNode = ref<chain.chainInfo>()

    /**
     * 表单对象
     */
    const model = reactive<Partial<chain.chainInfo>>({
        title: undefined,
        logo: undefined,
        chainerId: undefined,
        status: 1,
        displayorder: 0
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<chain.chainInfo>>({
        isDelete: undefined,
        title: undefined,
        chainerId: undefined,
        status: undefined
    })

    /**
     * 表单校验规则
     */
    const rules = {
        title: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入连锁店名称')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        logo: [{
            validator(_rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请选择连锁店LOGO')
                }
            },
            trigger: ['input', 'blur']
        }],
        chainerId: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请选择连锁店')
                    }
                },
                trigger: ['input', 'blur']
            }
        ]
    }

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<chain.chainInfo>>([
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
            title: 'ID',
            width: 70,
            align: 'center',
            key: 'id'
        },
        {
            title: '连锁店Logo',
            align: 'center',
            key: 'logo',
            render: (rowData, _index: number) => {
                return h(NImage, { src: previewUrl + rowData.logo, width: 80, height: 80, lazy: true, imgProps: { style: { borderRadius: '5px' } } }, { default: () => "" })
            }
        },
        {
            title: '连锁店名称',
            align: 'center',
            key: 'title'
        },
        {
            title: '账户余额',
            align: 'center',
            key: 'amount',
            render: (rowData, _index: number) => {
                return h('div', { class: 'text-primary' }, { default: () => rowData.amount })
            }
        },
        {
            title: '管理员名称',
            align: 'center',
            key: 'realname',
            render: (_rowData, _index: number) => {
                return _rowData?.chainer?.realname
            }
        },
        {
            title: '管理员电话',
            align: 'center',
            key: 'mobile',
            render: (_rowData, _index: number) => {
                return _rowData?.chainer?.mobile
            }
        },
        {
            title() {
                return renderEditableTitle("是否启用", "可编辑列")
            },
            align: 'center',
            key: 'status',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.status == 0) {
                                    updateChainInfo({ id: rowData.id, status: 1 }, () => getChainListInfo())
                                } else {
                                    updateChainInfo({ id: rowData.id, status: 0 }, () => getChainListInfo())
                                }
                            }
                        },
                        {
                            default: () => (rowData.status == 1 ? '您确定禁用吗?' : '您确定启用吗?'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, {
                                checked: () => "启用",
                                unchecked: () => "禁用"
                            })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title() {
                return renderEditableTitle("排序", "可编辑列")
            },
            align: 'center',
            key: 'displayorder',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(InputNumberColumn, {
                        value: rowData.displayorder,
                        editable: false,
                        onUpdateValue: (value: number) => {
                            if (rowData.displayorder !== value) {
                                updateChainInfo({ id: rowData.id, displayorder: value }, () => getChainListInfo())
                            }
                        }
                    })
                } else {
                    return rowData.displayorder
                }
            }
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 200,
            render(rowData) {
                if (isAdmin.value) {
                    if (rowData.isDelete == 1) {
                        return [h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    updateChainInfo({ id: rowData.id, isDelete: 0 }, () => getChainListInfo())
                                }
                            },
                            {
                                default: () => '您确定要从回收站回收连锁店吗',
                                trigger: () =>
                                    h(
                                        NButton,
                                        {
                                            size: 'small',
                                            type: 'primary',
                                            style: {
                                                marginLeft: '10px'
                                            }
                                        },
                                        { default: () => '恢复数据' }
                                    )
                            }
                        ), h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    deleteChainInfo(rowData.id!)
                                }
                            },
                            {
                                default: () => '您确定要彻底删除此连锁店吗',
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
                                        { default: () => '彻底删除' }
                                    )
                            }
                        )]
                    } else {
                        return [
                            h(
                                NPopconfirm,
                                {
                                    onPositiveClick: () => {
                                        updateChainInfo({ id: rowData.id, isDelete: 1 }, () => getChainListInfo())
                                    }
                                },
                                {
                                    default: () => '您确定要删除此连锁店吗,删除后连锁店将进入回收站',
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
                            ),
                            h(
                                NButton,
                                {
                                    size: 'small',
                                    type: 'primary',
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    onClick: () => {
                                        rowNode.value = rowData
                                        updateModal.value = true
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
                                        marginLeft: '10px'
                                    },
                                    onClick: () => {
                                        storeInfoFrom.value = undefined
                                        chainInfo.value = rowData
                                        chainInfoFrom.value = 1
                                        routerPush('/chain/store/list', true)
                                    }
                                },
                                { default: () => '管理' }
                            )
                        ]
                    }
                } else {
                    if (rowData.isDelete == 1) {
                        return [h(
                            NPopover,
                            {},
                            {
                                default: () => '非系统管理员账号禁止删除',
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
                                        { default: () => '恢复数据' }
                                    )
                            }), h(
                                NPopover,
                                {},
                                {
                                    default: () => '非系统管理员账号禁止删除',
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
                                            { default: () => '彻底删除' }
                                        )
                                })]
                    } else {
                        return [
                            h(
                                NPopover,
                                {},
                                {
                                    default: () => '非系统管理员账号禁止删除',
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
                                                type: 'primary',
                                                style: {
                                                    marginLeft: '10px',
                                                    cursor: 'not-allowed',
                                                    opacity: 0.5
                                                }
                                            },
                                            { default: () => '修改' }
                                        )
                                }
                            )
                        ]
                    }
                }
            }
        }
    ])

    /**
     * 商户端获取连锁店列表
     */
    const chainPageList = async () => {
        try {
            loading.value = true
            const { data } = await getChainPageList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm, isDelete: 0 })
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
     * 平台获取连锁店列表
     */
    const getChainListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getChainList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
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
     * 获取连锁店下拉列表
     */
    const chainSelectList = async () => {
        try {
            loading.value = true
            const { data } = await getChainPageListSelect()
            loading.value = false
            if (data.code == 200) {
                chainOptions.value = data.data.map((item: any) => {
                    return {
                        label: item.title,
                        value: item.id
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
     * 修改连锁店信息
     */
    const updateChainInfo = async (params: Partial<chain.chainInfo>, fn?: Function) => {
        try {
            loading.value = true
            const { data } = await updateChain(params)
            loading.value = false
            if (data.code == 200) {
                message.success("修改成功", {
                    onLeave() {
                        fn && fn()
                    },
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
     * 新增连锁店信息
     */
    const addChainInfo = async (params: Partial<chain.chainInfo>) => {
        try {
            loading.value = true
            const { data } = await addChain(params)
            loading.value = false
            if (data.code == 200) {
                message.success("新增成功")
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
     * 彻底删除连锁店信息
     */
    const deleteChainInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteChain(id)
            loading.value = false
            if (data.code == 200) {
                message.success("删除成功", {
                    onLeave() {
                        getChainListInfo()
                    },
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

    return {
        chainSelectList, chainOptions, chainPageList, getChainListInfo, rowNode, createModal, updateModal, searchForm, tableData,
        loading, pagination, columns, model, rules, addChainInfo, message, updateChainInfo
    }
}
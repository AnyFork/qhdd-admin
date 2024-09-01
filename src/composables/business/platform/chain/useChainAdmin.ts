import { addChainAdmin, deleteChainAdmin, getChainAdminList, updateChainAdmin } from "@/service/platform/chain"
import { DataTableColumns, NPopconfirm, NPopover, NSwitch, NButton, FormItemRule } from "naive-ui"
import InputNumberColumn from '@/components/dynamic/InputNumberColumn.vue'

/**
 * 连锁店管理员
 * @returns 
 */
export const useChainAdmin = () => {
    const tableData = ref<chain.chainAdmin[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()
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
    const rowNode = ref<chain.chainAdmin>()

    /**
     * 表单对象
     */
    const model = reactive<Partial<chain.chainAdmin>>({
        realname: '',
        mobile: '',
        password: '',
        status: 1,
        displayorder: 0
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<chain.chainAdmin>>({
        isDelete: undefined,
        realname: undefined,
        mobile: undefined,
        status: undefined
    })

    /**
     * 表单校验规则
     */
    const rules = {
        realname: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入管理员名称')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        mobile: [{
            required: true,
            trigger: ['input', 'blur'],
            validator: (_rule: FormItemRule, value: string) => {
                if (!value) {
                    return new Error('管理员电话号码不能为空')
                } else if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
                    // 电话号码正则校验
                    return new Error('请输入合法的电话号码')
                } else {
                    return true
                }
            }
        }],
        password: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入登录密码')
                    }
                },
                trigger: ['input', 'blur']
            }
        ]
    }

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<chain.chainAdmin>>([
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
            title: '管理员姓名',
            align: 'center',
            className: 'flex-row-center',
            key: 'realname'
        },
        {
            title: '手机号码',
            align: 'center',
            key: 'mobile'
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
                                    updateChainAdminInfo({ id: rowData.id, status: 1 }, () => chainAdminList())
                                } else {
                                    updateChainAdminInfo({ id: rowData.id, status: 0 }, () => chainAdminList())
                                }
                            }
                        },
                        {
                            default: () => (rowData.status == 1 ? '您确定禁用吗,禁用后将无法在连锁店平台登录' : '您确定启用吗,启用将正常在连锁店平台登录'),
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
                                updateChainAdminInfo({ id: rowData.id, displayorder: value }, () => chainAdminList())
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
                                    updateChainAdminInfo({ id: rowData.id, isDelete: 0 }, () => chainAdminList())
                                }
                            },
                            {
                                default: () => '您确定要从回收站回收管理员账号吗',
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
                                    deleteChainAdminInfo(rowData.id!)
                                }
                            },
                            {
                                default: () => '您确定要彻底删除此账户吗',
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
                                        updateChainAdminInfo({ id: rowData.id, isDelete: 1 }, () => chainAdminList())
                                    }
                                },
                                {
                                    default: () => '您确定要删除此账户吗,删除后用户将进入回收站',
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
     * 获取连锁店管理员列表
     */
    const chainAdminList = async () => {
        try {
            loading.value = true
            const { data } = await getChainAdminList({ pageNo: pagination.page, pageSize: pagination.pageSize, sortType: 3, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as chain.chainAdmin[]
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
    * 获取连锁店管理员下拉列表
    */
    const chainAdminSelect = async () => {
        try {
            loading.value = true
            const { data } = await getChainAdminList({ pageNo: 1, pageSize: 1000, sortType: 3, isDelete: 0 })
            loading.value = false
            if (data.code == 200) {
                const temp = data.data as chain.chainAdmin[]
                return temp.map(item => {
                    return {
                        label: item.realname,
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
    * 修改连锁店管理员信息
    */
    const updateChainAdminInfo = async (params: Partial<chain.chainAdmin>, fn?: Function) => {
        try {
            loading.value = true
            const { data } = await updateChainAdmin(params)
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
     * 新增连锁店管理员信息
     */
    const addChainAdminInfo = async (params: Partial<chain.chainAdmin>) => {
        try {
            loading.value = true
            const { data } = await addChainAdmin(params)
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
     * 彻底删除连锁店管理员信息
     */
    const deleteChainAdminInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteChainAdmin(id)
            loading.value = false
            if (data.code == 200) {
                message.success("删除成功", {
                    onLeave() {
                        chainAdminList()
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

    return { chainAdminList, searchForm, tableData, message, loading, pagination, columns, updateChainAdminInfo, rowNode, createModal, updateModal, addChainAdminInfo, model, rules, chainAdminSelect }
}
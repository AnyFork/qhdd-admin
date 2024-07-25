
import { addPrinter, printerList, removePrinter, updatePrinter } from '@/service/store/device/device'
import { DataTableColumns, FormInst, FormItemRule, NButton, NPopover, NSwitch, NTag } from 'naive-ui'

/**
 * 商家设备
 * @returns 
 */
export const useStoreDevice = () => {
    const tableData = ref<store.storeData[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()
    const { storeInfo } = useStoreInfo()

    /**
     * 当前选中的节点
     */
    const rowNode = ref<store.printer>()

    /**
     * 当前店铺id
     */
    const sid = computed(() => storeInfo.value.id)

    /**
     * 新增dialog状态
     */
    const CreateShow = ref(false)

    /**
     * 修改dialog状态
     */
    const UpdateShow = ref(false)

    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)

    /**
     * 表单数据
     */
    const moduleValue = reactive<Partial<store.printer>>({
        id: undefined,
        sid: sid.value,
        name: undefined,
        status: 1,
        deviceType: "printer",
        type: "spyun",
        printNo: undefined,
        key: undefined,
        memberCode: undefined,
        apiKey: undefined,
        printNums: 1,
        isPrintAll: 1,
        printFooter: undefined,
        printHeader: undefined,
        qrcodeType: "custom",
        qrcodeLink: undefined
    })

    /**
     * 表单校验规则
     */
    const rules = {
        name: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入设备名称')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        printNo: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入机器号')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        key: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入打印机KEY')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        memberCode: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入appId')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        apiKey: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入打印机appSecret')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        qrcodeLink: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入打印机二维码链接地址')
                    }
                },
                trigger: ['input', 'blur']
            }
        ]
    }

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<store.printer>>([
        {
            title: '编号',
            width: 100,
            align: 'center',
            key: 'id'
        },
        {
            title: '设备品牌',
            width: 200,
            align: 'center',
            key: 'type',
            render(_rowData, _rowIndex) {
                return h(NTag, { type: "warning" }, { default: () => "商鹏云打印机" })
            },
        },
        {
            title: '设备名称',
            align: 'center',
            key: 'name'
        },
        {
            title: '打印联数',
            align: 'center',
            key: 'printNums'
        },
        {
            title: '打印机状态',
            align: 'center',
            key: 'onlineStatus',
            render(rowData, _rowIndex) {
                return h(NTag, { type: rowData.onlineStatus == 1 ? "primary" : "warning" }, { default: () => rowData.onlineStatus == 1 ? "在线" : "离线" })
            }
        },
        {
            title: "设备状态",
            align: 'center',
            key: 'status',
            render(rowData, _rowIndex) {
                if (isAdmin.value) {
                    return renderPopConfirm(
                        h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, { checked: () => "启用", unchecked: () => "禁用" }),
                        '您确定修改打印机状态,禁用后将无法打印订单',
                        async () => {
                            if (rowData.status == 1) {
                                await updatePrinterInfo({ id: rowData.id, status: 0 })
                            } else {
                                await updatePrinterInfo({ id: rowData.id, status: 1 })
                            }
                            // 刷新数据
                            printerListInfo()
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: "最后修改时间",
            align: 'center',
            key: 'updatetime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.updatetime)
            }
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            render(rowData) {
                if (isAdmin.value) {
                    return [renderPopConfirm(
                        h(NButton, {
                            size: 'small',
                            type: 'error',
                            style: {
                                marginLeft: '10px'
                            }
                        }, { default: () => '删除' }
                        ),
                        '您确定要删除此打印机吗?',
                        async () => {
                            removePrinterInfo(rowData.id!)
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
                                UpdateShow.value = true
                            }
                        },
                        { default: () => '编辑' }
                    )]
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
                                        { default: () => '编辑' }
                                    )
                            }
                        )
                    ]
                }
            }
        }
    ])

    /**
     * 获取打印机列表数据
     */
    const printerListInfo = async () => {
        try {
            loading.value = true
            const { data } = await printerList({ pageNo: 1, pageSize: 20, sid: sid.value })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data
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
     * 修改打印机
     * @param params 打印机信息
     */
    const updatePrinterInfo = async (params: Partial<store.printer>) => {
        try {
            loading.value = true
            const { data } = await updatePrinter(params)
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
     * 删除打印机
     * @param ID 打印机id
     */
    const removePrinterInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await removePrinter(id)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        printerListInfo()
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
     * 新增打印机
     */
    const addPrinterInfo = async (params: Partial<store.printer>) => {
        try {
            loading.value = true
            const { data } = await addPrinter(params)
            loading.value = false
            if (data.code == 200) {
                message.success('操作成功!')
            } else {
                message.error(data.msg)
            }
        } catch (error: any) {
            console.log(error)
            message.error(error.message)
        }
    }

    return { printerListInfo, tableData, loading, columns, formRef, moduleValue, rules, addPrinterInfo, message, CreateShow, updatePrinterInfo, rowNode, UpdateShow }
}
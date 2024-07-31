import { bindStoreClerkInfo, removeStoreClerkInfo, storeClerkList, updateBindStoreClerkInfo, updateStoreAccountStatus } from '@/service/store/storeClerk'
import { DataTableColumns, FormInst, FormItemRule, NAvatar, NButton, NPopconfirm, NPopover, NSwitch, NTag } from 'naive-ui'
/**
 * 店员店铺管理信息
 * @returns 
 */
export const useStoreClerk = () => {
    const tableData = ref([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()
    const { storeInfo } = useStoreInfo()
    // 当前店铺id
    const sid = computed(() => storeInfo.value.id)
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
            getStoreClerkList()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getStoreClerkList()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })
    /**
     * 修改dialog状态
     */
    const modifyShow = ref(false)
    /**
     * 当前选中的节点
     */
    const rowNode = ref<store.clerk>()
    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)
    /**
     * 表单数据
     */
    const moduleValue = reactive<Partial<store.storeClerk>>({ sid: undefined, clerkId: undefined })
    /**
     * 表单校验规则
     */
    const rules = {
        sid: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请选择绑定的门店名')
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
    const columns = ref<DataTableColumns<store.storeClerk>>([
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
            title: '微信昵称',
            align: 'center',
            key: 'nickname',
            render: (rowData, _index: number) => {
                return rowData.clerk.nickname
            }
        },
        {
            title: '姓名',
            align: 'center',
            key: 'title',
            render: (rowData, _index: number) => {
                return rowData.clerk.title
            }
        },
        {
            title: '电话号码',
            align: 'center',
            key: 'mobile',
            render: (rowData, _index: number) => {
                return rowData.clerk.mobile
            }
        },
        {
            title: '微信模版消息',
            align: 'center',
            key: 'weChat',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    try {
                        const obj = rowData.extra ? JSON.parse(rowData.extra) : ''
                        rowData.weChat = obj.accept_wechat_notice || 0
                    } catch (e: any) {
                        rowData.weChat = 0
                    }
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: async () => {
                                if (rowData.weChat == 1) {
                                    await updateStoreClerkInfo({ id: rowData.id, sid: sid.value as number, extra: JSON.stringify({ accept_wechat_notice: 0, accept_voice_notice: rowData.voice }) })
                                } else {
                                    await updateStoreClerkInfo({ id: rowData.id, sid: sid.value as number, extra: JSON.stringify({ accept_wechat_notice: 1, accept_voice_notice: rowData.voice }) })
                                }
                                getStoreClerkList()
                            }
                        },
                        {
                            default: () => '您确定修改微信模版消息状态码',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.weChat }, { checked: () => "开启", unchecked: () => "关闭" })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非店铺管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.weChat, disabled: true }, {}) })
                }
            }
        },
        {
            title: '语音电话提醒',
            align: 'center',
            key: 'voice',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    try {
                        const obj = rowData.extra ? JSON.parse(rowData.extra) : ''
                        rowData.voice = obj.accept_voice_notice || 0
                    } catch (e: any) {
                        rowData.voice = 0
                        console.log(e)
                    }
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: async () => {
                                if (rowData.voice == 1) {
                                    await updateStoreClerkInfo({ id: rowData.id, sid: sid.value as number, extra: JSON.stringify({ accept_wechat_notice: rowData.weChat, accept_voice_notice: 0 }) })
                                } else {
                                    await updateStoreClerkInfo({ id: rowData.id, sid: sid.value as number, extra: JSON.stringify({ accept_wechat_notice: rowData.weChat, accept_voice_notice: 1 }) })
                                }
                                getStoreClerkList()
                            }
                        },
                        {
                            default: () => '您确定修改语音消息状态吗',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.voice }, { checked: () => "开启", unchecked: () => "关闭" })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非店铺管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.voice, disabled: true }, {}) })
                }
            }
        },
        {
            title: '客服工作状态',
            key: 'kefuStatus',
            align: 'center',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: async () => {
                                if (rowData.kefuStatus == 1) {
                                    await updateStoreClerkInfo({ id: rowData.id, sid: sid.value as number, kefuStatus: 0 })
                                } else {
                                    await updateStoreClerkInfo({ id: rowData.id, sid: sid.value as number, kefuStatus: 1 })
                                }
                                getStoreClerkList()
                            }
                        },
                        {
                            default: () => '您确定修改此客服工作状态吗',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.kefuStatus }, { checked: () => "在线", unchecked: () => "忙碌" })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非店铺管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.kefuStatus, disabled: true }, {}) })
                }
            }
        },
        {
            title: "账号状态",
            key: 'status',
            align: 'center',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: async () => {
                                if (rowData.clerk.status == 1) {
                                    await updateStoreAccountStatus(rowData.clerk.id, 0)
                                } else {
                                    await updateStoreAccountStatus(rowData.clerk.id, 1)
                                }
                                // 刷新数据
                                getStoreClerkList()
                            }
                        },
                        {
                            default: () => '您确定修改此店员账号状态吗,禁止后店员将无法登录后台和小程序',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.clerk.status }, {})
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.clerk.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '角色',
            align: 'center',
            key: 'role',
            render(rowData, _rowIndex) {
                return h(NTag, { type: "primary" }, { default: () => rowData.role == "clerk" ? "店员" : "管理员" })
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
                        rowData.role == "clerk" ? h(
                            NPopconfirm,
                            {
                                onPositiveClick: async () => {
                                    await updateStoreClerkInfo({ id: rowData.id, role: "manager" })
                                    getStoreClerkList()
                                }
                            },
                            {
                                default: () => '您确定要将此店员设置为店铺管理员吗?',
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
                                        { default: () => '管理员' }
                                    )
                            }
                        ) : "",
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    deleteStoreClerkInfo(rowData.id)
                                }
                            },
                            {
                                default: () => '您确定要删除此店员吗,删除后此店员无法操作此门店。',
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
                    ]
                } else {
                    return [
                        h(
                            NPopover,
                            {},
                            {
                                default: () => '非店铺管理员账号禁止绑定店员信息',
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
                                        { default: () => '绑定' }
                                    )
                            }
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
     * 获取店员绑定关联列表
     */
    const getStoreClerkList = async () => {
        try {
            loading.value = true
            const { data } = await storeClerkList({ pageNo: pagination.page, pageSize: pagination.pageSize, sid: sid.value })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data
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
    * 绑定店员信息
    * @param params 店员信息
    */
    const addStoreClerkInfo = async (params: Partial<store.storeClerk>) => {
        try {
            loading.value = true
            const { data } = await bindStoreClerkInfo(params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!')
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
     * 修改店员绑定关系信息
     * @param params 店员信息
     */
    const updateStoreClerkInfo = async (params: Partial<store.storeClerk>) => {
        try {
            loading.value = true
            const { data } = await updateBindStoreClerkInfo(params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!')
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
     * 解绑店员
     * @param ID 店员id
     */
    const deleteStoreClerkInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await removeStoreClerkInfo(id)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!')
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    return { getStoreClerkList, addStoreClerkInfo, updateStoreClerkInfo, deleteStoreClerkInfo, pagination, tableData, loading, columns, formRef, moduleValue, rules, message, rowNode, modifyShow }
}

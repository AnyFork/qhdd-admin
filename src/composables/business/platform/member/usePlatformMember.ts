import { getMemberList, addMember, updateMember, deleteMember } from '@/service/platform/customer'
import { DataTableColumns, FormInst, FormItemRule, NButton, NPopconfirm, NPopover } from 'naive-ui'

/**
 * 平台会员等级
 * @returns 
 */
export const usePlatformMember = () => {
    const tableData = ref<member.level[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()

    /**
     * 店铺信息
     */
    const rowNode = ref<member.level>()

    /**
     * 表格分页配置
     */
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
        showSizePicker: true,
        pageSizes: [10, 15, 20, 25, 30, 50, 100, 200, 1000],
        onChange: (page: number) => {
            pagination.page = page
            memberListData()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            memberListData()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<member.level>>({
        levelName: undefined,
        level: undefined,
        redpacketAmount: undefined,
        redpacketCount: undefined,
        redpacketDayLimit: undefined,
        conditionValue: undefined,
        conditionType: undefined,
        conditionDesp: undefined,
        benefitsDesp: undefined,
        benefitsCount: undefined
    })
    /**
     * 新增drawer状态
     */
    const CreateShow = ref(false)
    /**
     * 编辑drawer状态
     */
    const EditShow = ref(false)
    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)
    /**
     * 表单数据
     */
    const moduleValue = reactive<Partial<member.level>>({
        id: undefined,
        levelName: undefined,
        level: undefined,
        redpacketAmount: undefined,
        redpacketCount: undefined,
        redpacketDayLimit: undefined,
        conditionValue: undefined,
        conditionType: 1,
        conditionDesp: undefined,
        benefitsDesp: undefined,
        benefitsCount: undefined,
        redpacketUseAmountLimit: undefined
    })
    /**
     * 表单校验规则
     */
    const rules = {
        level: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员等级名称')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        conditionValue: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员条件值')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        conditionDesp: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员等级条件描述信息')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        redpacketCount: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员可领取红包次数')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        redpacketAmount: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员可领取红包金额')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        redpacketDayLimit: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员领取红包有效期天数')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        benefitsCount: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员权益数量')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        benefitsDesp: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入会员权益描述')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        redpacketUseAmountLimit: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入红包使用条件限制')
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
    const columns = ref<DataTableColumns<member.level>>([
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
            title: '会员等级名称',
            width: 100,
            align: 'center',
            fixed: 'left',
            key: 'levelName'
        },
        {
            title: '会员等级条件类型',
            width: 100,
            align: 'center',
            fixed: 'left',
            key: 'conditionType',
            render: (rowData, _index: number) => {
                return rowData.conditionType == 1 ? "消费金额" : "消费次数"
            }
        },
        {
            title: '会员等级条件值',
            width: 100,
            align: 'center',
            key: 'conditionValue',
            render: (rowData, _index: number) => {
                return rowData.conditionType == 1 ? rowData.conditionValue + "元" : rowData.conditionValue + "次"
            }
        },
        {
            title: '会员等级条件描述',
            width: 120,
            align: 'center',
            key: 'conditionDesp'
        },
        {
            title: '可领取红包次数',
            width: 100,
            align: 'center',
            key: 'redpacketCount',
            render: (rowData, _index: number) => {
                return rowData.redpacketCount + "次"
            }
        },
        {
            title: '红包金额限制',
            width: 100,
            align: 'center',
            key: 'redpacketUseAmountLimit',
            render: (rowData, _index: number) => {
                return rowData.redpacketUseAmountLimit + "元"
            }
        },
        {
            title: '可领取红包金额',
            width: 100,
            align: 'center',
            key: 'redpacketAmount',
            render: (rowData, _index: number) => {
                return rowData.redpacketAmount + "元"
            }
        },
        {
            title: '领取红包有效期天数',
            width: 100,
            align: 'center',
            key: 'redpacketDayLimit',
            render: (rowData, _index: number) => {
                return rowData.redpacketDayLimit + "天"
            }
        },
        {
            title: "会员权益数量",
            width: 100,
            align: 'center',
            key: 'benefitsCount',
            render: (rowData, _index: number) => {
                return rowData.benefitsCount + "个"
            }
        },
        {
            title: "会员权益描述",
            width: 120,
            align: 'center',
            key: 'benefitsDesp'
        },
        {
            title: '创建日期',
            width: 100,
            align: 'center',
            key: 'createTime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.createTime)
            }
        },
        {
            title: '更新日期',
            width: 100,
            align: 'center',
            key: 'updateTime',
            render(rowData, _rowIndex) {
                return transformTimestampsToDateString(rowData.updateTime)
            }
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 120,
            render(rowData) {
                if (isAdmin.value) {
                    return [
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'primary',
                                onClick: () => {
                                    rowNode.value = rowData
                                    EditShow.value = true
                                }
                            },
                            { default: () => '编辑' }
                        ),
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    deleteMemberInfo(rowData.id)
                                }
                            },
                            {
                                default: () => '您确定要删除此会员等级规则吗?',
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
                                default: () => '非系统管理员账号禁止编辑',
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
     * 获取会员等级规则列表
     */
    const memberListData = async () => {
        try {
            loading.value = true
            const { data } = await getMemberList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            console.log(data)
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
    * 增加会员等级规则
    * @param params 会员信息
    */
    const addMemberInfo = async (params: Partial<member.level>) => {
        try {
            loading.value = true
            params.levelName = params.level + "级"
            const { data } = await addMember(params)
            loading.value = false
            if (data.code == 200) {
                message.success('添加成功!')
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
     * 修改会员等级规则
     * @param params 商户信息
     */
    const updateMemberInfo = async (params: Partial<member.level>) => {
        try {
            loading.value = true
            params.levelName = params.level + "级"
            const { data } = await updateMember(params)
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
     * 删除会员等级规则
     * @param ID 商户id
     */
    const deleteMemberInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await deleteMember(id)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        memberListData()
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

    return {
        memberListData, pagination, tableData, loading, columns, formRef, moduleValue, rules, updateMemberInfo, message, CreateShow, EditShow, searchForm, rowNode, addMemberInfo
    }
}
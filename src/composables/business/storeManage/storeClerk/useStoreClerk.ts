import { store, system } from '@/types/api'
import { deleteAdmin, updateAdmin } from '@/utils'
import { DataTableColumns, FormInst, FormItemRule, NAvatar, NButton, NPopconfirm, NPopover, NSwitch } from 'naive-ui'
import qs from 'qs'

export const useStoreClerk = () => {
    const tableData = ref([])
    const { $axios } = useInstance()
    const message = useMessage()
    const loading = ref(false)
    const userInfo = getUserInfo()
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
            clerkList()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            clerkList()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })
    /**
     * 查询条件
     */
    const searchForm = reactive({
        name: undefined,
        roleId: undefined
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
                validator(rule: FormItemRule, value: string) {
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
            render: (rowData, index: number) => {
                return `${(pagination.page - 1) * pagination.pageSize + index + 1}`
            }
        },
        {
            title: '微信昵称',
            align: 'center',
            key: 'nickname'
        },
        {
            title: '微信图像',
            key: 'avatar',
            align: 'center',
            render: (rowData, index: number) => {
                return h(NAvatar, { src: rowData.avatar, round: true })
            }
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
            title: '所属门店',
            align: 'center',
            key: 'bindUid'
        },
        {
            title: '工作状态',
            key: 'status',
            align: 'center',
            render: (rowData, index: number) => {
                if (userInfo?.roleName === '系统管理员') {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.status == 1) {
                                    updateClerkInfo({ id: rowData.id, status: 0 })
                                } else {
                                    updateClerkInfo({ id: rowData.id, status: 1 })
                                }
                            }
                        },
                        {
                            default: () => '您确定修改此店员工作状态吗',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, {})
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '创建日期',
            align: 'center',
            key: 'addtime',
            render(rowData, rowIndex) {
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
                if (userInfo?.roleName === '系统管理员') {
                    return [
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    rowNode.value = rowData
                                    modifyShow.value = true
                                }
                            },
                            {
                                default: () => '您确定要修改此用户账号吗?',
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
                                        { default: () => '绑定' }
                                    )
                            }
                        ),
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    updateClerkInfo({ id: rowData.id, isDelete: 1 })
                                }
                            },
                            {
                                default: () => '您确定要删除此店员吗,删除后数据将进入回收站。',
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
                                default: () => '非系统管理员账号禁止绑定店员信息',
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
     * 获取店员列表
     */
    const clerkList = async () => {
        try {
            loading.value = true
            const { data } = await $axios.get(`${getClerk}?${qs.stringify({ pageNo: pagination.page, pageSize: pagination.pageSize, type: 1, isDelete: 0 })}`)
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
            const { data } = await $axios.post(bindStoreClerk, params)
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
            const { data } = await $axios.post(updateBindStoreClerk, params)
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
            const { data } = await $axios.post(removeStoreClerk, { id })
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

    return { clerkList, addStoreClerkInfo, updateStoreClerkInfo, deleteStoreClerkInfo, pagination, tableData, loading, columns, formRef, moduleValue, rules, $axios, message, rowNode, modifyShow, searchForm }
}

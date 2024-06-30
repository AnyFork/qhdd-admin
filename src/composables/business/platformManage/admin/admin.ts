import { system } from '@/types/api'
import { deleteAdmin, updateAdmin } from '@/utils'
import { DataTableColumns, FormInst, FormItemRule, NAvatar, NButton, NPopconfirm, NPopover, NSwitch } from 'naive-ui'

interface adminForm {
    id?: number
    name: string
    phone?: string
    avatar?: string
    password?: string
    reenteredPassword?: string
    roleId?: number
}
export const useAdmin = () => {
    const tableData = ref([])
    const { $axios } = useInstance()
    const message = useMessage()
    const loading = ref(false)
    const userInfo = getUserInfo()
    const pagination = reactive({
        page: 1,
        pageSize: 10,
        itemCount: 0,
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
     * 角色下拉列表
     */
    const rolesSelectOptions = ref<Array<{}>>([])
    /**
     * 新增dialog状态
     */
    const CreateShow = ref(false)
    /**
     * 修改dialog状态
     */
    const modifyShow = ref(false)
    /**
     * 当前选中的节点
     */
    const rowNode = ref<system.adminInfo>()
    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)
    /**
     * 表单数据
     */
    const moduleValue = reactive<adminForm>({
        id: undefined,
        name: '',
        phone: '',
        avatar: '',
        password: '',
        reenteredPassword: '',
        roleId: undefined
    })
    /**
     * 表单校验规则
     */
    const rules = {
        name: [
            {
                validator(rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入用户名')
                    } else if (value.length < 6 || value.length > 10) {
                        return new Error('用户名称长度6-10位')
                    } else if (/[^a-zA-Z]/g.test(value)) {
                        return new Error('用户名称只能输入英文字母')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        phone: [
            {
                validator(rule: FormItemRule, value: string) {
                    if (value) {
                        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                            return new Error('请输入正确格式的手机号码!')
                        }
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        password: {
            required: true,
            message: '请输入密码',
            trigger: ['input', 'blur']
        },
        reenteredPassword: [
            {
                required: true,
                message: '请再次输入密码',
                trigger: ['input', 'blur']
            },
            {
                validator: (rule: FormItemRule, value: string): boolean => {
                    return !!moduleValue.password && moduleValue.password.startsWith(value) && moduleValue.password.length >= value.length
                },
                message: '两次密码输入不一致',
                trigger: 'input'
            },
            {
                validator: (rule: FormItemRule, value: string): boolean => {
                    return value === moduleValue.password
                },
                message: '两次密码输入不一致',
                trigger: ['blur', 'password-input']
            }
        ],
        roleId: {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请选择角色')
                }
                return true
            },
            trigger: ['change', 'blur']
        }
    }
    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<system.adminInfo>>([
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
            title: '登录账号',
            width: 120,
            align: 'center',
            key: 'name'
        },
        {
            title: '用户图像',
            width: 100,
            key: 'avatar',
            align: 'center',
            render: (rowData, index: number) => {
                return h(NAvatar, { src: rowData.avatar, round: true })
            }
        },
        {
            title: '所属角色',
            align: 'center',
            key: 'roleName'
        },
        {
            title: '电话号码',
            align: 'center',
            key: 'phone'
        },
        {
            title: '账号状态',
            width: 100,
            key: 'status',
            align: 'center',
            render: (rowData, index: number) => {
                if (userInfo?.roleName === '系统管理员') {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.status == 1) {
                                    updateAdminInfo({ id: rowData.id, status: 2 })
                                } else {
                                    updateAdminInfo({ id: rowData.id, status: 1 })
                                }
                            }
                        },
                        {
                            default: () => (rowData.status == 1 ? '您确定禁用此用户账号吗,禁用后将无法登录平台' : '您确定启用此用户账号吗,启用后将正常登录平台'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 2, value: rowData.status }, {})
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 2, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '创建日期',
            align: 'center',
            key: 'createTime'
        },
        {
            title: '最后登录',
            align: 'center',
            key: 'loginTime'
        },
        {
            title: '登录次数',
            align: 'center',
            key: 'loginCount'
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
                                        { default: () => '修改' }
                                    )
                            }
                        ),
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    deleteAdminInfo(rowData.id)
                                }
                            },
                            {
                                default: () => '您确定要删除此用户账号吗?',
                                trigger: () =>
                                    h(
                                        NButton,
                                        {
                                            size: 'small',
                                            type: 'warning',
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
                                default: () => '非系统管理员账号禁止修改用户信息',
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
                                            type: 'warning',
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
     * 获取平台用户数据列表
     */
    const adminList = async () => {
        try {
            loading.value = true
            const { data } = await $axios.post(
                userList,
                { pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data
                pagination.itemCount = data.dataCount
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    /**
     * 修改平台用户信息
     * @param params 用户信息
     */
    const updateAdminInfo = async (params: Partial<system.adminInfo>) => {
        try {
            loading.value = true
            const { data } = await $axios.post(updateAdmin, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!')
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    /**
     * 删除平台用户信息
     * @param ID 用户id
     */
    const deleteAdminInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await $axios.post(
                deleteAdmin,
                { id },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        adminList()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    /**
     * 新增平台用户
     */
    const addAdminInfo = async () => {
        try {
            loading.value = true
            const { name, phone, avatar, password, roleId } = moduleValue
            const { data } = await $axios.post(
                addUser,
                { name, phone, avatar, password, roleId },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
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

    /**
     * 获取角色列表
     */
    const getRoleList = async () => {
        try {
            const { data } = await $axios.get(roleList)
            if (data.code == 200) {
                if (data.data) {
                    data.data.forEach((item: { name: String; id: number }) => {
                        rolesSelectOptions.value.push({ label: item.name, value: item.id })
                    })
                }
            } else {
                message.error(data.msg)
            }
        } catch (error: any) {
            console.log(error)
            message.error(error.message)
        }
    }

    /**
     * 当页码发生变化时
     */
    const pageChange = (page: number) => {
        pagination.page = page
        adminList()
    }

    return { adminList, updateAdminInfo, pagination, tableData, loading, columns, formRef, moduleValue, rules, addAdminInfo, $axios, message, rowNode, CreateShow, modifyShow, pageChange, getRoleList, rolesSelectOptions, searchForm }
}

import { system } from '@/types/api'
import { DataTableColumns, FormInst, FormItemRule, NButton, NImage, NPopconfirm, NPopover, NSwitch } from 'naive-ui'
import qs from 'qs'
const previewUrl = import.meta.env.VITE_PREVIEW_IMG_PREVIEW

export const useCategory = () => {
    const tableData = ref<system.rowData[]>([])
    const { $axios } = useInstance()
    const message = useMessage()
    const loading = ref(false)
    const userInfo = getUserInfo()
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
    const rowNode = ref<system.category>()
    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)
    /**
     * 表单数据
     */
    const moduleValue = reactive<Partial<system.category>>({
        id: undefined,
        parentid: undefined,
        title: '',
        thumb: undefined,
        displayorder: undefined,
        status: 0,
        type: undefined
    })
    /**
     * 表单校验规则
     */
    const rules = {
        title: [
            {
                validator(rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入分类名称')
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
    const columns = ref<DataTableColumns<system.rowData>>([
        {
            title: '图标',
            align: 'center',
            key: 'thumb',
            className: "flex-row-center",
            render: (rowData, index: number) => {
                return rowData.thumb ? h(NImage, { src: previewUrl + rowData.thumb, width: "100%", height: "100%", style: { width: "50px", height: "50px", borderRadius: "6px" } }) : "";
            }
        },
        {
            title: '分类名称',
            key: 'title',
            align: 'center'
        },
        {
            title: '排序',
            align: 'center',
            key: 'displayorder'
        },
        {
            title: '小程序显示状态',
            key: 'status',
            align: 'center',
            render: (rowData, index: number) => {
                if (userInfo?.roleName === '系统管理员') {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.status == 1) {
                                    updateCategoryInfo({ id: rowData.id, status: 0 })
                                } else {
                                    updateCategoryInfo({ id: rowData.id, status: 1 })
                                }
                            }
                        },
                        {
                            default: () => (rowData.status == 1 ? '您确定禁用此分类吗,禁用后将无法在小程序展示' : '您确定启用此分类吗,启用后将正常显示在小程序'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, {})
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            className: 'flex-row-center',
            render(rowData) {
                if (userInfo?.roleName === '系统管理员') {
                    return h('div', {}, {
                        default: () =>
                            [
                                rowData.parentid == 0 ? h(
                                    NButton,
                                    {
                                        size: 'small',
                                        type: 'default',
                                        style: {
                                            marginLeft: '10px',
                                            width: '60px !important'
                                        },
                                        onClick: () => {
                                            CreateShow.value = true
                                            moduleValue.parentid = rowData.id
                                            moduleValue.title = rowData.title
                                            moduleValue.type = rowData.type
                                        }
                                    },
                                    { default: () => '子分类' }
                                ) : '',
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
                                            modifyShow.value = true
                                            rowNode.value = rowData
                                        }
                                    },
                                    { default: () => '修改' }
                                ),
                                rowData.parentid !== 0 ? h(
                                    NPopconfirm,
                                    {
                                        onPositiveClick: () => {
                                            deleteCategoryInfo(rowData.id)
                                        }
                                    },
                                    {
                                        default: () => '您确定要删除此分类吗?',
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
                                ) : ""
                            ]
                    })
                } else {
                    return h('div', {}, {
                        default: () =>
                            [
                                rowData.parentid == 0 ? h(
                                    NButton,
                                    {
                                        size: 'small',
                                        type: 'info',
                                        style: {
                                            marginLeft: '10px',
                                            cursor: 'not-allowed',
                                            opacity: 0.5,
                                            width: '60px !important'
                                        }
                                    },
                                    { default: () => '子分类' }
                                ) : "",
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
                                rowData.parentid !== 0 ? h(
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
                                ) : ""
                            ]
                    })
                }
            }
        }
    ])

    /**
     * 获取平台分类数据列表(树形结构)
     */
    const storeCategoryListTree = async () => {
        try {
            loading.value = true
            const { data } = await $axios.get(`${categoryTree}?${qs.stringify({ pageNo: 1, pageSize: 100, sortType: 14 })}`)
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data
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
     * 获取平台子分类数据列表
     */
    const storeCategoryList = async (parentid: 1 | 2 | 3) => {
        try {
            loading.value = true
            const { data } = await $axios.get(`${storeCategory}?${qs.stringify({ pageNo: 1, pageSize: 100, sortType: 14, parentid })}`)
            loading.value = false
            if (data.code == 200) {
                return data.data as system.category[]
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
     * 修改分类 
     */
    const updateCategoryInfo = async (params: Partial<system.category>) => {
        try {
            loading.value = true
            const { data } = await $axios.post(updateCategory, params, {
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
     * 删除分类
     * @param ID 分类id
     */
    const deleteCategoryInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await $axios.post(
                removeCategory,
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
                        storeCategoryListTree()
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
     * 新增子分类
     */
    const addCateGoryInfo = async () => {
        try {
            loading.value = true
            const { parentid, thumb, displayorder, type, status, title } = moduleValue
            const { data } = await $axios.post(
                addCategory,
                { parentid, thumb, displayorder, type, status, title },
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

    return { storeCategoryListTree, storeCategoryList, updateCategoryInfo, tableData, loading, columns, formRef, moduleValue, rules, addCateGoryInfo, $axios, message, rowNode, CreateShow, modifyShow, previewUrl }
}
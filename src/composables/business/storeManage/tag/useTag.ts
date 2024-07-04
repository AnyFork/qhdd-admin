import InputNumberColumn from '@/components/common/dynamic/InputNumberColumn.vue'
import InputTextColumn from '@/components/common/dynamic/InputTextColumn.vue'
import SelectColorColumn from '@/components/common/dynamic/SelectColorColumn.vue'
import SelectOptionColumn from '@/components/common/dynamic/SelectOptionColumn.vue'
import { store } from '@/types/api'
import { DataTableColumns, NButton, NPopconfirm, NPopover } from 'naive-ui'

export const useTag = () => {
    const tableData = ref<store.category[]>([])
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
        type: undefined
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<store.category>>([
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
            title: '标签名称',
            width: 200,
            align: 'center',
            key: 'title',
            render: (rowData, index: number) => {
                return h(InputTextColumn, {
                    value: rowData.title,
                    bgColor: rowData.color,
                    textColor: rowData.textColor,
                    placeholder: "请输入分类名称",
                    editable: rowData.id == undefined,
                    onUpdateValue: (value: string) => {
                        rowData.title = value
                    }
                })
            }
        },
        {
            title: '排序',
            width: 150,
            key: 'displayorder',
            align: 'center',
            render: (rowData, index: number) => {
                return h(InputNumberColumn, {
                    value: rowData.displayorder,
                    editable: rowData.id == undefined,
                    onUpdateValue: (value: number) => {
                        rowData.displayorder = value
                    }
                })
            }
        },
        {
            title: '背景颜色',
            align: 'center',
            key: 'color',
            render: (rowData, index: number) => {
                return h(SelectColorColumn, {
                    value: rowData.color,
                    onUpdateValue: (value: string) => {
                        rowData.color = value
                    }
                })
            }
        },
        {
            title: '文字颜色',
            align: 'center',
            key: 'textColor',
            render: (rowData, index: number) => {
                return h(SelectColorColumn, {
                    value: rowData.textColor,
                    onUpdateValue: (value: string) => {
                        rowData.textColor = value
                    }
                })
            }
        },
        {
            title: '账号状态',
            width: 200,
            key: 'type',
            align: 'center',
            render: (rowData, index: number) => {
                return h(SelectOptionColumn, {
                    value: rowData.type,
                    editable: rowData.id == undefined,
                    onUpdateValue: (value: store.category['type']) => {
                        rowData.type = value
                    }
                })
            }
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 180,
            render(rowData, index) {
                if (userInfo?.roleName === '系统管理员') {
                    return [
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'primary',
                                style: {
                                    marginLeft: '10px'
                                },
                                onClick: () => {
                                    if (rowData.id != undefined) {
                                        modifyCategoryInfo(rowData)
                                    } else {
                                        if (rowData.title && rowData.type) {
                                            createCategoryInfo(rowData)
                                        } else {
                                            message.error("标签名称和标签类型不能为空")
                                        }
                                    }
                                }
                            },
                            { default: () => rowData.id != undefined ? '修改' : "保存" }
                        ),
                        rowData.id != undefined ? h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    deleteCategoryInfo(rowData.id!)
                                }
                            },
                            {
                                default: () => '您确定要删除此标签吗?',
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
                        ) : h(
                            NButton,
                            {
                                size: 'small',
                                type: 'error',
                                style: {
                                    marginLeft: '10px'
                                },
                                onClick: () => {
                                    console.log(index);
                                    tableData.value = tableData.value.slice(0, index)
                                }
                            },
                            { default: () => '移除' }
                        )
                    ]
                } else {
                    return [
                        h(
                            NPopover,
                            {},
                            {
                                default: () => '非系统管理员账号禁止保存信息',
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
                                        { default: () => '保存' }
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
     * 获取标签列表
     */
    const categoryPageList = async () => {
        try {
            loading.value = true
            const { data } = await $axios.post(
                categoryList,
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
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    /**
     * 修改标签
     * @param 
     */
    const modifyCategoryInfo = async (rowData: store.category) => {
        try {
            loading.value = true
            const { id, title, color, textColor, displayorder, type } = rowData
            const { data } = await $axios.post(modifyCategory, { id, title, color, textColor, displayorder, type }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!', {
                    onLeave() {
                        categoryPageList()
                    },
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
     * 删除标签信息
     * @param ID 分类id
     */
    const deleteCategoryInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await $axios.post(
                deleteCategory,
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
                        categoryPageList()
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
     * 新增标签信息
     */
    const createCategoryInfo = async (rowData: store.category) => {
        try {
            loading.value = true
            const { title, color, textColor, displayorder, type } = rowData
            const { data } = await $axios.post(
                createCategory,
                { title, color, textColor, displayorder, type },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            loading.value = false
            if (data.code == 200) {
                message.success('操作成功!', {
                    onLeave() {
                        categoryPageList()
                    },
                })
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
        categoryPageList()
    }

    return { categoryPageList, pagination, tableData, loading, columns, createCategoryInfo, $axios, message, pageChange, searchForm }
}

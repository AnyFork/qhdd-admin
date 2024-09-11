import { addGoodsCategory, getGoodsCategoryList, removeGoodsCategory, updateGoodsCategory } from '@/service/store/goods/category'
import { DataTableColumns, FormInst, FormItemRule, NButton, NPopover, NSwitch } from 'naive-ui'
import InputNumberColumn from '@/components/dynamic/InputNumberColumn.vue'

/**
 * 店铺商品分类
 * @returns 
 */
export const useStoreGoodsCategory = (): any => {
    const tableData = ref<store.goodsCategoryTree[]>([])
    const flatData = ref<store.goodsCategory[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()
    const { storeInfo } = useStoreInfo()
    // 当前店铺id
    const sid = computed(() => storeInfo.value.id)
    /**
     * 新增dialog状态
     */
    const createShow = ref(false)
    /**
     * 修改dialog状态
     */
    const modifyShow = ref(false)
    /**
     * 当前选中的节点
     */
    const rowNode = ref<store.goodsCategory>()
    /**
     * 选中节点的父节点
     */
    const parentNode = ref<store.goodsCategory>()
    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)
    /**
     * 表单数据
     */
    const moduleValue = reactive<Partial<store.goodsCategory>>({
        title: undefined,
        description: undefined,
        thumb: undefined,
        minFee: 0,
        displayorder: 0,
        isShowtime: 0,
        startTime: undefined,
        endTime: undefined,
        week: undefined,
        parentid: undefined,
        weekStr: [],
        isRequired: 0,
        sid: sid.value
    })
    /**
     * 表单校验规则
     */
    const rules = {
        title: [
            {
                validator(_rule: FormItemRule, value: string) {
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
     * 创建子分类
     * @param rowData 
     * @param disabled 
     * @returns 
     */
    const subCategoryBtn = (rowData: store.goodsCategoryTree, disabled: boolean) => {
        if (!rowData.parentid) {
            if (disabled) {
                return renderPopover(h(NButton,
                    {
                        size: 'small',
                        type: 'default',
                        style: {
                            marginLeft: '10px',
                            cursor: 'not-allowed',
                            opacity: 0.5
                        }
                    },
                    { default: () => '子分类' }
                ), "非管理员禁止操作")
            } else {
                return h(NButton,
                    {
                        size: 'small',
                        type: 'default',
                        onClick: () => {
                            rowNode.value = rowData
                            createShow.value = true
                        }
                    },
                    { default: () => '子分类' }
                )
            }
        } else {
            return ""
        }
    }

    /**
     * 删除分类
     * @param rowData 
     * @param disabled 
     * @returns 
     */
    const deleteCategoryBtn = (rowData: store.goodsCategoryTree, disabled: boolean) => {
        if (disabled) {
            return renderPopover(h(NButton,
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
            ), "非管理员禁止操作")
        } else {
            return renderPopConfirm(h(NButton,
                {
                    size: 'small',
                    type: 'error'
                },
                { default: () => '删除' }
            ), "你确定要删除分类吗", async () => {
                await removeCategory(rowData.id)
                goodsCategoryTree()
            })
        }
    }

    /**
    * 修改分类
    * @param rowData 
    * @param disabled 
    * @returns 
    */
    const modifyCategoryBtn = (rowData: store.goodsCategoryTree, disabled: boolean) => {
        if (disabled) {
            return renderPopover(h(NButton,
                {
                    size: 'small',
                    type: 'primary',
                    style: {
                        marginLeft: '10px',
                        cursor: 'not-allowed',
                        opacity: 0.5
                    }
                },
                { default: () => '修改分类' }
            ), "非管理员禁止操作")
        } else {
            return h(NButton,
                {
                    size: 'small',
                    type: 'primary',
                    onClick: () => {
                        rowNode.value = rowData
                        parentNode.value = tableData.value.find(item => item.id == rowData.parentid)
                        modifyShow.value = true
                    }
                },
                { default: () => '修改分类' }
            )
        }
    }
    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<store.goodsCategoryTree>>([
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
            title: '分类ID',
            align: 'center',
            key: 'id'
        },
        {
            title: '分类名称',
            align: 'center',
            key: 'title'
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
                        onUpdateValue: async (value: number) => {
                            if (rowData.displayorder !== value) {
                                await updateCategory({ id: rowData.id, displayorder: value })
                                // 刷新数据
                                goodsCategoryTree()
                            }
                        }
                    })
                } else {
                    return rowData.displayorder
                }
            }
        },
        {
            title() {
                return renderEditableTitle("是否必点", "可编辑列")
            },
            key: 'isRequired',
            align: 'center',
            render: (rowData, _index: number) => {
                if (rowData.parentid) {
                    return ""
                } else {
                    if (isAdmin.value) {
                        return renderPopConfirm(
                            h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isRequired }, { checked: () => "是", unchecked: () => "否" }),
                            '您确定修改吗',
                            async () => {
                                if (rowData.isRequired == 1) {
                                    await updateCategory({ id: rowData.id, isRequired: 0 })
                                } else {
                                    await updateCategory({ id: rowData.id, isRequired: 1 })
                                }
                                // 刷新数据
                                goodsCategoryTree()
                            }
                        )
                    } else {
                        return h(NPopover, {}, { default: () => '非店铺管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isRequired, disabled: true }, {}) })
                    }
                }

            }
        },
        {
            title() {
                return renderEditableTitle("分类状态", "可编辑列")
            },
            key: 'status',
            align: 'center',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return renderPopConfirm(
                        h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, { checked: () => "是", unchecked: () => "否" }),
                        '您确定修改此分类状态吗,禁止后店员将无法在小程序展示',
                        async () => {
                            if (rowData.status == 1) {
                                await updateCategory({ id: rowData.id, status: 0 })
                            } else {
                                await updateCategory({ id: rowData.id, status: 1 })
                            }
                            // 刷新数据
                            goodsCategoryTree()
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '操作',
            key: 'actions',
            fixed: 'right',
            width: 240,
            className: 'flex items-center justify-end',
            render(rowData) {
                if (isAdmin.value) {
                    return h('div', { style: { display: "flex", gap: "10px" } }, {
                        default: () => {
                            return [
                                subCategoryBtn(rowData, false),
                                modifyCategoryBtn(rowData, false),
                                deleteCategoryBtn(rowData, false)
                            ]
                        }
                    })
                } else {
                    return h('div', { style: { display: "flex", gap: "10px" } }, {
                        default: () => {
                            return [
                                subCategoryBtn(rowData, true),
                                modifyCategoryBtn(rowData, true),
                                deleteCategoryBtn(rowData, true)
                            ]
                        }
                    })
                }
            }
        }
    ])
    /**
     * 递归转换数据
     * @param data 原始数据
     * @param parentId  父id
     * @returns 
     */
    const transformTreeData = (data: store.goodsCategoryTree[], parentId: number) => {
        return data.filter(item => {
            if (item.parentid == parentId) {
                const ch = transformTreeData(data, item.id)
                if (ch && ch.length > 0) {
                    item.children = ch
                }
                return true
            } else {
                return false
            }
        })
    }
    /**
     * 获取商品分类树形数据
     */
    const goodsCategoryTree = async () => {
        try {
            loading.value = true
            const { data } = await getGoodsCategoryList({ pageNo: 1, pageSize: 1000, sid: sid.value, sortType: 3 })
            loading.value = false
            if (data.code == 200) {
                flatData.value = data.data
                tableData.value = transformTreeData(data.data, 0)
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
    * 新增商品分类
    * @param params 分类信息
    */
    const addCategory = async (params: Partial<store.goodsCategory>) => {
        try {
            loading.value = true
            const { data } = await addGoodsCategory(params)
            loading.value = false
            if (data.code == 200) {
                message.success('添加成功')
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
     * 修改商品分类
     * @param params 分类信息
     */
    const updateCategory = async (params: Partial<store.goodsCategory>) => {
        try {
            loading.value = true
            const { data } = await updateGoodsCategory(params)
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
     * 删除商品分类
     * @param ID 分类id
     */
    const removeCategory = async (id: number) => {
        try {
            loading.value = true
            const { data } = await removeGoodsCategory(id)
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

    return { goodsCategoryTree, addCategory, updateCategory, tableData, flatData, loading, columns, formRef, moduleValue, rules, message, rowNode, modifyShow, createShow, parentNode }
}


import { addGoods, goodsList, removeGoods, updateGoods } from '@/service/store/goods/goods'
import { DataTableColumns, FormInst, FormItemRule, NButton, NImage, NPopover, NSwitch, NTag } from 'naive-ui'
import InputNumberColumn from '@/components/dynamic/InputNumberColumn.vue'

/**
 * 商家商品
 * @returns 
 */
export const useStoreGoods = () => {
    const tableData = ref<store.storeData[]>([])
    const { goodsCategoryTree, tableData: data, flatData } = useStoreGoodsCategory()
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()
    const { storeInfo } = useStoreInfo()
    /**
     * 当前选中的节点
     */
    const rowNode = ref<store.goods>()

    /**
     * 当前店铺id
     */
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
            goodsListData()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            goodsListData()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<store.goods>>({
        title: undefined,
        status: undefined,
        cid: undefined,
        childId: undefined,
        type: undefined
    })

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
    const moduleValue = reactive<Partial<store.goods>>({
        id: undefined,
        title: undefined,
        displayorder: 0,
        cid: undefined,
        childId: undefined,
        thumb: undefined,
        recommendReason: undefined,
        type: 1,
        price: 0,
        oldPrice: 0,
        boxPrice: 0,
        svipPrice: 0,
        orderLimit: 0,
        totalLimit: 0,
        totalAutoUpdate: 0,
        total: -1,
        totalWarning: 0,
        totalEveryday: 0,
        isShowtime: 0,
        startTime1: undefined,
        endTime1: undefined,
        startTime2: undefined,
        endTime2: undefined,
        week: undefined,
        isOptions: 0,
        isMaterials: 0,
        weight: undefined,
        unitname: undefined,
        description: undefined,
        label: undefined,
        totalUpdateType: 1,
        status: 1,
        isHot: 0,
        content: undefined,
        materialTitle: undefined,
        singleStatus: 0,
        weekStr: [],
        goodsOptionsList: [],
        goodsMaterialList: [],
        goodsAttrs: [],
        unitnum: 1
    })
    /**
     * 表单校验规则
     */
    const rules = {
        title: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入商品名称')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        cid: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请选择商品分类')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        thumb: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请选择商品图片')
                    }
                },
                trigger: ['input', 'blur']
            }
        ]
    }
    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<store.goods>>([
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
            title: '商品ID',
            width: 100,
            align: 'center',
            key: 'id'
        },
        {
            title: '商品图标',
            fixed: 'left',
            width: 160,
            align: 'center',
            className: 'flex-row-center',
            key: 'logo',
            render: (rowData, _index: number) => {
                return h(NImage, { src: previewUrl + rowData.thumb, width: 50, height: 50, class: 'rounded-6px' }, {})

            }
        },
        {
            title: '商品名称',
            fixed: 'left',
            width: 200,
            align: 'center',
            key: 'title'
        },
        {
            title: '售价(元)',
            align: 'center',
            key: 'price'
        },
        {
            title: '库存',
            align: 'center',
            key: 'total'
        },
        {
            title: '餐盒费',
            align: 'center',
            key: 'boxPrice'
        },
        {
            title: "已售",
            align: 'center',
            key: 'sailed'
        },
        {
            title: "商品类型",
            width: 140,
            align: 'center',
            key: 'type',
            render(rowData, _rowIndex) {
                if (rowData.type === 1) {
                    return h(NTag, { type: "primary" }, { default: () => "仅外卖" })
                }
                if (rowData.type === 2) {
                    return h(NTag, { type: "primary" }, { default: () => "仅店内" })
                }
                if (rowData.type === 3) {
                    return h(NTag, { type: "primary" }, { default: () => "外卖 + 店内" })
                }
            },
        },
        {
            title: "商品分类",
            width: 120,
            align: 'center',
            key: 'category',
            render(rowData, _rowIndex) {
                if (rowData.childId) {
                    return flatData.value.find((item: store.goodsCategory) => item.id == rowData.childId)?.title
                } else {
                    return flatData.value.find((item: store.goodsCategory) => item.id == rowData.cid)?.title
                }
            }
        },
        {
            title: "是否上架",
            width: 120,
            align: 'center',
            key: 'status',
            render(rowData, _rowIndex) {
                if (isAdmin.value) {
                    return renderPopConfirm(
                        h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, { checked: () => "是", unchecked: () => "否" }),
                        '您确定修改商品状态,禁止上架后店员将无法在小程序展示',
                        async () => {
                            if (rowData.status == 1) {
                                await updateGoodsInfo({ id: rowData.id, status: 0 })
                            } else {
                                await updateGoodsInfo({ id: rowData.id, status: 1 })
                            }
                            // 刷新数据
                            goodsListData()
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: "是否热销",
            width: 120,
            align: 'center',
            key: 'isHot',
            render(rowData, _rowIndex) {
                if (isAdmin.value) {
                    return renderPopConfirm(
                        h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isHot }, { checked: () => "是", unchecked: () => "否" }),
                        '您确定修改商品热销状态吗,',
                        async () => {
                            if (rowData.isHot == 1) {
                                await updateGoodsInfo({ id: rowData.id, isHot: 0 })
                            } else {
                                await updateGoodsInfo({ id: rowData.id, isHot: 1 })
                            }
                            // 刷新数据
                            goodsListData()
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isHot, disabled: true }, {}) })
                }
            }
        },
        {
            title: "审核状态",
            width: 120,
            align: 'center',
            key: 'auditStatus'
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
                                await updateGoodsInfo({ id: rowData.id, displayorder: value })
                                // 刷新数据
                                goodsListData()
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
            width: 180,
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
                        '您确定要删除此商品吗?',
                        async () => {
                            removeGoodsInfo(rowData.id!)
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
     * 获取商品列表数据
     */
    const goodsListData = async () => {
        try {
            loading.value = true
            const { data } = await goodsList({ pageNo: pagination.page, pageSize: pagination.pageSize, sid: sid.value, sortType: 3, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                console.log(data)
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
     * 修改商品
     * @param params 商品信息
     */
    const updateGoodsInfo = async (params: Partial<store.goods>) => {
        try {
            loading.value = true
            const { data } = await updateGoods(params)
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
     * 删除商品
     * @param ID 商品id
     */
    const removeGoodsInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await removeGoods(id)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        goodsListData()
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
     * 新增商品
     */
    const addGoodsInfo = async (params: Partial<store.goods>) => {
        try {
            loading.value = true
            const { data } = await addGoods({ ...params, sid: sid.value })
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

    return { goodsListData, pagination, tableData, loading, columns, formRef, moduleValue, rules, addGoodsInfo, message, CreateShow, searchForm, updateGoodsInfo, rowNode, UpdateShow, goodsCategoryTree, data }
}


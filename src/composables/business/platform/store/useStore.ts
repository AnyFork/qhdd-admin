import InputNumberColumn from '@/components/dynamic/InputNumberColumn.vue'
import SelectTagColumn from '@/components/dynamic/SelectTagColumn.vue'
import StoreLogo from '@/components/dynamic/StoreLogo.vue'
import { addStorePlatform, modifyStoreBatchPlatform, removeStorePlatform, storeListPlatform, storeListPlatformSelect, updateStorePlatform } from '@/service/platform/store'
import { DataTableColumns, DataTableRowKey, FormInst, FormItemRule, NButton, NPopconfirm, NPopover, NSwitch, NTag } from 'naive-ui'

/**
 * 平台商户
 * @returns 
 */
export const usePlatformStore = () => {
    const { categoryPageList, tableData: selectData } = usePlatformTag()
    const tableData = ref<store.storeData[]>([])
    const { routerPush } = useRouterPush()
    const dialog = useDialog()
    const { $axios } = useInstance()
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()
    const checkedRowKeysRef = ref<DataTableRowKey[]>([])
    const { storeInfo, storeInfoFrom } = useStoreInfo()
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
            storeListData()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            storeListData()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })
    /**
     * 商户标签
     */
    const shopOption = computed(() =>
        selectData.value
            .filter((item) => item.type === 'TY_store_label')
            .map((item) => ({
                label: item.title,
                value: item.id!
            }))
    )
    /**
     * 配送标签
     */
    const deliveryOption = computed(() =>
        selectData.value
            .filter((item) => item.type === 'TY_delivery_label')
            .map((item) => ({
                label: item.title,
                value: item.id!
            }))
    )

    /**
     * 服务标签
     */
    const serviceOption = computed(() =>
        selectData.value
            .filter((item) => item.type === 'TY_service_label')
            .map((item) => ({
                label: item.title,
                value: item.id!
            }))
    )

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<store.storeData>>({
        title: undefined,
        businessStatus: undefined,
        cateParentid1: undefined,
        cateParentid2: undefined,
        chainid: undefined,
        status: undefined,
        serviceLabel: undefined,
        sortType: 0
    })
    /**
     * 新增dialog状态
     */
    const CreateShow = ref(false)
    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)
    /**
     * 表单数据
     */
    const moduleValue = reactive<Partial<store.storeData> & { deliveryCategory?: number; shopCategory?: number; serviceCategory?: number }>({
        id: undefined,
        title: '',
        cateParentid1: undefined,
        cateParentid2: undefined,
        logo: '',
        displayorder: 0,
        shopCategory: undefined,
        deliveryCategory: undefined,
        serviceCategory: undefined,
        chainid: undefined
    })
    /**
     * 表单校验规则
     */
    const rules = {
        title: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入门店名称')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
        cateParentid1: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请选择主营分类')
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
    const columns = ref<DataTableColumns<store.storeData>>([
        {
            type: "selection"
        },
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
            title: '商户ID',
            width: 70,
            align: 'center',
            key: 'id'
        },
        {
            title: '商户LOGO',
            width: 120,
            align: 'center',
            className: 'flex-row-center',
            key: 'logo',
            render: (rowData, _index: number) => {
                const node = rowData.categoryList?.find((item: { type: string }) => item?.type == "TY_store_label")
                return h(StoreLogo, { src: previewUrl + rowData.logo, tag: node ? { color: node.textColor, text: node.title, bgColor: node.color } : undefined, business: rowData.businessStatus == 2 }, {})

            }
        },
        {
            title: '商户名称',
            width: 160,
            align: 'center',
            key: 'title'
        },
        {
            title: '主营品类',
            width: 120,
            align: 'center',
            key: 'category',
            render: (rowData, _index: number) => {
                const tag = rowData.storeCategoryList?.find((item: { type: number; parentid: number }) => item && item?.type == 0 && item?.parentid == 1)
                return tag ? tag.title : ""
            }
        },
        {
            title: '所属区域',
            width: 120,
            align: 'center',
            key: 'area',
            render: (rowData, _index: number) => {
                const tag = rowData.storeCategoryList?.find((item: { type: number; parentid: number }) => item && item?.type == 1 && item?.parentid == 2)
                return tag ? tag.title : ""
            }
        },
        {
            title: '支付方式',
            width: 120,
            align: 'center',
            key: 'payMethod',
            render: (_rowData, _index: number) => {
                return h(NTag, { type: "primary" }, { default: () => "微信支付" })
            }
        },
        {
            title() {
                return renderEditableTitle("应用状态", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'businessStatus',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.businessStatus == 0) {
                                    updateStoreInfo({ id: rowData.id, businessStatus: 2 })
                                } else {
                                    updateStoreInfo({ id: rowData.id, businessStatus: 0 })
                                }
                            }
                        },
                        {
                            default: () => (rowData.businessStatus == 2 ? '您确定歇业吗,歇业后将无法在小程序展示' : '您确定营业吗,营业后将正常显示在小程序'),
                            trigger: () => h(NSwitch, { checkedValue: 2, uncheckedValue: 0, value: rowData.businessStatus }, {
                                checked: () => "营业中",
                                unchecked: () => "歇业中"
                            })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 2, uncheckedValue: 0, value: rowData.businessStatus, disabled: true }, {}) })
                }
            }
        },
        {
            title() {
                return renderEditableTitle("是否显示", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'status',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.status == 0) {
                                    updateStoreInfo({ id: rowData.id, status: 1 })
                                } else {
                                    updateStoreInfo({ id: rowData.id, status: 0 })
                                }
                            }
                        },
                        {
                            default: () => (rowData.status == 1 ? '您确定隐藏吗,隐藏后将无法在小程序展示' : '您确定显示吗,显示后将正常显示在小程序'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, {
                                checked: () => "显示",
                                unchecked: () => "不显示"
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
                return renderEditableTitle("是否推荐", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'isRecommend',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.isRecommend == 0) {
                                    updateStoreInfo({ id: rowData.id, isRecommend: 1 })
                                } else {
                                    updateStoreInfo({ id: rowData.id, isRecommend: 0 })
                                }
                            }
                        },
                        {
                            default: () => (rowData.isRecommend == 1 ? '您确定不推荐此商家吗' : '您确定推荐此商家吗'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isRecommend }, {
                                checked: () => "推荐",
                                unchecked: () => "不推荐"
                            })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isRecommend, disabled: true }, {}) })
                }
            }
        },
        {
            title() {
                return renderEditableTitle("是否置顶", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'isStick',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.isStick == 0) {
                                    updateStoreInfo({ id: rowData.id, isStick: 1 })
                                } else {
                                    updateStoreInfo({ id: rowData.id, isStick: 0 })
                                }
                            }
                        },
                        {
                            default: () => (rowData.isRecommend == 1 ? '您确定不置顶此商家吗' : '您确定置顶此商家吗'),
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isStick }, {
                                checked: () => "置顶",
                                unchecked: () => "不置顶"
                            })
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.isStick, disabled: true }, {}) })
                }
            }
        },
        {
            title() {
                return renderEditableTitle("销量", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'sailed',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(InputNumberColumn, {
                        value: rowData.sailed,
                        editable: false,
                        onUpdateValue: (value: number) => {
                            if (rowData.sailed !== value) {
                                updateStoreInfo({ id: rowData.id, sailed: value })
                            }
                        }
                    })
                } else {
                    return rowData.sailed
                }
            }
        },
        {
            title() {
                return renderEditableTitle("热度", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'click',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(InputNumberColumn, {
                        value: rowData.click,
                        editable: false,
                        onUpdateValue: (value: number) => {
                            if (rowData.click !== value) {
                                updateStoreInfo({ id: rowData.id, click: value })
                            }
                        }
                    })
                } else {
                    return rowData.click
                }
            }
        },
        {
            title() {
                return renderEditableTitle("排序", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'displayorder',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(InputNumberColumn, {
                        value: rowData.displayorder,
                        editable: false,
                        onUpdateValue: (value: number) => {
                            if (rowData.displayorder !== value) {
                                updateStoreInfo({ id: rowData.id, displayorder: value })
                            }
                        }
                    })
                } else {
                    return rowData.displayorder
                }
            }
        },
        {
            title: '所属连锁店',
            width: 120,
            align: 'center',
            key: 'chainTitle',
            render(rowData, _rowIndex) {
                return rowData.chainTitle ?? "未知"
            },
        },
        {
            title: '入驻时间',
            width: 160,
            align: 'center',
            key: 'addtime',
            render: (rowData, _index: number) => {
                return rowData.addtime ? transformTimestampsToDateString(rowData.addtime) : ''
            }
        },
        {
            title() {
                return renderEditableTitle("商户标签", "可编辑列")
            },
            width: 100,
            align: 'center',
            key: 'shopTag',
            render: (rowData, _index: number) => {
                const tmp = rowData.serviceLabel ? rowData.serviceLabel.split(",") : []
                const tag = rowData.categoryList?.find((item: { type: string }) => item?.type == "TY_store_label")
                return h(SelectTagColumn, {
                    value: tag?.id,
                    option: shopOption.value,
                    bgColor: tag?.color,
                    textColor: tag?.textColor,
                    editable: false,
                    onUpdateValue: (value: number | null) => {
                        dialog.warning({
                            title: '系统温馨提示?',
                            content: () => value == null ? '您确定要移除此商户的商户标签吗?' : "您确定要更换此商户的商户标签吗?",
                            positiveText: '确定',
                            negativeText: '取消',
                            loading: false,
                            async onPositiveClick() {
                                try {
                                    if (value == null) {
                                        const index = tmp?.findIndex((item: any) => Number(item) == tag?.id);
                                        if (index !== -1) {
                                            tmp.splice(index, 1)
                                        }
                                    } else {
                                        if (tag?.id !== value) {
                                            tmp.push(String(value))
                                            const index = tmp?.findIndex((item: any) => Number(item) == tag?.id);
                                            if (index !== -1) {
                                                tmp.splice(index, 1)
                                            }
                                        }
                                    }
                                    updateStoreInfo({ id: rowData.id, serviceLabel: tmp.join(",") })
                                } catch (err: any) {
                                    message.error(err.message)
                                }
                            }
                        })
                    }
                })
            }
        },
        {
            title() {
                return renderEditableTitle("配送标签", "可编辑列")
            },
            width: 100,
            align: 'center',
            key: 'delivery_tag',
            render: (rowData, _index: number) => {
                const tmp = rowData.serviceLabel ? rowData.serviceLabel.split(",") : []
                const tag = rowData.categoryList?.find((item: { type: string }) => item?.type == "TY_delivery_label")
                return h(SelectTagColumn, {
                    value: tag?.id,
                    option: deliveryOption.value,
                    bgColor: tag?.color,
                    textColor: tag?.textColor,
                    editable: false,
                    onUpdateValue: (value: number | null) => {
                        dialog.warning({
                            title: '系统温馨提示?',
                            content: () => value == null ? '您确定要移除此商户的配送标签吗?' : "您确定要更换此商户的配送标签吗?",
                            positiveText: '确定',
                            negativeText: '取消',
                            loading: false,
                            async onPositiveClick() {
                                try {
                                    if (value == null) {
                                        const index = tmp?.findIndex((item: any) => Number(item) == tag?.id);
                                        if (index !== -1) {
                                            tmp.splice(index, 1)
                                        }
                                    } else {
                                        if (tag?.id !== value) {
                                            tmp.push(String(value))
                                            const index = tmp?.findIndex((item: any) => Number(item) == tag?.id);
                                            if (index !== -1) {
                                                tmp.splice(index, 1)
                                            }
                                        }
                                    }
                                    updateStoreInfo({ id: rowData.id, serviceLabel: tmp.join(",") })
                                } catch (err: any) {
                                    message.error(err.message)
                                }
                            }
                        })
                    }
                })
            }
        },
        {
            title() {
                return renderEditableTitle("服务标签", "可编辑列")
            },
            width: 100,
            align: 'center',
            key: 'service_tag',
            render: (rowData, _index: number) => {
                const tmp = rowData.serviceLabel ? rowData.serviceLabel.split(",") : []
                const tag = rowData.categoryList?.find((item: { type: string }) => item?.type == "TY_service_label")
                return h(SelectTagColumn, {
                    value: tag?.id,
                    option: serviceOption.value,
                    bgColor: tag?.color,
                    textColor: tag?.textColor,
                    editable: false,
                    onUpdateValue: (value: number | null) => {
                        dialog.warning({
                            title: '系统温馨提示?',
                            content: () => value == null ? '您确定要移除此商户的服务标签吗?' : "您确定要更换此商户的服务标签吗?",
                            positiveText: '确定',
                            negativeText: '取消',
                            loading: false,
                            async onPositiveClick() {
                                try {
                                    if (value == null) {
                                        const index = tmp?.findIndex((item: string) => Number(item) == tag?.id);
                                        if (index !== -1) {
                                            tmp.splice(index, 1)
                                        }
                                    } else {
                                        if (tag?.id !== value) {
                                            tmp.push(String(value))
                                            const index = tmp?.findIndex((item: string) => Number(item) == tag?.id);
                                            if (index !== -1) {
                                                tmp.splice(index, 1)
                                            }
                                        }
                                    }
                                    updateStoreInfo({ id: rowData.id, serviceLabel: tmp.join(",") })
                                } catch (err: any) {
                                    message.error(err.message)
                                }
                            }
                        })
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
            render(rowData) {
                if (isAdmin.value) {
                    return [
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    deleteStoreInfo(rowData.id!)
                                }
                            },
                            {
                                default: () => '您确定要删除此商户吗?',
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
                                    storeInfo.value = rowData
                                    storeInfoFrom.value = 1
                                    routerPush('/store/shop/settings/list', true)
                                }
                            },
                            { default: () => '管理' }
                        )
                    ]
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
                                        { default: () => '配置' }
                                    )
                            }
                        )
                    ]
                }
            }
        }
    ])

    /**
     * 获取商户列表数据
     */
    const storeListData = async () => {
        try {
            loading.value = true
            const { data } = await storeListPlatform({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
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
     * 获取商户选择框数据
     */
    const storeSelectList = async () => {
        try {
            loading.value = true
            const { data } = await storeListPlatformSelect()
            loading.value = false
            if (data.code == 200) {
                return data.data?.map((item: store.storeData) => {
                    return {
                        label: item.title,
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
     * 修改商户信息
     * @param params 商户信息
     */
    const updateStoreInfo = async (params: Partial<store.storeData>) => {
        try {
            loading.value = true
            const { data } = await updateStorePlatform(params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!', {
                    onLeave() {
                        storeListData()
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
     * 一键修改商户状态
     * @param params 商户信息
     */
    const updateStoreStatusBatch = async (params: { ids: -1, status: 0 | 1 } | { ids: -1, businessStatus: 0 | 2 } | { ids: string, chainid: number }) => {
        try {
            loading.value = true
            const { data } = await modifyStoreBatchPlatform(params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!', {
                    onLeave() {
                        storeListData()
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
     * 删除商户
     * @param ID 商户id
     */
    const deleteStoreInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await removeStorePlatform(id)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        storeListData()
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
     * 新增商户
     */
    const addStoreInfo = async () => {
        try {
            loading.value = true
            const array = []
            const { title, cateParentid1, cateParentid2, logo, displayorder, shopCategory, deliveryCategory, serviceCategory, chainid } = moduleValue
            if (shopCategory) {
                array.push(shopCategory)
            }
            if (deliveryCategory) {
                array.push(deliveryCategory)
            }
            if (serviceCategory) {
                array.push(serviceCategory)
            }
            const { data } = await addStorePlatform({ title, cateParentid1, cateParentid2, logo, displayorder, chainid, serviceLabel: array.join(",") })
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
     * 选中触发
     */
    const handleCheck = (rowKeys: DataTableRowKey[]) => {
        checkedRowKeysRef.value = rowKeys
    }

    return { storeListData, pagination, updateStoreStatusBatch, tableData, loading, columns, formRef, moduleValue, rules, addStoreInfo, $axios, message, CreateShow, searchForm, handleCheck, checkedRowKeysRef, shopOption, deliveryOption, serviceOption, categoryPageList, storeSelectList }
}


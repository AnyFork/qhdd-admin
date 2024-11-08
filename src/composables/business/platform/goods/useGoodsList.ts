
import { hotGoodsList, updateGoods } from '@/service/platform/goods/index';
import { DataTableColumns, NImage, NPopover, NSwitch } from 'naive-ui'
import InputNumberColumn from '@/components/dynamic/InputNumberColumn.vue'

/**
 * 平台商家商品
 * @returns 
 */
export const usePlatformGoods = () => {
    const tableData = ref<store.storeData[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { isAdmin } = useLoginUser()
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
     * 查询条件 https://test.yidiandianwaimai.top/apis/goods/getList?isHot=1&title=%E7%83%A4%E8%82%89&storeTitle=%E7%89%9B%E8%82%89%E9%A5%AD&storeStatus=1&sortType=15
     */
    const searchForm = reactive({
        isHot: 1,
        title: undefined,
        storeTitle: undefined,
        storeStatus: 1,
        sortType: 15,
        status: 1
    })

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
            title: '店铺名称',
            align: 'center',
            key: 'id',
            render: (rowData: any, _index: number) => {
                return rowData.storeTitle
            }
        },
        {
            title: '商品图标',
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
            align: 'center',
            key: 'title'
        },
        {
            title: '售价(元)',
            align: 'center',
            key: 'price'
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
            title() {
                return renderEditableTitle("排序", "可编辑列")
            },
            width: 120,
            align: 'center',
            key: 'mallDisplayorder',
            render: (rowData, _index: number) => {
                if (isAdmin.value) {
                    return h(InputNumberColumn, {
                        value: rowData.mallDisplayorder,
                        editable: false,
                        onUpdateValue: async (value: number) => {
                            if (rowData.mallDisplayorder !== value) {
                                await updateGoodsInfo({ id: rowData.id, mallDisplayorder: value })
                                // 刷新数据
                                goodsListData()
                            }
                        }
                    })
                } else {
                    return rowData.mallDisplayorder
                }
            }
        },
        {
            title: "是否热销",
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
        }
    ])

    /**
     * 获取商品列表数据
     */
    const goodsListData = async () => {
        try {
            loading.value = true
            const { data } = await hotGoodsList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
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
    return { goodsListData, pagination, tableData, loading, columns, message, searchForm, updateGoodsInfo }
}


import { sailedListInfo, sailedExportInfo } from '@/service/store/goods/goods'
import { DataTableColumns, NImage } from 'naive-ui'

/**
 * 商家商品销量列表
 * @returns 
 */
export const useStoreGoodsSailed = () => {
    const tableData = ref<store.storeData[]>([])
    const { goodsCategoryTree, tableData: data, flatData } = useStoreGoodsCategory()
    const message = useMessage()
    const loading = ref(false)
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
    const searchForm = reactive<{ range?: [number, number], statDayStart?: number, statDayEnd?: number }>({
        range: undefined,
        statDayStart: undefined,
        statDayEnd: undefined
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
            title: '商品ID',
            align: 'center',
            key: 'id'
        },
        {
            title: '商品图标',
            fixed: 'left',
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
            title: "商品分类",
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
            title: "是否上架",
            align: 'center',
            key: 'status',
            render(rowData, _rowIndex) {
                return rowData.status == 0 ? '否' : '是'
            }
        },
        {
            title: "是否热销",
            align: 'center',
            key: 'isHot',
            render(rowData, _rowIndex) {
                return rowData.isHot == 0 ? '否' : '是'
            }
        }
    ])

    /**
     * 获取商品销量列表数据
     */
    const goodsListData = async () => {
        try {
            loading.value = true
            if (searchForm.range && searchForm.range?.length > 0) {
                searchForm.statDayStart = Number(transformTimestampsToDateString(Math.round(searchForm.range[0] / 1000), "YYYYMMDD"))
                searchForm.statDayEnd = Number(transformTimestampsToDateString(Math.round(searchForm.range[1] / 1000), "YYYYMMDD"))
            } else {
                searchForm.statDayStart = undefined
                searchForm.statDayEnd = undefined
            }
            const { statDayStart, statDayEnd } = searchForm
            const { data } = await sailedListInfo({ pageNo: pagination.page, pageSize: pagination.pageSize, sid: sid.value, sortType: 3, statDayStart, statDayEnd })
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
        }
    }

    /**
     * 商品销量导出
     */
    const exportData = async () => {
        let fileName = ''
        try {
            loading.value = true
            if (searchForm.range && searchForm.range?.length > 0) {
                searchForm.statDayStart = Number(transformTimestampsToDateString(Math.round(searchForm.range[0] / 1000), "YYYYMMDD"))
                searchForm.statDayEnd = Number(transformTimestampsToDateString(Math.round(searchForm.range[1] / 1000), "YYYYMMDD"))
                fileName = `${storeInfo.value.title}${searchForm.statDayStart}-${searchForm.statDayEnd}商品销量统计.xlsx`
            } else {
                searchForm.statDayStart = undefined
                searchForm.statDayEnd = undefined
                fileName = `${storeInfo.value.title}${transformTimestampsToDateString(Math.round(Date.now() / 1000), "YYYYMMDD")}商品销量统计.xlsx`
            }
            const { data } = await sailedExportInfo({ sid: sid.value, statDayStart: searchForm.statDayStart, statDayEnd: searchForm.statDayEnd })
            // 创建一个临时的URL指向Blob对象
            const blobUrl = window.URL.createObjectURL(new Blob([data]));
            // 创建一个a标签用于下载
            const link = document.createElement('a');
            link.href = blobUrl;
            // 下载文件的名称
            link.setAttribute('download', fileName);
            // 触发下载
            document.body.appendChild(link);
            link.click();
            // 清理并移除元素和对象URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            loading.value = false
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
        }
    }

    return { goodsListData, pagination, tableData, loading, columns, message, searchForm, rowNode, goodsCategoryTree, data, exportData }
}


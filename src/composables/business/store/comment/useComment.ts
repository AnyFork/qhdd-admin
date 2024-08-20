import { getCommentList, updateComment } from '@/service/platform/comment';
import { DataTableColumns } from 'naive-ui'
import ServiceStoreComment from '@/components/store/comment/ServiceStoreComment.vue'
/**
 * 顾客评论模块
 * @returns 
 */
export const useStoreComment = () => {
    const tableData = ref<order.comment[]>([])
    const message = useMessage()
    const loading = ref(false)
    const { storeInfo } = useStoreInfo()
    // 当前店铺id
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
            getCommentListInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getCommentListInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<order.comment>>({
        deliveryService: undefined,
        goodsQuality: undefined,
        status: undefined,
        sid: sid.value,
        addtimeStart: undefined,
        addtimeEnd: undefined,
        deliveryerTitle: undefined
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<order.comment>>([
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
            title: 'ID',
            width: 70,
            align: 'center',
            key: 'id'
        },
        {
            title: '评价内容',
            align: 'center',
            key: 'comment',
            render: (_rowData, _index: number) => {
                return h(ServiceStoreComment, { data: _rowData, onRefresh: () => getCommentListInfo() }, {})
            }
        }
    ])

    /**
     * 获取顾客评论列表
     */
    const getCommentListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getCommentList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                const comment = data.data as order.comment[]
                comment.forEach(item => {
                    if (item.thumbs) {
                        try {
                            item.thumbArray = JSON.parse(item.thumbs).map((item: string) => previewUrl + item) || []
                        } catch (e) {
                            item.thumbArray = []
                        }
                    }
                })
                tableData.value = comment
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
     * 修改评论信息
     * @param params 评论信息
     */
    const updateCommentInfo = async (params: Partial<order.comment>) => {
        try {
            loading.value = true
            const { data } = await updateComment(params)
            loading.value = false
            if (data.code == 200) {
                message.success('操作成功!')
            } else {
                message.error(data.msg)
            }
        } catch (e: any) {
            loading.value = false
            message.error(e.message as string)
            console.log(e)
        }
    }

    return { getCommentListInfo, updateCommentInfo, pagination, tableData, loading, columns, message, searchForm }
}

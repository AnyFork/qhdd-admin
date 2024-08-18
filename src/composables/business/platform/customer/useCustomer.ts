import { DataTableColumns, NAvatar, NButton } from 'naive-ui'
import { getCustomerList } from '@/service/platform/customer';
/**
 * 顾客模块
 * @returns 
 */
export const useCustomer = () => {
    const tableData = ref<userInfo.user[]>([])
    const message = useMessage()
    const loading = ref(false)

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
            getCustomerListInfo()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getCustomerListInfo()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<userInfo.user>>({
        nickname: undefined,
        mobile: undefined,
    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<userInfo.user>>([
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
            title: 'UID',
            align: 'center',
            key: 'uid'
        },
        {
            title: '微信图像',
            align: 'center',
            key: 'avatar',
            render: (_rowData, _index: number) => {
                return h(NAvatar, { src: _rowData.avatar, round: true, fallbackSrc: getAssetsImages('empty-user.png') }, {})
            }
        },
        {
            title: '顾客昵称',
            align: 'center',
            key: 'nickname'
        },
        {
            title: '手机号码',
            align: 'center',
            key: 'mobile'
        },
        {
            title: '首次下单',
            align: 'center',
            key: 'successFirstTime',
            render(rowData, _rowIndex) {
                return rowData.successFirstTime ? transformTimestampsToDateString(rowData.successFirstTime) : '-'
            },
        },
        {
            title: '最近下单',
            align: 'center',
            key: 'successLastTime',
            render(rowData, _rowIndex) {
                return rowData.successLastTime ? transformTimestampsToDateString(rowData.successLastTime) : '-'
            },
        },
        {
            title: '加入日期',
            align: 'center',
            key: 'addtime',
            render(rowData, _rowIndex) {
                return rowData.addtime ? transformTimestampsToDateString(rowData.addtime) : "-"
            },
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 180,
            render(_rowData) {
                return h(NButton, { type: 'primary' }, { default: () => "收货地址" })
            }
        }
    ])

    /**
     * 获取顾客信息列表
     */
    const getCustomerListInfo = async () => {
        try {
            loading.value = true
            const { data } = await getCustomerList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as userInfo.user[]
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

    return { getCustomerListInfo, pagination, tableData, loading, columns, message, searchForm }
}

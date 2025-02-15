import { DataTableColumns } from 'naive-ui'
import { getCustomerAddressList } from '@/service/platform/address';
/**
 * 顾客地址模块
 * @returns 
 */
export const useAddress = () => {
    const tableData = ref<userInfo.address[]>([])
    const message = useMessage()
    const loading = ref(false)

    /**
     * 表格分页配置
     */
    const pagination = reactive({
        page: 1,
        pageSize: 12,
        itemCount: 0,
        showSizePicker: true,
        pageSizes: [12, 15, 20, 25, 30],
        onChange: (page: number) => {
            pagination.page = page
            getCustomerAddress()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            getCustomerAddress()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 查询条件
     */
    const searchForm = reactive<Partial<userInfo.address>>({
        realname: undefined,
        mobile: undefined,
        address: undefined,
        uid: undefined

    })

    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<userInfo.address>>([
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
            title: '收货人',
            align: 'center',
            key: 'realname'
        },
        {
            title: '性别',
            align: 'center',
            key: 'sex'
        },
        {
            title: '手机号码',
            align: 'center',
            key: 'mobile'
        },
        {
            title: '收货地址',
            align: 'center',
            key: 'address'
        },
        {
            title: '门牌号',
            align: 'center',
            key: 'number'
        },
        {
            title: '经度',
            align: 'center',
            key: 'locationX'
        },
        {
            title: '纬度',
            align: 'center',
            key: 'locationY'
        }
    ])

    /**
     * 获取顾客地址列表信息
     */
    const getCustomerAddress = async () => {
        try {
            loading.value = true
            const { data } = await getCustomerAddressList({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data as userInfo.address[]
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

    return { getCustomerAddress, pagination, tableData, loading, columns, message, searchForm }
}

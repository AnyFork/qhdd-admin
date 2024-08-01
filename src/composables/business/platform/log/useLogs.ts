import { platformLoginLog } from "@/service/platform/system/logs"
import { DataTableColumns, NAvatar } from "naive-ui"

/**
 * 平台管理员登录日志
 */
export const useLogs = () => {
    const loading = ref(false)
    const tableData = ref([])
    const message = useMessage()
    //列数据
    const columns = ref<DataTableColumns<system.loginLog>>([
        {
            title: '序号',
            key: 'key',
            width: 70,
            render: (_rowData: any, index: number) => {
                return `${(pagination.page - 1) * pagination.pageSize + index + 1}`
            },
            align: 'center'
        },
        {
            title: '登录账号',
            width: 120,
            key: 'spAdminName',
            align: 'center'
        },
        {
            title: '用户图像',
            width: 100,
            key: 'spAdminAvatar',
            render(rowData: any) {
                return h(NAvatar, { src: rowData.spAdminAvatar, round: true }, {})
            },
            align: 'center'
        },
        {
            title: '登录IP',
            key: 'loginIp',
            align: 'center'
        },
        {
            title: '客户端标识',
            key: 'device',
            align: 'center'
        },
        {
            title: '所属系统',
            key: 'system',
            align: 'center'
        },
        {
            title: '登录地',
            key: 'address',
            align: 'center'
        },
        {
            title: '登录时间',
            width: 200,
            key: 'createTime',
            align: 'center'
        }
    ])
    // 查询表单参数
    const searchForm = reactive({
        name: '',
        loginIp: ''
    })
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
            logList()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            logList()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })

    /**
     * 获取数据列表
     */
    const logList = async () => {
        try {
            loading.value = true
            const { data } = await platformLoginLog({ pageNo: pagination.page, pageSize: pagination.pageSize, ...searchForm })
            loading.value = false
            if (data) {
                if (data.code == 200) {
                    tableData.value = data.data
                    pagination.itemCount = data.dataCount
                } else {
                    message.error(data.msg)
                }
            }
        } catch (e: any) {
            loading.value = false
            console.error(e)
            message.error(e.message)
        }
    }
    return { logList, columns, tableData, searchForm, pagination, loading }
}
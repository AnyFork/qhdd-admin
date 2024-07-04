export const useChain = () => {
    const tableData = ref([])
    const chainOptions = ref()
    const { $axios } = useInstance()
    const message = useMessage()
    const loading = ref(false)
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
        name: undefined,
        roleId: undefined
    })

    /**
     * 获取连锁店列表
     */
    const chainPageList = async () => {
        try {
            loading.value = true
            const { data } = await $axios.post(
                getChainList,
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
            message.error(e.message)
            console.log(e)
        }
    }

    /**
    * 获取连锁店下拉列表
    */
    const chainSelectList = async () => {
        try {
            loading.value = true
            const { data } = await $axios.post(
                getChainList,
                { pageNo: 1, pageSize: 100, status: 1 },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            loading.value = false
            if (data.code == 200) {
                chainOptions.value = data.data.map((item: any) => {
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
    return { chainSelectList, chainOptions }
}
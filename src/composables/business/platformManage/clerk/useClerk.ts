import { store } from '@/types/api'
import { Icon } from '@iconify/vue';
import { DataTableColumns, NAvatar, NButton, NImage, NPopconfirm, NPopover, NSwitch } from 'naive-ui'
import qs from 'qs'

export const useClerk = () => {
    const tableData = ref([])
    const { $axios } = useInstance()
    const message = useMessage()
    const loading = ref(false)
    const userInfo = getUserInfo()
    const { deleteStoreClerkInfo } = useStoreClerk()
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
            clerkList()
        },
        onUpdatePageSize: (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            clerkList()
        },
        prefix({ itemCount }: any) {
            return `共${itemCount}条`
        }
    })
    /**
     * 查询条件
     */
    const searchForm = reactive<Omit<Partial<store.clerk>, 'isDelete'> & { bindStoreStatus?: number } & { isDelete: 0 | 1 }>({
        nickname: undefined,
        title: undefined,
        mobile: undefined,
        /**
         * 是否绑定门店(1=是,0=否,不传=不限)
         */
        bindStoreStatus: undefined,
        isDelete: 0
    })
    /**
     * 修改dialog状态
     */
    const modifyShow = ref(false)
    /**
     * 当前选中的节点
     */
    const rowNode = ref<store.clerk>()
    /**
     * 表格列
     */
    const columns = ref<DataTableColumns<store.clerk>>([
        {
            title: '序号',
            width: 70,
            align: 'center',
            key: 'key',
            render: (rowData, index: number) => {
                return `${(pagination.page - 1) * pagination.pageSize + index + 1}`
            }
        },
        {
            title: '微信昵称',
            align: 'center',
            key: 'nickname'
        },
        {
            title: '微信图像',
            key: 'avatar',
            align: 'center',
            render: (rowData, index: number) => {
                return h(NAvatar, { src: rowData.avatar, round: true })
            }
        },
        {
            title: '姓名',
            align: 'center',
            key: 'title'
        },
        {
            title: '电话号码',
            align: 'center',
            key: 'mobile'
        },
        {
            title() {
                return searchForm.isDelete == 0 ? renderEditableTitle("所属门店", "可编辑列") : "所属门店"
            },
            width: 300,
            align: 'center',
            key: 'store',
            render(rowData, rowIndex) {
                if (rowData.store) {
                    return h('div', {
                        style: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "2px"
                        }
                    }, {
                        default: () => {
                            return [
                                h(NImage, { src: previewUrl + rowData.store.logo, width: 20, style: { "border-radius": "6px" } }, {}),
                                h("div", {}, { default: () => rowData.store.title }),
                                renderPopConfirm(h(Icon, { icon: "clarity:remove-solid", style: { color: "#ff3333", cursor: "pointer", outline: "none" } }, {}), "您确定要解绑门店吗?", async () => {
                                    await deleteStoreClerkInfo(rowData.storeClerk.id)
                                    clerkList()
                                })
                            ]
                        }
                    })
                } else {
                    return '暂未绑定门店'
                }
            },
        },
        {
            title() {
                return searchForm.isDelete == 0 ? renderEditableTitle("工作状态", "可编辑列") : "工作状态"
            },
            key: 'status',
            align: 'center',
            render: (rowData, index: number) => {
                if (userInfo?.roleName === '系统管理员' && searchForm.isDelete == 0) {
                    return h(
                        NPopconfirm,
                        {
                            onPositiveClick: () => {
                                if (rowData.status == 1) {
                                    updateClerkInfo({ id: rowData.id, status: 0 })
                                } else {
                                    updateClerkInfo({ id: rowData.id, status: 1 })
                                }
                            }
                        },
                        {
                            default: () => '您确定修改此店员工作状态吗',
                            trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status }, {})
                        }
                    )
                } else {
                    return h(NPopover, {}, { default: () => '非系统管理员禁止操作', trigger: () => h(NSwitch, { checkedValue: 1, uncheckedValue: 0, value: rowData.status, disabled: true }, {}) })
                }
            }
        },
        {
            title: '创建日期',
            align: 'center',
            key: 'addtime',
            render(rowData, rowIndex) {
                return transformTimestampsToDateString(rowData.addtime)
            },
        },
        {
            title: '操作',
            key: 'actions',
            align: 'center',
            fixed: 'right',
            width: 180,
            render(rowData) {
                if (userInfo?.roleName === '系统管理员') {
                    return [
                        h(
                            NButton,
                            {
                                size: 'small',
                                type: 'primary',
                                style: {
                                    marginLeft: '10px'
                                },
                                onClick: () => {
                                    if (searchForm.isDelete == 0) {
                                        rowNode.value = rowData
                                        modifyShow.value = true
                                    } else {
                                        updateClerkInfo({ id: rowData.id, isDelete: 0 })
                                    }

                                }
                            },
                            { default: () => searchForm.isDelete == 0 ? "绑定" : "恢复" }
                        ),
                        h(
                            NPopconfirm,
                            {
                                onPositiveClick: () => {
                                    if (searchForm.isDelete == 0) {
                                        updateClerkInfo({ id: rowData.id, isDelete: 1 })
                                    } else {
                                        deleteClerkInfo(rowData.id)
                                    }
                                }
                            },
                            {
                                default: () => searchForm.isDelete == 0 ? '您确定要删除此店员吗,删除后数据将进入回收站。' : '您确定要彻底删除此店员吗?',
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
                                        { default: () => searchForm.isDelete == 0 ? '删除' : "彻底删除" }
                                    )
                            }
                        )
                    ]
                } else {
                    return [
                        h(
                            NPopover,
                            {},
                            {
                                default: () => '非系统管理员账号禁止绑定店员信息',
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
                                        { default: () => '绑定' }
                                    )
                            }
                        ),
                        h(
                            NPopover,
                            {},
                            {
                                default: () => '非管理员账号禁止删除',
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
                        )
                    ]
                }
            }
        }
    ])

    /**
     * 获取店员列表
     */
    const clerkList = async () => {
        try {
            loading.value = true
            console.log(searchForm)
            const { data } = await $axios.get(`${getClerk}?${qs.stringify({ pageNo: pagination.page, pageSize: pagination.pageSize, type: 1, ...searchForm })}`)
            loading.value = false
            if (data.code == 200) {
                tableData.value = data.data
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
     * 修改店员信息
     * @param params 店员信息
     */
    const updateClerkInfo = async (params: Partial<store.clerk>) => {
        try {
            loading.value = true
            const { data } = await $axios.post(updateClerk, params)
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!', {
                    onLeave() {
                        clerkList()
                    },
                })
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
     * 彻底删除店员
     * @param ID 店员id
     */
    const deleteClerkInfo = async (id: number) => {
        try {
            loading.value = true
            const { data } = await $axios.get(`${removeClerk}?id=${id}`)
            loading.value = false
            if (data.code == 200) {
                message.success('删除成功!', {
                    onLeave() {
                        clerkList()
                    }
                })
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    return { clerkList, updateClerkInfo, deleteClerkInfo, pagination, tableData, loading, columns, $axios, message, rowNode, modifyShow, searchForm }
}

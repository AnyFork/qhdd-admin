import { store } from "@/types/api"
import { Icon } from "@iconify/vue"
import { DropdownOption, FormInst, FormItemRule, NPopover, TreeOption } from "naive-ui"
import { SelectBaseOption } from "naive-ui/es/select/src/interface"
import qs from "qs"

export const usePictureGroup = () => {
    const { $axios } = useInstance()
    const message = useMessage()
    const loading = ref(false)
    const userInfo = getUserInfo()
    const pagination = reactive({
        page: 1,
        pageSize: 32,
        itemsCount: 0
    })
    const createGroup = ref(false)
    const modifyGroup = ref(false)
    const modifyPicture = ref(false)
    // 编辑分组时选择的节点
    const modifyGroupNode = ref<store.attachmentGroup>()
    // 编辑图片时选择的节点
    const modifyPictureNode = ref<store.attachment>()
    const type = ref<store.attachment['type']>(0)
    // 选中的图片id集合
    const selectedPictureIds = ref<Array<number>>([])
    // 选中的图片节点信息
    const selectedPictureNode = ref<store.attachment[]>([])
    const dialog = useDialog()
    const currentGroup = ref<undefined | number>(undefined)
    const pictures = ref<store.attachment[]>([])
    const groupArray = ref()
    // 移动下拉框
    const selectOption = ref()
    // 移动选择的分组
    const moveGroup = reactive<{ label?: string, value?: number }>({
        label: undefined,
        value: undefined
    })
    /**
    * 默认分组，禁止删除
    */
    const defaultGroup = ref([
        {
            label: '全部',
            key: 'all',
            id: 0,
            type: type.value,
            uid: undefined,
            prefix: () => folderIcon
        },
        {
            label: '未分组',
            key: 'none',
            id: 0,
            type: type.value,
            uid: undefined,
            prefix: () => folderIcon
        }
    ])
    /**
     * 查询条件
     */
    const search = ref()
    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)
    /**
     * 表单数据
     */
    const moduleValue = reactive<{ name: string, filename: string }>({
        name: '',
        filename: ''
    })
    /**
     * 表单校验规则
     */
    const rules = {
        name: [
            {
                validator(rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请输入分组名称')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
        filename: {
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请输入图片名称')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    }
    /**
     * 图片右上角操作菜单渲染
     * @param item 
     * @returns 
     */
    const options = (item: store.attachment) => {
        if (item.groupId == 0) {
            return [
                {
                    label: '编辑',
                    key: 'edit',
                    icon: () => h(Icon, { icon: 'basil:edit-outline' }),
                    props: {
                        onClick: () => {
                            modifyPictureNode.value = item
                            modifyPicture.value = true
                        }
                    }
                }
            ]
        } else {
            return [
                {
                    label: '编辑',
                    key: 'edit',
                    icon: () => h(Icon, { icon: 'basil:edit-outline' }),
                    props: {
                        onClick: () => {
                            modifyPictureNode.value = item
                            modifyPicture.value = true
                        }
                    }
                },
                {
                    label: '删除',
                    key: 'delete',
                    icon: () => h(Icon, { icon: 'fluent:delete-48-regular' }),
                    props: {
                        onClick: () => {
                            deletePictureInfo(item.id);
                        }
                    }
                }
            ]
        }
    }
    /**
     * 分组前缀文件夹图标
     */
    const folderIcon = h(Icon, { icon: 'fluent:folder-open-20-regular' })
    /**
     * 删除分组按钮
     * @param disabled 是否禁用按钮
     * @param id 分组id
     * @returns 
     */
    const deleteIcon = (disabled: boolean = false, id: number) => {
        if (userInfo?.roleName === '系统管理员' || !disabled) {
            return h(
                NPopover,
                {},
                {
                    default: () => '删除',
                    trigger: () => {
                        return h(Icon, {
                            icon: 'fluent:delete-48-regular',
                            onClick: (e: MouseEvent) => {
                                e.stopPropagation()
                                deleteGroupInfo(id)
                            }
                        })
                    }
                }
            )
        } else {
            return h(
                NPopover,
                {},
                {
                    default: () => '非系统管理员，禁止删除别人创建的分组',
                    trigger: () => {
                        return h(Icon, {
                            icon: 'fluent:delete-48-regular',
                            style: {
                                cursor: 'not-allowed',
                                color: '#999'
                            }
                        })
                    }
                }
            )
        }
    }
    /**
     * 编辑分组按钮
     * @param disabled 是否禁用按钮
     * @param item 修改节点的数据
     * @returns 
     */
    const editorIcon = (disabled: boolean = false, item: store.attachmentGroup) => {
        if (userInfo?.roleName === '系统管理员' || !disabled) {
            return h(
                NPopover,
                {},
                {
                    default: () => '编辑',
                    trigger: () =>
                        h(Icon, {
                            icon: 'basil:edit-outline',
                            style: {
                                marginRight: '5px'
                            },
                            onClick: (e: MouseEvent) => {
                                e.stopPropagation()
                                modifyGroupNode.value = item
                                modifyGroup.value = true
                            }
                        })
                }
            )
        } else {
            return h(
                NPopover,
                {},
                {
                    default: () => '非系统管理员,禁止编辑别人创建的分组',
                    trigger: () => {
                        return h(Icon, {
                            icon: 'basil:edit-outline',
                            style: {
                                cursor: 'not-allowed',
                                color: '#999'
                            }
                        })
                    }
                }
            )
        }
    }

    /**
     * 获取图片分组
     */
    const attachmentGroup = async () => {
        try {
            loading.value = true
            const { data } = await $axios.get(`${attachmentGroupList}?${qs.stringify({ pageNo: 1, pageSize: 500 })}`)
            loading.value = false
            if (data.code === 200) {
                const treeData = data.data.map((item: store.attachmentGroup) => {
                    return {
                        label: item.name,
                        key: item.id,
                        id: item.id,
                        type: 0,
                        uid: item.uid,
                        prefix: () => folderIcon,
                        suffix: () => {
                            return h('div', { style: { display: 'none', marginRight: '5px' }, class: 'suffix_btn' }, { default: () => [editorIcon(userInfo?.id != item.uid, item), deleteIcon(userInfo?.id != item.uid, item.id)] })
                        }
                    }
                })
                groupArray.value = defaultGroup.value.concat(treeData)
                selectOption.value = JSON.parse(JSON.stringify(groupArray.value.slice(1))).map((item: any) => {
                    if (item.id === currentGroup.value) {
                        return { label: item.label, value: item.id, disabled: true }
                    } else {
                        return { label: item.label, value: item.id, disabled: false }
                    }
                })
            }
        } catch (e) {
            loading.value = false
            console.error(e)
        }
    }
    /**
     * 根据分组获取图片列表
     */
    const attachmentInfoList = async () => {
        try {
            loading.value = true
            const { data } = await $axios.post(`${attachmentList}?${qs.stringify({ pageNo: pagination.page, pageSize: pagination.pageSize, groupId: currentGroup.value, type: type.value, filename: search.value })
                }`)
            loading.value = false
            if (data.code === 200) {
                pictures.value = data.data
                pagination.itemsCount = data.dataCount
            }
        } catch (e) {
            loading.value = false
            console.error(e)
        }
    }
    /**
     * 新增图片分组
     */
    const addPicture = async () => {
        try {
            loading.value = true
            const { name } = moduleValue
            const { data } = await $axios.post(
                addAttachmentGroup,
                { name, type: type.value },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
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
     * 修改分组名称
     * @param id 分组id
     * @param name 分组名称
     */
    const updateGroupInfo = async (id: number, name: string) => {
        try {
            loading.value = true
            const { data } = await $axios.post(updateAttachmentGroup, { id, name }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!')
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    /**
     * 修改附件名称
     * @param id 文件id
     * @param filename 文件名称
     */
    const updateAttachment = async (id: number, filename: string) => {
        try {
            loading.value = true
            const { data } = await $axios.post(updateAttachmentInfo, { id, filename }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            loading.value = false
            if (data.code == 200) {
                message.success('修改成功!')
            } else {
                message.error(data.msg)
            }
        } catch (e) {
            loading.value = false
            message.error(e as string)
            console.log(e)
        }
    }

    /**
     * 删除分组信息
     * @param ID 用户id
     */
    const deleteGroupInfo = async (id: number) => {
        dialog.warning({
            title: '系统温馨提示?',
            content: '您确定要删除分组吗，删除分组后，图片将自动进入未分组?',
            positiveText: '确定',
            negativeText: '取消',
            loading: false,
            async onPositiveClick() {
                try {
                    loading.value = true
                    const { data } = await $axios.get(`${deleteAttachmentGroup}?${qs.stringify({ id })}`)
                    loading.value = false
                    if (data.code == 200) {
                        message.success('删除成功!', {
                            onLeave() {
                                attachmentGroup()
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
        })
    }

    /**
    * 删除单个图片信息
    * @param 图片id
    */
    const deletePictureInfo = async (id: number) => {
        dialog.warning({
            title: '系统温馨提示?',
            content: '您确定要删除图片吗，删除后，图片将自动进入未分组?',
            positiveText: '确定',
            negativeText: '取消',
            loading: false,
            async onPositiveClick() {
                try {
                    loading.value = true
                    const { data } = await $axios.get(`${deleteAttachmentInfo}?${qs.stringify({ id })}`)
                    loading.value = false
                    if (data.code == 200) {
                        message.success('删除成功!', {
                            onLeave() {
                                attachmentInfoList()
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
        })
    }

    /**
     * 批量删除图片
     */
    const deleteBatch = () => {
        if (selectedPictureIds.value && selectedPictureIds.value.length > 0) {
            dialog.warning({
                title: '系统温馨提示?',
                content: '您确定要删除选中的图片吗，删除后，图片将自动进入未分组?',
                positiveText: '确定',
                negativeText: '取消',
                loading: false,
                async onPositiveClick() {
                    try {
                        loading.value = true
                        const { data } = await $axios.get(`${deleteAttachmentBatch}?${qs.stringify({ ids: selectedPictureIds.value.join(',') })}`)
                        loading.value = false
                        if (data.code == 200) {
                            message.success('删除成功!', {
                                onLeave() {
                                    selectedPictureIds.value = []
                                    selectedPictureNode.value = []
                                    attachmentInfoList()
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
            })
        } else {
            message.error('请选择要删除的图片!')
        }
    }

    /**
     * 批量移动图片
     */
    const moveBatch = () => {
        if (selectedPictureIds.value && selectedPictureIds.value.length > 0) {
            dialog.warning({
                title: '系统温馨提示?',
                content: `您确定要将选中的图片移动至分组${moveGroup.label}中吗?`,
                positiveText: '确定',
                negativeText: '取消',
                loading: false,
                async onPositiveClick() {
                    try {
                        loading.value = true
                        const { data } = await $axios.get(`${moveAttachmentGroup}?${qs.stringify({ ids: selectedPictureIds.value.join(','), groupId: moveGroup.value })}`)
                        loading.value = false
                        if (data.code == 200) {
                            message.success('操作成功!', {
                                onLeave() {
                                    selectedPictureIds.value = []
                                    selectedPictureNode.value = []
                                    attachmentInfoList()
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
            })
        } else {
            message.error('请选择要移动的图片!')
        }
    }

    /**
     * 当前page发送变化时
     * @param page
     */
    const changePage = (page: number) => {
        pagination.page = page
        attachmentInfoList()
    }

    /**
     * 自定义节点的事件
     * @param param0
     */
    const nodeProps = ({ option }: { option: TreeOption }) => {
        return {
            onClick() {
                // 清空选中的数据
                selectedPictureIds.value = []
                currentGroup.value = option.id as number
                attachmentInfoList()
                selectOption.value = selectOption.value.map((item: any) => {
                    if (item.id === currentGroup.value) {
                        return { label: item.label, value: item.id, disabled: true }
                    } else {
                        return { label: item.label, value: item.id, disabled: false }
                    }
                })
            }
        }
    }
    /**
     * 选中事件
     * @param item 
     */
    const checkItem = (item: store.attachment) => {
        if (item?.checked) {
            item.checked = false
            selectedPictureIds.value = selectedPictureIds.value.filter((id: number) => id !== item.id)
            selectedPictureNode.value = selectedPictureNode.value.filter((node) => node.id !== item.id)
        } else {
            item.checked = true
            selectedPictureIds.value.push(item.id)
            selectedPictureNode.value.push(item)
        }
    }
    /**
     * 移动分组选中
     * @param value 选中的值
     * @param option 选项
     */
    const selectChange = (value: number, option: SelectBaseOption) => {
        moveGroup.value = value
        moveGroup.label = option.label as string
        if (selectedPictureIds.value && selectedPictureIds.value.length > 0) {
            moveBatch()
        } else {
            message.error('请先选择需要移动的图片!')
        }
    }

    return { updateGroupInfo, pagination, loading, formRef, moduleValue, rules, addPicture, $axios, message, changePage, search, attachmentGroup, groupArray, attachmentInfoList, pictures, nodeProps, options, Icon, modifyGroupNode, createGroup, modifyGroup, updateAttachment, modifyPicture, modifyPictureNode, currentGroup, deleteBatch, checkItem, selectOption, moveGroup, selectChange, selectedPictureNode }
}

import { getStoreInfoBySid, updateStoreInfoBySid } from '@/service/store/store'
import { FormInst, FormItemRule } from 'naive-ui'

/**
 * 商户设置
 * @returns 
 */
export const useStore = () => {
    const { categoryPageList, tableData } = usePlatformTag()
    const message = useMessage()
    const loading = ref(false)
    const { storeInfo } = useStoreInfo()
    // 当前店铺id
    const sid = computed(() => storeInfo.value.id)
    /**
     * 商户标签
     */
    const shopOption = computed(() =>
        tableData.value
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
        tableData.value
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
        tableData.value
            .filter((item) => item.type === 'TY_service_label')
            .map((item) => ({
                label: item.title,
                value: item.id!
            }))
    )

    /**
     * 表单对象
     */
    const formRef = ref<FormInst | null>(null)

    /**
     * 表单数据
     */
    const moduleValue = reactive<Partial<Omit<store.storeData, "businessHours">> & { deliveryCategory?: number; shopCategory?: number; serviceCategory?: number, businessHours: { start: number | null, end: number | null }[] }>({
        id: undefined,
        title: '',
        cateParentid1: undefined,
        cateParentid2: undefined,
        logo: '',
        displayorder: 0,
        shopCategory: undefined,
        deliveryCategory: undefined,
        serviceCategory: undefined,
        chainid: undefined,
        description: undefined,
        telephone: undefined,
        businessHours: [],
        thumbs: undefined,
        address: undefined,
        locationX: undefined,
        locationY: undefined,
        qualificationObj: { business: { thumb: "" }, service: { thumb: "" }, more1: { thumb: "" }, more2: { thumb: "" } },
        dataObj: {
            food_level: "A",
            printer_perms: ['orderplace'],
            auto_notice_deliveryer_time: 0,
            picture: undefined,
            reserve: {
                reserve_time_limit: 0,
                notice_clerk_before_delivery: 0
            },
            reserve_order_print_type: 1,
            pack_price: {
                type: 1,
                fee: 0,
                rules: []
            },
            order_time_placeholder: "",
            order_note_status: 0,
            order_form: {
                person_num: 0
            },
            orderCreateNotice: {
                text: ""
            }
        },
        autoPrintOrder: undefined,
        autoHandelOrder: undefined,
        autoNoticeDeliveryer: undefined,
        invoiceStatus: undefined,
        paymentStr: ['wechat'],
        remindTimeLimit: undefined,
        remindTimeStart: undefined,
        remindReplyStr: [],
        commentReplyStr: [],
        isWaimai: 1,
        deliveryWithinDays: 0,
        deliveryReserveDays: 0,
        restCanOrder: 1,
        subMchId: ""
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
        ],
        logo: [
            {
                validator(_rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('请上传门店logo')
                    }
                },
                trigger: ['input', 'blur']
            }
        ],
    }

    /**
     * 获取商户详细信息
     */
    const getStoreDetailInfoBySid = async () => {
        try {
            loading.value = true
            const { data: dataList } = await getStoreInfoBySid(sid.value!)
            loading.value = false
            if (dataList.code == 200) {
                const { id, title, logo, subMchId, notice, displayorder, chainid, tips, businessStatus, cateParentid1, cateParentid2, description, telephone, businessHours, thumbs, address, locationX, locationY, categoryList, qualification, licenseEndtime, foodcertEndtime, data } = dataList.data
                moduleValue.id = id
                moduleValue.tips = tips
                moduleValue.title = title
                moduleValue.logo = logo
                moduleValue.notice = notice
                moduleValue.displayorder = displayorder
                // 处理连锁店id为0时，不展示
                moduleValue.chainid = chainid == 0 ? undefined : chainid
                moduleValue.subMchId = subMchId
                moduleValue.businessStatus = businessStatus
                if (businessHours) {
                    try {
                        moduleValue.businessHours = JSON.parse(businessHours)
                    } catch (err) {
                        moduleValue.businessHours = []
                    }
                }
                moduleValue.cateParentid1 = cateParentid1
                moduleValue.cateParentid2 = cateParentid2
                moduleValue.description = description
                moduleValue.telephone = telephone
                if (categoryList) {
                    categoryList.forEach((element: store.category) => {
                        if (element?.type == "TY_store_label") {
                            moduleValue.shopCategory = element.id
                        }
                        if (element?.type == "TY_delivery_label") {
                            moduleValue.deliveryCategory = element.id
                        }
                        if (element?.type == "TY_service_label") {
                            moduleValue.serviceCategory = element.id
                        }
                    });
                }
                moduleValue.thumbs = thumbs
                moduleValue.address = address
                moduleValue.locationX = locationX
                moduleValue.locationY = locationY
                if (qualification) {
                    try {
                        moduleValue.qualificationObj = JSON.parse(qualification)
                    } catch (e: any) {
                        console.error(e)
                    }
                }
                if (data) {
                    try {
                        moduleValue.dataObj = JSON.parse(data)
                    } catch (e: any) {
                        console.error(e)
                    }
                }
                moduleValue.foodcertEndtimeStr = foodcertEndtime == 0 ? null : String(foodcertEndtime)
                moduleValue.licenseEndtimeStr = licenseEndtime == 0 ? null : String(licenseEndtime)
                moduleValue.autoPrintOrder = dataList.data?.autoPrintOrder
                moduleValue.autoHandelOrder = dataList.data?.autoHandelOrder
                moduleValue.autoNoticeDeliveryer = dataList.data?.autoNoticeDeliveryer
                moduleValue.invoiceStatus = dataList.data?.invoiceStatus
                moduleValue.paymentStr = dataList.data?.payment?.split(",").length == 2 ? dataList.data?.payment?.split(",") : ['wechat']
                moduleValue.remindTimeLimit = dataList.data?.remindTimeLimit
                moduleValue.remindTimeStart = dataList.data?.remindTimeStart
                moduleValue.isWaimai = dataList.data?.isWaimai
                moduleValue.deliveryWithinDays = dataList.data?.deliveryWithinDays || 0
                moduleValue.deliveryReserveDays = dataList.data?.deliveryReserveDays || 0
                moduleValue.restCanOrder = dataList.data?.restCanOrder || 0
                if (dataList.data?.remindReply) {
                    const tmp = dataList.data?.remindReply?.split(",")
                    moduleValue.remindReplyStr = tmp?.map((item: string) => ({
                        text: item
                    }))
                }
                if (dataList.data?.commentReply) {
                    const tmp = dataList.data?.commentReply?.split(",")
                    moduleValue.commentReplyStr = tmp?.map((item: string) => ({
                        text: item
                    }))
                }
                console.log("执行完了")
            } else {
                message.error(dataList.msg)
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
            const { data } = await updateStoreInfoBySid(params)
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
    /**
     * 添加一个营业时间段
     */
    const addBusinessHours = () => {
        moduleValue.businessHours.push({ start: null, end: null })
    }
    /**
     * 移除一个营业时间段
     */
    const removeBusinessHours = (index: number) => {
        moduleValue.businessHours.splice(index, 1)
    }


    return { loading, formRef, moduleValue, rules, message, shopOption, deliveryOption, serviceOption, categoryPageList, updateStoreInfo, getStoreDetailInfoBySid, removeBusinessHours, addBusinessHours }
}


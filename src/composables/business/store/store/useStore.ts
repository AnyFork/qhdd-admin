
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
        qualification: undefined
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
        ]
    }

    /**
     * 获取商户详细信息
     */
    const getStoreDetailInfoBySid = async () => {
        try {
            loading.value = true
            const { data } = await getStoreInfoBySid(sid.value!)
            loading.value = false
            if (data.code == 200) {
                console.log(data.data)
                const { id, title, logo, displayorder, chainid, businessStatus, cateParentid1, cateParentid2, description, telephone, businessHours, thumbs, address, locationX, locationY, categoryList } = data.data
                moduleValue.id = id
                moduleValue.title = title
                moduleValue.logo = logo
                moduleValue.displayorder = displayorder
                moduleValue.chainid = chainid
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
                        if (element.type == "TY_store_label") {
                            moduleValue.shopCategory = element.id
                        }
                        if (element.type == "TY_delivery_label") {
                            moduleValue.deliveryCategory = element.id
                        }
                        if (element.type == "TY_service_label") {
                            moduleValue.serviceCategory = element.id
                        }
                    });
                }
                moduleValue.thumbs = thumbs
                moduleValue.address = address
                moduleValue.locationX = locationX
                moduleValue.locationY = locationY
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


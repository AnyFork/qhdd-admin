<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">商户基本信息设置</div>
        <n-form ref="formRef" :label-width="200" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item show-require-mark label="门店名称" path="title">
                <n-input v-model:value="moduleValue.title" clearable placeholder="请输入商户名称" class="!w-680px" />
            </n-form-item>
            <n-form-item show-require-mark label="门店类型">
                <n-radio-group v-model:value="moduleValue.isWaimai">
                    <n-space>
                        <n-radio :value="1">外卖</n-radio>
                        <n-radio :value="2">商超</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item show-require-mark label="主营品类" path="cateParentid1">
                <n-select v-model:value="moduleValue.cateParentid1" :options="shopCategoryOption" placeholder="请选择商户标签" clearable class="w-680px" />
            </n-form-item>
            <n-form-item show-require-mark label="门店图标" path="logo">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.logo" disabled learable class="!w-[625px]" placeholder="请选择Logo" />
                        <n-button type="primary" @click="showLogo = true"> 搜索 </n-button>
                    </div>
                    <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                </div>
            </n-form-item>
            <n-form-item label="所属片区">
                <n-select v-model:value="moduleValue.cateParentid2" :options="shopAreaOption" placeholder="请选择商户标签" clearable class="w-680px" />
            </n-form-item>
            <n-form-item label="所属连锁店">
                <n-select v-model:value="moduleValue.chainid" :options="chainOptions" placeholder="请选择连锁店" clearable class="w-680px" />
            </n-form-item>
            <n-form-item label="门店招牌">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.dataObj!.picture" disabled learable class="!w-[625px]" placeholder="请选择门店招牌图片" />
                        <n-button type="primary" @click="showPicture = true"> 搜索 </n-button>
                    </div>
                    <div class="text-#999 text-12px py-1">建议图片尺寸:750*288</div>
                    <n-image :src="picture?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!picture?.url" :width="picture?.url ? 300 : 100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                </div>
            </n-form-item>
            <n-form-item label="门店描述" path="description">
                <n-input v-model:value="moduleValue.description" clearable placeholder="请输入门店描述" class="!w-680px" />
            </n-form-item>
            <n-form-item label="门店电话" path="telephone">
                <n-input v-model:value="moduleValue.telephone" clearable placeholder="请输入门店电话" class="!w-680px" />
            </n-form-item>
            <n-form-item label="门店实景">
                <div>
                    <n-button type="primary" @click="showThumb = true">选择图片</n-button>
                    <div class="text-#999 text-12px py-1">建议尺寸640*120</div>
                    <div v-if="thumbNode && thumbNode.length > 0" class="flex items-center flex-wrap gap-2">
                        <n-image v-for="(item, index) in thumbNode" :key="'thumb' + index" :src="item?.url" :preview-disabled="!item?.url" :width="item?.url ? 200 : 100" height="120" class="my-1 border border-solid border-#f5f5f5"></n-image>
                    </div>
                </div>
            </n-form-item>
            <n-form-item label="详细地址" path="address">
                <n-input v-model:value="moduleValue.address" clearable placeholder="请输入商户详细地址" class="!w-680px" />
            </n-form-item>
            <n-form-item label="营业状态" path="businessStatus">
                <n-switch v-model:value="moduleValue.businessStatus" :checked-value="2" :unchecked-value="0">
                    <template #checked> 营业中 </template>
                    <template #unchecked> 歇业中</template>
                </n-switch>
            </n-form-item>
            <n-form-item label="营业时间">
                <div>
                    <n-space v-for="(item, index) in moduleValue.businessHours" :key="index" class="mb-2">
                        <n-time-picker v-model:value="item.start" format="H:mm" class="!w-280px" time-zone="Asia/Shanghai" />
                        <span>至</span>
                        <n-time-picker v-model:value="item.end" format="H:mm" class="!w-280px" time-zone="Asia/Shanghai" />
                        <n-button type="error" @click="removeBusinessHours(index)">删除</n-button>
                    </n-space>
                    <n-button type="primary" @click="addBusinessHours">添加营业时间段</n-button>
                </div>
            </n-form-item>
            <n-form-item label="地图坐标">
                <div class="flex-row-center gap-4">
                    <n-input v-model:value="moduleValue.locationY" disabled placeholder="请选择坐标经度" class="!w-280px" />
                    <n-input v-model:value="moduleValue.locationX" disabled placeholder="请选择坐标纬度" class="!w-280px" />
                    <n-button type="default" @click="locationBtn = true">选择坐标</n-button>
                </div>
            </n-form-item>
            <n-form-item label="商户标签">
                <n-select v-model:value="moduleValue.shopCategory" :options="shopOption" placeholder="请选择商户标签" clearable class="w-680px" />
            </n-form-item>
            <n-form-item label="配送标签">
                <n-select v-model:value="moduleValue.deliveryCategory" :options="deliveryOption" placeholder="请选择配送标签" clearable class="w-680px" />
            </n-form-item>
            <n-form-item label="服务标签">
                <n-select v-model:value="moduleValue.serviceCategory" :options="serviceOption" placeholder="请选择服务标签" clearable class="w-680px" />
            </n-form-item>
            <n-form-item label="平台服务费计算方式">
                <n-radio-group v-if="moduleValue?.dataObj?.platformServiceFee != undefined" v-model:value="moduleValue.dataObj.platformServiceFee.feePayType" disabled>
                    <n-space>
                        <n-radio :value="1">固定金额 </n-radio>
                        <n-radio :value="2">费率</n-radio>
                        <n-radio :value="3">固定金额 + 费率</n-radio>
                    </n-space>
                </n-radio-group>
                <span v-else>未设置</span>
            </n-form-item>
            <n-form-item label="平台服务费">
                <n-input-number v-if="moduleValue?.dataObj?.platformServiceFee != undefined" v-model:value="moduleValue.dataObj.platformServiceFee.feePayMoney" :min="0" disabled placeholder="请输入平台服务费">
                    <template #suffix>元</template>
                </n-input-number>
                <span v-else>未设置</span>
            </n-form-item>
            <n-form-item label="服务费率">
                <n-input-number v-if="moduleValue?.dataObj?.platformServiceFee != undefined" v-model:value="moduleValue.dataObj.platformServiceFee.feePayPercent" :min="0" disabled placeholder="请输入服务费率">
                    <template #suffix>%</template>
                </n-input-number>
                <span v-else>未设置</span>
            </n-form-item>
            <n-form-item>
                <n-button type="primary" class="w-680px ml-200px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
            </n-form-item>
        </n-form>
        <!-- 选择门店logo对话框 -->
        <SelectImageDialog v-if="showLogo" v-model:open="showLogo" v-model:node="node"></SelectImageDialog>
        <!-- 选择门店招牌对话框 -->
        <SelectImageDialog v-if="showPicture" v-model:open="showPicture" v-model:node="picture"></SelectImageDialog>
        <!-- 选择门店实景图对话框 -->
        <SelectImageDialog v-if="showThumb" v-model:open="showThumb" v-model:node="thumbNode" multi></SelectImageDialog>
        <!-- 坐标选择器 -->
        <MapContainer v-if="locationBtn" v-model:show="locationBtn" :location-x="moduleValue.locationX ? Number(moduleValue.locationX) : undefined" :location-y="moduleValue.locationY ? Number(moduleValue.locationY) : undefined" @location="locationBack"></MapContainer>
    </n-spin>
</template>

<script setup lang="ts">
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
const emit = defineEmits<{ refresh: [] }>()
const { formRef, moduleValue, rules, getStoreDetailInfoBySid, loading, message, categoryPageList, serviceOption, shopOption, deliveryOption, updateStoreInfo, removeBusinessHours, addBusinessHours } = useStore()
const { storeCategoryList } = usePlatformCategory()
const { chainSelectList, chainOptions } = useChain()
const { isAdmin } = useLoginUser()
const showLogo = ref(false)
const showThumb = ref(false)
const locationBtn = ref(false)
const showPicture = ref(false)
const node = ref<Partial<system.attachment>>({})
const thumbNode = ref<Partial<system.attachment[]>>()
const picture = ref<Partial<system.attachment>>({})
// 主营区域
const categoryRef = ref<system.category[]>()
// 所属片区
const areaRef = ref<system.category[]>()

/**
 * 主营分类
 */
const shopCategoryOption = computed(() =>
    categoryRef.value?.map((item) => ({
        label: item.title,
        value: item.id!
    }))
)

/**
 * 所属片区
 */
const shopAreaOption = computed(() =>
    areaRef.value?.map((item) => ({
        label: item.title,
        value: item.id!
    }))
)
/**
 * 选择经纬度回调
 */
const locationBack = (location: { locationY: number; locationX: number }) => {
    moduleValue.locationY = String(location.locationY)
    moduleValue.locationX = String(location.locationX)
}
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const array = []
            const { id, title, logo, chainid, businessStatus, cateParentid1, cateParentid2, description, telephone, businessHours, thumbs, address, locationX, locationY, shopCategory, serviceCategory, deliveryCategory, isWaimai, dataObj } = moduleValue
            const time = businessHours && businessHours.length > 0 ? JSON.stringify(businessHours) : undefined
            if (shopCategory) {
                array.push(shopCategory)
            }
            if (deliveryCategory) {
                array.push(deliveryCategory)
            }
            if (serviceCategory) {
                array.push(serviceCategory)
            }
            await updateStoreInfo({ id, title, logo, chainid: chainid ?? 0, businessStatus, isWaimai, cateParentid1, cateParentid2, description, telephone, businessHours: time, thumbs, address, locationX, locationY, serviceLabel: array.join(','), data: JSON.stringify(dataObj) })
            getStoreDetailInfoBySid()
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
watchEffect(() => {
    if (node.value && Object.keys(node.value).length > 0) {
        moduleValue.logo = node.value?.attachment
    }
    if (picture.value && Object.keys(picture.value).length > 0) {
        moduleValue.dataObj!.picture = picture.value?.attachment
    }
    if (thumbNode.value && thumbNode.value.length > 0) {
        const thumbs = thumbNode.value?.map((item) => {
            return { image: item?.attachment, url: '' }
        })
        moduleValue.thumbs = thumbs ? JSON.stringify(thumbs) : undefined
    }
})
onMounted(async () => {
    getStoreDetailInfoBySid()
    categoryPageList()
    chainSelectList()
    categoryRef.value = (await storeCategoryList(1)) || []
    areaRef.value = (await storeCategoryList(2)) || []
    if (moduleValue.logo) {
        node.value.url = previewUrl + moduleValue.logo
        node.value.attachment = moduleValue.logo
    }
    if (moduleValue.dataObj?.picture) {
        picture.value.url = previewUrl + moduleValue.dataObj?.picture
        picture.value.attachment = moduleValue.dataObj?.picture
    }
    if (moduleValue.thumbs) {
        try {
            const temp = JSON.parse(moduleValue.thumbs)
            if (temp?.length > 0) {
                thumbNode.value = temp.map((item: any) => {
                    return {
                        attachment: item.image,
                        url: previewUrl + item.image
                    }
                })
                console.log(thumbNode.value)
            }
        } catch (err) {
            thumbNode.value = []
        }
    }
})
</script>

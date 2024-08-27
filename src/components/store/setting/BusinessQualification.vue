<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">营业资质证书</div>
        <n-form ref="formRef" :label-width="200" :model="moduleValue" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="营业执照">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.qualificationObj!.business.thumb" disabled learable class="!w-425px" placeholder="请选择营业执照" />
                        <n-button type="primary" @click="image1.show = true"> 选择图片</n-button>
                    </div>
                    <n-image :src="image1.node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!image1.node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                </div>
            </n-form-item>
            <n-form-item label="营业资质到期时间">
                <n-date-picker v-model:formatted-value="moduleValue.licenseEndtimeStr" value-format="yyyyMMdd" type="date" clearable placeholder="请输入营业资质到期时间" class="!w-410px" />
                <div class="px-1 border border-solid border-#e2e2e2 border-l-none h-35px flex-row-center">
                    <n-checkbox v-model:checked="moduleValue.licenseEndtime" :checked-value="0">长期有效</n-checkbox>
                </div>
            </n-form-item>
            <n-form-item label="餐饮服务许可证">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.qualificationObj!.service.thumb" disabled learable class="!w-425px" placeholder="请选择餐饮服务许可证" />
                        <n-button type="primary" @click="image2.show = true"> 选择图片</n-button>
                    </div>
                    <n-image :src="image2.node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!image2.node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                </div>
            </n-form-item>
            <n-form-item label="餐饮服务许可证到期时间">
                <n-date-picker v-model:formatted-value="moduleValue.foodcertEndtimeStr" value-format="yyyyMMdd" type="date" clearable placeholder="请输入餐饮服务许可证到期时间" class="!w-410px" />
                <div class="px-1 border border-solid border-#e2e2e2 border-l-none h-35px flex-row-center">
                    <n-checkbox v-model:checked="moduleValue.foodcertEndtime" :checked-value="0">长期有效</n-checkbox>
                </div>
            </n-form-item>
            <n-form-item label="食品安全等级照片">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.qualificationObj!.more1.thumb" disabled learable class="!w-425px" placeholder="请选择食品安全等级照片" />
                        <n-button type="primary" @click="image3.show = true"> 选择图片</n-button>
                    </div>
                    <n-image :src="image3.node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!image3.node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                </div>
            </n-form-item>
            <n-form-item label="食品安全等级">
                <n-select v-model:value="moduleValue.dataObj!.food_level" :options="options" class="!w-200px"></n-select>
            </n-form-item>
            <n-form-item label="更多资质照片">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.qualificationObj!.more2.thumb" disabled learable class="!w-425px" placeholder="请选择更多资质照片" />
                        <n-button type="primary" @click="image4.show = true"> 选择图片</n-button>
                    </div>
                    <n-image :src="image4.node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!image4.node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                </div>
            </n-form-item>
            <n-button type="primary" class="w-620px ml-100px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
        </n-form>
        <!-- 营业执照对话框 -->
        <SelectImageDialog v-if="image1.show" v-model:open="image1.show" v-model:node="image1.node"></SelectImageDialog>
        <!-- 餐饮许可证对话框 -->
        <SelectImageDialog v-if="image2.show" v-model:open="image2.show" v-model:node="image2.node"></SelectImageDialog>
        <!-- 食品安全等级1对话框 -->
        <SelectImageDialog v-if="image3.show" v-model:open="image3.show" v-model:node="image3.node"></SelectImageDialog>
        <!-- 食品安全等级2对话框 -->
        <SelectImageDialog v-if="image4.show" v-model:open="image4.show" v-model:node="image4.node"></SelectImageDialog>
    </n-spin>
</template>

<script setup lang="ts">
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
const emit = defineEmits<{ refresh: [] }>()
const { isAdmin } = useLoginUser()
const { formRef, moduleValue, getStoreDetailInfoBySid, loading, message, updateStoreInfo } = useStore()
type node = {
    show: boolean
    node: Partial<system.attachment>
}
const image1 = reactive<node>({
    show: false,
    node: {}
})
const image2 = reactive<node>({
    show: false,
    node: {}
})
const image3 = reactive<node>({
    show: false,
    node: {}
})
const image4 = reactive<node>({
    show: false,
    node: {}
})
const options = [
    {
        label: 'A级',
        value: 'A'
    },
    {
        label: 'B级',
        value: 'B'
    },
    {
        label: 'C级',
        value: 'C'
    },
    {
        label: '非餐饮',
        value: '非餐饮'
    }
]

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            let licenseEndtimeNumber: number | undefined = undefined
            let foodcertEndtimeNumber: number | undefined = undefined
            const { id, qualificationObj, dataObj, licenseEndtime, foodcertEndtime, foodcertEndtimeStr, licenseEndtimeStr } = moduleValue
            if (licenseEndtime != 0) {
                if (licenseEndtimeStr) {
                    licenseEndtimeNumber = Number(licenseEndtimeStr)
                } else {
                    licenseEndtimeNumber = undefined
                }
            } else {
                licenseEndtimeNumber = 0
            }
            if (foodcertEndtime != 0) {
                if (foodcertEndtimeStr) {
                    foodcertEndtimeNumber = Number(foodcertEndtimeStr)
                } else {
                    foodcertEndtimeNumber = undefined
                }
            } else {
                foodcertEndtimeNumber = 0
            }
            console.log({ id, foodcertEndtimeNumber, licenseEndtimeNumber, qualification: JSON.stringify(qualificationObj), data: JSON.stringify(dataObj) })
            await updateStoreInfo({ id, licenseEndtime: licenseEndtimeNumber, foodcertEndtime: foodcertEndtimeNumber, qualification: JSON.stringify(qualificationObj), data: JSON.stringify(dataObj) })
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
    if (image1.node?.attachment) {
        moduleValue.qualificationObj!.business.thumb = image1.node.attachment!
    }
    if (image2.node?.attachment) {
        moduleValue.qualificationObj!.service.thumb = image2.node.attachment!
    }
    if (image3.node?.attachment) {
        moduleValue.qualificationObj!.more1.thumb = image3.node.attachment!
    }
    if (image4.node?.attachment) {
        moduleValue.qualificationObj!.more2.thumb = image4.node.attachment!
    }
    moduleValue.foodcertEndtime == 0 ? (moduleValue.foodcertEndtimeStr = null) : (moduleValue.foodcertEndtime = undefined)
    moduleValue.licenseEndtime == 0 ? (moduleValue.licenseEndtimeStr = null) : (moduleValue.licenseEndtime = undefined)
})
onMounted(async () => {
    await getStoreDetailInfoBySid()
    moduleValue.qualificationObj!.business.thumb ? (image1.node.url = previewUrl + moduleValue.qualificationObj!.business.thumb) : ''
    moduleValue.qualificationObj!.service.thumb ? (image2.node.url = previewUrl + moduleValue.qualificationObj!.service.thumb) : ''
    moduleValue.qualificationObj!.more1.thumb ? (image3.node.url = previewUrl + moduleValue.qualificationObj!.more1.thumb) : ''
    moduleValue.qualificationObj!.more2.thumb ? (image4.node.url = previewUrl + moduleValue.qualificationObj!.more2.thumb) : ''
    console.log(moduleValue)
})
</script>

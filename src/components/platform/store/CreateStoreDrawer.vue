<template>
    <n-drawer v-model:show="active" :width="502" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="创建门店" closable>
            <n-form ref="formRef" :label-width="100" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="门店名称" path="title">
                    <n-input v-model:value="moduleValue.title" clearable placeholder="请输入商户名称" />
                </n-form-item>
                <n-form-item show-require-mark label="图标" path="logo">
                    <div class="selectImg">
                        <div class="flex-row-center">
                            <n-input v-model:value="moduleValue.logo" disabled learable class="!w-[255px]" placeholder="请选择Logo" />
                            <n-button type="primary" @click="show = true"> 搜索 </n-button>
                        </div>
                        <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                    </div>
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
                    <n-select v-model:value="moduleValue.cateParentid1" :options="shopCategoryOption" placeholder="请选择商户标签" clearable class="w-180px" />
                </n-form-item>
                <n-form-item label="所属片区">
                    <n-select v-model:value="moduleValue.cateParentid2" :options="shopAreaOption" placeholder="请选择商户标签" clearable class="w-180px" />
                </n-form-item>
                <n-form-item label="所属连锁店">
                    <n-select v-model:value="moduleValue.chainid" :options="chainOptions" placeholder="请选择连锁店" clearable class="w-180px" />
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="moduleValue.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" />
                </n-form-item>
                <n-form-item label="商户标签">
                    <n-select v-model:value="moduleValue.shopCategory" :options="shopOption" placeholder="请选择商户标签" clearable class="w-180px" />
                </n-form-item>
                <n-form-item label="配送标签">
                    <n-select v-model:value="moduleValue.deliveryCategory" :options="deliveryOption" placeholder="请选择配送标签" clearable class="w-180px" />
                </n-form-item>
                <n-form-item label="服务标签">
                    <n-select v-model:value="moduleValue.serviceCategory" :options="serviceOption" placeholder="请选择服务标签" clearable class="w-180px" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
    <!-- 选择图片对话框 -->
    <SelectImageDialog v-if="show" v-model:open="show" v-model:node="node"></SelectImageDialog>
</template>

<script setup lang="ts">
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
const active = defineModel<boolean>('active')
const {
    shopOption = [],
    serviceOption = [],
    deliveryOption = [],
    shopAreaOption = [],
    shopCategoryOption = [],
    chainOptions = []
} = defineProps<{
    shopOption?: { label: string; value: number }[]
    serviceOption?: { label: string; value: number }[]
    deliveryOption?: { label: string; value: number }[]
    shopAreaOption?: { label: string; value: number }[]
    shopCategoryOption?: { label: string; value: number }[]
    chainOptions?: { label: string; value: number }[]
}>()
const emit = defineEmits<{ refresh: [] }>()
const { formRef, moduleValue, rules, addStoreInfo, loading, message } = usePlatformStore()
const show = ref(false)
const node = ref<system.attachment>()
watchEffect(() => {
    moduleValue.logo = node.value?.attachment
})
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await addStoreInfo()
            active.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.title = undefined
            moduleValue.shopCategory = undefined
            moduleValue.deliveryCategory = undefined
            moduleValue.serviceCategory = undefined
            moduleValue.logo = undefined
            moduleValue.cateParentid1 = undefined
            moduleValue.cateParentid2 = undefined
            moduleValue.displayorder = undefined
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

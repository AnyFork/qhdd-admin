<template>
    <n-spin :show="loading" description="loading">
        <div class="flex items-center text-16px p-2 my-2 h-40px bg-#eee before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">基础设置</div>
        <n-form ref="formRef" :label-width="200" :model="platform" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="平台名称">
                <n-input v-model:value="platform.platform_name" clearable placeholder="请输入平台名称" class="!w-680px" />
            </n-form-item>
            <n-form-item label="平台Logo">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="platform.platform_logo" disabled learable class="!w-[625px]" placeholder="请选择平台Logo" />
                        <n-button type="primary" @click="showLogo = true"> 搜索 </n-button>
                    </div>
                    <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                </div>
            </n-form-item>
            <n-form-item label="商家排序方式">
                <n-radio-group v-model:value="platform.store_orderby_type" name="radiogroup">
                    <n-space>
                        <n-radio :value="1">按照排序大小 </n-radio>
                        <n-radio :value="2"> 按照热度排序</n-radio>
                        <n-radio :value="3"> 离我最近 </n-radio>
                        <n-radio :value="4"> 销量最高 </n-radio>
                        <n-radio :value="5"> 评分最高 </n-radio>
                        <n-radio :value="6">商户排序规则 </n-radio>
                        <n-radio :value="7"> 先按照排序大小，在按照距离 </n-radio>
                        <n-radio :value="8"> 先按照排序大小，在按照销量 </n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="超出商家配送范围是否显示">
                <n-radio-group v-model:value="platform.store_overradius_display">
                    <n-space>
                        <n-radio :value="1">显示 </n-radio>
                        <n-radio :value="0">不显示</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="顾客端定位地址不在区域范围内时跳转到暂无服务页">
                <n-radio-group v-model:value="platform.not_in_area2noservice">
                    <n-space>
                        <n-radio :value="1">是 </n-radio>
                        <n-radio :value="0">否</n-radio>
                    </n-space>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="配送方名称">
                <n-input v-model:value="platform.delivery_title" clearable placeholder="请输配送方名称" class="!w-680px" />
            </n-form-item>
            <n-form-item>
                <n-button type="primary" class="w-680px ml-200px" @click="submitCallback" :loading="loading" :disabled="!isAdmin">保存</n-button>
            </n-form-item>
        </n-form>
        <!-- 选择平台logo对话框 -->
        <SelectImageDialog v-if="showLogo" v-model:open="showLogo" v-model:node="node"></SelectImageDialog>
    </n-spin>
</template>

<script setup lang="ts">
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
import { FormInst } from 'naive-ui'
const formRef = ref<FormInst | null>(null)
const emit = defineEmits<{ refresh: [] }>()
const { configData, getPlatformSettings, message, loading, updateSettings } = useSettings()
const showLogo = ref(false)
const { isAdmin } = useLoginUser()
const node = ref<Partial<system.attachment>>({})

const platform = reactive({
    platform_name: '',
    platform_logo: '',
    store_orderby_type: 1,
    store_overradius_display: 1,
    not_in_area2noservice: 0,
    delivery_title: ''
})

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await updateSettings({ module: 'platform_info', config: JSON.stringify(platform), remark: '平台信息' })
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
        platform.platform_logo = node.value?.url!
    }
})

onMounted(async () => {
    await getPlatformSettings('platform_info')
    const { platform_name, platform_logo, store_orderby_type, store_overradius_display, not_in_area2noservice, delivery_title } = JSON.parse(configData.value!.config)
    if (platform_logo) {
        node.value.url = platform_logo
    }
    platform.delivery_title = delivery_title || ''
    platform.platform_name = platform_name || ''
    platform.store_orderby_type = store_orderby_type || 1
    platform.store_overradius_display = store_overradius_display || 1
    platform.not_in_area2noservice = not_in_area2noservice || 0
})
</script>

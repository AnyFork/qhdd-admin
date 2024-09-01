<template>
    <n-drawer v-model:show="active" :default-width="500" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="创建连锁店" closable>
            <n-form ref="formRef" :label-width="120" :model="model" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="连锁店名称" path="title">
                    <n-input v-model:value="model.title" placeholder="请输入管理员名称" clearable />
                </n-form-item>
                <n-form-item show-require-mark label="连锁店Logo" path="logo">
                    <div class="selectImg">
                        <div class="flex-row-center">
                            <n-input v-model:value="model.logo" disabled learable class="!w-[255px]" placeholder="请选择Logo" />
                            <n-button type="primary" @click="show = true"> 搜索 </n-button>
                        </div>
                        <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                    </div>
                </n-form-item>
                <n-form-item show-require-mark label="管理员" path="chainerId">
                    <n-select v-model:value="model.chainerId" :options="admin" placeholder="请选择管理员" clearable />
                </n-form-item>
                <n-form-item label="是否启用">
                    <n-radio-group v-model:value="model.status">
                        <n-space>
                            <n-radio :key="1" :value="1"> 允许 </n-radio>
                            <n-radio :key="0" :value="0"> 禁止 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="model.displayorder" :min="0" placeholder="请输入排序" clearable />
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
const { addChainInfo, loading, message, model, rules } = useChain()
defineProps<{ admin: any[] }>()
const active = defineModel<boolean>('open')
const emit = defineEmits<{ refresh: [] }>()
const formRef = ref()
const show = ref(false)
const node = ref<system.attachment>()
watchEffect(() => {
    model.logo = node.value?.attachment
})

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            const { title, logo, chainerId, status, displayorder } = model
            await addChainInfo({ title, logo, chainerId, status, displayorder })
            active.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

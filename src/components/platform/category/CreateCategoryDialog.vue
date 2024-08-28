<template>
    <n-modal v-model:show="open" preset="dialog" title="创建子分类" :close-on-esc="false">
        <n-form ref="formRef" :label-width="80" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item label="父分类">
                <n-input :value="ptitle" disabled />
            </n-form-item>
            <n-form-item show-require-mark label="子分类" path="title">
                <n-input v-model:value="moduleValue.title" placeholder="输入子分类名称" />
            </n-form-item>
            <n-form-item label="图标">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.thumb" disabled class="!w-[255px]" placeholder="请选择图标" />
                        <n-button type="primary" @click="show = true"> 搜索 </n-button>
                    </div>
                    <div class="flex gap-2 py-2">
                        <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                        <Icon v-if="node?.url" icon="carbon:close-outline" @click="removeImage"></Icon>
                    </div>
                </div>
            </n-form-item>
            <n-form-item label="显示状态">
                <n-switch v-model:value="moduleValue.status" :checked-value="1" :unchecked-value="0" />
            </n-form-item>
            <n-form-item label="排序">
                <n-input-number v-model:value="moduleValue.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" />
            </n-form-item>
        </n-form>
        <template #action>
            <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
        </template>
    </n-modal>
    <!-- 选择图片对话框 -->
    <SelectImageDialog v-if="show" v-model:open="show" v-model:node="node"></SelectImageDialog>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NButton } from 'naive-ui'
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
const { formRef, rules, moduleValue, addCateGoryInfo, loading, message } = usePlatformCategory()
const open = defineModel<boolean>('open')
const props = defineProps<{ pid: number; ptitle: string; type: system.category['type'] }>()
const emit = defineEmits<{ refresh: [] }>()
const show = ref(false)
const node = ref<system.attachment>()
watchEffect(() => {
    if (node.value?.attachment) {
        moduleValue.thumb = node.value?.attachment
    } else {
        moduleValue.thumb = ''
    }
    moduleValue.type = props.type
    moduleValue.parentid = props.pid
})

/**
 * 移除图片
 */
const removeImage = () => {
    node.value = undefined
}

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await addCateGoryInfo()
            open.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.parentid = undefined
            moduleValue.thumb = undefined
            moduleValue.displayorder = undefined
            moduleValue.status = 0
            moduleValue.title = undefined
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

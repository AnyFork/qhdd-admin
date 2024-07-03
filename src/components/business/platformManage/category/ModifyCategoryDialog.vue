<template>
    <n-modal v-model:show="open" preset="dialog" title="修改分类" :close-on-esc="false">
        <n-form ref="formRef" :label-width="80" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
            <n-form-item v-if="moduleValue.parentid != 0" label="父分类">
                <n-select v-model:value="moduleValue.parentid" :options="pNodes" />
            </n-form-item>
            <n-form-item show-require-mark :label="moduleValue.parentid == 0 ? '分类' : '子分类'" path="title">
                <n-input v-model:value="moduleValue.title" placeholder="输入子分类名称" />
            </n-form-item>
            <n-form-item label="图标">
                <div class="selectImg">
                    <div class="flex-row-center">
                        <n-input v-model:value="moduleValue.thumb" disabled learable class="!w-[255px]" placeholder="请选择图标" />
                        <n-button type="primary" @click="show = true"> 搜索 </n-button>
                    </div>
                    <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100%" height="100%" class="my-1 w-[100px] h-[100px] rounded-[6px] border border-solid border-#f5f5f5"></n-image>
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
import { system } from '@/types/api'
import { NButton } from 'naive-ui'
import { getAssetsImages } from '@/utils'
const { formRef, rules, moduleValue, updateCategoryInfo, loading, message, previewUrl } = useCategory()
const open = defineModel<boolean>('open')
const props = defineProps<{ pdata: system.category[]; rowNode: system.category }>()
const emit = defineEmits<{ refresh: [] }>()
const show = ref(false)
const node = ref<Partial<system.attachment>>({
    url: undefined,
    attachment: undefined
})
const pNodes = computed(() =>
    props.pdata.map((node) => {
        return { value: node.id, label: node.title }
    })
)
watchEffect(() => {
    console.log(node)
    moduleValue.thumb = node.value?.attachment
})

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            await updateCategoryInfo()
            open.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.parentid = undefined
            moduleValue.thumb = undefined
            moduleValue.displayorder = undefined
            moduleValue.status = 0
            moduleValue.title = undefined
            moduleValue.type = undefined
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
onMounted(() => {
    node.value!.url = props.rowNode.thumb ? previewUrl + props.rowNode.thumb : undefined
    moduleValue.thumb = props.rowNode.thumb
    moduleValue.type = props.rowNode.type
    moduleValue.parentid = props.rowNode.parentid
    moduleValue.title = props.rowNode.title
    moduleValue.status = props.rowNode.status
    moduleValue.displayorder = props.rowNode.displayorder
    moduleValue.id = props.rowNode.id
})
</script>

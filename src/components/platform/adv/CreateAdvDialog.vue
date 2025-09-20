<template>
    <n-drawer v-model:show="open" :width="700" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="创建广告" closable>
            <n-form ref="formRef" :label-width="100" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="广告名称" path="title">
                    <n-input v-model:value="moduleValue.title" clearable placeholder="请输入广告名称" />
                </n-form-item>
                <n-form-item show-require-mark label="广告位" path="positionKey">
                    <n-select v-model:value="moduleValue.positionKey" :options="(position as any)" value-field="positionKey" label-field="name" placeholder="请选择广告位" clearable class="w-180px" />
                </n-form-item>
                <n-form-item show-require-mark label="广告图片" path="img">
                    <UploadAvatar v-model:url="moduleValue.img"></UploadAvatar>
                </n-form-item>
                <n-form-item show-require-mark label="广告类型" path="link">
                    <n-select v-model:value="moduleValue.link" :options="linkType" placeholder="请选择广告类型" clearable class="w-180px" />
                </n-form-item>
                <div v-if="moduleValue.link == '2'" class="my-3 ring ring-gray-100">
                    <p class="p-4">弹框广告属性(宽度和高度默认为0,表示图片高度、宽度按照图片默认尺寸展示,单位px)</p>
                    <n-form-item label="广告宽度">
                        <n-input-number v-model:value="advProps.width" clearable :min="0" :max="1920" placeholder="请输入广告宽度" />
                    </n-form-item>
                    <n-form-item label="广告高度">
                        <n-input-number v-model:value="advProps.height" clearable :min="0" :max="1080" placeholder="请输入广告高度" />
                    </n-form-item>
                    <n-form-item label="跳转地址">
                        <div class="flex-row-center gap-2">
                            <n-select v-model:value="advProps.linkType" :options="popupType" placeholder="请选择跳转类型" clearable class="w-180px" />
                            <div v-if="advProps.linkType == '/pages/shop/category/index'" class="flex-row-center gap-2">
                                <div class="w-120px">导航菜单ID:</div>
                                <n-input v-model:value="advProps.params" clearable placeholder="请输入小程序导航菜单ID值" />
                            </div>
                        </div>
                    </n-form-item>
                </div>
                <n-form-item label="上架状态">
                    <n-switch v-model:value="moduleValue.status" :checkedValue="1" :uncheckedValue="0">
                        <template #checked> 上架 </template>
                        <template #unchecked> 下架 </template>
                    </n-switch>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="moduleValue.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" />
                </n-form-item>
                <n-form-item show-require-mark label="广告内容">
                    <DefaultEditor v-model="moduleValue.content"></DefaultEditor>
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui'
const open = defineModel<boolean>('open')
defineProps<{ position: system.advPosition[] }>()
const { formRef, rules, moduleValue, addAdvInfo, loading, message } = useAdv()
const emit = defineEmits<{ refresh: [] }>()

const advProps = reactive({
    width: 0,
    height: 0,
    link: '',
    linkType: '/pages/hot/index',
    params: ''
})

/**
 * 广告类型
 */
const linkType = [
    {
        label: '普通广告',
        value: '1'
    },
    {
        label: '弹框广告',
        value: '2'
    }
]

/**
 * 弹框广告跳转类型
 */
const popupType = [
    {
        label: '一口价',
        value: '/pages/hot/index'
    },
    {
        label: '导航菜单',
        value: '/pages/shop/category/index'
    }
]

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            if (moduleValue.value.link == '2') {
                if (advProps.width == null && advProps.height == null) {
                    message.error('请设置弹框广告宽度和高度')
                    return
                }
                if (!advProps?.linkType) {
                    message.error('请设置跳转地址')
                    return
                }
                if (advProps.linkType == '/pages/hot/index') {
                    moduleValue.value.data = JSON.stringify({ width: advProps.width, height: advProps.height, link: advProps.link, params: '' })
                } else {
                    if (!advProps.params) {
                        message.error('请设置导航菜单ID')
                        return
                    } else {
                        moduleValue.value.data = JSON.stringify({ width: advProps.width, height: advProps.height, link: advProps.link, params: advProps.params })
                    }
                }
            }
            await addAdvInfo(moduleValue.value)
            open.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

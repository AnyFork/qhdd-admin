<template>
    <n-drawer v-model:show="open" :width="700" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="修改广告" closable>
            <n-form ref="formRef" :label-width="100" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="广告名称" path="title">
                    <n-input v-model:value="moduleValue.title" clearable placeholder="请输入广告名称" />
                </n-form-item>
                <n-form-item show-require-mark label="广告位" path="positionKey">
                    <n-select v-model:value="moduleValue.positionKey" :options="(position as any)" value-field="positionKey" label-field="name" placeholder="请选择广告位" clearable />
                </n-form-item>
                <n-form-item show-require-mark label="广告图片" path="img">
                    <UploadAvatar v-model:url="moduleValue.img"></UploadAvatar>
                </n-form-item>
                <n-form-item show-require-mark label="广告类型" path="link">
                    <n-select v-model:value="moduleValue.link" :options="linkType" placeholder="请选择广告类型" clearable class="w-180px" />
                </n-form-item>
                <div v-if="moduleValue.link == '2'" class="my-3 ring ring-gray-100">
                    <p class="p-4">弹框广告属性(宽度设为0，表示以小程序展示设备屏幕宽度-40px的宽度展示图片，高度设为0，表示以小程序展示设备屏幕高度-200px的高度展示图片)</p>
                    <n-form-item label="广告宽度">
                        <n-input-number v-model:value="moduleValue.dataObject!.width" clearable :min="0" :max="1920" placeholder="请输入广告宽度" />
                    </n-form-item>
                    <n-form-item label="广告高度">
                        <n-input-number v-model:value="moduleValue.dataObject!.height" clearable :min="0" :max="1080" placeholder="请输入广告高度" />
                    </n-form-item>
                    <n-form-item label="跳转地址">
                        <div class="flex-row-center gap-2">
                            <n-select v-model:value="moduleValue.dataObject!.link" :options="popupType" placeholder="请选择跳转类型" clearable class="w-180px" />
                            <div v-if="moduleValue.dataObject!.link == '/pages/shop/category/index'" class="flex-row-center gap-2">
                                <div class="w-120px">导航菜单ID:</div>
                                <n-input v-model:value="moduleValue.dataObject!.params" clearable placeholder="请输入小程序导航菜单ID值" />
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
const moduleValue = defineModel<Partial<system.adv>>({ required: true })
const { formRef, rules, updateAdvInfo, loading, message } = useAdv()
const emit = defineEmits<{ refresh: [] }>()

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
                if (moduleValue.value.dataObject?.width == null && moduleValue.value.dataObject?.height == null) {
                    message.error('请设置弹框广告宽度和高度')
                    return
                }
                if (!moduleValue.value.dataObject?.link) {
                    message.error('请设置跳转地址')
                    return
                }
                if (moduleValue.value.dataObject?.link == '/pages/hot/index') {
                    moduleValue.value.data = JSON.stringify({ width: moduleValue.value.dataObject?.width, height: moduleValue.value.dataObject?.height, link: moduleValue.value.dataObject?.link, params: '' })
                    delete moduleValue.value.dataObject
                } else {
                    if (!moduleValue.value.dataObject?.params) {
                        message.error('请设置导航菜单ID')
                        return
                    } else {
                        moduleValue.value.data = JSON.stringify({ width: moduleValue.value.dataObject?.width, height: moduleValue.value.dataObject?.height, link: moduleValue.value.dataObject?.link, params: moduleValue.value.dataObject?.params })
                        delete moduleValue.value.dataObject
                    }
                }
            } else {
                moduleValue.value.data = ''
            }
            await updateAdvInfo(moduleValue.value)
            open.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

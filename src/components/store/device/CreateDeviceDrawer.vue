<template>
    <n-drawer v-model:show="active" :width="600" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="添加设备" closable>
            <n-form ref="formRef" :label-width="130" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="设备名称" path="name">
                    <n-input v-model:value="moduleValue.name" clearable placeholder="请输入设备名称" />
                </n-form-item>
                <n-form-item label="是否启用设备">
                    <n-radio-group v-model:value="moduleValue.status">
                        <n-space>
                            <n-radio :key="0" :value="0"> 否 </n-radio>
                            <n-radio :key="1" :value="1"> 是 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="设备类型">
                    <n-radio-group v-model:value="moduleValue.deviceType">
                        <n-space>
                            <n-radio key="printer" value="printer"> 打印机 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="打印机类型">
                    <n-radio-group v-model:value="moduleValue.type">
                        <n-space>
                            <n-radio key="spyun" value="spyun">商鹏云打印机 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item show-require-mark label="机器号" path="printNo">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.printNo" clearable placeholder="请输入机器号" />
                        <p class="py-1 text-#999 text-14px">打印机底部标签信息中获取</p>
                    </div>
                </n-form-item>
                <n-form-item show-require-mark label="打印机KEY" path="key">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.key" clearable placeholder="请输入打印机KEY" />
                        <p class="py-1 text-#999 text-14px">打印机底部标签信息中获取</p>
                    </div>
                </n-form-item>
                <n-form-item show-require-mark label="appId" path="memberCode">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.memberCode" clearable placeholder="请输入appId" />
                        <p class="py-1 text-#999 text-14px">注册商鹏云 开发者账号, 得到appid和appSecret.</p>
                    </div>
                </n-form-item>
                <n-form-item show-require-mark label="appSecret" path="apiKey">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.apiKey" clearable placeholder="请输入打印机appSecret" />
                        <p class="py-1 text-#999 text-14px">注册商鹏云 开发者账号, 得到appid和appSecret.</p>
                    </div>
                </n-form-item>
                <n-form-item label="打印联数">
                    <n-input-number v-model:value="moduleValue.printNums" clearable placeholder="请输入打印机打印联数" />
                </n-form-item>
                <n-form-item label="打印类型">
                    <n-radio-group v-model:value="moduleValue.isPrintAll">
                        <n-space>
                            <n-radio :key="0" :value="0"> 分单打印 </n-radio>
                            <n-radio :key="1" :value="1">整单打印</n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="头部自定义信息">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.printHeader" clearable placeholder="请输入打印机头部自定义信息" :count="20" show-count />
                        <p class="py-1 text-#999 text-14px">建议：少于20字</p>
                    </div>
                </n-form-item>
                <n-form-item label="尾部自定义信息">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.printFooter" clearable placeholder="请输入打印机尾部自定义信息" :count="20" show-count />
                        <p class="py-1 text-#999 text-14px">建议：少于20字</p>
                    </div>
                </n-form-item>
                <n-form-item label="二维码类型">
                    <n-radio-group v-model:value="moduleValue.qrcodeType">
                        <n-space>
                            <n-radio key="custom" value="custom"> 自定义二维码链接 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="二维码链接地址">
                    <n-input v-model:value="moduleValue.qrcodeLink" clearable placeholder="请输入打印机二维码链接地址" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
const active = defineModel<boolean>('active')
const emit = defineEmits<{ refresh: [] }>()
const { formRef, moduleValue, rules, addPrinterInfo, loading, message } = useStoreDevice()

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const { sid, name, status, deviceType, type, printNo, key, memberCode, apiKey, printNums, isPrintAll, printFooter, printHeader, qrcodeType, qrcodeLink } = moduleValue
            await addPrinterInfo({ sid, name, status, deviceType, type, printNo, key, memberCode, apiKey, printNums, isPrintAll, printFooter, printHeader, qrcodeType, qrcodeLink })
            active.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

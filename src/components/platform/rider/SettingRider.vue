<template>
    <n-drawer v-model:show="active" :default-width="500" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="配送员设置" closable>
            <div class="flex items-center text-18px font-600 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">配送权限</div>
            <n-form ref="formRef" :label-width="120" :model="rider" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item label="允许外卖">
                    <n-radio-group v-model:value="rider.isTakeout">
                        <n-space>
                            <n-radio :key="1" :value="1"> 允许 </n-radio>
                            <n-radio :key="0" :value="0"> 禁止 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="允许集中配置">
                    <n-radio-group v-model:value="rider.isStation">
                        <n-space>
                            <n-radio :key="1" :value="1"> 允许 </n-radio>
                            <n-radio :key="0" :value="0"> 禁止 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="允许取消订单">
                    <n-radio-group v-model:value="rider.permCancelObj.status_takeout">
                        <n-space>
                            <n-radio :key="1" :value="1"> 允许 </n-radio>
                            <n-radio :key="0" :value="0"> 禁止 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="允许转外卖单">
                    <n-radio-group v-model:value="rider.permTransferObj.status_takeout">
                        <n-space>
                            <n-radio :key="1" :value="1"> 允许 </n-radio>
                            <n-radio :key="2" :value="2"> 禁止 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
const { updateRider, loading, message } = usePlatformRider()
const active = defineModel<boolean>('open')
const rider = defineModel<rider.riderInfo>({ required: true })
const emit = defineEmits<{ refresh: [] }>()
const formRef = ref()

/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors: any) => {
        if (!errors) {
            const { id, isTakeout, isStation, permCancelObj, permTransferObj } = rider.value
            await updateRider({ id, isTakeout, isStation, permCancel: JSON.stringify(permCancelObj), permTransfer: JSON.stringify(permTransferObj) })
            active.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
</script>

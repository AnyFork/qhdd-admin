<template>
    <!--调度骑手接单-->
    <n-modal v-model:show="show" preset="dialog" title="请选择调度的骑手">
        <div class="py-4">
            <n-select v-model:value="deliveryerId" :options="(allRider as any)" label-field="title" value-field="id" placeholder="请选择配送员名称" clearable />
        </div>
        <template #action>
            <div>
                <n-button @click="show = false" class="mr-4" :loading="loading">取消</n-button>
                <n-button type="primary" @click="submitConfirm" :loading="loading">确定调度</n-button>
            </div>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
const show = defineModel<boolean>('show')
const props = defineProps<{ oid?: number; allRider: rider.riderInfo[] }>()
const { assignOrder, message, loading } = usePlatformOrder()
// 骑手id
const deliveryerId = ref()
// 回调刷新页面
const emit = defineEmits<{ refresh: [] }>()
/**
 * 确认按钮触发
 */
const submitConfirm = async () => {
    if (!deliveryerId.value) {
        message.error('请选择需要调度的骑手')
        return false
    }
    // 调度骑手
    await assignOrder(props.oid!, deliveryerId.value)
    show.value = false
    emit('refresh')
}
</script>

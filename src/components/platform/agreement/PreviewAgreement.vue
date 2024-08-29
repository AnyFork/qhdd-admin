<template>
    <n-drawer v-model:show="open" :width="700" placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="协议预览" closable>
            <div>
                <div>
                    <div class="text-18px font-bold py-2">{{ data.title }}</div>
                    <div class="text-14px text-#999">生效日期：{{ transformTimestampsToDateString(data.addtime!) }}</div>
                </div>
                <div v-html="data.value"></div>
            </div>
        </n-drawer-content>
    </n-drawer>
</template>
<script setup lang="ts">
import { transformTimestampsToDateString } from '@/utils/tools/date'
const open = defineModel<boolean>('open')
defineProps<{ data: Partial<agreement> }>()
</script>

<template>
    <n-tabs type="card" v-model:value="activeTab">
        <n-tab name="BasicSetting">基本信息</n-tab>
        <n-tab name="BusinessQualification"> 营业资质 </n-tab>
        <n-tab name="TakeoutSettings"> 外卖设置 </n-tab>
        <n-tab name="PageSettings"> 页面设置 </n-tab>
        <n-tab name="AdvancedSetting"> 高级设置 </n-tab>
        <n-tab name="ReminderResponse"> 催单回复</n-tab>
        <n-tab name="ReviewReply"> 评价回复 </n-tab>
        <n-tab name="SubMerchant"> 子商户号 </n-tab>
    </n-tabs>
    <div class="my-2">
        <component :is="componentRef"></component>
    </div>
</template>

<script setup lang="ts">
import BasicSetting from '@/components/store/setting/BasicSetting.vue'
import BusinessQualification from '@/components/store/setting/BusinessQualification.vue'
import TakeoutSettings from '@/components/store/setting/TakeoutSettings.vue'
import AdvancedSetting from '@/components/store/setting/AdvancedSetting.vue'
import ReminderResponse from '@/components/store/setting/ReminderResponse.vue'
import ReviewReply from '@/components/store/setting/ReviewReply.vue'
import SubMerchant from '@/components/store/setting/SubMerchant.vue'
import PageSettings from '@/components/store/setting/PageSettings.vue'
const componentObj = { BasicSetting, BusinessQualification, TakeoutSettings, AdvancedSetting, ReminderResponse, ReviewReply, SubMerchant, PageSettings }
const activeTab = ref<keyof typeof componentObj>('BasicSetting')
const componentRef = computed(() => componentObj[activeTab.value])
</script>

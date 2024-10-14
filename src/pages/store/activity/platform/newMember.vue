<template>
    <div class="">
        <n-alert title="平台新用户活动" type="info"> 新用户下单满足条件后可享受减免优惠 </n-alert>
        <n-form :model="model" label-placement="left" label-width="200" class="my-6">
            <div class="flex items-center text-18px font-600 bg-#f5f5f5 p-2 my-4 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">活动信息</div>
            <n-form-item label="活动时间：">
                <n-date-picker v-model:value="range" type="datetimerange" clearable />
            </n-form-item>
            <n-form-item label="支持外卖类型：">
                <n-checkbox v-model:checked="model.isWaimai" disabled :checked-value="1" :unchecked-value="0"> 外卖 </n-checkbox>
            </n-form-item>
            <div class="flex items-center text-18px font-600 bg-#f5f5f5 p-2 my-4 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">优惠信息</div>
            <n-form-item label="平台新用户立减">
                <div class="flex-row-center p-4 border border-solid border-#dcdfe6 gap-4 bg-#f5f7fa">
                    <div class="flex-row-center">
                        <div class="w-150px">平台新用户立减</div>
                        <n-input-number v-model:value="model.mallNewMember!.back" :min="1" clearable placeholder="门店新客立减">
                            <template #suffix> 元 </template>
                        </n-input-number>
                    </div>
                    <div class="flex-row-center">
                        <div class="w-100px">平台承担</div>
                        <n-input-number v-model:value="model.mallNewMember!.plateform_charge" :min="0" :disabled="storeInfoFrom == 2" clearable placeholder="门店新客立减">
                            <template #suffix> 元 </template>
                        </n-input-number>
                        <n-button type="error">
                            删除
                            <template #icon>
                                <Icon icon="mi:delete"> </Icon>
                            </template>
                        </n-button>
                    </div>
                </div>
            </n-form-item>
            <div class="my-20 px-100px flex gap-6">
                <n-button type="primary" class="w-200px" :loading="loading" :disabled="!isAdmin" @click="submitActivity">{{ isEdit ? '编辑活动' : '创建活动' }}</n-button>
                <n-button v-if="isEdit" type="error" class="w-200px" :loading="loading" :disabled="!isAdmin" @click="deleteActivity">删除活动</n-button>
            </div>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { getStoreActivityListInfo, loading, activity, addStoreActivityInfo, message, updateActivityInfo, deleteActivityInfo } = useStoreActivity()
const range = ref<[number, number]>()
const { storeInfo, storeInfoFrom } = useStoreInfo()
const isEdit = ref(false)
const dialog = useDialog()
const { isAdmin } = useLoginUser()
/**
 * 表单数据
 */
const model = reactive<Partial<store.activity>>({
    isWaimai: 1,
    type: 'mallNewMember',
    starttime: undefined,
    endtime: undefined,
    mallNewMember: {
        back: undefined,
        plateform_charge: undefined,
        store_charge: undefined,
        agent_charge: 0
    }
})

/**
 * 创建活动或者修改活动
 */
const submitActivity = () => {
    if (!range.value) {
        message.error('请选择活动时间')
        return
    }
    if (!range.value[0]) {
        message.error('活动开始时间不能为空')
        return
    }
    if (!range.value[1]) {
        message.error('活动结束时间不能为空')
        return
    }
    if (range.value[1] <= range.value[0]) {
        message.error('活动结束时间不能小于活动开始时间')
        return
    }
    if (model.mallNewMember?.back == null || model.mallNewMember?.back == 0 || model.mallNewMember?.back == undefined) {
        message.error('新客立减金额不能为空,必须大于0')
        return
    }
    if (model.mallNewMember.plateform_charge == null || model.mallNewMember.plateform_charge == undefined) {
        model.mallNewMember.plateform_charge = 0
    }
    model.mallNewMember.store_charge = model.mallNewMember.back - model.mallNewMember.plateform_charge
    model.starttime = Math.round(range.value[0] / 1000)
    model.endtime = Math.round(range.value[1] / 1000)
    model.sid = storeInfo.value.id
    model.data = JSON.stringify(model.mallNewMember)
    const newModel = JSON.parse(JSON.stringify(model))
    delete newModel.mallNewMember
    if (isEdit.value) {
        updateActivityInfo(newModel)
    } else {
        addStoreActivityInfo(newModel)
    }
}

/**
 * 删除活动
 */
const deleteActivity = () => {
    dialog.warning({
        title: '温馨提示',
        content: '您确定要删除平台新客立减活动吗?',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            deleteActivityInfo(model.id!)
        }
    })
}

onMounted(async () => {
    await getStoreActivityListInfo({ sid: storeInfo.value.id, type: 'mallNewMember' })
    if (activity.value && activity.value[0]) {
        model.mallNewMember = JSON.parse(activity.value[0].data)
        range.value = [activity.value[0].starttime * 1000, activity.value[0].endtime * 1000]
        model.isWaimai = 1
        model.title = activity.value[0].title
        model.starttime = activity.value[0].starttime
        model.endtime = activity.value[0].endtime
        model.id = activity.value[0].id
        isEdit.value = true
    } else {
        isEdit.value = false
    }
})
</script>

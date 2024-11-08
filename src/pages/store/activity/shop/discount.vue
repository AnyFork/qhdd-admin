<template>
    <div class="">
        <n-alert title="门店满减活动" type="info"> 下单满足条件后可享受减免优惠 </n-alert>
        <n-form :model="model" label-placement="left" label-width="200" class="my-6">
            <div class="flex items-center text-18px font-600 bg-#f5f5f5 p-2 my-4 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">活动信息</div>
            <n-form-item label="活动时间：">
                <n-date-picker v-model:value="range" type="datetimerange" clearable />
            </n-form-item>
            <n-form-item label="支持外卖类型：">
                <n-checkbox v-model:checked="model.isWaimai" disabled :checked-value="1" :unchecked-value="0"> 外卖 </n-checkbox>
            </n-form-item>
            <div class="flex items-center text-18px font-600 bg-#f5f5f5 p-2 my-4 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">优惠信息</div>
            <n-form-item label="满减优惠">
                <div class="pl-2 border border-solid border-#dcdfe6 bg-#f5f7fa">
                    <div class="flex-row-center p-4 gap-4" v-for="(item, index) in model.discount" :key="index">
                        <div class="flex-row-center">
                            <div class="w-20px">满</div>
                            <n-input-number v-model:value="item!.condition" :min="1" clearable>
                                <template #suffix> 元 </template>
                            </n-input-number>
                        </div>
                        <div class="flex-row-center">
                            <div class="w-20px">减</div>
                            <n-input-number v-model:value="item!.back" :min="0" clearable>
                                <template #suffix> 元 </template>
                            </n-input-number>
                        </div>
                        <div class="flex-row-center">
                            <div class="w-60px">平台承担</div>
                            <n-input-number v-model:value="item!.plateform_charge" :min="0" :disabled="storeInfoFrom == 2" clearable placeholder="门店新客立减">
                                <template #suffix> 元 </template>
                            </n-input-number>
                            <n-button type="error" @click="model.discount!.splice(index, 1)">
                                删除
                                <template #icon>
                                    <Icon icon="mi:delete"> </Icon>
                                </template>
                            </n-button>
                        </div>
                    </div>
                    <div class="py-2">
                        <n-button v-if="model.discount && model.discount.length < 4" type="primary" @click="addItem">添加规则</n-button>
                        <span class="ml-2 pr-4 text-14px text-#999">最多创建4条优惠规则</span>
                    </div>
                </div>
            </n-form-item>
            <div class="my-20 px-100px flex gap-6">
                <n-button v-if="checkPlatformFee()" type="primary" class="w-200px" :loading="loading" :disabled="!isAdmin" @click="submitActivity">{{ isEdit ? '编辑活动' : '创建活动' }}</n-button>
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
    type: 'discount',
    starttime: undefined,
    endtime: undefined,
    discount: []
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
    if (model.discount && model.discount.length == 0) {
        message.error('满减活动内容不能为空，减金额不能超过满减金额')
        return
    }
    const item = model.discount?.filter((item) => !(item?.back && item.condition && item.back < item.condition))
    if (item && item.length > 0) {
        message.error('满减活动内容不能为空，减金额不能为0，且不能超过满减金额')
        return
    }
    model.discount?.forEach((sub) => {
        if (sub!.plateform_charge == null || sub!.plateform_charge == undefined) {
            sub!.plateform_charge = 0
        }
        sub!.store_charge = sub!.back! - sub!.plateform_charge
    })
    model.starttime = Math.round(range.value[0] / 1000)
    model.endtime = Math.round(range.value[1] / 1000)
    model.sid = storeInfo.value.id
    model.data = JSON.stringify(model.discount)
    const newModel = JSON.parse(JSON.stringify(model))
    delete newModel.discount
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
        content: '您确定要删除满减活动吗?',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            deleteActivityInfo(model.id!)
        }
    })
}

/**
 * 增加一项满减规则
 */
const addItem = () => {
    model.discount!.push({ condition: undefined, back: undefined, plateform_charge: 0, store_charge: 0, agent_charge: 0 })
}

/**
 * 判断是否存在平台承担费用
 */
const checkPlatformFee = () => {
    return model.discount?.find((item) => item.plateform_charge && item.plateform_charge > 0) ? false : true
}

onMounted(async () => {
    await getStoreActivityListInfo({ sid: storeInfo.value.id, type: 'discount' })
    if (activity.value && activity.value[0]) {
        model.discount = JSON.parse(activity.value[0].data)
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

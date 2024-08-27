<template>
    <div class="">
        <n-alert title="满赠活动" type="info"> 下单满足条件后可获得赠品 </n-alert>
        <n-form :model="model" label-placement="left" label-width="200" class="my-6">
            <div class="flex items-center text-18px font-600 bg-#f5f5f5 p-2 my-4 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">活动信息</div>
            <n-form-item label="活动时间：">
                <n-date-picker v-model:value="range" type="datetimerange" clearable />
            </n-form-item>
            <n-form-item label="支持外卖类型：">
                <n-checkbox v-model:checked="model.isWaimai" disabled :checked-value="1" :unchecked-value="0"> 外卖 </n-checkbox>
            </n-form-item>
            <div class="flex items-center text-18px font-600 bg-#f5f5f5 p-2 my-4 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">优惠信息</div>
            <n-form-item label="满赠优惠">
                <div class="p-2 border border-solid border-#dcdfe6 bg-#f5f7fa">
                    <div class="flex-row-center gap-4 p-4" v-for="(item, index) in model.grant" :key="index">
                        <div class="flex-row-center">
                            <div class="w-20px">满</div>
                            <n-input-number v-model:value="item!.condition" :min="1" clearable>
                                <template #suffix> 元 </template>
                            </n-input-number>
                        </div>
                        <div class="flex-row-center">
                            <div class="w-50px">赠送</div>
                            <n-input v-model:value="item!.back" clearable></n-input>
                        </div>
                        <div class="flex-row-center">
                            <n-button type="error" @click="model.grant?.splice(index, 1)">
                                删除
                                <template #icon>
                                    <Icon icon="mi:delete"> </Icon>
                                </template>
                            </n-button>
                        </div>
                    </div>
                    <div class="py-2">
                        <n-button v-if="model.grant && model.grant.length < 4" type="primary" @click="addItem">添加规则</n-button>
                        <span class="ml-2 text-14px text-#999">最多创建4条优惠规则</span>
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
const { storeInfo } = useStoreInfo()
const isEdit = ref(false)
const dialog = useDialog()
const { isAdmin } = useLoginUser()
/**
 * 表单数据
 */
const model = reactive<Partial<store.activity>>({
    isWaimai: 1,
    type: 'grant',
    starttime: undefined,
    endtime: undefined,
    grant: []
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
    if (model.grant && model.grant.length == 0) {
        message.error('满赠活动内容不能为空')
        return
    }
    const item = model.grant?.filter((item) => !(item?.back && item.condition))
    if (item && item.length > 0) {
        message.error('满赠活动内容不能为空，且赠品不能为空')
        return
    }
    model.starttime = Math.round(range.value[0] / 1000)
    model.endtime = Math.round(range.value[1] / 1000)
    model.sid = storeInfo.value.id
    model.data = JSON.stringify(model.grant)
    delete model.grant
    if (isEdit.value) {
        updateActivityInfo(model)
    } else {
        addStoreActivityInfo(model)
    }
}

/**
 * 删除活动
 */
const deleteActivity = () => {
    dialog.warning({
        title: '温馨提示',
        content: '您确定要删除满赠活动吗?',
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
    model.grant?.push({ condition: undefined, back: undefined })
}

onMounted(async () => {
    await getStoreActivityListInfo({ sid: storeInfo.value.id, type: 'grant' })
    if (activity.value && activity.value[0]) {
        model.grant = JSON.parse(activity.value[0].data)
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

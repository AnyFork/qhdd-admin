<template>
    <n-drawer v-model:show="active" :default-width="740" :min-width="740" resizable placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="创建活动" closable>
            <n-form ref="formRef" :label-width="120" :model="modal" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="活动类型" path="title">
                    <n-radio-group v-model:value="modal.type">
                        <n-space>
                            <n-radio value="mallNewMember">平台新用户</n-radio>
                            <n-radio value="newMember">门店新用户</n-radio>
                            <n-radio value="discount">满减活动</n-radio>
                            <n-radio value="grant">满赠活动</n-radio>
                            <n-radio value="deliveryFeeDiscount">满减配送费</n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item show-require-mark label="活动时间" path="title">
                    <n-date-picker v-model:value="range" type="datetimerange" clearable />
                </n-form-item>
                <n-form-item show-require-mark label="适用对象">
                    <n-checkbox v-model:checked="modal.isWaimai" label="外卖" :checked-value="1" :unchecked-value="0" disabled />
                </n-form-item>
                <!--平台新客立减-->
                <n-form-item v-if="modal.type == 'mallNewMember'" show-require-mark label="平台新客立减">
                    <div class="flex-row-center w-full">
                        <n-input-number v-model:value="modal.mallNewMember!.back" placeholder="多少" clearable>
                            <template #suffix> 元 </template>
                        </n-input-number>
                        <div class="w-70px mx-2">平台承担</div>
                        <n-input-number v-model:value="modal.mallNewMember!.plateform_charge" placeholder="多少" clearable>
                            <template #suffix> 元 </template>
                        </n-input-number>
                    </div>
                </n-form-item>
                <!--门店新客立减-->
                <n-form-item v-if="modal.type == 'newMember'" show-require-mark label="门店新客立减">
                    <div class="flex-row-center w-full">
                        <n-input-number v-model:value="modal.newMember!.back" placeholder="多少" clearable>
                            <template #suffix> 元 </template>
                        </n-input-number>
                        <div class="w-70px mx-2">平台承担</div>
                        <n-input-number v-model:value="modal.newMember!.plateform_charge" placeholder="多少" clearable>
                            <template #suffix> 元 </template>
                        </n-input-number>
                    </div>
                </n-form-item>
                <!--门店满减-->
                <n-form-item v-if="modal.type == 'discount'" show-require-mark label="满减优惠">
                    <div>
                        <div class="flex-row-center w-full pb-2" v-for="(discount, index) in modal.discount" :key="index">
                            <div class="w-20px mx-2">满</div>
                            <n-input-number v-model:value="discount.condition" placeholder="多少" clearable>
                                <template #suffix> 元 </template>
                            </n-input-number>
                            <div class="w-20px mx-2">减</div>
                            <n-input-number v-model:value="discount.back" placeholder="多少" clearable>
                                <template #suffix> 元 </template>
                            </n-input-number>
                            <div class="w-120px mx-2">平台承担</div>
                            <n-input-number v-model:value="discount.plateform_charge" placeholder="多少" clearable>
                                <template #suffix> 元 </template>
                            </n-input-number>
                            <n-button type="error" @click="modal.discount?.splice(index, 1)">删除</n-button>
                        </div>
                        <n-button v-if="modal.discount && modal.discount.length < 4" type="primary" @click="addDiscountRules">添加规则(最多4条)</n-button>
                    </div>
                </n-form-item>
                <!--门店满赠-->
                <n-form-item v-if="modal.type == 'grant'" show-require-mark label="满赠优惠">
                    <div>
                        <div class="flex-row-center w-full pb-2" v-for="(grant, index) in modal.grant" :key="index">
                            <div class="w-20px mx-2">满</div>
                            <n-input-number v-model:value="grant.condition" placeholder="多少" clearable class="!w-200px">
                                <template #suffix> 元 </template>
                            </n-input-number>
                            <div class="w-20px mx-2">赠</div>
                            <n-input v-model:value="grant.back" placeholder="赠物品" clearable class="!w-200px" />
                            <n-button type="error" @click="modal.grant?.splice(index, 1)">删除</n-button>
                        </div>
                        <n-button v-if="modal.grant && modal.grant.length < 4" type="primary" @click="addGrantRules">添加规则(最多4条)</n-button>
                    </div>
                </n-form-item>
                <!--满减配送费-->
                <n-form-item v-if="modal.type == 'deliveryFeeDiscount'" show-require-mark label="满减配送费">
                    <div>
                        <div class="flex-row-center w-full pb-2" v-for="(deliveryFeeDiscount, index) in modal.deliveryFeeDiscount" :key="index">
                            <div class="w-20px mx-2">满</div>
                            <n-input-number v-model:value="deliveryFeeDiscount.condition" placeholder="多少" clearable>
                                <template #suffix> 元 </template>
                            </n-input-number>
                            <div class="w-20px mx-2">减</div>
                            <n-input-number v-model:value="deliveryFeeDiscount.back" placeholder="多少" clearable>
                                <template #suffix> 元配送费 </template>
                            </n-input-number>
                            <n-button type="error" @click="modal.deliveryFeeDiscount?.splice(index, 1)">删除</n-button>
                        </div>
                        <n-button v-if="modal.deliveryFeeDiscount && modal.deliveryFeeDiscount.length < 4" type="primary" @click="addFeeRules">添加规则(最多4条)</n-button>
                    </div>
                </n-form-item>
                <n-form-item show-require-mark label="将活动同步到">
                    <n-radio-group v-model:value="redirectStore">
                        <n-space>
                            <n-radio value="-1">全部商户</n-radio>
                            <n-radio value="2">指定商户</n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-space v-if="redirectStore == '2'" vertical>
                    <n-transfer v-model:value="sidArray" virtual-scroll :options="(store as any)" source-filterable target-filterable source-filter-placeholder="请筛选指定的店铺" target-filter-placeholder="请筛选过滤后的店铺" />
                </n-space>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
const active = defineModel<boolean>('active')
defineProps<{ store: store.storeData[] }>()
// 时间反问
const range = ref<[number, number]>()
// 同步方式
const redirectStore = ref('-1')
// 选择同步的sids
const sidArray = ref([])
const { loading, addActivityBatch, message } = usePlatformActivity()
const emit = defineEmits<{ refresh: [] }>()

const modal = reactive<Partial<store.activity>>({
    type: 'mallNewMember',
    sids: '-1',
    starttime: undefined,
    isWaimai: 1,
    endtime: undefined,
    mallNewMember: {
        back: undefined,
        plateform_charge: undefined,
        store_charge: undefined,
        agent_charge: 0
    },
    newMember: {
        back: undefined,
        plateform_charge: undefined,
        store_charge: undefined
    },
    discount: [],
    grant: [],
    deliveryFeeDiscount: []
})

/**
 * 增加满减规则
 */
const addDiscountRules = () => {
    modal.discount?.push({
        condition: undefined,
        back: undefined,
        plateform_charge: undefined,
        store_charge: undefined,
        agent_charge: 0
    })
}
/**
 * 满赠规则
 */
const addGrantRules = () => {
    modal.grant?.push({
        condition: undefined,
        back: undefined
    })
}
/**
 * 满减配送费
 */
const addFeeRules = () => {
    modal.deliveryFeeDiscount?.push({
        condition: undefined,
        back: undefined,
        plateform_charge: undefined,
        store_charge: undefined,
        agent_charge: 0
    })
}
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    if (!range.value) {
        message.error('请选择活动开始和结束时间')
        return
    }
    if (range.value) {
        modal.starttime = Math.round(range.value[0] / 1000)
        modal.endtime = Math.round(range.value[1] / 1000)
    }
    // 平台立减
    if (modal.type == 'mallNewMember') {
        if (modal.mallNewMember?.back == undefined || modal.mallNewMember.back == null || modal.mallNewMember.back == 0) {
            message.error('平台新客立减活动，立减金额必须大于0')
            return
        }
        if (modal.mallNewMember?.plateform_charge == undefined || modal.mallNewMember.plateform_charge == null || modal.mallNewMember.plateform_charge == 0) {
            modal.mallNewMember!.plateform_charge = 0
        }
        modal.mallNewMember.store_charge = modal.mallNewMember.back - modal.mallNewMember.plateform_charge
        modal.mallNewMember.agent_charge = 0
        modal.data = JSON.stringify(modal.mallNewMember)
    }
    // 门店立减
    if (modal.type == 'newMember') {
        if (modal.newMember?.back == undefined || modal.newMember.back == null || modal.newMember.back == 0) {
            message.error('门店新客立减活动，立减金额必须大于0')
            return
        }
        if (modal.newMember?.plateform_charge == undefined || modal.newMember.plateform_charge == null || modal.newMember.plateform_charge == 0) {
            modal.newMember!.plateform_charge = 0
        }
        modal.newMember.store_charge = modal.newMember.back - modal.newMember.plateform_charge
        modal.data = JSON.stringify(modal.newMember)
    }
    // 满减优惠
    if (modal.type == 'discount') {
        if (modal.discount?.length == 0) {
            message.error('请添加满减规则')
            return
        } else {
            for (let i = 0; i < modal.discount!.length; i++) {
                const discount = modal.discount![i]
                if (discount.condition == undefined || discount.condition == null || discount.condition == 0) {
                    message.error(`满减规则，满减金额不能为空`)
                    return
                }
                if (discount.back == undefined || discount.back == null || discount.back == 0) {
                    message.error(`满${discount.condition}元立减规则，优惠金额不能为空`)
                    return
                }
                if (discount.back > discount.condition) {
                    message.error(`满${discount.condition}元立减规则，优惠金额不能大于立减金额`)
                    return
                }
                if (discount.plateform_charge == undefined || discount.plateform_charge == null || discount.plateform_charge == 0) {
                    discount.plateform_charge = 0
                }
                discount.store_charge = discount.back - discount.plateform_charge
                discount.agent_charge = 0
            }
            modal.data = JSON.stringify(modal.discount)
        }
    }
    // 满减配送费
    if (modal.type == 'deliveryFeeDiscount') {
        if (modal.deliveryFeeDiscount?.length == 0) {
            message.error('请添加满减配送费规则')
            return
        } else {
            for (let i = 0; i < modal.deliveryFeeDiscount!.length; i++) {
                const discount = modal.deliveryFeeDiscount![i]
                if (discount.condition == undefined || discount.condition == null || discount.condition == 0) {
                    message.error(`满${discount.condition}元减配送规则，满减金额不能为空`)
                    return
                }
                if (discount.back == undefined || discount.back == null || discount.back == 0) {
                    message.error(`满${discount.condition}元减配送规则，减配送费金额不能为空`)
                    return
                }
                if (discount.back > discount.condition) {
                    message.error(`满${discount.condition}元减配送规则，减配送费金额不能大于满减金额`)
                    return
                }
                discount.plateform_charge = discount.back
                discount.store_charge = 0
                discount.agent_charge = 0
            }
            modal.data = JSON.stringify(modal.deliveryFeeDiscount)
        }
    }
    // 满赠活动
    if (modal.type == 'grant') {
        if (modal.grant?.length == 0) {
            message.error('请添加满赠配送费规则')
            return
        } else {
            for (let i = 0; i < modal.grant!.length; i++) {
                const discount = modal.grant![i]
                if (discount.condition == undefined || discount.condition == null || discount.condition == 0) {
                    message.error(`满${discount.condition}元赠物品规则，满减金额不能为空`)
                    return
                }
                if (!discount.back || discount.back == undefined || discount.back == null) {
                    message.error(`满${discount.condition}元赠物品规则，赠送物品不能为空`)
                    return
                }
            }
            modal.data = JSON.stringify(modal.grant)
        }
    }
    if (redirectStore.value == '-1') {
        modal.sids = '-1'
    } else {
        if (sidArray.value.length == 0) {
            message.error('请选择指定的商户')
            return
        } else {
            modal.sids = sidArray.value.join(',')
        }
    }
    console.log(modal)
    // 保存数据
    addActivityBatch(
        {
            sids: modal.sids,
            type: modal.type,
            starttime: modal.starttime,
            endtime: modal.endtime,
            data: modal.data
        },
        () => {
            active.value = false
            emit('refresh')
        }
    )
}
</script>

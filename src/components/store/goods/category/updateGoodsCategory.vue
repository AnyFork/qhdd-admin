<template>
    <n-drawer v-model:show="active" :width="700" placement="right">
        <n-drawer-content :title="props.parentNode ? '修改商品子分类' : '修改商品分类'">
            <n-form ref="formRef" :label-width="150" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item v-if="props.parentNode" label="父分类名称" path="title">
                    <n-input :default-value="props.parentNode?.title" disabled placeholder="请输入父分类名称" />
                </n-form-item>
                <n-form-item show-require-mark :label="props.parentNode ? '子分类名称' : '分类名称'" path="title">
                    <n-input v-model:value="moduleValue.title" clearable placeholder="请输入分类名称" />
                </n-form-item>
                <n-form-item v-if="!props.parentNode" label="分类描述">
                    <n-input v-model:value="moduleValue.description" placeholder="请输入分类描述" clearable class="w-180px" />
                </n-form-item>
                <n-form-item :label="props.parentNode ? '子分类图标' : '分类图标'">
                    <div class="selectImg">
                        <div class="flex-row-center">
                            <n-input v-model:value="moduleValue.thumb" disabled learable class="!w-[255px]" placeholder="请选择图标" />
                            <n-button type="primary" @click="show = true"> 搜索 </n-button>
                        </div>
                        <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                    </div>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="moduleValue.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" />
                </n-form-item>
                <n-form-item v-if="!props.parentNode" label="分类内最低消费金额">
                    <div>
                        <n-input-number v-model:value="moduleValue.minFee" placeholder="请输入分类内最低消费金额" :min="0" clearable class="w-180px" />
                        <div class="mt-2 text-#999 text-12px">限制在该分类内， 购买的商品不能少于多少元。适用场景：快餐分类，这个分类内的商品，下单金额必须满足元才能下单。该设置仅对外卖有效。消费金额不包括餐盒费</div>
                    </div>
                </n-form-item>
                <n-form-item v-if="!props.parentNode" label="可售时间段">
                    <div>
                        <n-radio-group v-model:value="moduleValue.isShowtime">
                            <n-space>
                                <n-radio :key="0" :value="0"> 不限</n-radio>
                                <n-radio :key="1" :value="1">指定时间段 </n-radio>
                            </n-space>
                        </n-radio-group>
                        <div v-if="moduleValue.isShowtime == 1" class="mt-4">
                            <n-form-item label="展示时间" :label-width="70">
                                <div class="flex-row-center">
                                    <n-time-picker v-model:formatted-value="moduleValue.startTime" value-format="H:mm" format="H:mm" clearable time-zone="Asia/Shanghai" />
                                    <div class="px-2">至</div>
                                    <n-time-picker v-model:formatted-value="moduleValue.endTime" value-format="H:mm" format="H:mm" clearable time-zone="Asia/Shanghai" />
                                </div>
                            </n-form-item>
                            <n-form-item label="展示时间" :label-width="70">
                                <n-checkbox-group v-model:value="moduleValue.weekStr">
                                    <n-space>
                                        <n-checkbox :key="1" :value="1">周一</n-checkbox>
                                        <n-checkbox :key="2" :value="2">周二 </n-checkbox>
                                        <n-checkbox :key="3" :value="3">周三 </n-checkbox>
                                        <n-checkbox :key="4" :value="4">周四 </n-checkbox>
                                        <n-checkbox :key="5" :value="5">周五 </n-checkbox>
                                        <n-checkbox :key="6" :value="6">周六 </n-checkbox>
                                        <n-checkbox :key="7" :value="7">周日 </n-checkbox>
                                    </n-space>
                                </n-checkbox-group>
                            </n-form-item>
                        </div>
                    </div>
                </n-form-item>
                <n-form-item v-if="!props.parentNode" label="是否必填">
                    <n-radio-group v-model:value="moduleValue.isRequired">
                        <n-space>
                            <n-radio :key="0" :value="0"> 否</n-radio>
                            <n-radio :key="1" :value="1">是 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button type="info" @click="submitCallback" :loading="loading">保存</n-button>
            </template>
        </n-drawer-content>
    </n-drawer>
    <!-- 选择图片对话框 -->
    <SelectImageDialog v-if="show" v-model:open="show" v-model:node="node"></SelectImageDialog>
</template>

<script setup lang="ts">
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
const active = defineModel<boolean>('active')
const props = defineProps<{ parentNode: store.goodsCategory; node: store.goodsCategory }>()
const emit = defineEmits<{ refresh: [] }>()
const { formRef, moduleValue, rules, updateCategory, loading, message } = useStoreGoodsCategory()
const show = ref(false)
const node = ref<system.attachment>()
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const { id, title, description, thumb, minFee, displayorder, isShowtime, isRequired, startTime, endTime, weekStr, sid } = moduleValue
            if (props.parentNode) {
                await updateCategory({ id, sid, title, thumb, displayorder })
            } else {
                await updateCategory({ id,sid, title, description, thumb, minFee, displayorder, isShowtime, isRequired, startTime: isShowtime == 1 ? startTime : undefined, endTime: isShowtime == 1 ? endTime : undefined, week: isShowtime == 1 ? weekStr?.join(',') : undefined })
            }
            active.value = false
            emit('refresh')
            //清除表单数据
            moduleValue.title = undefined
            moduleValue.description = undefined
            moduleValue.thumb = undefined
            moduleValue.minFee = undefined
            moduleValue.displayorder = undefined
            moduleValue.isShowtime = undefined
            moduleValue.isRequired = undefined
            moduleValue.startTime = undefined
            moduleValue.endTime = undefined
            moduleValue.weekStr = undefined
            // 清空表单校验
            formRef.value?.restoreValidation()
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
onMounted(() => {
    if (props.node) {
        moduleValue.id = props.node.id
        moduleValue.title = props.node.title
        moduleValue.thumb = props.node.thumb
        moduleValue.description = props.node.description
        moduleValue.minFee = props.node.minFee
        moduleValue.displayorder = props.node.displayorder
        moduleValue.isShowtime = props.node.isShowtime
        moduleValue.isRequired = props.node.isRequired
        moduleValue.startTime = props.node.isShowtime == 1 ? props.node.startTime : undefined
        moduleValue.endTime = props.node.isShowtime == 1 ? props.node.endTime : undefined
        if (props.node.week) {
            moduleValue.weekStr = props.node.week.split(',').map((n) => {
                return parseInt(n)
            })
        }
    }
})
</script>

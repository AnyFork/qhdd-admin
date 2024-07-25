<template>
    <n-drawer v-model:show="active" :default-width="680" resizable placement="right" :mask-closable="false" :close-on-esc="false">
        <n-drawer-content title="修改商品" closable>
            <div class="flex items-center text-18px font-600 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">基础信息</div>
            <n-form ref="formRef" :label-width="120" :model="moduleValue" :rules="rules" size="medium" label-placement="left" style="margin-top: 20px">
                <n-form-item show-require-mark label="商品名称" path="title">
                    <n-input v-model:value="moduleValue.title" clearable placeholder="请输入商品名称" />
                </n-form-item>
                <n-form-item show-require-mark label="商品分类" path="cid">
                    <n-cascader v-model:value="moduleValue.cid" placeholder="请选择商品分类" value-field="id" label-field="title" expand-trigger="click" :options="tableData" check-strategy="all" :show-path="true" :filterable="true" @update:value="handleUpdateValue" />
                </n-form-item>
                <n-form-item show-require-mark label="商品图片" path="thumb">
                    <div class="selectImg">
                        <div class="flex-row-center">
                            <n-input v-model:value="moduleValue.thumb" disabled learable class="!w-335px" placeholder="请选择商品图标" />
                            <n-button type="primary" @click="show = true"> 选择图片 </n-button>
                        </div>
                        <n-image :src="node?.url ?? getAssetsImages('nopic.jpg')" :preview-disabled="!node?.url" width="100" height="100" class="my-1 border border-solid border-#f5f5f5"></n-image>
                    </div>
                </n-form-item>
                <n-form-item label="排序">
                    <n-input-number v-model:value="moduleValue.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" />
                </n-form-item>
                <div class="mb-2 flex items-center text-18px font-600 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">详细信息</div>
                <n-form-item label="商品推荐理由">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.recommendReason" type="textarea" :autosize="{ minRows: 3 }" clearable placeholder="请输入商品推荐理由" :maxlength="14" show-count />
                        <p class="py-1 text-#999 text-14px">最多不超过14个字, 留空则不显示</p>
                    </div>
                </n-form-item>
                <n-form-item label="商品类型">
                    <n-radio-group v-model:value="moduleValue.type">
                        <n-space>
                            <n-radio :key="1" :value="1"> 仅外卖 </n-radio>
                            <n-radio :key="2" :value="2"> 仅店内 </n-radio>
                            <n-radio :key="3" :value="3"> 外面+店内 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <div class="mb-2 flex items-center text-18px font-600 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">售卖信息</div>
                <n-form-item label="外卖现价">
                    <n-input-number v-model:value="moduleValue.price" :min="0" :precision="2" clearable placeholder="请输入外卖现价">
                        <template #suffix>元</template>
                    </n-input-number>
                </n-form-item>
                <n-form-item label="外卖原价">
                    <n-input-number v-model:value="moduleValue.oldPrice" :min="0" :precision="2" clearable placeholder="请输入外卖原价">
                        <template #suffix>元</template>
                    </n-input-number>
                </n-form-item>
                <n-form-item label="超级会员价">
                    <div class="w-full">
                        <n-input-number v-model:value="moduleValue.svipPrice" :min="0" :precision="2" clearable placeholder="请输入外卖会员价">
                            <template #suffix>元</template>
                        </n-input-number>
                        <p class="py-1 text-#999 text-14px">超级会员价格小于外卖现价时，超级会员价格设置才能生效。注意：设置超级会员价格成功后，此商品将不能添加为天天特价商品。</p>
                    </div>
                </n-form-item>
                <n-form-item label="餐盒价格">
                    <n-input-number v-model:value="moduleValue.boxPrice" :min="0" :precision="2" clearable placeholder="请输入餐盒价格">
                        <template #suffix>元</template>
                    </n-input-number>
                </n-form-item>
                <n-form-item label="最小购买数量">
                    <n-input-number v-model:value="moduleValue.unitnum" :min="0" clearable placeholder="请输入最小购买数量">
                        <template #suffix>份</template>
                    </n-input-number>
                </n-form-item>
                <n-form-item label="每单限购">
                    <n-input-number v-model:value="moduleValue.orderLimit" :min="0" clearable placeholder="请输入每单限购数量">
                        <template #suffix>份</template>
                    </n-input-number>
                </n-form-item>
                <n-form-item label="总限购">
                    <n-input-number v-model:value="moduleValue.totalLimit" :min="0" clearable placeholder="请输入总限购数量">
                        <template #suffix>份</template>
                    </n-input-number>
                </n-form-item>
                <n-form-item label="每日补足库存">
                    <n-radio-group v-model:value="moduleValue.totalAutoUpdate">
                        <n-space>
                            <n-radio :key="0" :value="0"> 否 </n-radio>
                            <n-radio :key="1" :value="1"> 是 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="剩余库存">
                    <n-input-number v-model:value="moduleValue.total" :min="-1" clearable placeholder="请输入剩余库存数量" />
                </n-form-item>
                <n-form-item label="剩余预警">
                    <n-input-number v-model:value="moduleValue.totalWarning" :min="0" clearable placeholder="请输入剩余预警库存数量" />
                </n-form-item>
                <n-form-item label="每日库存">
                    <n-input-number v-model:value="moduleValue.totalEveryday" :min="0" clearable placeholder="请输入每日库存数量" />
                </n-form-item>
                <n-form-item label="可售时间段">
                    <div>
                        <n-radio-group v-model:value="moduleValue.isShowtime">
                            <n-space>
                                <n-radio :key="0" :value="0"> 不限</n-radio>
                                <n-radio :key="1" :value="1">指定时间段 </n-radio>
                            </n-space>
                        </n-radio-group>
                        <div v-if="moduleValue.isShowtime == 1" class="w-full py-2">
                            <n-checkbox-group v-model:value="moduleValue.weekStr">
                                <n-space>
                                    <n-checkbox key="1" value="1">周一</n-checkbox>
                                    <n-checkbox key="2" value="2">周二 </n-checkbox>
                                    <n-checkbox key="3" value="3">周三 </n-checkbox>
                                    <n-checkbox key="4" value="4">周四 </n-checkbox>
                                    <n-checkbox key="5" value="5">周五 </n-checkbox>
                                    <n-checkbox key="6" value="6">周六 </n-checkbox>
                                    <n-checkbox key="7" value="7">周日 </n-checkbox>
                                </n-space>
                            </n-checkbox-group>
                            <p class="py-1 text-#999 text-14px">此项若不勾选，默认为周一至周日均为可售时间段。</p>
                        </div>
                        <div v-if="moduleValue.isShowtime == 1" class="w-full">
                            <div class="flex items-center py-2 w-full">
                                <n-time-picker v-model:formatted-value="moduleValue.startTime1" value-format="H:mm" format="H:mm" clearable time-zone="Asia/Shanghai" class="w-150px" />
                                <div class="px-2">至</div>
                                <n-time-picker v-model:formatted-value="moduleValue.endTime1" value-format="H:mm" format="H:mm" clearable time-zone="Asia/Shanghai" class="w-150px" />
                            </div>
                            <div class="flex items-center">
                                <n-time-picker v-model:formatted-value="moduleValue.startTime2" value-format="H:mm" format="H:mm" clearable time-zone="Asia/Shanghai" class="w-150px" />
                                <div class="px-2">至</div>
                                <n-time-picker v-model:formatted-value="moduleValue.endTime2" value-format="H:mm" format="H:mm" clearable time-zone="Asia/Shanghai" class="w-150px" />
                            </div>
                        </div>
                    </div>
                </n-form-item>
                <n-form-item label="商品规格">
                    <n-switch v-model:value="moduleValue.isOptions" :checked-value="1" :unchecked-value="0" />
                </n-form-item>
                <n-form-item v-if="moduleValue.isOptions == 1" label="规格标题">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.optionTitle" clearable placeholder="请输入规格标题" />
                        <p class="py-1 text-#999 text-14px">不填则默认显示“规格”</p>
                        <div class="relative" v-for="(_item, index) in moduleValue.goodsOptionsList" :key="index">
                            <Icon icon="material-symbols:delete" class="text-primary absolute right-0 top-0px" @click="moduleValue.goodsOptionsList!.splice(index, 1)" />
                            <GoodsOptions v-model="moduleValue.goodsOptionsList![index]"></GoodsOptions>
                        </div>
                        <n-button type="primary" @click="addGoodsOption">添加规则</n-button>
                    </div>
                </n-form-item>
                <n-form-item label="商品加料">
                    <n-switch v-model:value="moduleValue.isMaterials" :checked-value="1" :unchecked-value="0" />
                </n-form-item>
                <n-form-item v-if="moduleValue.isMaterials == 1" label="加料标题">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.materialTitle" clearable placeholder="请输入加料标题" />
                        <p class="py-1 text-#999 text-14px">不填则默认显示“加料”</p>
                        <div class="relative" v-for="(_item, index) in moduleValue.goodsMaterialList" :key="index">
                            <Icon icon="material-symbols:delete" class="text-primary absolute right-0 top-0px" @click="moduleValue.goodsMaterialList!.splice(index, 1)" />
                            <GoodsMaterial v-model="moduleValue.goodsMaterialList![index]"></GoodsMaterial>
                        </div>
                        <n-button type="primary" @click="addGoodsMaterial">添加加料</n-button>
                    </div>
                </n-form-item>
                <n-form-item label="商品属性">
                    <div>
                        <div v-for="(_item, index) in moduleValue.goodsAttrs" :key="'attr' + index">
                            <GoodsAttrs v-model="moduleValue.goodsAttrs![index]"></GoodsAttrs>
                        </div>
                        <n-button type="primary" @click="addGoodsAttrs">添加属性</n-button>
                        <p class="py-1 text-#999 text-14px">列如：属性名称可以设为辣度，属性标签可以设为微辣，中辣等。输入多个属性标签时用英文状态的逗号隔开。</p>
                    </div>
                </n-form-item>
                <div class="mb-2 flex items-center text-18px font-600 before:content-[''] before:w-5px before:h-20px before:bg-primary before:inline-flex before:mr-2">其他信息</div>
                <n-form-item label="商品重量">
                    <div class="w-full">
                        <n-input-number v-model:value="moduleValue.weight" :min="0" :precision="2" clearable placeholder="请输入商品重量">
                            <template #suffix>克</template>
                        </n-input-number>
                        <p class="py-1 text-#999 text-14px">单位:克。换算公式：1公斤=1000克</p>
                    </div>
                </n-form-item>
                <n-form-item label="商品单位">
                    <n-input v-model:value="moduleValue.unitname" clearable placeholder="请输入商品单位" />
                </n-form-item>
                <n-form-item label="商品简单描述">
                    <div class="w-full">
                        <n-input type="textarea" :autosize="{ minRows: 3 }" v-model:value="moduleValue.description" clearable placeholder="请输入商品简单描述" :maxlength="30" show-count />
                        <p class="py-1 text-#999 text-14px">该信息显示在商品列表页面, 字数控制在30个以内</p>
                    </div>
                </n-form-item>
                <n-form-item label="商品自定义标签">
                    <div class="w-full">
                        <n-input v-model:value="moduleValue.label" clearable placeholder="请输入商品自定义标签" :maxlength="2" show-count />
                        <p class="py-1 text-#999 text-14px">可设置为：热卖，新品，爆款等。只能设置一个，不超过两个字</p>
                    </div>
                </n-form-item>
                <n-form-item label="库存更新方式">
                    <n-radio-group v-model:value="moduleValue.totalUpdateType">
                        <n-space>
                            <n-radio :key="1" :value="1"> 拍下减库存 </n-radio>
                            <n-radio :key="2" :value="2"> 付款减库存 </n-radio>
                            <n-radio :key="3" :value="3"> 永不减库存 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="单点不送">
                    <n-radio-group v-model:value="moduleValue.singleStatus">
                        <n-space>
                            <n-radio :key="0" :value="0"> 否 </n-radio>
                            <n-radio :key="1" :value="1"> 是 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="是否上架">
                    <n-radio-group v-model:value="moduleValue.status">
                        <n-space>
                            <n-radio :key="0" :value="0"> 否 </n-radio>
                            <n-radio :key="1" :value="1"> 是 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="是否热销">
                    <n-radio-group v-model:value="moduleValue.isHot">
                        <n-space>
                            <n-radio :key="0" :value="0"> 否 </n-radio>
                            <n-radio :key="1" :value="1"> 是 </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
                <n-form-item v-if="moduleValue.content" label="商品详情" label-placement="top" :label-width="120">
                    <DefaultEditor v-model="moduleValue.content"></DefaultEditor>
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
import { CascaderOption } from 'naive-ui'
import { Icon } from '@iconify/vue'
const active = defineModel<boolean>('active')
const props = defineProps<{ data: store.goods; tableData: [] }>()
const { formRef, moduleValue, rules, updateGoodsInfo, loading, message } = useStoreGoods()
const emit = defineEmits<{ refresh: [] }>()
const show = ref(false)
const node = ref<Partial<system.attachment>>({ url: '' })
watchEffect(() => {
    moduleValue.thumb = node.value?.attachment
})
/**
 * 表单校验
 * @param e
 */
const submitCallback = (e: MouseEvent) => {
    e.preventDefault
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const {
                id,
                sid,
                title,
                displayorder,
                cid,
                childId,
                thumb,
                recommendReason,
                type,
                price,
                oldPrice,
                boxPrice,
                svipPrice,
                orderLimit,
                totalLimit,
                totalAutoUpdate,
                total,
                totalWarning,
                totalEveryday,
                isShowtime,
                startTime1,
                endTime1,
                startTime2,
                endTime2,
                isOptions,
                isMaterials,
                weight,
                unitname,
                description,
                label,
                totalUpdateType,
                status,
                isHot,
                content,
                singleStatus,
                weekStr,
                goodsOptionsList,
                goodsMaterialList,
                goodsAttrs,
                materialTitle,
                optionTitle
            } = moduleValue
            const params = {
                id,
                sid,
                title,
                displayorder,
                cid,
                childId,
                thumb,
                recommendReason,
                type,
                price,
                oldPrice,
                boxPrice,
                svipPrice,
                orderLimit,
                totalLimit,
                totalAutoUpdate,
                total,
                totalWarning,
                totalEveryday,
                isShowtime,
                startTime1,
                endTime1,
                startTime2,
                endTime2,
                isOptions,
                isMaterials,
                weight,
                unitname,
                description,
                label,
                totalUpdateType,
                status,
                isHot,
                content,
                singleStatus,
                week: weekStr?.join(','),
                goodsOptionsList,
                goodsMaterialList,
                attrs: JSON.stringify(goodsAttrs),
                materialTitle,
                optionTitle
            }
            console.log(params, goodsAttrs)
            await updateGoodsInfo(params)
            active.value = false
            emit('refresh')
        } else {
            console.log(errors)
            message.error('表单参数校验失败!')
        }
    })
}
/**
 * 添加属性
 */
const addGoodsAttrs = () => {
    moduleValue.goodsAttrs?.push({
        name: undefined,
        label: []
    })
}
/**
 * 添加加料
 */
const addGoodsMaterial = () => {
    moduleValue.goodsMaterialList?.push({
        sid: undefined,
        name: undefined,
        price: undefined,
        weight: undefined,
        svipPrice: undefined,
        displayorder: 0,
        createType: 'store',
        priceType: 'store'
    })
}
/**
 * 增加一项商品规格
 */
const addGoodsOption = () => {
    moduleValue.goodsOptionsList?.push({
        sid: undefined,
        name: undefined,
        thumb: undefined,
        price: undefined,
        weight: undefined,
        svipPrice: undefined,
        total: undefined,
        totalWarning: undefined,
        totalEveryday: undefined,
        totalAutoUpdate: 0,
        displayorder: 0,
        createType: 'store',
        priceType: 'store'
    })
}
/**
 * 级联选择值发生变化触发
 * @param value 选中的节点值
 * @param option 选择的节点数据
 */
const handleUpdateValue = (value: number, option: CascaderOption) => {
    if (option.parentid == 0) {
        moduleValue.cid = value
    } else {
        moduleValue.cid = option.parentid as number
        moduleValue.childId = option.id as number
    }
}

onMounted(() => {
    moduleValue.id = props.data.id
    moduleValue.sid = props.data.sid
    moduleValue.title = props.data.title
    moduleValue.displayorder = props.data.displayorder
    moduleValue.cid = props.data.cid
    moduleValue.childId = props.data.childId
    moduleValue.thumb = props.data.thumb
    moduleValue.recommendReason = props.data.recommendReason
    moduleValue.type = props.data.type
    moduleValue.price = Number(props.data.price)
    moduleValue.oldPrice = Number(props.data.oldPrice)
    moduleValue.boxPrice = Number(props.data.boxPrice)
    moduleValue.svipPrice = Number(props.data.svipPrice)
    moduleValue.orderLimit = props.data.orderLimit
    moduleValue.totalLimit = props.data.totalLimit
    moduleValue.totalAutoUpdate = props.data.totalAutoUpdate
    moduleValue.total = props.data.total
    moduleValue.totalWarning = props.data.totalWarning
    moduleValue.totalEveryday = props.data.totalEveryday
    moduleValue.isShowtime = props.data.isShowtime
    moduleValue.startTime1 = props.data.startTime1 != '' ? props.data.startTime1 : undefined
    moduleValue.endTime1 = props.data.endTime1 != '' ? props.data.endTime1 : undefined
    moduleValue.startTime2 = props.data.startTime2 != '' ? props.data.startTime2 : undefined
    moduleValue.endTime2 = props.data.endTime2 != '' ? props.data.endTime2 : undefined
    moduleValue.isOptions = props.data.isOptions
    moduleValue.isMaterials = props.data.isMaterials
    moduleValue.weight = props.data.weight
    moduleValue.unitname = props.data.unitname
    moduleValue.description = props.data.description
    moduleValue.label = props.data.label
    moduleValue.totalUpdateType = props.data.totalUpdateType
    moduleValue.status = props.data.status
    moduleValue.isHot = props.data.isHot
    moduleValue.content = props.data.content
    moduleValue.singleStatus = props.data.singleStatus
    moduleValue.weekStr = props.data.week?.split(',')?.filter((item) => item != '')
    moduleValue.unitnum = props.data.unitnum
    moduleValue.optionTitle = props.data.optionTitle
    moduleValue.materialTitle = props.data.materialTitle
    if (props.data.goodsOptionsList) {
        props.data.goodsOptionsList.forEach((item) => {
            if (item?.price) {
                item.price = Number(item.price)
            }
        })
        moduleValue.goodsOptionsList = props.data.goodsOptionsList
    } else {
        moduleValue.goodsOptionsList = []
    }
    if (props.data.goodsMaterialList) {
        props.data.goodsMaterialList.forEach((item) => {
            if (item?.price) {
                item.price = Number(item.price)
            }
        })
        moduleValue.goodsMaterialList = props.data.goodsMaterialList
    } else {
        moduleValue.goodsMaterialList = []
    }
    node.value.url = previewUrl + props.data.thumb
    if (props.data.attrs) {
        try {
            moduleValue.goodsAttrs = JSON.parse(props.data.attrs)
        } catch (e) {
            console.error('attrs转换json出错:', e)
            moduleValue.goodsAttrs = []
        }
    }
    console.log(moduleValue)
})
</script>

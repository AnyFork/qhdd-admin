<template>
    <div class="bg-#f5f7fa py-2 pr-4 my-1 ml-[-90px]">
        <n-form-item label="图像" label-width="120">
            <img :src="node?.url ?? getAssetsImages('nopic.jpg')" width="50" height="50" class="my-1 border border-solid border-#f5f5f5" @click="show = true" />
        </n-form-item>
        <n-form-item label="名称" label-width="120">
            <n-input v-model:value="option.name" placeholder="输入名称" />
        </n-form-item>
        <n-form-item label="重量" label-width="120">
            <n-input-number v-model:value="option.weight" :min="0" :precision="2" clearable placeholder="请输入商品重量" class="w-full">
                <template #suffix>克</template>
            </n-input-number>
        </n-form-item>
        <n-form-item label="排序" label-width="120">
            <n-input-number v-model:value="option.displayorder" clearable :min="0" :max="9999" placeholder="请输入排序" class="w-full" />
        </n-form-item>
        <n-form-item label="外卖价" label-width="120">
            <n-input-number v-model:value="option.price" :min="0" :precision="2" clearable placeholder="请输入外卖现价" class="w-full">
                <template #suffix>元</template>
            </n-input-number>
        </n-form-item>
        <n-form-item label="会员价" label-width="120">
            <n-input-number v-model:value="option.svipPrice" :min="0" :precision="2" clearable placeholder="请输入外卖会员价" class="w-full">
                <template #suffix>元</template>
            </n-input-number>
        </n-form-item>
        <n-form-item label="剩余库存" label-width="120">
            <n-input-number v-model:value="option.total" :min="-1" clearable placeholder="请输入剩余库存数量" class="w-full" />
        </n-form-item>
        <n-form-item label="库存预警" label-width="120">
            <n-input-number v-model:value="option.totalWarning" :min="0" clearable placeholder="请输入剩余预警库存数量" class="w-full" />
        </n-form-item>
        <n-form-item label="每日库存" label-width="120">
            <n-input-number v-model:value="option.totalEveryday" :min="0" clearable placeholder="请输入每日库存数量" class="w-full" />
        </n-form-item>
        <n-form-item label="每日补足库存">
            <n-radio-group v-model:value="option.totalAutoUpdate">
                <n-space>
                    <n-radio :key="0" :value="0"> 否 </n-radio>
                    <n-radio :key="1" :value="1"> 是 </n-radio>
                </n-space>
            </n-radio-group>
        </n-form-item>
    </div>
    <!-- 选择图片对话框 -->
    <SelectImageDialog v-if="show" v-model:open="show" v-model:node="node"></SelectImageDialog>
</template>

<script setup lang="ts">
import { getAssetsImages } from '@/utils/tools/getAssetsImages'
const option = defineModel<Partial<store.goodsOption>>({ required: true })
const show = ref(false)
const node = ref<Partial<system.attachment>>({ url: '' })
watchEffect(() => {
    if (option.value?.thumb) {
        node.value.url = previewUrl + option.value.thumb
    }
    if (node.value?.attachment) {
        option.value.thumb = node.value?.attachment
    }
})
</script>

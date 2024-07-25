<template>
    <div class="bg-#f5f7fa py-2 pr-4 my-1 ml-[-90px]">
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
    </div>
</template>

<script setup lang="ts">
const option = defineModel<Partial<store.goodsMaterial>>({ required: true })
</script>

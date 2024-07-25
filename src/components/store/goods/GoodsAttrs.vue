<template>
    <div class="bg-#f5f7fa py-2 pr-4 my-1">
        <n-form-item label="属性名" label-width="65">
            <n-input v-model:value="option.name" placeholder="输入名称" />
        </n-form-item>
        <n-form-item label="属性值" label-width="65">
            <div class="w-full">
                <div v-for="index in count" :key="'label' + index">
                    <n-input v-model:value="option.label![index-1]" clearable placeholder="请输入属性值" class="w-full my-1" />
                </div>
                <div class="text-primary text-20px py-1">
                    <Icon icon="carbon:add-filled" @click="add" />
                    <Icon v-if="count > 1" icon="material-symbols:delete" @click="remove" />
                </div>
            </div>
        </n-form-item>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
const option = defineModel<Partial<store.goodsAttrs>>({ required: true })
const count = ref(1)
watchEffect(() => {
    count.value = option.value.label!.length == 0 ? 1 : option.value.label!.length
})
/**
 * 增加一项
 */
const add = () => {
    option.value.label?.push('')
    count.value++
}
/**
 * 移除一项
 */
const remove = (index: number) => {
    option.value.label?.splice(index, 1)
    count.value--
}
</script>

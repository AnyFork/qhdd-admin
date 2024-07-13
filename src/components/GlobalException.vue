<!--全局异常公共组件-->
<template>
    <div class="wh-full flex-col-center">
        <div class="text-400px text-primary">
            <icon-custom-no-permission v-if="type === '403'" />
            <icon-custom-not-found v-if="type === '404'" />
            <icon-custom-service-error v-if="type === '500'" />
        </div>
        <router-link :to="rootPath" class="mt-[-80px]">
            <n-button type="primary">点我返回到首页</n-button>
        </router-link>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    type: '403' | '404' | '500'
}>()
const {rootPath} = useLoginType()
</script>

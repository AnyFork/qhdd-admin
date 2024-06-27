<!-- global drawer settingItem -->
<template>
  <div class="w-full flex-row-between py-1">
    <hover-container :tooltip-content="tipText" :show-tooltip="isTooltip">
      <span class="cursor-default">{{label}}</span>
    </hover-container>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
    /**label 文本 */
    label:string,
    /**是否展示tooltip */
    isTooltip?: boolean,
    /**tooltip 文本 */
    tipText?: string,
}>(), {isTooltip:false, tipText:""});
defineOptions({ name: 'SettingMenu'})
</script>

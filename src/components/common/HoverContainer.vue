<!--hover tooltip容器组件-->
<template>
  <div v-if="showTooltip">
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div :class="contentClassName">
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else :class="contentClassName">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { PopoverPlacement } from 'naive-ui';
const props = withDefaults(defineProps<{
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: PopoverPlacement;
  /** class类 */
  contentClass?: string;
  /** 反转模式下 */
  inverted?: boolean;
  /**是否展示tooltip */
  showTooltip?:boolean
  /**是否显示tooltip悬浮背景 */
  showTooltipBg?:boolean
}>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
  inverted: false,
  showTooltip: false,
  showTooltipBg: false
});

const contentClassName = computed(
  () => {
    if(props.contentClass){
      return `${props.contentClass}`
    }else{
      return `h-full flex-row-center cursor-pointer dark:hover:bg-[#333] ${ props.showTooltipBg?'hover:(bg-[#f6f6f6] text-primary)':''}`
    }
  }
);
</script>

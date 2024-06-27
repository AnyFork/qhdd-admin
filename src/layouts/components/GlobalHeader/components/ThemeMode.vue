<template>
  <hover-container class="w-40px h-full" :tooltip-content="hoverTooltip" show-tooltip show-tooltip-bg
    :inverted="theme.header.inverted">
    <transition appear :duration="{ enter: 2500, leave: 1000 }" enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutUp">
      <component :is="componentId" :key="componentId" class="text-20px cursor-pointer"
        @click="theme.darkMode = !theme.darkMode"></component>
    </transition>
  </hover-container>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';
import IconMdiMoonWaningCrescent from '~icons/mdi/moon-waning-crescent'
import IconMdiWhiteBalanceSunny from '~icons/mdi/white-balance-sunny'
defineOptions({ name: 'ThemeMode' });
const theme = useThemeStore();
//动态加载组件
const componentId = computed(() => theme.darkMode == true ? IconMdiMoonWaningCrescent as any : IconMdiWhiteBalanceSunny as any)
const hoverTooltip = computed(() => theme.darkMode == true ? "暗黑主题" : "高亮主题")
</script>

<template>
  <n-layout has-sider>
    <global-sider></global-sider>
    <n-layout :style="layoutMargin" class="min-h-screen" content-style="display: flex;flex-direction: column;justify-content: space-between;">
      <global-header :class="theme.header.fixedHeaderAndTab ? 'fixed' : ''" :style="fixedWidth"></global-header>
      <global-tab v-if="theme.tab.visible" :class="theme.header.fixedHeaderAndTab ? 'fixed' : ''" :style="tabsStyle"></global-tab>
      <global-content :style="contentMargin"></global-content>
      <global-footer :class="theme.footer.fixed ? 'fixed' : ''" :style="fixedWidth"></global-footer>
    </n-layout>
  </n-layout>
  <GlobalBackTop></GlobalBackTop>
  <GlobalDrawer></GlobalDrawer>
</template>
<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/composables'
import { useWindowSize } from '@vueuse/core'
defineOptions({ name: 'VerticalLayout' });
const { siderWidth, siderCollapsedWidth } = useBasicLayout();
/**window窗口宽度 */
const { width } = useWindowSize()
const app = useAppStore()
const theme = useThemeStore()
/**layout居左外边距*/
const layoutMargin = computed(() => app.siderCollapse ? { 'margin-left': `${siderCollapsedWidth.value}px` } : { 'margin-left': `${siderWidth.value}px` })
/**头部和底部固定情况下宽度 */
const fixedWidth = computed(() => app.siderCollapse ? { 'width': `${width.value - siderCollapsedWidth.value}px` } : { 'width': `${width.value - siderWidth.value}px` })
/**content距离上下外边距 */
const contentMargin = computed(() => {
  const marginBottom = theme.footer.fixed ? { 'margin-bottom': `${theme.footer.height}px` } : ""
  const marginTop = theme.header.fixedHeaderAndTab ? { 'margin-top': `${theme.header.height + (theme.tab.visible? theme.tab.height:0)}px` } : { 'margin-top': `0px` }
  return { ...marginBottom, ...marginTop }
})
/**多页签样式*/
const tabsStyle = computed(() => {
  const tabsTop = theme.header.fixedHeaderAndTab ? { 'margin-top': theme.header.height + 'px' } : { 'margin-top': `0px` }
  const tabsWidth = app.siderCollapse ? { 'width': `${width.value - siderCollapsedWidth.value}px` } : { 'width': `${width.value - siderWidth.value}px` }
  return { ...tabsTop, ...tabsWidth }
})
</script>

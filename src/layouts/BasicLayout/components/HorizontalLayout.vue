<template>
  <n-layout :native-scrollbar="false">
    <global-header :class="theme.header.fixedHeaderAndTab ? 'fixed' : ''"></global-header>
    <global-tab v-if="theme.tab.visible" :class="theme.header.fixedHeaderAndTab ? 'fixed' : ''"
      :style="tabsStyle"></global-tab>
    <n-layout has-sider>
      <global-sider :style="siderMarginTop"></global-sider>
      <n-layout :style="layoutMarginLeft"
        content-style="display: flex;flex-direction: column;justify-content: space-between;">
        <global-content :style="contentMargin"></global-content>
        <global-footer :class="theme.footer.fixed ? 'fixed' : ''" :style="footerWidth"></global-footer>
      </n-layout>
    </n-layout>
  </n-layout>
  <GlobalBackTop></GlobalBackTop>
  <GlobalDrawer></GlobalDrawer>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/composables'
import { useWindowSize } from '@vueuse/core'
defineOptions({ name: 'HorizontalLayout' });
const { layoutMode, siderWidth, siderCollapsedWidth } = useBasicLayout();
const app = useAppStore()
const theme = useThemeStore()
/**window窗口宽度 */
const { width } = useWindowSize()
/**layout距离左边外边距 */
const layoutMarginLeft = computed(() => {
  if (layoutMode.value == "horizontal") {
    return { 'margin-left': '0px' }
  } else {
    return app.siderCollapse ? { 'margin-left': `${siderCollapsedWidth.value}px` } : { 'margin-left': `${siderWidth.value}px` }
  }
})
/**content距离上下外边距 */
const contentMargin = computed(() => {
  const marginBottom = theme.footer.fixed ? { 'margin-bottom': `${theme.footer.height}px` } : ""
  const marginTop = theme.header.fixedHeaderAndTab ? { 'margin-top': `${theme.header.height + (theme.tab.visible ? theme.tab.height : 0)}px` } : { 'margin-top': `0px` }
  return { ...marginBottom, ...marginTop }
})
/**头部固定情况下sider距离顶部距离 */
const siderMarginTop = computed(() => theme.header.fixedHeaderAndTab ? { 'margin-top': `${theme.header.height}px` } : { 'margin-top': `0px` })
/**底部宽度 */
const footerWidth = computed(() => app.siderCollapse ? { 'width': `${width.value - siderCollapsedWidth.value}px` } : { 'width': `${width.value - siderWidth.value}px` })
/**多页签样式*/
const tabsStyle = computed(() => {
  const tabsTop = theme.header.fixedHeaderAndTab ? { 'margin-top': theme.header.height + 'px' } : { 'margin-top': `0px` }
  let tabsWidth = app.siderCollapse ? { 'width': `${width.value - siderCollapsedWidth.value}px` } : { 'width': `${width.value - siderWidth.value}px` }
  return { ...tabsTop, ...tabsWidth, ...layoutMarginLeft.value }
})
</script>

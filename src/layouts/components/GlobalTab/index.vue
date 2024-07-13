<template>
    <div class="global-tab flex items-center w-full border-b-1 z-20 bg-[var(--n-color)] dark:bg-[var(--n-color)]" :style="{ height: theme.tab.height + 'px' }">
        <div ref="bsWrapper" class="flex-1 overflow-hidden h-full">
            <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: canClick }">
                <tab-detail @scroll="handleScroll" />
            </better-scroll>
        </div>
        <reload-button />
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'GlobalTabs' })
import { useElementBounding } from '@vueuse/core'
const route = useRoute()
const theme = useThemeStore()
const tab = useTabStore()
const bsWrapper = ref<HTMLElement>()
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper)
const bsScroll = ref<any>()
const canClick = Boolean(true)
tab.iniTabStore(route)
/**
 * 水平滚动时触发
 */
const handleScroll = (clientX: number) => {
    const currentX = clientX - bsWrapperLeft.value
    const deltaX = currentX - bsWrapperWidth.value / 2
    if (bsScroll.value) {
        const { maxScrollX, x: leftX } = bsScroll.value.instance
        const rightX = maxScrollX - leftX
        const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX)
        bsScroll.value?.instance.scrollBy(update, 0, 300)
    }
}
watch(
    () => route.fullPath,
    () => {
        tab.addTab(route)
        tab.setActiveTab(route.fullPath)
    }
)
</script>

<style scoped>
.global-tab {
    box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>

<template>
  <n-layout-content
    class="p-[5px] flex-col-1 !overflow-hidden bg-[#f6f9f8] dark:bg-[var(--n-color)] transition duration-300 ease-in-out"
    content-style="overflow:hidden"
    :style="{'--spintop':spinTop}">
    <n-card class="shadow-sm rounded-16px h-full">
      <n-spin description="拼命加载中..." class="w-full" :show="!app.reloadFlag">
        <RouterView v-slot="{ Component, route }">
          <transition
            v-if="animateStore.animate.isShowAnimation"
            mode="out-in"
            :duration="{ enter: 500, leave: 100 }"
            appear
            :enter-active-class="`animate__animated animate__${animateStore.animate.selectAnimateInClass}`"
            :leave-active-class="`animate__animated animate__${animateStore.animate.selectAnimateOutClass}`">
            <div :key="route.fullPath">
              <keep-alive :include="routeStore.cacheRoutes">
                <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
              </keep-alive>
            </div>
          </transition>
          <div v-else :key="route.fullPath">
            <keep-alive :include="routeStore.cacheRoutes">
              <component :is="Component" v-if="app.reloadFlag" :key="route.fullPath" />
            </keep-alive>
          </div>
        </RouterView>
      </n-spin>
    </n-card>
  </n-layout-content>
</template>
<script setup lang="ts">
import { useAppStore, useRouteStore, useAnimate } from '@/store';
import { useWindowSize, useCssVar  } from '@vueuse/core'
defineOptions({ name: 'GlobalContent' });
const app = useAppStore();
const routeStore = useRouteStore();
const animateStore = useAnimate();
const { height } = useWindowSize();
const spinTop=computed(()=> height.value/3+'px')
const elv = ref(null)
const key = ref('--spin-top')
const colorVal = useCssVar(key, elv)
colorVal.value=spinTop.value
</script>
<style scoped>
:deep(.n-spin-container .n-spin-body) {
  top: var(--spin-top);
  width: 100px;
}
</style>

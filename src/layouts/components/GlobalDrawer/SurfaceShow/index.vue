<template>
  <n-divider>界面显示设置</n-divider>
  <setting-Menu label="水印开关">
    <n-switch :value="app.waterMark.showWatermark" @update:value="app.setWaterMarkShow" />
  </setting-Menu>
  <setting-Menu v-if="app.waterMark.showWatermark" label="水印文本">
    <n-input :value="app.waterMark.contents" type="text" size="small" style="width: 120px;" @update:value="app.setWaterMarkContent" />
  </setting-Menu>
  <setting-Menu v-if="app.waterMark.showWatermark" label="水印字体大小">
    <n-input-number v-model:value="app.waterMark.fontSize" :min="fontSize" size="small" style="width: 120px;" />
  </setting-Menu>
  <setting-Menu v-if="app.waterMark.showWatermark" label="水印旋转角度">
    <n-input-number v-model:value="app.waterMark.rotate" :min="rotate" size="small" style="width: 120px;" />
  </setting-Menu>
  <setting-Menu label="头部主题切换开关">
    <n-switch v-model:value="app.showHeaderThemeBtn" />
  </setting-Menu>
  <setting-Menu label="头部全屏切换开关">
    <n-switch v-model:value="app.showHeaderFullScreenBtn" />
  </setting-Menu>
  <setting-Menu label="是否显示多页签">
    <n-switch v-model:value="theme.tab.visible" />
  </setting-Menu>
  <setting-Menu label="多页签风格">
    <n-select v-model:value="theme.tab.mode" :options="theme.tab.modeList" size="small" style="width: 120px;" />
  </setting-Menu>
  <setting-Menu label="动画开关">
    <n-switch v-model:value="animate.isShowAnimation" />
  </setting-Menu>
  <setting-Menu v-if="animate.isShowAnimation" label="动画类型">
    <n-select v-model:value="animate.selectAnimatetype" :options="animate.animateAliasAllData" size="small" style="width: 120px;" @update:value="animateStore.changeAnimationInAndOutClass" />
  </setting-Menu>
  <setting-Menu v-if="animate.isShowAnimation" label="入场动画">
    <n-select v-model:value="animate.selectAnimateInClass" :options="animate.animateInData" size="small" style="width: 120px;" />
  </setting-Menu>
  <setting-Menu v-if="animate.isShowAnimation" label="出厂动画">
    <n-select v-model:value="animate.selectAnimateOutClass" :options="animate.animateOutData" size="small" style="width: 120px;" />
  </setting-Menu>
  <setting-Menu label="锁屏开关">
    <n-switch v-model:value="useLockScreen.isLockScreen" />
  </setting-Menu>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore, useAnimate, useLockScreenstore} from '@/store'
const app = useAppStore();
const theme = useThemeStore()
const animateStore = useAnimate()
const useLockScreen=useLockScreenstore()
const { animate } = storeToRefs(animateStore);
const fontSize=app.waterMark.fontSize
const rotate=app.waterMark.rotate
defineOptions({ name:'SurfaceShow'})
</script>

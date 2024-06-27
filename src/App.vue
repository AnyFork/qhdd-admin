<template>
  <NConfigProvider class="h-screen" :theme="theme.naiveTheme" :locale="zhCN" :date-locale="dateZhCN" preflight-style-disabled :theme-overrides="theme.naiveThemeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <RouterView></RouterView>
            <WaterMark></WaterMark>
            <naive-provider-content />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
    <NGlobalStyle />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
import { useThemeStore } from '@/store';
import { defineComponent, h } from 'vue';
import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui';
const theme = useThemeStore();
//监听主题变化
theme.watchTheme();
//挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
const  registerNaiveTools=()=> {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}
const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  }
});
</script>

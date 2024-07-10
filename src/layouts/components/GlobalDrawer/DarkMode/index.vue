<template>
  <n-divider title-placement="center">主题模式</n-divider>
  <n-space vertical size="large" :style="{'--switch-color':switchBgColor}">
    <setting-menu label="深色主题">
      <n-switch class="theme" :value="theme.darkMode" @update:value="theme.setDarkMode">
        <template #checked>
          <icon-mdi-moon-waning-crescent class="text-14px text-primary" />
        </template>
        <template #unchecked>
          <icon-mdi-white-balance-sunny class="text-14px text-primary" />
        </template>
      </n-switch>
    </setting-menu>
    <setting-menu label="跟随系统" is-tooltip tip-text="优先级最高">
      <n-switch :value="theme.followSystemTheme" @update:value="theme.setFollowSystemTheme">
        <template #checked>
          <icon-ic-round-hdr-auto class="text-14px " />
        </template>
        <template #unchecked>
          <icon-ic-baseline-do-not-disturb class="text-14px text-primary" />
        </template>
      </n-switch>
    </setting-menu>
  </n-space>
</template>

<script lang="ts" setup>
import SettingMenu from '../SettingMenu/index.vue';
const theme = useThemeStore();
const switchBgColor=computed(() =>theme.darkMode==true?"#000e1c":"#eee")
</script>
<style scoped>
:deep(.theme .n-switch__rail) {
  background-color: var(--switch-color) !important;
}
</style>

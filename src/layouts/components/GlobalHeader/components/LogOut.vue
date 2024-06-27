<template>
  <hover-container class="w-40px h-full" tooltip-content="退出系统" show-tooltip show-tooltip-bg>
    <icon-ant-design:poweroff-outlined @click="logOut"></icon-ant-design:poweroff-outlined>
  </hover-container>
</template>

<script setup lang="ts">
import { useLogOut } from "@/composables";
const { logOut } = useLogOut();
</script>

<style scoped></style>

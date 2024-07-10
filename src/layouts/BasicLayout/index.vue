<template>
  <HorizontalLayout v-if="mode == 'horizontal'"></HorizontalLayout>
  <VerticalLayout v-else></VerticalLayout>
</template>
<script setup lang="ts">
defineOptions({ name: 'BasicLayout' });
const { mode } = useBasicLayout()
</script>

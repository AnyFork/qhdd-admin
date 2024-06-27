<template>
  <HorizontalLayout v-if="mode == 'horizontal'"></HorizontalLayout>
  <VerticalLayout v-else></VerticalLayout>
</template>
<script setup lang="ts">
import { useBasicLayout } from '@/composables'
defineOptions({ name: 'BasicLayout' });
const { mode } = useBasicLayout()
</script>

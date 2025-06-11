<script setup lang="ts">
import { type VideoViewModel } from '@core/domain/entities/Video';
import BaseCard from '@ui/components/shared/BaseCard.vue';

defineProps<{
  video: VideoViewModel
}>()
</script>

<template>
  <BaseCard>
    <img :src="video.thumbnailUrl" :alt="video.title">
    <h3>{{ video.title }}</h3>
  </BaseCard>
</template>
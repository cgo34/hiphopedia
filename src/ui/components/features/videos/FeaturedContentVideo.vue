<template>
    <FeaturedContent
      :collection="collection"
      :loading="loading"
      @play="$emit('play', $event)"
      @details="$emit('details', $event)"
    />
  </template>
  
  <script setup lang="ts">
  import { VideoCollection } from '@/core/domain/entities/Collection'
import { VideoViewModel } from '@/core/domain/entities/Video'
import FeaturedContent from '../content/FeaturedContent.vue'
  
  interface Props {
    collection: VideoCollection
    loading?: boolean
  }
  
  defineProps<Props>()
  defineEmits<{
    play: [video: VideoViewModel]
    details: [video: VideoViewModel]
  }>()
  </script>
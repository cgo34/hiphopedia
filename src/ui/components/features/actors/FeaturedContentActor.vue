<template>
    <FeaturedContent
      :collection="collection"
      :loading="loading"
      @details="$emit('details', $event)"
    />
  </template>
  
  <script setup lang="ts">
  import { ActorViewModel } from '@/core/domain/entities/Actor'
import { ActorCollection } from '@/core/domain/entities/Collection'
import FeaturedContent from '../content/FeaturedContent.vue'
  
  interface Props {
    collection: ActorCollection
    loading?: boolean
  }
  
  defineProps<Props>()
  defineEmits<{
    details: [actor: ActorViewModel]
  }>()
  </script>
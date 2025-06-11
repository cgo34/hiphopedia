<template>
    <section class="video-hero">
      <v-img
        :src="video.imageUrl"
        height="80vh"
        cover
        class="video-hero__background"
      >
        <div class="video-hero__overlay">
          <v-container class="video-hero__content">
            <h1 class="text-h2 font-weight-bold mb-4">{{ video.title }}</h1>
            
            <div class="video-hero__meta mb-4">
              <v-chip color="primary" class="mr-2">{{ formatVideoType(video.type) }}</v-chip>
              <span class="text-grey">{{ video.releaseDate }}</span>
            </div>
  
            <p class="video-hero__description text-h6 mb-6">
              {{ video.descriptionShort }}
            </p>
  
            <div class="video-hero__actions">
              <v-btn
                color="primary"
                size="large"
                class="mr-4"
                prepend-icon="mdi-play"
                @click="$emit('play', video)"
              >
                Lecture
              </v-btn>
              
              <v-btn
                size="large"
                variant="plain"
                prepend-icon="mdi-account"
                @click="$emit('play', video)"
              >
                Fiche Artiste
              </v-btn>
            </div>
          </v-container>
        </div>
      </v-img>
    </section>
  </template>
  
  <script setup lang="ts">
  import { VideoViewModel } from '@/core/domain/entities/Video';
  
  interface Props {
    video: VideoViewModel
  }
  
  defineProps<Props>()
  defineEmits<{
    play: [video: VideoViewModel]
  }>()
  
  const formatVideoType = (type: string): string => {
    const translations: Record<string, string> = {
      clip: 'Clip',
      interview: 'Interview',
      documentary: 'Documentaire',
      reporting: 'Reportage',
      short: 'Court métrage'
    }
    return translations[type] || type
  }
  </script>
  
  <style scoped lang="scss">
  .video-hero {
    position: relative;
    
    &__background {
      width: 100%;
    }
  
    &__overlay {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.8) 0%,
        rgba(0, 0, 0, 0.4) 60%,
        rgba(0, 0, 0, 0) 100%
      );
      height: 100%;
      display: flex;
      align-items: center;
    }
  
    &__content {
      max-width: 50%;
    }
  
    &__description {
      max-width: 700px;
      line-height: 1.5;
    }
  }
  </style>
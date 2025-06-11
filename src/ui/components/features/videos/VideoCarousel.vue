<template>
  <BaseCarousel :collection="collection">
    <template #item="{ item: video }">
      <div class="video-card" @click="$emit('play', video)">
        <v-img 
          :src="video.imageUrl" 
          :aspect-ratio="16/9" 
          cover
          class="video-card__image"
        >
          <div class="video-card__overlay">
            <div class="video-card__actions">
              <v-btn
                icon="mdi-play"
                variant="tonal"
                class="bg-primary mr-2"
                @click.stop="$emit('play', video)"
              >
                <v-icon>mdi-play</v-icon>
              </v-btn>
              <v-btn
                icon="mdi-information"
                variant="tonal"
                class="bg-secondary"
                @click.stop="$emit('details', video)"
              >
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </div>
          </div>
        </v-img>
        <div class="video-card__content pa-2">
          <h3 class="text-subtitle-1 text-truncate">{{ video.title }}</h3>
          <p class="text-caption text-grey text-truncate">{{ video.releaseDate }}</p>
        </div>
      </div>
    </template>
  </BaseCarousel>
</template>

<script setup lang="ts">
import { VideoCollection } from '@/core/domain/entities/Collection';
import { VideoViewModel } from '@/core/domain/entities/Video';
import BaseCarousel from '@/ui/components/shared/BaseCarousel.vue';

interface Props {
  collection: VideoCollection
}

defineProps<Props>()
defineEmits<{
  play: [video: VideoViewModel]
  details: [video: VideoViewModel]
}>()
</script>

<style scoped lang="scss">
.video-card {
  position: relative;
  cursor: pointer;
  width: 320px;
  margin-right: 16px;
  transition: transform 0.2s;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);

  &:hover {
    transform: scale(1.05);

    .video-card__overlay {
      opacity: 1;
    }
  }

  &__image {
    height: 180px;
    border-radius: 8px 8px 0 0;
    position: relative;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: 8px 8px 0 0;
  }

  &__actions {
    display: flex;
    gap: 8px;

    .v-btn {
      color: #fff;

      &.primary {
        background: #E50914 !important;
      }

      &.secondary {
        background: rgba(255, 255, 255, 1) !important;
        color: #000
      }

      &:hover {
        transform: scale(1.1);
      }
      
      transition: transform 0.2s;
    }
  }

  &__content {
    padding: 12px;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h3 {
      margin-bottom: 4px;
      font-weight: 500;
    }

    p {
      margin-bottom: 0;
      opacity: 0.7;
    }
  }
}
</style>
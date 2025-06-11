<template>
    <BaseCarousel :collection="collection">
      <template #item="{ item: actor }">
        <div class="actor-card">
          <v-img 
            :src="actor.imageUrl" 
            :aspect-ratio="2/3"
            cover
            class="actor-card__image"
          >
            <div class="actor-card__overlay">
              <div class="actor-card__actions">
                <v-btn
                  icon="mdi-information"
                  variant="tonal"
                  class="primary"
                  @click.stop="$emit('details', actor)"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </div>
            </div>
          </v-img>
          <div class="actor-card__content pa-2">
            <h3 class="text-subtitle-1 text-truncate">
                <v-icon color="accent" v-if="actor.isCertified">mdi-check-decagram</v-icon>
              {{ actor.nickname || `${actor.firstname} ${actor.lastname}` }}
            </h3>
            <p class="text-caption text-grey text-truncate">{{ actor.role || 'Artiste' }}</p>
          </div>
        </div>
      </template>
    </BaseCarousel>
  </template>
  
  <script setup lang="ts">
  import { ActorViewModel } from '@/core/domain/entities/Actor';
import { ActorCollection } from '@/core/domain/entities/Collection';
import BaseCarousel from '@/ui/components/shared/BaseCarousel.vue';
  
  interface Props {
    collection: ActorCollection
  }
  
  defineProps<Props>()
  defineEmits<{
    details: [actor: ActorViewModel]
  }>()
  </script>
  
  <style scoped lang="scss">
  .actor-card {
    position: relative;
    cursor: pointer;
    width: 200px;
    margin-right: 16px;
    transition: transform 0.2s;
    border-radius: 8px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
  
    &:hover {
      transform: scale(1.05);
  
      .actor-card__overlay {
        opacity: 1;
      }
    }
  
    &__image {
      height: 300px;
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
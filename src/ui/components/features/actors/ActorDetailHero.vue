<template>
    <section class="actor-hero">
      <v-img
        :src="actor.imageUrl || '/default-actor.jpg'"
        height="80vh"
        cover
        class="actor-hero__background"
      >
        <div class="actor-hero__overlay">
          <v-container class="actor-hero__content">
            <!-- Nom de l'artiste -->
            <h1 class="text-h2 font-weight-bold mb-4">
              {{ actor.nickname || `${actor.firstname} ${actor.lastname}` }}
            </h1>
            
            <!-- Métadonnées -->
            <div class="actor-hero__meta mb-4">
              <v-chip color="primary" class="mr-2">{{ formatActorType(actor.actorType) }}</v-chip>
              <span v-if="actor.birthCountry" class="text-grey mr-4">
                {{ actor.birthCountry }}
              </span>
              <span v-if="actor.birthDate" class="text-grey">
                {{ formatDate(actor.birthDate) }}
              </span>
            </div>
  
            <!-- Biographie -->
            <p v-if="actor.bio" class="actor-hero__description text-h6 mb-6">
              {{ truncateText(actor.bio, 250) }}
            </p>
  
            <!-- Actions -->
            <div class="actor-hero__actions">
              <v-btn
                color="primary"
                size="large"
                prepend-icon="mdi-play"
                class="mr-4"
                @click="$emit('play-latest')"
              >
                Dernière vidéo
              </v-btn>
  
              <v-btn
                href="#bio-section"
                variant="outlined"
                size="large"
                prepend-icon="mdi-account-details"
                @click="$emit('show-bio')"
              >
                Découvrir
              </v-btn>
            </div>
          </v-container>
        </div>
      </v-img>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ActorViewModel } from '@/core/domain/entities/Actor';
  
  interface Props {
    actor: ActorViewModel
  }
  
  defineProps<Props>()
  defineEmits<{
    'play-latest': []
    'show-bio': []
  }>()
  
  const formatActorType = (type: string): string => {
    const translations: Record<string, string> = {
      rappeur: 'Rappeur',
      producteur: 'Producteur',
      realisateur: 'Réalisateur',
      beatmaker: 'Beatmaker',
      media: 'Media',
      radio: 'Radio',
      guest: 'Invité'
    }
    return translations[type] || type
  }
  
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const truncateText = (text: string, limit: number): string => {
    if (text.length <= limit) return text
    return text.slice(0, limit) + '...'
  }
  </script>
  
  <style scoped lang="scss">
  .actor-hero {
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
  
    &__meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  </style>
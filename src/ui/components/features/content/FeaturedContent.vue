<template>
  <section class="featured-content">
    <!-- Skeleton Loader -->
    <div v-if="loading || !currentContent || !props.collection?.items?.length" class="featured-content__skeleton">
      <v-skeleton-loader
        type="image, article"
        height="80vh"
        class="featured-content__skeleton-loader"
      >
        <template #image>
          <div class="featured-content__skeleton-background">
            <v-container class="featured-content__content">
              <v-skeleton-loader type="text" class="mb-4" width="60%"></v-skeleton-loader>
              <v-skeleton-loader type="chip" class="mb-4" width="100px"></v-skeleton-loader>
              <v-skeleton-loader type="text" class="mb-6" width="40%" height="100"></v-skeleton-loader>
              <div class="d-flex">
                <v-skeleton-loader type="button" width="120" class="mr-4"></v-skeleton-loader>
                <v-skeleton-loader type="button" width="120"></v-skeleton-loader>
              </div>
            </v-container>
          </div>
        </template>
      </v-skeleton-loader>
    </div>

    <!-- Contenu réel -->
    <v-img
      v-else
      :src="getImage"
      height="80vh"
      cover
      class="featured-content__background"
    >
      <div class="featured-content__overlay">
        <v-container class="featured-content__content">
          <h1 class="text-h2 font-weight-bold mb-4">{{ getTitle }}</h1>
          
          <div class="featured-content__meta mb-4">
            <v-chip color="error" class="mr-2">Nouveau</v-chip>
            <span class="text-grey">{{ getMetadata }}</span>
          </div>

          <p class="featured-content__description text-h6 mb-6">
            {{ truncateDescription(getDescription) }}
          </p>

          <div class="featured-content__actions">
            <v-btn
              v-if="isVideoCollection"
              color="primary"
              size="large"
              prepend-icon="mdi-play"
              class="px-5 mr-4"
              @click="$emit('play', currentContent)"
            >
              Lecture
            </v-btn>
            
            <v-btn
              variant="plain"
              size="large"
              class="px-5"
              :prepend-icon="isVideoCollection ? 'mdi-information' : 'mdi-account'"
              @click="$emit('details', currentContent)"
            >
              Plus d'infos
            </v-btn>
          </div>
        </v-container>
      </div>
    </v-img>
  </section>
</template>

<script setup lang="ts">
import { ActorViewModel } from '@/core/domain/entities/Actor'
import { ActorCollection, VideoCollection } from '@/core/domain/entities/Collection'
import { VideoViewModel } from '@/core/domain/entities/Video'
import { computed, onMounted, ref } from 'vue'

interface Props {
  collection: VideoCollection | ActorCollection
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  play: [video: VideoViewModel]
  details: [item: VideoViewModel | ActorViewModel]
}>()

const currentIndex = ref(0)
const currentContent = computed(() => {
  if (!props.collection?.items?.length) return null
  return props.collection.items[currentIndex.value]
})

// Utilise le type de la collection pour déterminer le type de contenu
const isVideoCollection = computed(() => {
  return props.collection.type !== 'actors'
})

// Getters typés en fonction du type de collection
const getTitle = computed(() => {
  if (!currentContent.value) return ''
  
  if (isVideoCollection.value) {
    const video = currentContent.value as VideoViewModel
    return video.title
  } else {
    const actor = currentContent.value as ActorViewModel
    return actor.nickname || `${actor.firstname} ${actor.lastname}`
  }
})

const getImage = computed(() => {
  if (!currentContent.value) return '/default-thumbnail.jpg'
  return currentContent.value.imageUrl
})

const getDescription = computed(() => {
  if (!currentContent.value) return ''
  
  if (isVideoCollection.value) {
    const video = currentContent.value as VideoViewModel
    return video.descriptionShort || video.descriptionLong
  } else {
    const actor = currentContent.value as ActorViewModel
    return actor.bio
  }
})

const getMetadata = computed(() => {
  if (!currentContent.value) return ''
  
  if (isVideoCollection.value) {
    const video = currentContent.value as VideoViewModel
    return video.releaseDate
  } else {
    const actor = currentContent.value as ActorViewModel
    return actor.actorType
  }
})

const truncateDescription = (text: string, limit = 200) => {
  if (!text) return ''
  if (text.length <= limit) return text
  return text.slice(0, limit) + '...'
}

onMounted(() => {
  if (props.collection?.items && props.collection.items.length > 1) {
    setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % props.collection.items.length
    }, 10000)
  }
})
</script>

<style scoped lang="scss">
.featured-content {
  position: relative;
  
  &__skeleton {
    height: 80vh;
    background-color: #1e1e1e;
  }

  &__skeleton-background {
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    display: flex;
    align-items: center;
  }

  &__skeleton-loader {
    :deep(.v-skeleton-loader__bone) {
      background: rgba(255, 255, 255, 0.1);
    }
    
    :deep(.v-skeleton-loader__text) {
      transform: scale(1, 0.6);
    }
    
    :deep(.v-skeleton-loader__button) {
      width: 120px;
      height: 40px;
    }
  }

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
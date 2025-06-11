<template>
    <v-dialog v-model="dialogVisible" fullscreen hide-overlay>
      <v-card class="video-player-modal">
        <v-toolbar dark color="black" class="px-4">
          <!-- Navigation Précédent -->
          <v-btn
            v-if="previousVideo"
            variant="text"
            class="navigation-btn"
            @click="navigateTo(previousVideo)"
          >
            <v-icon start>mdi-arrow-left</v-icon>
            <v-img
              :src="previousVideo.imageUrl"
              width="40"
              height="40"
              class="rounded mx-2"
            />
            <span class="text-truncate">{{ previousVideo.title }}</span>
          </v-btn>
  
          <v-spacer />
  
          <!-- Info Player -->
          <div class="d-flex align-center flex-1">
            <span class="text-red text-h6">{{ collection.title }}</span>
            <v-icon class="mx-2">mdi-chevron-right</v-icon>
            <h2 class="text-h5 text-truncate mb-0">{{ currentVideo?.title }}</h2>
          </div>
  
          <v-btn
            variant="text"
            class="mx-4"
            @click="navigateToDetails"
          >
            <v-icon start>mdi-information</v-icon>
            Plus d'infos
          </v-btn>
  
          <v-spacer />
  
          <!-- Navigation Suivant -->
          <v-btn
            v-if="nextVideo"
            variant="text"
            class="navigation-btn"
            @click="navigateTo(nextVideo)"
          >
            <span class="text-truncate">{{ nextVideo.title }}</span>
            <v-img
              :src="nextVideo.imageUrl"
              width="40"
              height="40"
              class="rounded mx-2"
            />
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
  
          <!-- Bouton Fermer -->
          <v-btn
            icon
            variant="text"
            class="ml-4"
            @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        
        <div class="video-container">
          <iframe
            v-if="embedUrl"
            :src="embedUrl"
            width="100%"
            height="100%"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { VideoCollection } from '@/core/domain/entities/Collection'
import { VideoViewModel } from '@/core/domain/entities/Video'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
  
  interface Props {
    modelValue: boolean
    currentVideo?: VideoViewModel
    collection: VideoCollection
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    'change-video': [video: VideoViewModel]
  }>()
  
  const router = useRouter()
  
  const dialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
  
  const currentIndex = computed(() => {
    if (!props.currentVideo) return -1
    return props.collection.items.findIndex(v => v.id === props.currentVideo?.id)
  })
  
  const previousVideo = computed(() => {
    if (currentIndex.value <= 0) return null
    return props.collection.items[currentIndex.value - 1]
  })
  
  const nextVideo = computed(() => {
    if (!props.collection.items || currentIndex.value >= props.collection.items.length - 1) return null
    return props.collection.items[currentIndex.value + 1]
  })
  
  const embedUrl = computed(() => {
    if (!props.currentVideo?.url) return null
    const videoId = extractYoutubeId(props.currentVideo.url)
    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  })
  
  function extractYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }
  
  function navigateTo(video: VideoViewModel) {
    emit('change-video', video)
  }
  
  function navigateToDetails() {
    if (props.currentVideo) {
      close()
      router.push({ name: 'VideoDetails', params: { id: props.currentVideo.id }})
    }
  }
  
  const close = () => {
    dialogVisible.value = false
  }
  </script>
  
  <style scoped lang="scss">
  .video-player-modal {
    background: black;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .video-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
  }
  
  .navigation-btn {
    max-width: 300px;
    height: 48px;
    
    :deep(.v-btn__content) {
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
    }
  
    span {
      max-width: 200px;
    }
  }
  
  .video-title {
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .v-toolbar {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  </style>
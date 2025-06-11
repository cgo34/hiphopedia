<template>
  <v-container fluid class="pa-0">
    
    <LoaderOverlay v-if="loading" :show="loading" />

    <div v-else-if="error" class="text-center py-16">
      <v-alert type="error" variant="tonal">{{ error }}</v-alert>
    </div>

    <template v-else-if="actor">
      <ActorDetailHero
        :actor="actor"
        @play-latest="handlePlayLatestVideo"
        @show-bio="scrollToBio"
      />

      <v-container class="py-16">
        <!-- Biographie complète -->
        <section id="bio-section" class="mb-16">
          <h2 class="text-h4 mb-6">Biographie</h2>
          <p class="text-body-1">{{ actor.bio }}</p>
        </section>

        <!-- Vidéos de l'artiste -->
        <section v-if="videos.length" class="mb-16">
          <h2 class="text-h4 mb-6">Vidéos de {{ actor.nickname || `${actor.firstname} ${actor.lastname}` }}</h2>
          <VideoCarousel
            :collection="{
              id: `${actor.id}-videos`,
              title: 'Vidéos',
              type: 'videos',
              items: videos
            }"
            @play="handlePlayVideo"
            @details="navigateToVideo"
          />
        </section>
      </v-container>

      <VideoPlayerModal
        v-model="showVideoPlayer"
        :video="selectedVideo"
        :collection="{
          title: selectedVideo ? formatVideoType(selectedVideo.type) : '',
          items: videos
        }"
        @change-video="handleVideoChange"
      />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { ActorViewModel } from '@/core/domain/entities/Actor'
import { VideoViewModel } from '@/core/domain/entities/Video'
import ActorDetailHero from '@/ui/components/features/actors/ActorDetailHero.vue'
import VideoCarousel from '@/ui/components/features/videos/VideoCarousel.vue'
import VideoPlayerModal from '@/ui/components/features/videos/VideoPlayerModal.vue'
import LoaderOverlay from '@/ui/components/shared/LoaderOverlay.vue'
import { useActors } from '@/ui/composables/actors/useActor'
import { useVideoActors } from '@/ui/composables/videos/useVideoActors'
import { useVideoPlayer } from '@/ui/composables/videos/useVideoPlayer'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { getActorById } = useActors()
const { getVideos } = useVideoActors()
const { playVideo } = useVideoPlayer()

const actor = ref<ActorViewModel | null>(null)
const videos = ref<VideoViewModel[]>([])
const selectedVideo = ref<VideoViewModel | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showVideoPlayer = ref(false)

const formatVideoType = (type: string): string => {
  const translations: Record<string, string> = {
    clip: 'Clips',
    interview: 'Interviews',
    documentary: 'Documentaires',
    reporting: 'Reportages',
    short: 'Courts métrages'
  }
  return translations[type] || type
}

const handlePlayVideo = (video: VideoViewModel) => {
  selectedVideo.value = video
  showVideoPlayer.value = true
}

const handlePlayLatestVideo = () => {
  if (videos.value.length) {
    handlePlayVideo(videos.value[0])
  }
}

const handleVideoChange = (video: VideoViewModel) => {
  selectedVideo.value = video
}

const navigateToVideo = (video: VideoViewModel) => {
  router.push({ name: 'VideoDetails', params: { id: video.id }})
}

const scrollToBio = () => {
  document.getElementById('bio-section')?.scrollIntoView({ 
    behavior: 'smooth'
  })
}

onMounted(async () => {
  try {
    loading.value = true
    const actorId = route.params.id as string
    
    // Chargement de l'acteur et ses vidéos
    const [actorData, actorVideos] = await Promise.all([
      getActorById(actorId),
      getVideos(actorId)
    ])
    
    actor.value = actorData
    videos.value = actorVideos

  } catch (e) {
    error.value = "Impossible de charger les informations de l'artiste"
    console.error('Error in ActorDetailsPage:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped lang="scss">
.actor-details {
  &__section {
    margin-bottom: 4rem;
  }

  &__title {
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  &__description {
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.87);
  }
}
</style>
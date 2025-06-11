<template>
    <v-container fluid class="pa-0">
      
      <LoaderOverlay v-if="loading" :show="loading" />
  
      <div v-else-if="error" class="text-center py-16">
        <v-alert type="error" variant="tonal">{{ error }}</v-alert>
      </div>
  
      <template v-else-if="video">
        <VideoDetailHero
          :video="video"
          @play="handlePlayVideo"
          @show-bio="handlePlayVideo"
        />
  
        <v-container class="py-16">
          <!-- Description détaillée -->
          <section class="mb-16">
            <h2 class="text-h4 mb-6">À propos</h2>
            <p class="text-body-1">{{ video.descriptionLong }}</p>
          </section>
  
          <!-- Acteurs de la vidéo -->
          <section v-if="actors.length">
            <h2 class="text-h4 mb-6">Artistes présents</h2>
            
            <ActorCarousel
              v-for="(group, role) in groupedActors"
              :key="role"
              :collection="{
                id: `${video.id}-${role}`,
                title: formatActorType(role),
                type: 'actors',
                items: group
              }"
              @details="navigateToActor"
              class="mb-8"
            />
          </section>
  
          <!-- Autres vidéos des artistes -->
          <section v-for="actor in actors" :key="actor.id" class="mb-16">
            <h2 class="text-h4 mb-6">Autres vidéos avec {{ actor.nickname || `${actor.firstname} ${actor.lastname}` }}</h2>
            <VideoCarousel
              v-if="actorVideos[actor.id]?.length"
              :collection="{
                id: `${actor.id}-videos`,
                title: 'Vidéos',
                type: 'videos',
                items: actorVideos[actor.id]
              }"
              @play="handlePlayVideo"
              @details="navigateToVideo"
              class="mb-8"
            />
          </section>
        </v-container>
  
        <VideoPlayerModal
          v-model="showVideoPlayer"
          :video="video"
          :collection="{
            title: formatVideoType(video.type),
            items: [video]
          }"
        />
      </template>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ActorViewModel } from '@/core/domain/entities/Actor'
import { VideoViewModel } from '@/core/domain/entities/Video'
import ActorCarousel from '@/ui/components/features/actors/ActorCarousel.vue'
import VideoCarousel from '@/ui/components/features/videos/VideoCarousel.vue'
import VideoDetailHero from '@/ui/components/features/videos/VideoDetailHero.vue'
import VideoPlayerModal from '@/ui/components/features/videos/VideoPlayerModal.vue'
import LoaderOverlay from '@/ui/components/shared/LoaderOverlay.vue'
import { useVideos } from '@/ui/composables/videos/useVideo'
import { useVideoActors } from '@/ui/composables/videos/useVideoActors'
import { useVideoPlayer } from '@/ui/composables/videos/useVideoPlayer'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const { getVideoById } = useVideos()
  const { playVideo } = useVideoPlayer()
  const { getActors, getVideos } = useVideoActors()
  
  const video = ref<VideoViewModel | null>(null)
  const actors = ref<ActorViewModel[]>([])
  const videos = ref<VideoViewModel[]>([])
  const actorVideos = ref<Record<string, VideoViewModel[]>>({})
  const loading = ref(true)
  const error = ref<string | null>(null)
  const showVideoPlayer = ref(false)
  
  const groupedActors = computed(() => {
    return actors.value.reduce((acc, actor) => {
      if (!acc[actor.actorType]) {
        acc[actor.actorType] = []
      }
      acc[actor.actorType].push(actor)
      return acc
    }, {} as Record<string, ActorViewModel[]>)
  })
  
  const formatActorType = (type: string): string => {
    const translations: Record<string, string> = {
      rappeur: 'Rappeurs',
      producteur: 'Producteurs',
      realisateur: 'Réalisateurs',
      beatmaker: 'Beatmakers',
      media: 'Médias',
      radio: 'Radios',
      guest: 'Invités'
    }
    return translations[type] || type
  }
  
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
  
  const handlePlayVideo = (videoToPlay: VideoViewModel) => {
    showVideoPlayer.value = true
  }
  
  const navigateToActor = (actor: ActorViewModel) => {
    router.push({ name: 'ActorDetails', params: { id: actor.id }})
  }
  
  const navigateToVideo = (videoToNavigate: VideoViewModel) => {
    router.push({ name: 'VideoDetails', params: { id: videoToNavigate.id }})
  }
  
  onMounted(async () => {
    try {
      loading.value = true
      const videoId = route.params.id as string
      
      // Chargement de la vidéo
      const [videoData] = await Promise.all([
        getVideoById(videoId),
      ])
      
      video.value = videoData
      console.log('single video', videoData);
      

      // Chargement des acteurs de la vidéo et des vidéos de l'acteur
      const [actorsData] = await Promise.all([
        // getVideos(videoId),
        getActors(videoId)
      ])

      console.log('************* actorsData', actorsData);
      
        actors.value = actorsData

        
    // Récupération des autres vidéos de l'artiste principal uniquement
    const mainActor = actorsData.find(actor => actor.actorType === 'rappeur')
    if (mainActor) {
      const otherVideos = await getVideos(mainActor.id)
      // Filtrer pour exclure la vidéo courante
      actorVideos.value[mainActor.id] = otherVideos.filter(v => v.id !== videoId)
    }
  
      // Chargement des vidéos pour chaque acteur
      await Promise.all(
        actorsData.map(async (actor) => {
          const actorVideosData = await getVideos(actor.id)
          // Filtrer pour exclure la vidéo courante
          actorVideos.value[actor.id] = actorVideosData.filter(v => v.id !== videoId)
        })
      )
  
    } catch (e) {
      error.value = "Impossible de charger la vidéo"
      console.error('Error in VideoDetailsPage:', e)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped lang="scss">
  .video-details {
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
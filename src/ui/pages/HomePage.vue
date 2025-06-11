<template>
  <v-container>
    <FeaturedContent
      :collection="featuredCollection"
      @play="handlePlayVideo"
      @details="navigateToVideo"
    />
  </v-container>

  <v-container>
    <section>
      <ActorCarousel
        :collection="actorsCollection"
        @details="navigateToActor"
      />
    </section>
  </v-container>

  <v-container>
    <section class="mb-8">
      <VideoCarousel
        :collection="shortCollection"
        @play="(video) => handlePlayVideo(video, 'short')"
        @details="navigateToVideo"
      />
    </section>
  </v-container>

  <v-container>
    <section class="mb-8">
      <VideoCarousel
        :collection="clipCollection"
        @play="(video) => handlePlayVideo(video, 'clip')"
        @details="navigateToVideo"
      />
    </section>
  </v-container>

  <v-container>
    <section class="mb-8">
      <VideoCarousel
        :collection="interviewCollection"
        @play="(video) => handlePlayVideo(video, 'interview')"
        @details="navigateToVideo"
      />
    </section>
  </v-container>

  <v-container>
    <section class="mb-8">
      <VideoCarousel
        :collection="documentaryCollection"
        @play="(video) => handlePlayVideo(video, 'documentaire')"
        @details="navigateToVideo"
      />
    </section>
  </v-container>

  <v-container>
    <section class="mb-8">
      <VideoCarousel
        :collection="reportingCollection"
        @play="(video) => handlePlayVideo(video, 'reportage')"
        @details="navigateToVideo"
      />
    </section>
  </v-container>

  <VideoPlayerModal
    v-model="showVideoPlayer"
    :current-video="selectedVideo"
    :collection="currentCollection"
    @change-video="handleVideoChange"
  />
</template>

<script setup lang="ts">
import { ActorViewModel } from '@/core/domain/entities/Actor'
import {
  ActorCollection,
  CollectionType,
  createActorCollection,
  createVideoCollection,
  VideoCollection
} from '@/core/domain/entities/Collection'
import { VideoViewModel } from '@/core/domain/entities/Video'
import ActorCarousel from '@/ui/components/features/actors/ActorCarousel.vue'
import FeaturedContent from '@/ui/components/features/content/FeaturedContent.vue'
import VideoCarousel from '@/ui/components/features/videos/VideoCarousel.vue'
import VideoPlayerModal from '@/ui/components/features/videos/VideoPlayerModal.vue'
import { useActors } from '@/ui/composables/actors/useActor'
import { useVideos } from '@/ui/composables/videos/useVideo'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { videos, fetchVideos } = useVideos()
const { actors, fetchActors } = useActors()

const showVideoPlayer = ref<boolean>(false)
const selectedVideo = ref<VideoViewModel | undefined>()
const currentCollectionType = ref<CollectionType>('featured')

// Collections
const featuredCollection = computed<VideoCollection>(() => 
  createVideoCollection(
    'featured',
    'À la une',
    'featured',
    [...videos.value]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
  )
)

const shortCollection = computed<VideoCollection>(() => 
  createVideoCollection(
    'short',
    'Derniers Shorts',
    'short',
    videos.value.filter(v => v.type === 'short')
  )
)

const clipCollection = computed<VideoCollection>(() => 
  createVideoCollection(
    'clip',
    'Derniers Clips',
    'clip',
    videos.value.filter(v => v.type === 'clip')
  )
)

const interviewCollection = computed<VideoCollection>(() => 
  createVideoCollection(
    'interview',
    'Dernières Interviews',
    'interview',
    videos.value.filter(v => v.type === 'interview')
  )
)

const documentaryCollection = computed<VideoCollection>(() => 
  createVideoCollection(
    'documentary',
    'Derniers Documentaires',
    'documentary',
    videos.value.filter(v => v.type === 'documentaire')
  )
)

const reportingCollection = computed<VideoCollection>(() => 
  createVideoCollection(
    'reporting',
    'Derniers Reportages',
    'reporting',
    videos.value.filter(v => v.type === 'reportage')
  )
)

const actorsCollection = computed<ActorCollection>(() => 
  createActorCollection(
    'popular-actors',
    'Artistes Populaires',
    actors.value
  )
)

const currentCollection = computed<VideoCollection>(() => {
  switch (currentCollectionType.value) {
    case 'short':
      return shortCollection.value
    case 'clip':
      return clipCollection.value
    case 'interview':
      return interviewCollection.value
    case 'documentaire':
      return documentaryCollection.value
    case 'reportage':
      return reportingCollection.value
    default:
      return featuredCollection.value
  }
})

onMounted(async () => {
  await Promise.all([fetchVideos(), fetchActors()])
})

const handlePlayVideo = (video: VideoViewModel, source: CollectionType) => {
  selectedVideo.value = video
  currentCollectionType.value = source
  showVideoPlayer.value = true
}

const handleVideoChange = (video: VideoViewModel) => {
  selectedVideo.value = video
}

const navigateToVideo = (video: VideoViewModel) => {
  router.push({ name: 'VideoDetails', params: { id: video.id }})
}

const navigateToActor = (actor: ActorViewModel) => {
  router.push({ name: 'ActorDetails', params: { id: actor.id }})
}
</script>
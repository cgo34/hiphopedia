<template>
  <v-container fluid class="pa-0">

    <v-container>
      
      <LoaderOverlay v-if="loading" :show="loading" />

      <div v-else-if="error" class="text-center py-16">
        <v-alert type="error" variant="tonal">{{ error }}</v-alert>
      </div>

      <template v-else>
        <FeaturedContentVideo
          :collection="featuredVideo"
          :loading="loading"
          @play="handlePlayVideo"
          @details="navigateToVideo"
        />

        <div class="filters mb-16">
          <v-chip-group v-model="selectedType">
            <v-chip
              filter
              variant="elevated"
              :value="null"
            >
              Tout
            </v-chip>
            <v-chip
              v-for="type in videoTypes"
              :key="type"
              filter
              variant="elevated"
              :value="type"
            >
              {{ formatVideoType(type) }}
            </v-chip>
          </v-chip-group>
        </div>

        <VideoCarousel
          v-for="(group, type) in groupedVideos"
          :key="type"
          :collection="{
            title: formatVideoType(type),
            items: group
          }"
          @play="handlePlayVideo"
          @details="navigateToVideo"
          class="mb-16"
        />
      </template>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { createVideoCollection } from '@/core/domain/entities/Collection'
import { VideoViewModel } from '@/core/domain/entities/Video'
import { VideoTypeViewType } from '@/core/domain/entities/VideoType'
import FeaturedContentVideo from '@/ui/components/features/videos/FeaturedContentVideo.vue'
import VideoCarousel from '@/ui/components/features/videos/VideoCarousel.vue'
import LoaderOverlay from '@/ui/components/shared/LoaderOverlay.vue'
import { useVideos } from '@/ui/composables/videos/useVideo'
import { useVideoPlayer } from '@/ui/composables/videos/useVideoPlayer'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { playVideo } = useVideoPlayer()
const { videos, loading, error, fetchVideos } = useVideos()
const selectedType = ref<VideoTypeViewType | null>(null)

const videoTypes: VideoTypeViewType[] = [
  'clip',
  'interview',
  'documentary',
  'reporting',
  'short'
]

const featuredVideo = computed(() => 
  createVideoCollection(
    'featured',
    'À la une',
    'featured',
    videos.value?.slice(0, 3) || []
  )
)

const groupedVideos = computed(() => {
  const filtered = selectedType.value
    ? videos.value.filter(v => v.type === selectedType.value)
    : videos.value

  return filtered.reduce((acc, video) => {
    if (!acc[video.type]) {
      acc[video.type] = []
    }
    acc[video.type].push(video)
    return acc
  }, {} as Record<VideoTypeViewType, VideoViewModel[]>)
})

const formatVideoType = (type: string): string => {
  const translations: Record<string, string> = {
    clip: 'Clips',
    interview: 'Interviews',
    documentary: 'Documentaires',
    reporting: 'Reportages',
    short: 'Shorts'
  }
  return translations[type] || type.charAt(0).toUpperCase() + type.slice(1)
}

const handlePlayVideo = (video: VideoViewModel) => {
  playVideo(video, {
    title: formatVideoType(video.type),
    items: groupedVideos.value[video.type] || []
  })
}

const navigateToVideo = (video: VideoViewModel) => {
  router.push({ name: 'VideoDetails', params: { id: video.id }})
}

onMounted(async () => {
  await fetchVideos()
})
</script>

<style scoped lang="scss">
.filters {
  position: sticky;
  top: 64px;
  z-index: 4;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  padding: 16px 0;
}
</style>
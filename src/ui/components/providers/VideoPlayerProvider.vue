<template>
  <slot></slot>

  <VideoPlayerModal
    v-model="showVideoPlayer"
    :current-video="selectedVideo"
    :collection="currentCollection"
    @change-video="handleVideoChange"
  />
</template>

<script setup lang="ts">
    import { VideoCollection } from '@/core/domain/entities/Collection'
    import { VideoViewModel } from '@/core/domain/entities/Video'
    import VideoPlayerModal from '@/ui/components/features/videos/VideoPlayerModal.vue'
    import { ref } from 'vue'

const showVideoPlayer = ref<boolean>(false)
const selectedVideo = ref<VideoViewModel | null>(null)
const currentCollection = ref<VideoCollection | null>(null)

const playVideo = (video: VideoViewModel, collection?: VideoCollection) => {
  selectedVideo.value = video
  currentCollection.value = collection || null
  showVideoPlayer.value = true
}

const handleVideoChange = (video: VideoViewModel) => {
  selectedVideo.value = video
}

// Exposer les méthodes via defineExpose
defineExpose({
  playVideo
})
</script>
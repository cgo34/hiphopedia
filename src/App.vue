<script setup lang="ts">
import VideoPlayerProvider from '@/ui/components/providers/VideoPlayerProvider.vue';
import { useVideoPlayer } from '@/ui/composables/videos/useVideoPlayer';
import { useActors } from '@ui/composables/actors/useActor';
import { useVideos } from '@ui/composables/videos/useVideo';
import { onMounted } from 'vue';

const { videoPlayerRef } = useVideoPlayer()

const { fetchActors } = useActors()
const {  fetchVideos } = useVideos()

onMounted(() => {
  fetchActors()
  fetchVideos()
})
</script>

<template>
  <v-app>
    <VideoPlayerProvider ref="videoPlayerRef">
      <router-view></router-view>
    </VideoPlayerProvider>
  </v-app>
</template>
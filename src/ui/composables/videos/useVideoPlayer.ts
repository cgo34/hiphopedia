import type { VideoCollection } from '@/core/domain/entities/Collection'
import type { VideoViewModel } from '@/core/domain/entities/Video'
import { ref } from 'vue'

const videoPlayerRef = ref()

export function useVideoPlayer() {
  const playVideo = (video: VideoViewModel, collection?: VideoCollection) => {
    if (videoPlayerRef.value) {
      videoPlayerRef.value.playVideo(video, collection)
    }
  }

  return {
    videoPlayerRef,
    playVideo
  }
}
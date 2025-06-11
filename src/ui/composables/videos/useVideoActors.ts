import { ActorViewModel } from '@/core/domain/entities/Actor'
import { VideoViewModel } from '@/core/domain/entities/Video'
import { IVideoActorService } from '@/core/domain/interfaces/services/IVideoActorService'
import { TYPES } from '@/core/domain/types'
import { container } from '@/infrastructure/ioc/container'
import { ref } from 'vue'

export function useVideoActors() {
  const service = container.get<IVideoActorService>(TYPES.VideoActorService)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getActors = async (videoId: string): Promise<ActorViewModel[]> => {
    try {
      loading.value = true
      return await service.getActorsByVideoId(videoId)
    } catch (e) {
      error.value = "Impossible de charger les acteurs"
      console.error(e)
      return []
    } finally {
      loading.value = false
    }
  }

  const getVideos = async (actorId: string): Promise<VideoViewModel[]> => {
    try {
      loading.value = true
      return await service.getVideosByActorId(actorId)
    } catch (e) {
      error.value = "Impossible de charger les vidéos"
      console.error(e)
      return []
    } finally {
      loading.value = false
    }
  }


  return {
    getActors,
    getVideos,
    loading,
    error
  }
}
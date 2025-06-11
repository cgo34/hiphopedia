import { VideoViewModel } from '@/core/domain/entities/Video'
import { IVideoService } from '@/core/domain/interfaces/services/IVideoService'
import { TYPES } from '@/core/domain/types'
import { container } from '@/infrastructure/ioc/container'
import { ref } from 'vue'

export function useVideos() {
  const service = container.get<IVideoService>(TYPES.VideoService)
  const videos = ref<VideoViewModel[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getVideoById = async (id: string) => {
    return await service.getById(id)
  }

  const fetchVideos = async () => {
    try {
      loading.value = true
      videos.value = await service.getAll()
    } catch (e) {
      error.value = "Impossible de charger les vidéos"
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    videos,
    loading,
    error,
    fetchVideos,
    getVideoById  // Ajout de cette fonction au retour
  }
}
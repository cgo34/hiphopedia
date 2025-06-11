import type { CreateActorDto, UpdateActorDto } from '@/core/application/dtos/actor/ActorDto'
import type { ActorViewModel } from '@/core/domain/entities/Actor'
import type { IActorService } from '@/core/domain/interfaces/services/IActorService'
import { TYPES } from '@/infrastructure/ioc/container'
import { ref } from 'vue'
import { useInjection } from '../useInjection'

export function useActors() {
  const actorService = useInjection<IActorService>(TYPES.ActorService)
  const actors = ref<ActorViewModel[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchActors() {
    loading.value = true
    try {
      actors.value = await actorService.getAll()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Une erreur est survenue')
    } finally {
      loading.value = false
    }
  }

  const getActorById = async (id: string) => {
    return await actorService.getById(id)
  }

  async function createActor(dto: CreateActorDto) {
    loading.value = true
    try {
      const actor = await actorService.createActor(dto)
      actors.value.push(actor)
      return actor
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Erreur lors de la création')
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateActor(id: string, dto: UpdateActorDto) {
    loading.value = true
    try {
      const updated = await actorService.updateActor(id, dto)
      if (updated) {
        const index = actors.value.findIndex(a => a.id === id)
        if (index !== -1) actors.value[index] = updated
      }
      return updated
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Erreur lors de la mise à jour')
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    actors,
    loading,
    error,
    fetchActors,
    getActorById,
    createActor,
    updateActor
  }
}
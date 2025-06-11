import { ActorService } from '@/core/application/services/ActorService'
import { VideoActorService } from '@/core/application/services/VideoActorService'
import { VideoService } from '@/core/application/services/videoService'
import type { IActorRepository } from '@/core/domain/interfaces/repositories/IActorRepository'
import { IVideoActorRepository } from '@/core/domain/interfaces/repositories/IVideoActorRepository'
import type { IVideoRepository } from '@/core/domain/interfaces/repositories/IVideoRepository'
import type { IActorService } from '@/core/domain/interfaces/services/IActorService'
import { IVideoActorService } from '@/core/domain/interfaces/services/IVideoActorService'
import type { IVideoService } from '@/core/domain/interfaces/services/IVideoService'
import { TYPES } from '@/core/domain/types'
import { SupabaseActorRepository } from '@/infrastructure/repositories/SupabaseActorRepository'
import { SupabaseVideoRepository } from '@/infrastructure/repositories/SupabaseVideoRepository'
import { Container } from 'inversify'
import { SupabaseClient } from '../database/supabase'
import { SupabaseVideoActorRepository } from '../repositories/SupabaseVideoActorRepository'

const container = new Container()

// Infrastructure
container.bind(TYPES.SupabaseClient).to(SupabaseClient)

// Repositories
container.bind<IVideoRepository>(TYPES.VideoRepository).to(SupabaseVideoRepository)
container.bind<IActorRepository>(TYPES.ActorRepository).to(SupabaseActorRepository)
container.bind<IVideoActorRepository>(TYPES.VideoActorRepository).to(SupabaseVideoActorRepository)

// Services
container.bind<IVideoService>(TYPES.VideoService).to(VideoService)
container.bind<IActorService>(TYPES.ActorService).to(ActorService)
container.bind<IVideoActorService>(TYPES.VideoActorService).to(VideoActorService)

// Debug: Vérifiez que les bindings fonctionnent
console.log(container.get(TYPES.VideoRepository)) // Devrait retourner SupabaseVideoRepository
console.log(container.get(TYPES.ActorRepository)) // Devrait retourner SupabaseActorRepository

export { container, TYPES }


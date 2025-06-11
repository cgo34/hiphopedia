import type { CreateVideoActorDto } from '@/core/application/dtos/videoActor/VideoActorDto'
import { ActorViewModel } from '@/core/domain/entities/Actor'
import { VideoViewModel } from '@/core/domain/entities/Video'
import type { VideoActorViewModel } from '@/core/domain/entities/VideoActor'
import type { VideoActor } from '@/types/database'
import { ActorMapper } from './ActorMapper'
import { VideoMapper } from './VideoMapper'

export class VideoActorMapper {
    // DTO → Format BDD
    static toDatabase(dto: CreateVideoActorDto): Omit<VideoActor, 'id' | 'created_at'> {
        return {
            video_id: dto.videoId,
            actor_id: dto.actorId,
            role: dto.role
        }
    }

    // BDD → ViewModel
    static toViewModel(data: VideoActor): VideoActorViewModel {
        return {
            id: data.id,
            videoId: data.video_id,
            actorId: data.actor_id,
            role: data.role,
            createdAt: data.created_at
        }
    }

    // Nouvelles méthodes pour les relations
    static toActorViewModel(data: VideoActor): ActorViewModel {
        if (!data.actors) throw new Error('Actor data is missing')
        return ActorMapper.toViewModel({
            ...data.actors,
            actor_type: data.role
        })
    }

    static toVideoViewModel(data: VideoActor): VideoViewModel {
        if (!data.videos) throw new Error('Video data is missing')
        return data.videos.map(VideoMapper.toViewModel)
    }
}
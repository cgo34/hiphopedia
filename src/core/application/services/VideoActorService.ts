import { VideoActorMapper } from '@/core/application/mappers'
import { ActorViewModel } from '@/core/domain/entities/Actor'
import { VideoViewModel } from '@/core/domain/entities/Video'
import { VideoActorViewModel } from '@/core/domain/entities/VideoActor'
import { IVideoActorRepository } from '@/core/domain/interfaces/repositories/IVideoActorRepository'
import { IVideoActorService } from '@/core/domain/interfaces/services/IVideoActorService'
import { TYPES } from '@/core/domain/types'
import { inject, injectable } from 'inversify'

@injectable()
export class VideoActorService implements IVideoActorService {
  constructor(
    @inject(TYPES.VideoActorRepository) private readonly repository: IVideoActorRepository,
  ) {}

  async getActorsByVideoId(videoId: string): Promise<ActorViewModel[]> {
    const videoActors = await this.repository.getByVideoId(videoId)
    console.log('videoActors:', videoActors);
    
    return videoActors.map(VideoActorMapper.toActorViewModel) // ✅ Mapping du tableau ici
  }

  async getVideosByActorId(actorId: string): Promise<VideoViewModel[]> {
    const videoActors = await this.repository.getByActorId(actorId)
    return videoActors.map(VideoActorMapper.toVideoViewModel) // ✅ Mapping du tableau ici
}

  async addActorToVideo(videoId: string, actorId: string, role: string): Promise<VideoActorViewModel> {
    const created = await this.repository.create({
      video_id: videoId,
      actor_id: actorId,
      role
    })

    return VideoActorMapper.toViewModel(created)
  }

  async removeActorFromVideo(videoId: string, actorId: string): Promise<boolean> {
    return await this.repository.delete(videoId, actorId)
  }
}
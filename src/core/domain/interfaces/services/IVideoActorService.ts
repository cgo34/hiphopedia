import { ActorViewModel } from '../../entities/Actor'
import { VideoViewModel } from '../../entities/Video'
import { VideoActorViewModel } from '../../entities/VideoActor'

export interface IVideoActorService {
  getActorsByVideoId(videoId: string): Promise<ActorViewModel[]>
  getVideosByActorId(actorId: string): Promise<VideoViewModel[]>
  addActorToVideo(videoId: string, actorId: string, role: string): Promise<VideoActorViewModel>
  removeActorFromVideo(videoId: string, actorId: string): Promise<boolean>
}
import type { VideoActor } from '@/types/database'

export interface IVideoActorRepository {
  getByVideoId(videoId: string, excludeActorId?: string): Promise<VideoActor[]>
  getByActorId(actorId: string, excludeVideoId?: string): Promise<VideoActor[]>
  create(videoActor: Omit<VideoActor, 'id' | 'created_at'>): Promise<VideoActor>
  delete(videoId: string, actorId: string): Promise<boolean>
}
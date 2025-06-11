import { RepositoryError } from '@/core/domain/errors'
import { IVideoActorRepository } from '@/core/domain/interfaces/repositories/IVideoActorRepository'
import { TYPES } from '@/core/domain/types'
import type { ISupabaseClient } from '@/infrastructure/database/supabase'
import type { VideoActor } from '@/types/database'
import { inject, injectable } from 'inversify'

@injectable()
export class SupabaseVideoActorRepository implements IVideoActorRepository {
  private readonly tableName = 'video_actors'

  constructor(
    @inject(TYPES.SupabaseClient) private client: ISupabaseClient
  ) {}

  async getByVideoId(videoId: string, excludeActorId?: string): Promise<VideoActor[]> {
    console.log('Fetching actors for video:', videoId)
    let query = this.client
      .from(this.tableName)
      .select(`
        *,
        actors:actor_id (*)
        videos:video_id (*)
      `)
      .eq('video_id', videoId)

    if (excludeActorId) {
      query = query.neq('actor_id', excludeActorId)
    }

    const { data, error } = await query
    if (error) throw new RepositoryError('FETCH_ERROR', error.message)
    return data
  }

  async getByActorId(actorId: string, excludeVideoId?: string): Promise<VideoActor[]> {
    console.log('Fetching videos for actor:', actorId)
    let query = this.client
      .from(this.tableName)
      .select(`
        *,
        videos:video_id (*)
      `)
      .eq('actor_id', actorId)

    if (excludeVideoId) {
      query = query.neq('video_id', excludeVideoId)
    }

    const { data, error } = await query
    if (error) throw new RepositoryError('FETCH_ERROR', error.message)
    return data
  }

  async create(videoActor: Omit<VideoActor, 'id' | 'created_at'>): Promise<VideoActor> {
    const { data, error } = await this.client
      .from(this.tableName)
      .insert(videoActor)
      .select()
      .single()

    if (error) throw new RepositoryError('CREATE_ERROR', error.message)
    return data
  }

  async delete(videoId: string, actorId: string): Promise<boolean> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('video_id', videoId)
      .eq('actor_id', actorId)

    return !error
  }
}
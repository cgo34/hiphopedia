import { RepositoryError } from '@/core/domain/errors'
import { TYPES } from '@/core/domain/types'
import type { ISupabaseClient } from '@/infrastructure/database/supabase'
import type { Video, VideoTypeApiType } from '@/types/database'
import { inject, injectable } from 'inversify'
import { BaseSupabaseRepository } from './BaseSupabaseRepository'

@injectable()
export class SupabaseVideoRepository extends BaseSupabaseRepository<
  Video,
  Omit<Video, 'id' | 'created_at' | 'updated_at'>,
  Partial<Omit<Video, 'id' | 'created_at' | 'updated_at'>>,
  VideoTypeApiType
> {
  constructor(
    @inject(TYPES.SupabaseClient) client: ISupabaseClient
  ) {
    super(client, 'videos')
  }

  // Surcharge pour le type spécifique aux vidéos
  async getByType(type: VideoTypeApiType): Promise<Video[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('type', type)

    if (error) throw new RepositoryError('FETCH_ERROR', error.message)
    return data
  }
}
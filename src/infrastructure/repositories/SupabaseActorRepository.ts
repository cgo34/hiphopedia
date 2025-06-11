import { RepositoryError } from '@/core/domain/errors'
import { TYPES } from '@/core/domain/types'
import type { ISupabaseClient } from '@/infrastructure/database/supabase'
import type { Actor, ActorTypeApiType } from '@/types/database'
import { inject, injectable } from 'inversify'
import { BaseSupabaseRepository } from './BaseSupabaseRepository'

@injectable()
export class SupabaseActorRepository extends BaseSupabaseRepository<
  Actor,
  Omit<Actor, 'id' | 'created_at' | 'updated_at'>,
  Partial<Omit<Actor, 'id' | 'created_at' | 'updated_at'>>,
  ActorTypeApiType
> {
  constructor(
    @inject(TYPES.SupabaseClient) client: ISupabaseClient
  ) {
    super(client, 'actors')
  }

  // Surcharge pour le type spécifique aux acteurs
  async getByType(type: ActorTypeApiType): Promise<Actor[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('actor_type', type)

    if (error) throw new RepositoryError('FETCH_ERROR', error.message)
    return data
  }
}
import { RepositoryError } from '@/core/domain/errors'
import { BaseRepository } from '@/core/domain/interfaces/repositories/BaseRepository'
import { TYPES } from '@/core/domain/types'
import { inject, injectable } from 'inversify'
import type { ISupabaseClient } from '../database/supabase'

@injectable()
export abstract class BaseSupabaseRepository<TModel, TCreate, TUpdate, TType> 
  implements BaseRepository<TModel, TCreate, TUpdate, TType> {
  
  constructor(
    @inject(TYPES.SupabaseClient) protected client: ISupabaseClient,
    protected tableName: string
  ) {}

  async getAll(): Promise<TModel[]> {
    console.log(`[BaseSupabaseRepository:${this.tableName}] Calling getAll`)
    
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')

    console.log(`[BaseSupabaseRepository:${this.tableName}] Response:`, { data, error })
    
    if (error) {
      console.error(`[BaseSupabaseRepository:${this.tableName}] Error:`, error)
      throw new RepositoryError('FETCH_ERROR', error.message)
    }
    return data
  }

  async getById(id: string): Promise<TModel | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  }

  async getByType(type: TType): Promise<TModel[]> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq('type', type)

    if (error) throw new RepositoryError('FETCH_ERROR', error.message)
    return data
  }

  async create(data: TCreate): Promise<TModel> {
    const { data: result, error } = await this.client
      .from(this.tableName)
      .insert(data)
      .select()
      .single()

    if (error) throw new RepositoryError('CREATE_ERROR', error.message)
    return result
  }

  async update(id: string, data: TUpdate): Promise<TModel | null> {
    const { data: result, error } = await this.client
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) return null
    return result
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('id', id)

    return !error
  }
}
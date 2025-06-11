import { ActorViewModel } from '@/core/domain/entities/Actor'
import { IActorRepository } from '@/core/domain/interfaces/repositories/IActorRepository'
import { IActorService } from '@/core/domain/interfaces/services/IActorService'
import { TYPES } from '@/core/domain/types'
import { inject, injectable } from 'inversify'
import { CreateActorDto, UpdateActorDto } from '../dtos/actor/ActorDto'
import { ActorMapper } from '../mappers/ActorMapper'

@injectable()
export class ActorService implements IActorService {
  constructor(
    @inject(TYPES.ActorRepository) private readonly repository: IActorRepository
  ) {}

  async getAll(): Promise<ActorViewModel[]> {
    console.log('[ActorService] Starting getAll')
    try {
      const actors = await this.repository.getAll()
      console.log('[ActorService] Retrieved actors:', actors)
      const mapped = actors.map(ActorMapper.toViewModel)
      console.log('[ActorService] Mapped to ViewModel:', mapped)
      return mapped
    } catch (error) {
      console.error('[ActorService] Error in getAll:', error)
      throw error
    }
  }

  async getById(id: string): Promise<ActorViewModel | null> {
    console.log('[ActorService] Getting actor by id:', id)
    try {
      const actor = await this.repository.getById(id)
      console.log('[ActorService] Retrieved actor:', actor)
      return actor ? ActorMapper.toViewModel(actor) : null
    } catch (error) {
      console.error('[ActorService] Error in getById:', error)
      throw error
    }
  }

  async getByType(type: ActorViewModel['actorType']): Promise<ActorViewModel[]> {
    console.log('[ActorService] Getting actors by type:', type)
    try {
      const actors = await this.repository.getByType(type)
      console.log('[ActorService] Retrieved actors:', actors)
      return actors.map(ActorMapper.toViewModel)
    } catch (error) {
      console.error('[ActorService] Error in getByType:', error)
      throw error
    }
  }

  async create(dto: CreateActorDto): Promise<ActorViewModel> {
    console.log('[ActorService] Creating actor with DTO:', dto)
    try {
      const dbActor = ActorMapper.toDatabase(dto)
      console.log('[ActorService] Mapped to database format:', dbActor)
      const created = await this.repository.create(dbActor)
      console.log('[ActorService] Created actor:', created)
      return ActorMapper.toViewModel(created)
    } catch (error) {
      console.error('[ActorService] Error in create:', error)
      throw error
    }
  }

  async update(id: string, dto: UpdateActorDto): Promise<ActorViewModel | null> {
    console.log('[ActorService] Updating actor:', { id, dto })
    try {
      const dbActor = ActorMapper.toDatabase(dto)
      console.log('[ActorService] Mapped to database format:', dbActor)
      const updated = await this.repository.update(id, dbActor)
      console.log('[ActorService] Updated actor:', updated)
      return updated ? ActorMapper.toViewModel(updated) : null
    } catch (error) {
      console.error('[ActorService] Error in update:', error)
      throw error
    }
  }

  async delete(id: string): Promise<boolean> {
    console.log('[ActorService] Deleting actor:', id)
    try {
      const result = await this.repository.delete(id)
      console.log('[ActorService] Delete result:', result)
      return result
    } catch (error) {
      console.error('[ActorService] Error in delete:', error)
      throw error
    }
  }
}
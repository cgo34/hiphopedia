import type { CreateActorDto, UpdateActorDto } from '@/core/application/dtos/actor/ActorDto'
import type { Actor, ActorTypeApiType } from '@/types/database'
import { BaseRepository } from './BaseRepository'

export interface IActorRepository extends BaseRepository<
  Actor,
  CreateActorDto,
  UpdateActorDto,
  ActorTypeApiType
> {}
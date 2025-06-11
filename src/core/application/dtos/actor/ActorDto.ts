import { ActorTypeViewType } from '@/core/domain/entities/ActorType'

export interface ActorDto {
  firstname: string
  lastname: string
  nickname: string
  actorType: ActorTypeViewType
  liveCountry: string
  birthDate?: string
  birthCountry?: string
  bio?: string
  photoUrl?: string
  isCertified: boolean
}

export type CreateActorDto = ActorDto
export type UpdateActorDto = Partial<ActorDto>
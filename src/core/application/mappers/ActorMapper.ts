import type { CreateActorDto } from '@/core/application/dtos/actor/ActorDto'
import type { ActorViewModel } from '@/core/domain/entities/Actor'
import { ActorTypeViewType } from '@/core/domain/entities/ActorType'
import type { Actor, ActorTypeApiType } from '@/types/database'

export class ActorMapper {
    // DTO → Format BDD
    static toDatabase(dto: CreateActorDto): Omit<Actor, 'id' | 'created_at' | 'updated_at'> {
        return {
            firstname: dto.firstname,      // camelCase → snake_case
            lastname: dto.lastname,        // camelCase → snake_case
            nickname: dto.nickname,
            actor_type: dto.actorType,    // conversion type si nécessaire
            live_country: dto.liveCountry,
            is_certified: dto.isCertified,
        }
    }

    // BDD → ViewModel
    static toViewModel(data: Actor): ActorViewModel {
        return {
            id: data.id,
            firstname: data.firstname,     // snake_case → camelCase
            lastname: data.lastname,       // snake_case → camelCase
            nickname: data.nickname,
            actorType: data.actor_type,   // conversion type si nécessaire
            liveCountry: data.live_country,
            birthDate: data.birth_date,
            birthCountry: data.birth_country,
            bio: data.bio,
            imageUrl: data.photo_url,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            isCertified: data.is_certified
        }
    }

    // Type View → Type BDD
  static typeToDatabase(type: ActorTypeViewType): ActorTypeApiType {
    const typeMap: Record<ActorTypeViewType, ActorTypeApiType> = {
        'rappeur': 'rappeur',
        'producteur': 'producteur',
        'realisateur': 'realisateur',
        'beatmaker': 'beatmaker',
        'media': 'media',
        'radio': 'radio',
        'guest': 'guest'
    }
    return typeMap[type]
  }

  // Type BDD → Type View
  static typeToView(type: ActorTypeApiType): ActorTypeViewType {
    const typeMap: Record<ActorTypeApiType, ActorTypeViewType> = {
        'rappeur': 'rappeur',
        'producteur': 'producteur',
        'realisateur': 'realisateur',
        'beatmaker': 'beatmaker',
        'media': 'media',
        'radio': 'radio',
        'guest': 'guest'
    }
    return typeMap[type]
  }
}
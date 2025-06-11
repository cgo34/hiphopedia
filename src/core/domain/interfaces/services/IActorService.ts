import { CreateActorDto, UpdateActorDto } from '@/core/application/dtos/actor/ActorDto';
import { ActorViewModel } from '@/core/domain/entities/Actor';
import { ActorTypeViewType } from '../../entities/ActorType';
import { BaseService } from './BaseService';

export interface IActorService extends BaseService<
    ActorViewModel,       // TViewModel
    CreateActorDto,       // TCreate
    UpdateActorDto,       // TUpdate
    ActorTypeViewType     // TType
> {}
import type { CreateVideoDto, UpdateVideoDto } from '@/core/application/dtos/video/VideoDto'
import type { Video, VideoTypeApiType } from '@/types/database'
import { BaseRepository } from './BaseRepository'

export interface IVideoRepository extends BaseRepository<
  Video,
  CreateVideoDto,
  UpdateVideoDto,
  VideoTypeApiType
> {}
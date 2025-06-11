import { VideoTypeViewType } from '@/core/domain/entities/VideoType'

export interface VideoDto {
  title: string
  type: VideoTypeViewType
  url: string
  releaseDate?: string
  descriptionShort?: string
  descriptionLong?: string
  thumbnailUrl?: string
}

export type CreateVideoDto = VideoDto
export type UpdateVideoDto = Partial<VideoDto>
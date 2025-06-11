import type { VideoViewModel } from '@/core/domain/entities/Video'
import { VideoTypeViewType } from '@/core/domain/entities/VideoType'
import type { Video, VideoTypeApiType } from '@/types/database'
import { CreateVideoDto } from '../dtos/video/VideoDto'

export class VideoMapper {
  static toViewModel(data: Video): VideoViewModel {
    return {
      id: data.id,
      title: data.title,
      type: data.type,
      url: data.url,
      releaseDate: data.release_date,
      descriptionShort: data.description_short,
      descriptionLong: data.description_long,
      imageUrl: data.thumbnail_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }

  static toDatabase(dto: CreateVideoDto): Omit<Video, 'id' | 'created_at' | 'updated_at'> {
        return {
        title: dto.title,
        type: dto.type,
        url: dto.url,
        release_date: dto.releaseDate,
        description_short: dto.descriptionShort,
        description_long: dto.descriptionLong,
        thumbnail_url: dto.thumbnailUrl
        }
    }

    static typeToDatabase(type: VideoTypeViewType): VideoTypeApiType {
        const typeMap: Record<VideoTypeViewType, VideoTypeApiType> = {
            'clip': 'clip',
            'interview': 'interview',
            'documentary': 'documentary',
            'reporting': 'reporting',
            'short': 'short'

        }
        return typeMap[type]
    }

    static typeToView(type: VideoTypeApiType): VideoTypeViewType {
        const typeMap: Record<VideoTypeApiType, VideoTypeViewType> = {
            'clip': 'clip',
            'interview': 'interview',
            'documentary': 'documentary',
            'reporting': 'reporting',
            'short': 'short'
        }
        return typeMap[type]
    }
}
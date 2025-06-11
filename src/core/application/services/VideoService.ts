import { VideoViewModel } from "@/core/domain/entities/Video"
import { VideoTypeViewType } from "@/core/domain/entities/VideoType"
import { IVideoRepository } from "@/core/domain/interfaces/repositories/IVideoRepository"
import { IVideoService } from "@/core/domain/interfaces/services/IVideoService"
import { TYPES } from "@/core/domain/types"
import { inject, injectable } from "inversify"
import { CreateVideoDto, UpdateVideoDto } from "../dtos/video/VideoDto"
import { VideoMapper } from "../mappers/VideoMapper"

@injectable()  // Ajout du décorateur injectable
export class VideoService implements IVideoService {
  constructor(
    @inject(TYPES.VideoRepository) private readonly repository: IVideoRepository  // Ajout du décorateur inject
  ) {}

  async getAll(): Promise<VideoViewModel[]> {
    console.log('[VideoService] Starting getAll')
    try {
      const videos = await this.repository.getAll()
      console.log('[VideoService] Retrieved videos:', videos)
      const mapped = videos.map(VideoMapper.toViewModel)
      console.log('[VideoService] Mapped to ViewModel:', mapped)
      return mapped
    } catch (error) {
      console.error('[VideoService] Error in getAll:', error)
      throw error
    }
  }

  async getById(id: string): Promise<VideoViewModel | null> {
    const video = await this.repository.getById(id)
    return video ? VideoMapper.toViewModel(video) : null
  }

  async getByType(type: VideoTypeViewType): Promise<VideoViewModel[]> {
    const videos = await this.repository.getByType(type)
    return videos.map(VideoMapper.toViewModel)
  }

  async create(dto: CreateVideoDto): Promise<VideoViewModel> {
    const dbVideo = VideoMapper.toDatabase(dto)
    const created = await this.repository.create(dbVideo)
    return VideoMapper.toViewModel(created)
  }

  async update(id: string, dto: UpdateVideoDto): Promise<VideoViewModel | null> {
    const dbVideo = VideoMapper.toDatabase(dto)
    const updated = await this.repository.update(id, dbVideo)
    return updated ? VideoMapper.toViewModel(updated) : null
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id)
  }
}
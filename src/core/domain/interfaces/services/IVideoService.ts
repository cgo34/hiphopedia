import { CreateVideoDto, UpdateVideoDto } from "@/core/application/dtos/video/VideoDto";
import { VideoViewModel } from "../../entities/Video";
import { VideoTypeViewType } from "../../entities/VideoType";
import { BaseService } from "./BaseService";

export interface IVideoService extends BaseService<
  VideoViewModel,       // TViewModel
  CreateVideoDto,       // TCreate
  UpdateVideoDto,       // TUpdate
  VideoTypeViewType     // TType
> {}
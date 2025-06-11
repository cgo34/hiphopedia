import { VideoTypeViewType } from "./VideoType";

export interface VideoViewModel {
  id: string;
  title: string;
  type: VideoTypeViewType;
  url: string;
  releaseDate?: string;
  duration?: string    // Ajout de duration optionnel
  descriptionShort?: string;
  descriptionLong?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
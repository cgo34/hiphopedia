import { ActorTypeViewType } from "./ActorType";

export interface VideoActorViewModel {
    id: string;
    videoId: string;
    actorId: string;
    role: ActorTypeViewType;
    createdAt: string;
  }
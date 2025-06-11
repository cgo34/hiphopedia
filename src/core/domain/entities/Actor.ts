import { ActorTypeViewType } from "./ActorType";

export interface ActorViewModel {
  id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  actorType: ActorTypeViewType;
  birthDate?: string;
  birthCountry?: string;
  liveCountry: string;
  bio?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  isCertified: boolean;
}
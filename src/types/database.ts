// Types pour la base de données
export const ActorTypesApiType = [
  'rappeur',
  'producteur',
  'realisateur',
  'beatmaker',
  'media',
  'radio',
  'guest'
] as const;
export type ActorTypeApiType = typeof ActorTypesApiType[number];

export const VideoTypesApiType = [
  'clip',
  'interview',
  'documentary',
  'reporting',
  'short'
] as const;
export type VideoTypeApiType = typeof VideoTypesApiType[number];

export interface Actor {
  id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  actor_type: ActorTypeApiType;
  birth_date?: string;
  birth_country?: string;
  live_country: string;
  bio?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
  is_certified: boolean;
}

export interface Video {
  id: string;
  title: string;
  type: VideoTypeApiType;
  url: string;
  release_date?: string;
  description_short?: string;
  description_long?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface VideoActor {
  id: string
  video_id: string
  actor_id: string
  role: string
  created_at: string
  actors?: Actor[]
  videos?: Video[]
}
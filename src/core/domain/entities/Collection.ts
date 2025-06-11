import { ActorViewModel } from './Actor'
import { VideoViewModel } from './Video'
import { VideoTypeViewType } from './VideoType'

export type CollectionType = 'featured' | 'trending' | 'actors' | VideoTypeViewType

export interface Collection<T> {
  id: string
  title: string
  type: CollectionType
  items: T[]
}

export interface VideoCollection extends Collection<VideoViewModel> {
  type: Exclude<CollectionType, 'actors'>
}

export interface ActorCollection extends Collection<ActorViewModel> {
  type: 'actors'
}

export function createVideoCollection(
  id: string,
  title: string,
  type: Exclude<CollectionType, 'actors'>,
  items: VideoViewModel[]
): VideoCollection {
  return { id, title, type, items }
}

export function createActorCollection(
  id: string,
  title: string,
  items: ActorViewModel[]
): ActorCollection {
  return { id, title, type: 'actors', items }
}
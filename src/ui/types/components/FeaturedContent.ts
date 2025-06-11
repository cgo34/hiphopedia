import { ActorViewModel } from '@/core/domain/entities/Actor'
import { VideoViewModel } from '@/core/domain/entities/Video'

// Types de base pour les actions
interface FeaturedAction {
  label: string
  icon: string
  action: () => void
}

interface FeaturedActions {
  primary: FeaturedAction
  secondary?: FeaturedAction
}

// Type de base pour le contenu featured
export interface FeaturedContentBase {
  title: string
  description: string
  imageUrl: string
  type: string
  actions: FeaturedActions
  metadata?: string[]
}

// Types spécifiques
export interface FeaturedContentVideo extends FeaturedContentBase {
  item: VideoViewModel
  duration?: string
  releaseDate?: string
}

export interface FeaturedContentActor extends FeaturedContentBase {
  item: ActorViewModel
  role?: string
}
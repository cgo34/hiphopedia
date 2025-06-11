import { ActorViewModel } from '@/core/domain/entities/Actor'
import { VideoViewModel } from '@/core/domain/entities/Video'
import { FeaturedContentActor, FeaturedContentVideo } from '../components/features/content/FeaturedContent'

export class FeaturedContentMapper {
  static toFeaturedVideo(
    video: VideoViewModel, 
    formatType: (type: string) => string,
    actions: {
      onPlay: (video: VideoViewModel) => void
      onDetails: (video: VideoViewModel) => void
    }
  ): FeaturedContentVideo {
    return {
      item: video,
      title: video.title,
      description: video.description,
      imageUrl: video.thumbnailUrl,
      type: formatType(video.type),
      actions: {
        primary: {
          label: 'Lecture',
          icon: 'mdi-play',
          action: () => actions.onPlay(video)
        },
        secondary: {
          label: 'Plus d\'infos',
          icon: 'mdi-information',
          action: () => actions.onDetails(video)
        }
      },
      metadata: [video.duration, video.releaseDate].filter(Boolean),
      duration: video.duration,
      releaseDate: video.releaseDate
    }
  }

  static toFeaturedActor(
    actor: ActorViewModel,
    formatType: (type: string) => string,
    actions: {
      onDetails: (actor: ActorViewModel) => void
    }
  ): FeaturedContentActor {
    return {
      item: actor,
      title: actor.nickname || `${actor.firstname} ${actor.lastname}`,
      description: actor.biography,
      imageUrl: actor.photoUrl,
      type: formatType(actor.actorType),
      actions: {
        primary: {
          label: 'Voir le profil',
          icon: 'mdi-account',
          action: () => actions.onDetails(actor)
        }
      },
      metadata: [actor.role].filter(Boolean),
      role: actor.role
    }
  }
}
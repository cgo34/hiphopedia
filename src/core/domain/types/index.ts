export const TYPES = {
    // Repositories
    VideoRepository: Symbol.for('VideoRepository'),
    ActorRepository: Symbol.for('ActorRepository'),
    VideoActorRepository: Symbol.for('VideoActorRepository'),
  
    // Services
    VideoService: Symbol.for('VideoService'),
    ActorService: Symbol.for('ActorService'),
    VideoActorService: Symbol.for('VideoActorService'),
  
    // Infrastructure
    SupabaseClient: Symbol.for('SupabaseClient')
  } as const
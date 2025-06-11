export const ActorTypesViewType = [
    'rappeur',
    'producteur',
    'realisateur',
    'beatmaker',
    'media',
    'radio',
    'guest'
  ] as const;
  export type ActorTypeViewType = typeof ActorTypesViewType[number];
  
export const VideoTypesViewType = [
    'clip',
    'interview',
    'documentary',
    'reporting',
    'short'
  ] as const;
  export type VideoTypeViewType = typeof VideoTypesViewType[number];
  
export interface BaseRepository<TModel, TCreate, TUpdate, TType> {
  getAll(): Promise<TModel[]>
  getById(id: string): Promise<TModel | null>
  getByType(type: TType): Promise<TModel[]>
  create(data: TCreate): Promise<TModel>
  update(id: string, data: TUpdate): Promise<TModel | null>
  delete(id: string): Promise<boolean>
}
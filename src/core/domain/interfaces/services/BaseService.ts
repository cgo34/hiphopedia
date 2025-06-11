export interface BaseService<TViewModel, TCreate, TUpdate, TType> {
    getAll(): Promise<TViewModel[]>
    getById(id: string): Promise<TViewModel | null>
    getByType(type: TType): Promise<TViewModel[]>  // TType est générique
    create(dto: TCreate): Promise<TViewModel>
    update(id: string, dto: TUpdate): Promise<TViewModel | null>
    delete(id: string): Promise<boolean>
  }
import type { Categoria } from "@/domain/models/Categoria";

export interface SaveCategoryPersisterOutputPort {
  save(category: Categoria): Promise<void>
}

export interface GetAllCategoriesPersisterOutputPort {
  getAll(): Promise<Categoria[]>
}

export interface GetByIdCategoriesPersisterOutputPort {
  getById(id: string): Promise<Categoria>
}

export interface CategoryPersisterOutputPort extends
  SaveCategoryPersisterOutputPort, 
  GetAllCategoriesPersisterOutputPort,
  GetByIdCategoriesPersisterOutputPort {}
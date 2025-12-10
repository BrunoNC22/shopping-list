import type { GetAllCategoriesInputPort } from "../input/GetAllCategoriesInputPort";
import { Categoria } from "../models/Categoria";
import type { GetAllCategoriesPersisterOutputPort, SaveCategoryPersisterOutputPort } from "../output/persistance/CategoryPersisterOutputPort";

export class GetAllCategories implements GetAllCategoriesInputPort {
  constructor(private readonly categoriesPersister: GetAllCategoriesPersisterOutputPort & SaveCategoryPersisterOutputPort) {}

  async perform(): Promise<Categoria[]> {
    return await this.categoriesPersister.getAll()
  }
}
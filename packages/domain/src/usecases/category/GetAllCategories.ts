import { GetAllCategoriesInputPort } from "@/input";
import { Categoria } from "@/models";
import { GetAllCategoriesPersisterOutputPort } from "@/output";


export class GetAllCategories implements GetAllCategoriesInputPort {
  constructor(private readonly categoriesPersister: GetAllCategoriesPersisterOutputPort) {}

  async perform(): Promise<Categoria[]> {
    return await this.categoriesPersister.getAll()
  }
}
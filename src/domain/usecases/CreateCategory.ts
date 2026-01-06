import type { CreateCategoryInputPort, CreateCategoryProps } from "../input/CreateCategoryInputPort";
import { Categoria } from "../models/Categoria";
import type { SaveCategoryPersisterOutputPort } from "../output/persistance/CategoryPersisterOutputPort";

export class CreateCategory implements CreateCategoryInputPort {
  constructor(private readonly categoryPersister: SaveCategoryPersisterOutputPort) {}

  async perform(props: CreateCategoryProps): Promise<string> {
    const categoryId = (Math.random() * 10000).toFixed(0)
    const category = new Categoria(categoryId, props.categoryName)

    await this.categoryPersister.save(category)

    return categoryId
  }
}
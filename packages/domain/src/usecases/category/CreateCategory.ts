import type { CreateCategoryInputPort, CreateCategoryProps } from "../../input/CreateCategoryInputPort";
import { Categoria } from "../../models/Categoria";
import type { IdGeneratorOutputPort } from "../../output/id/IdGeneratorOutputPort";
import type { SaveCategoryPersisterOutputPort } from "../../output/persistance/CategoryPersisterOutputPort";

export class CreateCategory implements CreateCategoryInputPort {
  constructor(
    private readonly categoryPersister: SaveCategoryPersisterOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}

  async perform(props: CreateCategoryProps): Promise<string> {
    const categoryId = await this.idGenerator.generate()
    const category = new Categoria(categoryId, props.categoryName)

    await this.categoryPersister.save(category)

    return categoryId
  }
}
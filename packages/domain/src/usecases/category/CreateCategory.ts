import { CreateCategoryInputPort, CreateCategoryProps } from "@/input"
import { Categoria } from "@/models"
import { IdGeneratorOutputPort, SaveCategoryPersisterOutputPort } from "@/output"


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
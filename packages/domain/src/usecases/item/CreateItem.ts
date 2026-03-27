import { CreateItemInputPort, CreateItemProps } from "@/input"
import { Categoria, Item } from "@/models"
import { CategoryNotFoundError, GetByIdCategoriesPersisterOutputPort, GetItemListPersisterOutputPort, IdGeneratorOutputPort, ItemListNotFoundError, SaveItemPersisterOutputPort } from "@/output"


export class CreateItem implements CreateItemInputPort {
  constructor(
    private readonly itemPersister: SaveItemPersisterOutputPort,
    private readonly categoryPersister: GetByIdCategoriesPersisterOutputPort,
    private readonly itemListPersister: GetItemListPersisterOutputPort,
    private readonly idgenerator: IdGeneratorOutputPort
  ) {}

  async perform(props: CreateItemProps): Promise<Item> {
    let foundCategory: Categoria
    try {
      foundCategory = await this.categoryPersister.getById(props.categoryId)
    } catch (e) {
      if (e instanceof CategoryNotFoundError) {
        throw new Error(`Não foi possivel criar o item pois a categoria com id ${props.categoryId} não existe.`)
      }
      throw new Error(`Erro inesperado ao buscar categoria com id ${props.categoryId}: ${e}`)
    }

    try {
      await this.itemListPersister.get(props.itemListId)
    } catch (e) {
      if (e instanceof ItemListNotFoundError) {
        throw new Error(`Não foi poassivel criar o item pois a lista de itens com id ${props.itemListId} não existe`)
      } else throw new Error(`Erro inesperado ao buscar ItemList com id ${props.itemListId}: ${e}`)
    }

    const newItemId = await this.idgenerator.generate()
    const newItem = new Item(newItemId, props.itemListId, props.name, props.price, props.amount, foundCategory)

    await this.itemPersister.save(newItem)

    return newItem
  }
}

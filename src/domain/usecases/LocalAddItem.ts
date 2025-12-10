import type { AddItemInputPort, AddItemProps } from "../input/AddItemInputPort";
import type { Categoria } from "../models/Categoria";
import Item from "../models/Item";
import type { GetByIdCategoriesPersisterOutputPort } from "../output/persistance/CategoryPersisterOutputPort";
import { CategoryNotFoundError } from "../output/persistance/errors/CategoryNotFoundError";
import type { SaveItemPersisterOutputPort } from "../output/persistance/ItemPersisterOutputPort";

class LocalAddItem implements AddItemInputPort {
  constructor(
    private readonly itemPersister: SaveItemPersisterOutputPort,
    private readonly categoryPersister: GetByIdCategoriesPersisterOutputPort
  ) {}

  async perform(props: AddItemProps): Promise<Item> {
    let foundCategory: Categoria
    try {
      foundCategory = await this.categoryPersister.getById(props.categoryId)
    } catch (e) {
      if (e instanceof CategoryNotFoundError) {
        throw new Error(`Não foi possivel criar o item pois a categoria com id ${props.categoryId} não existe.`)
      }
      throw new Error(`Erro inesperado ao buscar categoria com id ${props.categoryId}: ${e}`)
    }

    const newItemId = (Math.random() * 10000).toFixed(0)
    const newItem = new Item(newItemId, props.name, props.price, props.amount, foundCategory)

    await this.itemPersister.save(newItem)

    return newItem
  }
}

export default LocalAddItem
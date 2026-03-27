import { EditIntemInputPort, EditItemProps } from "@/input"
import { Categoria } from "@/models"
import { CategoryNotFoundError, GetByIdCategoriesPersisterOutputPort, getByItemListIdItemPersisterOutputPort, SaveItemPersisterOutputPort } from "@/output"


export class EditItem implements EditIntemInputPort {
  constructor(
    private readonly itemPersister: getByItemListIdItemPersisterOutputPort & SaveItemPersisterOutputPort,
    private readonly categoryPersister: GetByIdCategoriesPersisterOutputPort
  ) {}
  async perform(props: EditItemProps): Promise<void> {
    const items = await this.itemPersister.getByItemListId(props.itemListId)

    const foundItem = items.find((item) => item.id === props.itemId)
    if (!foundItem) return

    if (props.amount) foundItem.amount = props.amount
    if (props.name) foundItem.name = props.name
    if (props.value) foundItem.price = props.value
    if (props.categoryId) {
      let foundCategory: Categoria
      try {
        foundCategory = await this.categoryPersister.getById(props.categoryId)
      } catch (e) {
        if (e instanceof CategoryNotFoundError) {
          throw new Error(`Não foi possivel editar o item pois a categoria com id ${props.categoryId} não existe.`)
        }
        throw new Error(`Erro inesperado ao buscar categoria com id ${props.categoryId}: ${e}`)
      }

      foundItem.category = foundCategory
    }

    await this.itemPersister.save(foundItem)
  }
}
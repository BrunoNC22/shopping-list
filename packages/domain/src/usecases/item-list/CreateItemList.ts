import { CreateItemListInputPort, CreateItemListProps } from "@/input"
import { ItemList } from "@/models"
import { IdGeneratorOutputPort, SaveItemListPersisterOutputPort } from "@/output"


export class CreateItemList implements CreateItemListInputPort {
  constructor(
    private readonly itemListPersister: SaveItemListPersisterOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}

  async perform(props: CreateItemListProps): Promise<void> {
    const listId = await this.idGenerator.generate()
    const createdAt = new Date()
    const newItemList = new ItemList(listId, props.userId, props.listName, [], createdAt)

    await this.itemListPersister.save(newItemList)
  }
}
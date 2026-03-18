import type { CreateItemListInputPort, CreateItemListProps,  } from "../../input/CreateItemListInputPort";
import { ItemList } from "../../models/ItemList";
import type { IdGeneratorOutputPort } from "../../output/id/IdGeneratorOutputPort";
import type { SaveItemListPersisterOutputPort } from "../../output/persistance/ItemListPersisterOutputPort";

export class CreateItemList implements CreateItemListInputPort {
  constructor(
    private readonly itemListPersister: SaveItemListPersisterOutputPort,
    private readonly idGenerator: IdGeneratorOutputPort
  ) {}

  async perform(props: CreateItemListProps): Promise<void> {
    const listId = await this.idGenerator.generate()
    const createdAt = new Date()
    const newItemList = new ItemList(listId, props.listName, [], createdAt)

    await this.itemListPersister.save(newItemList)
  }
}
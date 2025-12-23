import type { CreateItemListInputPort, CreateItemListProps,  } from "../input/CreateItemListInputPort";
import ItemList from "../models/ItemList";
import type { SaveItemListPersisterOutputPort } from "../output/persistance/ItemListPersisterOutputPort";

export class CreateItemList implements CreateItemListInputPort {
  constructor(private readonly itemListPersister: SaveItemListPersisterOutputPort) {}

  async perform(props: CreateItemListProps): Promise<void> {
    const listId = (Math.random() * 10000).toFixed(0)
    const createdAt = new Date()
    const newItemList = new ItemList(listId, props.listName, [], createdAt)

    await this.itemListPersister.save(newItemList)
  }
}
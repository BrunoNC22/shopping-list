import type { GetItemListsInputPort } from "../input/GetItemListsInputPort";
import type ItemList from "../models/ItemList";
import type { GetAllItemListsPersisterOutputPort } from "../output/persistance/ItemListPersisterOutputPort";

export class GetItemLists implements GetItemListsInputPort {
  constructor(private readonly itemListPersister: GetAllItemListsPersisterOutputPort) {}

  async perform(): Promise<ItemList[]> {
    return await this.itemListPersister.getAll()
  }
}
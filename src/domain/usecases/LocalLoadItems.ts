import type LoadItemsInputPort from "../input/LoadItemsInputPort";
import type Item from "../models/Item";
import type { GetAllItemsPersisterOutputPort } from "../output/persistance/ItemPersisterOutputPort";

export class LocalLoadItems implements LoadItemsInputPort {
  constructor(private readonly itemPersister: GetAllItemsPersisterOutputPort) {}

  async perform(): Promise<Item[]> {
    return await this.itemPersister.getAll()
  }
}
import { GetItemsInputPort } from "@/input";
import { type Item } from "../../models/Item";
import type { GetAllItemsPersisterOutputPort } from "../../output/persistance/ItemPersisterOutputPort";

export class GetItems implements GetItemsInputPort {
  constructor(private readonly itemPersister: GetAllItemsPersisterOutputPort) {}

  async perform(): Promise<Item[]> {
    return await this.itemPersister.getAll()
  }
}